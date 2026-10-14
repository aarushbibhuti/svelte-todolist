import { db } from '$lib/server/db';
import { todos } from '$lib/server/db/schema';
import type { Actions } from './$types';
import { eq } from 'drizzle-orm';

export async function load() {
    const allTodos = await db.select().from(todos);

    return {
        todos: allTodos
    };
}


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
    },
    delete: async ({ request }) => {
        const formData = await request.formData();
        const rawId = formData.get('id');

        if (typeof rawId !== 'string') {
            return { success: false };
        }

        const id = Number(rawId);

        if (!Number.isInteger(id) || id <= 0) {
            return { success: false };
        }

        await db.delete(todos).where(eq(todos.id, id));

        return { success: true };
    },
    edit: async ({ request }) => {
        const formData = await request.formData();
        const rawId = formData.get('id');
        const task = formData.get('task');
        const priority = formData.get('priority');

        if (
            typeof rawId !== 'string' ||
            typeof task !== 'string' ||
            typeof priority !== 'string' ||
            !task.trim() ||
            !['high', 'medium', 'low'].includes(priority)
        ) {
            return { success: false };
        }

        const id = Number(rawId);

        if (!Number.isInteger(id) || id <= 0) {
            return { success: false };
        }

        await db.update(todos).set({
            task: task.trim(),
            priority
        }).where(eq(todos.id, id));

        return { success: true };
    }
} satisfies Actions;
