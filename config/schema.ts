import { pgTable, integer, varchar, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users",{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({length: 256}).notNull(),
    email: varchar({length: 256}).notNull().unique(),
    credits: integer().notNull().default(0),
})