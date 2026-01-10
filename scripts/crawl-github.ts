import { Octokit } from 'octokit';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import { paginateRest } from "@octokit/plugin-paginate-rest";

dotenv.config();

// Initialize Octokit with pagination plugin
const MyOctokit = Octokit.plugin(paginateRest);
const octokit = new MyOctokit({
    auth: process.env.GITHUB_TOKEN, // Optional: Higher rate limits if token provided
    userAgent: 'skills-marketplace-crawler/1.0.0'
});

const prisma = new PrismaClient();

const TOPICS_TO_SEARCH = [
    'mcp-server',
    'claude-skill',
    'agent-tool',
    'ai-plugin',
    'mcp-tool'
];

// Helper to determine category based on description and topics
function determineCategory(repo: any): string {
    const text = (repo.description + ' ' + repo.topics.join(' ')).toLowerCase();

    if (text.includes('pdf') || text.includes('docx') || text.includes('document')) return 'document-processing';
    if (text.includes('marketing') || text.includes('seo') || text.includes('ads')) return 'business-marketing';
    if (text.includes('writing') || text.includes('blog') || text.includes('content')) return 'communication-writing';
    if (text.includes('image') || text.includes('video') || text.includes('design') || text.includes('art')) return 'creative-media';
    if (text.includes('project') || text.includes('kanban') || text.includes('agile')) return 'collaboration-pm';
    if (text.includes('security') || text.includes('auth') || text.includes('audit')) return 'security';
    if (text.includes('database') || text.includes('sql') || text.includes('postgres')) return 'database';
    if (text.includes('test') || text.includes('qa') || text.includes('mock')) return 'testing';
    if (text.includes('deploy') || text.includes('docker') || text.includes('aws')) return 'deployment';

    return 'dev-tools'; // Default fallback
}

function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
}

async function crawl() {
    console.log('Starting GitHub Crawler...');

    for (const topic of TOPICS_TO_SEARCH) {
        console.log(`Searching for topic: ${topic}`);

        try {
            // Search repositories with specific topic
            // Pagination: requesting 100 items per page, for now just 1 page to test
            const response = await octokit.rest.search.repos({
                q: `topic:${topic} stars:>10`, // Quality filter: at least 10 stars
                sort: 'stars',
                order: 'desc',
                per_page: 50,
            });

            const repos = response.data.items;
            console.log(`Found ${repos.length} repositories for ${topic}`);

            for (const repo of repos) {
                // Skip if not enough info
                if (!repo.description) continue;

                const categoryId = determineCategory(repo);
                const slug = slugify(repo.name);

                try {
                    // Upsert skill
                    await prisma.skill.upsert({
                        where: { repository: repo.html_url },
                        update: {
                            stars: repo.stargazers_count,
                            lastUpdate: new Date(repo.updated_at),
                            downloads: 0, // GitHub API doesn't give downloads easily
                        },
                        create: {
                            name: repo.name,
                            nameEn: repo.name, // Default to repo name
                            description: repo.description,
                            repository: repo.html_url,
                            author: repo.owner ? repo.owner.login : 'unknown',
                            version: '1.0.0',
                            stars: repo.stargazers_count,
                            downloads: 0,
                            lastUpdate: new Date(repo.updated_at),
                            tags: repo.topics || [], // Pass array directly
                            categoryId: categoryId,
                            slug: slug,
                        }
                    });
                    process.stdout.write('.');
                } catch (e) {
                    // Ignore unique constraint errors on slug which might happen rarely
                    // console.error(`Error processing ${repo.name}:`, e);
                }
            }
            console.log('\nTopic processed.');

            // Sleep to be nice to API
            await new Promise(resolve => setTimeout(resolve, 2000));

        } catch (error) {
            console.error(`Error searching ${topic}:`, error);
        }
    }

    console.log('Crawling completed.');
}

crawl()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });
