import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const team = defineCollection({
    loader: glob({
        base: './src/data/team',
        pattern: '**/*.{yaml,yml}'
    }),

    schema: ({ image }) => z.object({
        name: z.string(),
        role: z.string(),
        university: z.enum(["JU", "WUT"]),
        expertise: z.array(z.string()).max(5, 'Expertise can have a maximum of 5 items.').min(1, 'Expertise must have at least 1 item.'),
        email: z.email().optional(),
        avatar: image().optional(),
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