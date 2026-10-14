import { pgTable, serial, text, boolean } from 'drizzle-orm/pg-core';

export const todos = pgTable('todos', {
    id: serial('id').primaryKey(),
    task: text('task').notNull(),
    priority: text('priority').notNull(),
    completed: boolean('completed').notNull().default(false)
});