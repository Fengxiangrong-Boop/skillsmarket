import categoriesData from '@/data/categories.json';
import skillsData from '@/data/skills.json';

export interface Category {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  icon: string;
  skillCount: number;
  color: string;
}

export interface Skill {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  category: string;
  author: string;
  downloads: number;
  stars: number;
  lastUpdate: string;
  tags: string[];
  repository: string;
}

export type SortBy = 'stars' | 'downloads' | 'lastUpdate' | 'name';

// Get all categories
export function getCategories(): Category[] {
  return categoriesData as Category[];
}

// Get all skills
export function getSkills(): Skill[] {
  return skillsData as Skill[];
}

// Get category by ID
export function getCategoryById(id: string): Category | undefined {
  return categoriesData.find((cat) => cat.id === id) as Category | undefined;
}

// Get skill by ID
export function getSkillById(id: string): Skill | undefined {
  return skillsData.find((skill) => skill.id === id) as Skill | undefined;
}

// Get skills by category
export function getSkillsByCategory(categoryId: string): Skill[] {
  return skillsData.filter((skill) => skill.category === categoryId) as Skill[];
}

// Search skills
export function searchSkills(query: string): Skill[] {
  const lowerQuery = query.toLowerCase();
  return skillsData.filter((skill) => {
    const s = skill as Skill;
    return (
      s.name.toLowerCase().includes(lowerQuery) ||
      s.nameEn.toLowerCase().includes(lowerQuery) ||
      s.description.toLowerCase().includes(lowerQuery) ||
      s.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      s.author.toLowerCase().includes(lowerQuery)
    );
  }) as Skill[];
}

// Sort skills
export function sortSkills(skills: Skill[], sortBy: SortBy): Skill[] {
  const sorted = [...skills];

  switch (sortBy) {
    case 'stars':
      return sorted.sort((a, b) => b.stars - a.stars);
    case 'downloads':
      return sorted.sort((a, b) => b.downloads - a.downloads);
    case 'lastUpdate':
      return sorted.sort(
        (a, b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime()
      );
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
}

// Get total skills count
export function getTotalSkillsCount(): number {
  return skillsData.length;
}

// Get popular skills (top 6 by stars)
export function getPopularSkills(limit: number = 6): Skill[] {
  const sorted = sortSkills(skillsData as Skill[], 'stars');
  return sorted.slice(0, limit);
}

// Format number with commas
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

// Format date
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return '今天';
  if (diffDays === 1) return '昨天';
  if (diffDays < 7) return `${diffDays}天前`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}周前`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}个月前`;
  return `${Math.floor(diffDays / 365)}年前`;
}

// Get category color (for dynamic styling)
export function getCategoryColor(categoryId: string): string {
  const category = getCategoryById(categoryId);
  return category?.color || '#6366f1';
}

// Highlight search query in text
export function highlightText(text: string, query: string): string {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}
