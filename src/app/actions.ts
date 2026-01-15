'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type Skill = {
    id: string;
    name: string;
    nameEn: string | null;
    description: string;
    repository: string;
    author: string;
    stars: number;
    downloads: number;
    lastUpdate: Date;
    tags: string[]; // Handled as array in return type
    categoryId: string;
    slug: string;
};

export type Category = {
    id: string;
    name: string;
    nameEn: string;
    description: string;
    icon: string;
    color: string;
    count?: number;
};

// Get all categories with skill counts
export async function getCategories(): Promise<Category[]> {
    try {
        const categories = await prisma.category.findMany({
            include: {
                _count: {
                    select: { skills: true },
                },
            },
        });

        return categories;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

// Get skills with pagination and filtering
export async function getSkills({
    query,
    category,
    page = 1,
    limit = 20,
}: {
    query?: string;
    category?: string;
    page?: number;
    limit?: number;
}) {
    const skip = (page - 1) * limit;

    const where: any = {};

    if (category) {
        where.categoryId = category;
    }

    if (query) {
        where.OR = [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { tags: { hasSome: [query] } },
        ];
    }

    try {
        const [skills, total] = await prisma.$transaction([
            prisma.skill.findMany({
                where,
                skip,
                take: limit,
                orderBy: { stars: 'desc' }, // Default sort by stars
            }),
            prisma.skill.count({ where }),
        ]);

        // Parse tags from JSON string to array
        // Postgres returns tags as array directly, no need to parse
        const parsedSkills = skills;

        return {
            skills: parsedSkills,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
        };
    } catch (error) {
        console.error('Error fetching skills:', error);
        return {
            skills: [],
            total: 0,
            totalPages: 0,
            currentPage: page,
        };
    }
}

export async function getPopularSkills(limit = 6) {
    try {
        const skills = await prisma.skill.findMany({
            take: limit,
            orderBy: { stars: 'desc' },
        });

        return skills;
    } catch (error) {
        console.error('Error fetching popular skills:', error);
        return [];
    }
}

export async function getSkillCount() {
    try {
        return await prisma.skill.count();
    } catch (error) {
        console.error('Error fetching skill count:', error);
        return 0;
    }
}
