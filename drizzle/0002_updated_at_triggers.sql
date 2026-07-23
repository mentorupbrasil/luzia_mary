-- Add updated_at where missing and auto-refresh on every UPDATE.
-- Preserves created_at. Backfills updated_at from created_at when possible.

ALTER TABLE "contacts" ADD COLUMN IF NOT EXISTS "updated_at" timestamptz;
ALTER TABLE "events" ADD COLUMN IF NOT EXISTS "updated_at" timestamptz;
ALTER TABLE "fact_checks" ADD COLUMN IF NOT EXISTS "updated_at" timestamptz;
--> statement-breakpoint

UPDATE "contacts" SET "updated_at" = coalesce("updated_at", "created_at", now()) WHERE "updated_at" IS NULL;
UPDATE "events" SET "updated_at" = coalesce("updated_at", "created_at", now()) WHERE "updated_at" IS NULL;
UPDATE "fact_checks" SET "updated_at" = coalesce("updated_at", "created_at", now()) WHERE "updated_at" IS NULL;
--> statement-breakpoint

ALTER TABLE "contacts" ALTER COLUMN "updated_at" SET DEFAULT now();
ALTER TABLE "contacts" ALTER COLUMN "updated_at" SET NOT NULL;
ALTER TABLE "events" ALTER COLUMN "updated_at" SET DEFAULT now();
ALTER TABLE "events" ALTER COLUMN "updated_at" SET NOT NULL;
ALTER TABLE "fact_checks" ALTER COLUMN "updated_at" SET DEFAULT now();
ALTER TABLE "fact_checks" ALTER COLUMN "updated_at" SET NOT NULL;
--> statement-breakpoint

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
--> statement-breakpoint

DROP TRIGGER IF EXISTS set_updated_at ON "demands";
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON "demands"
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();
--> statement-breakpoint

DROP TRIGGER IF EXISTS set_updated_at ON "contacts";
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON "contacts"
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();
--> statement-breakpoint

DROP TRIGGER IF EXISTS set_updated_at ON "proposals";
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON "proposals"
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();
--> statement-breakpoint

DROP TRIGGER IF EXISTS set_updated_at ON "commitments";
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON "commitments"
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();
--> statement-breakpoint

DROP TRIGGER IF EXISTS set_updated_at ON "posts";
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON "posts"
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();
--> statement-breakpoint

DROP TRIGGER IF EXISTS set_updated_at ON "events";
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON "events"
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();
--> statement-breakpoint

DROP TRIGGER IF EXISTS set_updated_at ON "fact_checks";
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON "fact_checks"
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();
