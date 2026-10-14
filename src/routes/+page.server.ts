import { db } from '$lib/server/db';
import { todos } from '$lib/server/db/schema';

export async function load() {
    const allTodos = await db.select().from(todos);

    return {
        todos: allTodos
    };
}

import type { Actions } from './$types';

export const actions = {
    add: async ({ request }) => {
        const formData = await request.formData();

        const task = formData.get('task');
        const priority = formData.get('priority');

        if (
            typeof task !== 'string' ||
            typeof priority !== 'string' ||
            !task.trim() ||
            !['high', 'medium', 'low'].includes(priority)
        ) {
            return { success: false };
        }

        await db.insert(todos).values({
            task: task.trim(),
            priority
        });

        return { success: true };
    }
} satisfies Actions;