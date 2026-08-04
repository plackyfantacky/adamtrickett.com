import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const linkSchema = z.object({
    label: z.string(),
    url: z.string()
});

const homepage = defineCollection({
    loader: glob({
        base: './content/pages/home',
        pattern: '**/*.{md,mdx}'
    }),
    schema: z.object({
        section: z.string(),

        label: z.string().optional(),
        heading: z.string().optional(),
        subheading: z.string().optional(),

        primaryCta: linkSchema.optional(),
        secondaryCta: linkSchema.optional(),
        button: linkSchema.optional(),
        
        items: z.array(
            z.union([
                z.string(),
                z.object({
                    label: z.string().optional(),
                    title: z.string().optional(),
                    heading: z.string().optional(),
                    text: z.string().optional(),
                    url: z.string().optional(),
                })
            ])
        ).optional()
    }),
});

const caseStudies = defineCollection({
    loader: glob({
        base: './content/case-studies',
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

        preview: z.object({
            description: z.string(),
            image: z.string().optional(),
        }).optional()
    }),
});


const services = defineCollection({
    loader: glob({
        base: './content/previews/services',
        pattern: '**/*.{md,mdx}'
    }),
    schema: z.object({
        slug: z.string(),
        heading: z.string(),
        icon_path: z.string().optional(),
        cta: linkSchema.optional(),
    }),
});

export const collections = {
    'homepage': homepage,
    'case-studies': caseStudies,
    'services': services
};