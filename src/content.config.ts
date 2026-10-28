import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const UniversitySchema = z.enum(["JU", "WUT", "WUST"]);
export type University = z.infer<typeof UniversitySchema>;

const team = defineCollection({
    loader: glob({
        base: './src/data/team',
        pattern: '**/*.{yaml,yml}'
    }),

    schema: ({ image }) => z.object({
        name: z.string(),
        role: z.string(),
        description: z.string(),
        university: UniversitySchema.array(),
        expertise: z.array(z.string()).max(5, 'Expertise can have a maximum of 5 items.').min(1, 'Expertise must have at least 1 item.'),
        avatar: image().optional(),
        github: z.url().optional(),
        linkedin: z.url().optional(),
        universityProfile: z.url().optional(),
        publications: z.url().optional(),
        sort: z.number().optional().default(10)
    })
});

const services = defineCollection({
    loader: glob({
        base: './src/data/apps',
        pattern: '**/*.{yaml,yml}'
    }),
    schema: ({ image }) => z.object({
        name: z.string(),
        description: z.string(),
        url: z.url(),
        icon: image(),
        sort: z.number().optional().default(10)
    })
})

export const collections = {
    team,
    services
};