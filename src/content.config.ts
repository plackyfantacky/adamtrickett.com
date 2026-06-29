import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const caseStudies = defineCollection({
    loader: glob({
        // base: './src/content/case-studies',
        base: '/Volumes/Ariom/Obsidian/Ariom/Portfolio/Content/case-studies',
        pattern: '**/*.{md,mdx}'
    }),
    schema: z.object({
        title: z.string(),
        slug: z.string(),
        client: z.string().optional(),
        studio_agency: z.string().optional(),
        url: z.httpUrl().optional(),
        year: z.union([z.string(), z.number()]).optional(),
        role: z.array(z.string()).optional(),
    }),
});

export const collections = {
    'case-studies': caseStudies,
};