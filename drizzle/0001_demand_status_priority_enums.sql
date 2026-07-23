-- Safe migration: controlled demand status/priority enums without data loss.
-- 1) Normalize legacy free-text values to canonical labels
-- 2) Create enums
-- 3) Alter columns with USING cast

UPDATE "demands"
SET "status" = CASE lower(trim(both FROM coalesce("status", '')))
  WHEN 'recebida' THEN 'recebida'
  WHEN 'recebido' THEN 'recebida'
  WHEN 'nova' THEN 'recebida'
  WHEN 'novo' THEN 'recebida'
  WHEN 'em análise' THEN 'em análise'
  WHEN 'em analise' THEN 'em análise'
  WHEN 'analise' THEN 'em análise'
  WHEN 'análise' THEN 'em análise'
  WHEN 'analysis' THEN 'em análise'
  WHEN 'encaminhada' THEN 'encaminhada'
  WHEN 'encaminhado' THEN 'encaminhada'
  WHEN 'respondida' THEN 'respondida'
  WHEN 'respondido' THEN 'respondida'
  WHEN 'arquivada' THEN 'arquivada'
  WHEN 'arquivado' THEN 'arquivada'
  ELSE 'recebida'
END;

UPDATE "demands"
SET "priority" = CASE lower(trim(both FROM coalesce("priority", '')))
  WHEN 'baixa' THEN 'baixa'
  WHEN 'low' THEN 'baixa'
  WHEN 'normal' THEN 'normal'
  WHEN 'media' THEN 'normal'
  WHEN 'média' THEN 'normal'
  WHEN 'medium' THEN 'normal'
  WHEN 'alta' THEN 'alta'
  WHEN 'high' THEN 'alta'
  WHEN 'urgente' THEN 'urgente'
  WHEN 'urgent' THEN 'urgente'
  WHEN 'critica' THEN 'urgente'
  WHEN 'crítica' THEN 'urgente'
  ELSE 'normal'
END;
--> statement-breakpoint

DO $$ BEGIN
  CREATE TYPE "public"."demand_status" AS ENUM(
    'recebida',
    'em análise',
    'encaminhada',
    'respondida',
    'arquivada'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint

DO $$ BEGIN
  CREATE TYPE "public"."demand_priority" AS ENUM(
    'baixa',
    'normal',
    'alta',
    'urgente'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint

ALTER TABLE "demands" ALTER COLUMN "status" DROP DEFAULT;
--> statement-breakpoint
ALTER TABLE "demands" ALTER COLUMN "status" SET DATA TYPE "public"."demand_status" USING "status"::"public"."demand_status";
--> statement-breakpoint
ALTER TABLE "demands" ALTER COLUMN "status" SET DEFAULT 'recebida'::"public"."demand_status";
--> statement-breakpoint

ALTER TABLE "demands" ALTER COLUMN "priority" DROP DEFAULT;
--> statement-breakpoint
ALTER TABLE "demands" ALTER COLUMN "priority" SET DATA TYPE "public"."demand_priority" USING "priority"::"public"."demand_priority";
--> statement-breakpoint
ALTER TABLE "demands" ALTER COLUMN "priority" SET DEFAULT 'normal'::"public"."demand_priority";
