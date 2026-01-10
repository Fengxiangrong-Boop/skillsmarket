import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL
});

function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-');  // Replace multiple - with single -
}

async function main() {
    const categoriesPath = path.join(process.cwd(), 'src/data/categories.json');
    const skillsPath = path.join(process.cwd(), 'src/data/skills.json');

    const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));
    const skills = JSON.parse(fs.readFileSync(skillsPath, 'utf8'));

    console.log(`Found ${categories.length} categories and ${skills.length} skills.`);

    // 1. Seed Categories
    for (const cat of categories) {
        await prisma.category.upsert({
            where: { id: cat.id },
            update: {
                name: cat.name,
                nameEn: cat.nameEn,
                description: cat.description,
                icon: cat.icon,
                color: cat.color,
            },
            create: {
                id: cat.id,
                name: cat.name,
                nameEn: cat.nameEn,
                description: cat.description,
                icon: cat.icon,
                color: cat.color,
            },
        });
    }
    console.log('Categories seeded.');

    // 2. Seed Skills
    for (const skill of skills) {
        const slug = slugify(skill.nameEn || skill.name);
        // Ensure slug is unique by appending random string if needed? 
        // For now assuming existing data is clean enough or catch error.

        // Check if repository already exists to avoid unique constraint error
        const existing = await prisma.skill.findUnique({
            where: { repository: skill.repository || `placeholder-${skill.id}` },
        });

        if (existing) {
            console.log(`Skipping duplicate repo: ${skill.repository}`);
            continue;
        }

        // Handle lastUpdate format
        // Original JSON has "YYYY-MM-DD", Prisma schema has String for now for simplicity in migration

        await prisma.skill.create({
            data: {
                id: skill.id,
                name: skill.name,
                nameEn: skill.nameEn,
                description: skill.description,
                repository: skill.repository || '',
                author: skill.author,
                version: skill.version,
                stars: skill.stars,
                downloads: skill.downloads,
                lastUpdate: new Date(skill.lastUpdate),
                tags: skill.tags, // Pass array directly for Postgres
                categoryId: skill.category,
                slug: slug,
            },
        });
    }
    console.log('Skills seeded.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
