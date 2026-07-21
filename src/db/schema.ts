import { boolean, integer, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const demands = pgTable("demands", {
  id: uuid("id").defaultRandom().primaryKey(),
  protocol: text("protocol").notNull().unique(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  city: text("city").notNull(),
  neighborhood: text("neighborhood"),
  category: text("category").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  consent: boolean("consent").notNull().default(false),
  publicSummary: text("public_summary"),
  status: text("status").notNull().default("recebida"),
  priority: text("priority").notNull().default("normal"),
  assignedTo: text("assigned_to"),
  internalNotes: text("internal_notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const contacts = pgTable("contacts", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  city: text("city"),
  source: text("source").notNull().default("site"),
  status: text("status").notNull().default("ativo"),
  consentText: text("consent_text").notNull(),
  consentAt: timestamp("consent_at", { withTimezone: true }).defaultNow().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const proposals = pgTable("proposals", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  body: text("body").notNull(),
  category: text("category").notNull(),
  icon: text("icon").default("landmark"),
  featured: boolean("featured").notNull().default(false),
  published: boolean("published").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const commitments = pgTable("commitments", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  metric: text("metric").notNull(),
  target: text("target").notNull(),
  status: text("status").notNull().default("proposto"),
  progress: integer("progress").notNull().default(0),
  dueDate: timestamp("due_date", { withTimezone: true }),
  published: boolean("published").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const factChecks = pgTable("fact_checks", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  claim: text("claim").notNull(),
  verdict: text("verdict").notNull(),
  explanation: text("explanation").notNull(),
  sources: jsonb("sources").$type<Array<{ label: string; url: string }>>().notNull().default([]),
  published: boolean("published").notNull().default(true),
  publishedAt: timestamp("published_at", { withTimezone: true }).defaultNow().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  location: text("location"),
  city: text("city").notNull(),
  startAt: timestamp("start_at", { withTimezone: true }).notNull(),
  endAt: timestamp("end_at", { withTimezone: true }),
  status: text("status").notNull().default("confirmado"),
  public: boolean("public").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  body: text("body").notNull(),
  category: text("category").notNull().default("Notícias"),
  imageUrl: text("image_url"),
  published: boolean("published").notNull().default(true),
  publishedAt: timestamp("published_at", { withTimezone: true }).defaultNow().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
