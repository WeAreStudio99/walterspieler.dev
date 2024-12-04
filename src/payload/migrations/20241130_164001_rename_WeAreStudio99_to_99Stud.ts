import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  // Temporarily change the column type to text
  await payload.db.drizzle.execute(sql`
    ALTER TABLE "public"."main_menu_menu_items" ALTER COLUMN "type" SET DATA TYPE text;
  `);

  // Update the data from "WeAreStudio99" to "99Stud"
  await payload.db.drizzle.execute(sql`
    UPDATE "public"."main_menu_menu_items"
    SET "type" = '99Stud'
    WHERE "type" = 'weAreStudio99';
  `);

  // Drop the old ENUM type
  await payload.db.drizzle.execute(sql`
    DROP TYPE "public"."enum_main_menu_menu_items_type";
  `);

  // Create the new ENUM type with "99Stud"
  await payload.db.drizzle.execute(sql`
    CREATE TYPE "public"."enum_main_menu_menu_items_type" AS ENUM('home', 'blog', 'lab', 'experiences', 'contact', '99Stud', 'other');
  `);

  // Change the column back to the new ENUM type
  await payload.db.drizzle.execute(sql`
    ALTER TABLE "public"."main_menu_menu_items" 
    ALTER COLUMN "type" SET DATA TYPE "public"."enum_main_menu_menu_items_type" USING "type"::"public"."enum_main_menu_menu_items_type";
  `);
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  // Temporarily change the column type to text
  await payload.db.drizzle.execute(sql`
    ALTER TABLE "public"."main_menu_menu_items" ALTER COLUMN "type" SET DATA TYPE text;
  `);

  // Update the data from "99Stud" back to "WeAreStudio99"
  await payload.db.drizzle.execute(sql`
    UPDATE "public"."main_menu_menu_items"
    SET "type" = 'weAreStudio99'
    WHERE "type" = '99Stud';
  `);

  // Drop the new ENUM type
  await payload.db.drizzle.execute(sql`
    DROP TYPE "public"."enum_main_menu_menu_items_type";
  `);

  // Recreate the old ENUM type with "WeAreStudio99"
  await payload.db.drizzle.execute(sql`
    CREATE TYPE "public"."enum_main_menu_menu_items_type" AS ENUM('home', 'blog', 'lab', 'experiences', 'contact', 'weAreStudio99', 'other');
  `);

  // Change the column back to the old ENUM type
  await payload.db.drizzle.execute(sql`
    ALTER TABLE "public"."main_menu_menu_items" 
    ALTER COLUMN "type" SET DATA TYPE "public"."enum_main_menu_menu_items_type" USING "type"::"public"."enum_main_menu_menu_items_type";
  `);
}
