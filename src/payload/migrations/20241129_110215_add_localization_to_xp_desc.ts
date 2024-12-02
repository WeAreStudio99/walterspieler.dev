import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "experience_posts_locales" ADD COLUMN "description" varchar;
  ALTER TABLE "experience_posts" DROP COLUMN IF EXISTS "description";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "experience_posts" ADD COLUMN "description" varchar;
  ALTER TABLE "experience_posts_locales" DROP COLUMN IF EXISTS "description";`)
}
