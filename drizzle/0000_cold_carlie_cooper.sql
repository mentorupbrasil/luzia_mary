CREATE TABLE "commitments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"summary" text NOT NULL,
	"metric" text NOT NULL,
	"target" text NOT NULL,
	"status" text DEFAULT 'proposto' NOT NULL,
	"progress" integer DEFAULT 0 NOT NULL,
	"due_date" timestamp with time zone,
	"published" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contacts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text,
	"phone" text,
	"city" text,
	"source" text DEFAULT 'site' NOT NULL,
	"status" text DEFAULT 'ativo' NOT NULL,
	"consent_text" text NOT NULL,
	"consent_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "demands" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"protocol" text NOT NULL,
	"name" text NOT NULL,
	"email" text,
	"phone" text,
	"city" text NOT NULL,
	"neighborhood" text,
	"category" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"consent" boolean DEFAULT false NOT NULL,
	"public_summary" text,
	"status" text DEFAULT 'recebida' NOT NULL,
	"priority" text DEFAULT 'normal' NOT NULL,
	"assigned_to" text,
	"internal_notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "demands_protocol_unique" UNIQUE("protocol")
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"location" text,
	"city" text NOT NULL,
	"start_at" timestamp with time zone NOT NULL,
	"end_at" timestamp with time zone,
	"status" text DEFAULT 'confirmado' NOT NULL,
	"public" boolean DEFAULT true NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"category" text DEFAULT 'Evento institucional' NOT NULL,
	"region" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "fact_checks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"claim" text NOT NULL,
	"verdict" text NOT NULL,
	"explanation" text NOT NULL,
	"sources" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"published_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "fact_checks_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"excerpt" text NOT NULL,
	"body" text NOT NULL,
	"category" text DEFAULT 'Notícias' NOT NULL,
	"image_url" text,
	"published" boolean DEFAULT true NOT NULL,
	"published_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "proposals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"summary" text NOT NULL,
	"body" text NOT NULL,
	"category" text NOT NULL,
	"icon" text DEFAULT 'landmark',
	"featured" boolean DEFAULT false NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"why_it_matters" text DEFAULT '' NOT NULL,
	"commitments" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"how_federal_acts" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"demand_theme" text DEFAULT '' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "proposals_slug_unique" UNIQUE("slug")
);
