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
    lastUpdate: string;
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
    const categories = await prisma.category.findMany({
        include: {
            _count: {
                select: { skills: true },
            },
        },
    });

    return categories.map((c: any) => ({
        ...c,
        count: c._count.skills,
    }));
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
            { name: { contains: query } },
            { description: { contains: query } },
            { tags: { contains: query } },
        ];
    }

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
}

export async function getPopularSkills(limit = 6) {
    const skills = await prisma.skill.findMany({
        take: limit,
        orderBy: { stars: 'desc' },
    });

    return skills;
}

export async function getSkillCount() {
    return await prisma.skill.count();
}
