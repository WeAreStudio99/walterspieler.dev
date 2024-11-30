import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  // Rename "WeAreStudio99" to "99Stud" in existing rows
  await payload.db.drizzle.execute(sql`
    UPDATE "public"."main_menu_menu_items"
    SET "type" = '99Stud'
    WHERE "type" = 'weAreStudio99';
  `);

  // Update the column type to new ENUM
  await payload.db.drizzle.execute(sql`
    ALTER TABLE "public"."main_menu_menu_items" ALTER COLUMN "type" SET DATA TYPE text;
    DROP TYPE "public"."enum_main_menu_menu_items_type";
    CREATE TYPE "public"."enum_main_menu_menu_items_type" AS ENUM('home', 'blog', 'lab', 'experiences', 'contact', '99Stud', 'other');
    ALTER TABLE "public"."main_menu_menu_items" ALTER COLUMN "type" SET DATA TYPE "public"."enum_main_menu_menu_items_type" USING "type"::"public"."enum_main_menu_menu_items_type";
  `);
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  // Update "99Stud" back to "WeAreStudio99" in rows
  await payload.db.drizzle.execute(sql`
    UPDATE "public"."main_menu_menu_items"
    SET "type" = 'weAreStudio99'
    WHERE "type" = '99Stud';
  `);

  // Revert the column type to the original ENUM
  await payload.db.drizzle.execute(sql`
    ALTER TABLE "public"."main_menu_menu_items" ALTER COLUMN "type" SET DATA TYPE text;
    DROP TYPE "public"."enum_main_menu_menu_items_type";
    CREATE TYPE "public"."enum_main_menu_menu_items_type" AS ENUM('home', 'blog', 'lab', 'experiences', 'contact', 'weAreStudio99', 'other');
    ALTER TABLE "public"."main_menu_menu_items" ALTER COLUMN "type" SET DATA TYPE "public"."enum_main_menu_menu_items_type" USING "type"::"public"."enum_main_menu_menu_items_type";
  `);
}
