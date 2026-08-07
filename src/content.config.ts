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
        university: z.enum(["UJ", "PW"]),
        expertise: z.array(z.string()).max(5, 'Expertise can have a maximum of 5 items.').min(1, 'Expertise must have at least 1 item.'),
        email: z.email().optional(),
        avatar: image()
    })
});

export const collections = {
    team
};