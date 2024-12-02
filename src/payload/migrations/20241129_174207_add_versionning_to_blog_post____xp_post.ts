import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_blog_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__blog_posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__blog_posts_v_published_locale" AS ENUM('en', 'fr');
  CREATE TYPE "public"."enum_experience_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__experience_posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__experience_posts_v_published_locale" AS ENUM('en', 'fr');
  CREATE TABLE IF NOT EXISTS "_blog_posts_v_blocks_paragraph" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"paragraph" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_blog_posts_v_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_blog_posts_v_blocks_code" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_blog_posts_v_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_blog_posts_v_version_meta_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_blog_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_description" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__blog_posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__blog_posts_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_blog_posts_v_locales" (
  	"version_slug" varchar,
  	"version_title" varchar,
  	"version_main_image_id" integer,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "_blog_posts_v_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "_blog_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"experience_posts_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_experience_posts_v_blocks_paragraph" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"paragraph" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_experience_posts_v_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_experience_posts_v_blocks_code" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_experience_posts_v_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_experience_posts_v_version_meta_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_experience_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_title" varchar DEFAULT 'Untitled',
  	"version_experience_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__experience_posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__experience_posts_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_experience_posts_v_locales" (
  	"version_description" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "_experience_posts_v_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "_experience_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  ALTER TABLE "blog_posts_locales" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "blog_posts_locales" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "experience_posts" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "experience_posts" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "experience_posts" ALTER COLUMN "experience_id" DROP NOT NULL;
  ALTER TABLE "blog_posts" ADD COLUMN "_status" "enum_blog_posts_status" DEFAULT 'draft';
  ALTER TABLE "experience_posts" ADD COLUMN "_status" "enum_experience_posts_status" DEFAULT 'draft';
  DO $$ BEGIN
   ALTER TABLE "_blog_posts_v_blocks_paragraph" ADD CONSTRAINT "_blog_posts_v_blocks_paragraph_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_posts_v_blocks_image" ADD CONSTRAINT "_blog_posts_v_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_posts_v_blocks_image" ADD CONSTRAINT "_blog_posts_v_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_posts_v_blocks_code" ADD CONSTRAINT "_blog_posts_v_blocks_code_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_posts_v_blocks_quote" ADD CONSTRAINT "_blog_posts_v_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_posts_v_version_meta_tags" ADD CONSTRAINT "_blog_posts_v_version_meta_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_parent_id_blog_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_posts_v_locales" ADD CONSTRAINT "_blog_posts_v_locales_version_main_image_id_media_id_fk" FOREIGN KEY ("version_main_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_posts_v_locales" ADD CONSTRAINT "_blog_posts_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_posts_v_locales" ADD CONSTRAINT "_blog_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_posts_v_rels" ADD CONSTRAINT "_blog_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_posts_v_rels" ADD CONSTRAINT "_blog_posts_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_posts_v_rels" ADD CONSTRAINT "_blog_posts_v_rels_experience_posts_fk" FOREIGN KEY ("experience_posts_id") REFERENCES "public"."experience_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_experience_posts_v_blocks_paragraph" ADD CONSTRAINT "_experience_posts_v_blocks_paragraph_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_experience_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_experience_posts_v_blocks_image" ADD CONSTRAINT "_experience_posts_v_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_experience_posts_v_blocks_image" ADD CONSTRAINT "_experience_posts_v_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_experience_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_experience_posts_v_blocks_code" ADD CONSTRAINT "_experience_posts_v_blocks_code_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_experience_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_experience_posts_v_blocks_quote" ADD CONSTRAINT "_experience_posts_v_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_experience_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_experience_posts_v_version_meta_tags" ADD CONSTRAINT "_experience_posts_v_version_meta_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_experience_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_experience_posts_v" ADD CONSTRAINT "_experience_posts_v_parent_id_experience_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."experience_posts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_experience_posts_v" ADD CONSTRAINT "_experience_posts_v_version_experience_id_experiences_id_fk" FOREIGN KEY ("version_experience_id") REFERENCES "public"."experiences"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_experience_posts_v_locales" ADD CONSTRAINT "_experience_posts_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_experience_posts_v_locales" ADD CONSTRAINT "_experience_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_experience_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_experience_posts_v_rels" ADD CONSTRAINT "_experience_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_experience_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_experience_posts_v_rels" ADD CONSTRAINT "_experience_posts_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_blocks_paragraph_order_idx" ON "_blog_posts_v_blocks_paragraph" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_blocks_paragraph_parent_id_idx" ON "_blog_posts_v_blocks_paragraph" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_blocks_paragraph_path_idx" ON "_blog_posts_v_blocks_paragraph" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_blocks_paragraph_locale_idx" ON "_blog_posts_v_blocks_paragraph" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_blocks_image_order_idx" ON "_blog_posts_v_blocks_image" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_blocks_image_parent_id_idx" ON "_blog_posts_v_blocks_image" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_blocks_image_path_idx" ON "_blog_posts_v_blocks_image" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_blocks_image_locale_idx" ON "_blog_posts_v_blocks_image" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_blocks_image_image_idx" ON "_blog_posts_v_blocks_image" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_blocks_code_order_idx" ON "_blog_posts_v_blocks_code" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_blocks_code_parent_id_idx" ON "_blog_posts_v_blocks_code" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_blocks_code_path_idx" ON "_blog_posts_v_blocks_code" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_blocks_code_locale_idx" ON "_blog_posts_v_blocks_code" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_blocks_quote_order_idx" ON "_blog_posts_v_blocks_quote" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_blocks_quote_parent_id_idx" ON "_blog_posts_v_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_blocks_quote_path_idx" ON "_blog_posts_v_blocks_quote" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_blocks_quote_locale_idx" ON "_blog_posts_v_blocks_quote" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_version_meta_tags_order_idx" ON "_blog_posts_v_version_meta_tags" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_version_meta_tags_parent_id_idx" ON "_blog_posts_v_version_meta_tags" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_parent_idx" ON "_blog_posts_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_version_version_updated_at_idx" ON "_blog_posts_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_version_version_created_at_idx" ON "_blog_posts_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_version_version__status_idx" ON "_blog_posts_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_created_at_idx" ON "_blog_posts_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_updated_at_idx" ON "_blog_posts_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_snapshot_idx" ON "_blog_posts_v" USING btree ("snapshot");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_published_locale_idx" ON "_blog_posts_v" USING btree ("published_locale");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_latest_idx" ON "_blog_posts_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_autosave_idx" ON "_blog_posts_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_version_version_main_image_idx" ON "_blog_posts_v_locales" USING btree ("version_main_image_id","_locale");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_version_meta_version_meta_image_idx" ON "_blog_posts_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_rels_order_idx" ON "_blog_posts_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_rels_parent_idx" ON "_blog_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_rels_path_idx" ON "_blog_posts_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_rels_users_id_idx" ON "_blog_posts_v_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_rels_experience_posts_id_idx" ON "_blog_posts_v_rels" USING btree ("experience_posts_id");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_blocks_paragraph_order_idx" ON "_experience_posts_v_blocks_paragraph" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_blocks_paragraph_parent_id_idx" ON "_experience_posts_v_blocks_paragraph" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_blocks_paragraph_path_idx" ON "_experience_posts_v_blocks_paragraph" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_blocks_paragraph_locale_idx" ON "_experience_posts_v_blocks_paragraph" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_blocks_image_order_idx" ON "_experience_posts_v_blocks_image" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_blocks_image_parent_id_idx" ON "_experience_posts_v_blocks_image" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_blocks_image_path_idx" ON "_experience_posts_v_blocks_image" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_blocks_image_locale_idx" ON "_experience_posts_v_blocks_image" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_blocks_image_image_idx" ON "_experience_posts_v_blocks_image" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_blocks_code_order_idx" ON "_experience_posts_v_blocks_code" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_blocks_code_parent_id_idx" ON "_experience_posts_v_blocks_code" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_blocks_code_path_idx" ON "_experience_posts_v_blocks_code" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_blocks_code_locale_idx" ON "_experience_posts_v_blocks_code" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_blocks_quote_order_idx" ON "_experience_posts_v_blocks_quote" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_blocks_quote_parent_id_idx" ON "_experience_posts_v_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_blocks_quote_path_idx" ON "_experience_posts_v_blocks_quote" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_blocks_quote_locale_idx" ON "_experience_posts_v_blocks_quote" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_version_meta_tags_order_idx" ON "_experience_posts_v_version_meta_tags" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_version_meta_tags_parent_id_idx" ON "_experience_posts_v_version_meta_tags" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_parent_idx" ON "_experience_posts_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_version_version_slug_idx" ON "_experience_posts_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_version_version_experience_idx" ON "_experience_posts_v" USING btree ("version_experience_id");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_version_version_updated_at_idx" ON "_experience_posts_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_version_version_created_at_idx" ON "_experience_posts_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_version_version__status_idx" ON "_experience_posts_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_created_at_idx" ON "_experience_posts_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_updated_at_idx" ON "_experience_posts_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_snapshot_idx" ON "_experience_posts_v" USING btree ("snapshot");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_published_locale_idx" ON "_experience_posts_v" USING btree ("published_locale");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_latest_idx" ON "_experience_posts_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_autosave_idx" ON "_experience_posts_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_version_meta_version_meta_image_idx" ON "_experience_posts_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_rels_order_idx" ON "_experience_posts_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_rels_parent_idx" ON "_experience_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_rels_path_idx" ON "_experience_posts_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_rels_users_id_idx" ON "_experience_posts_v_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "blog_posts__status_idx" ON "blog_posts" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "experience_posts__status_idx" ON "experience_posts" USING btree ("_status");`);

  const updatedBlogPosts = await payload.update({
    collection: "blogPosts",
    where: {},
    data: { _status: "published" },
  });

  updatedBlogPosts.docs.map((doc) => {
    console.log(`${doc.title} updated to published`);
  });

  const updatedExperiencePosts = await payload.update({
    collection: "experiencePosts",
    where: {},
    data: { _status: "published" },
  });

  updatedExperiencePosts.docs.map((doc) => {
    console.log(`${doc.title} updated to published`);
  });
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "_blog_posts_v_blocks_paragraph" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_blog_posts_v_blocks_image" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_blog_posts_v_blocks_code" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_blog_posts_v_blocks_quote" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_blog_posts_v_version_meta_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_blog_posts_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_blog_posts_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_blog_posts_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_experience_posts_v_blocks_paragraph" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_experience_posts_v_blocks_image" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_experience_posts_v_blocks_code" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_experience_posts_v_blocks_quote" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_experience_posts_v_version_meta_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_experience_posts_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_experience_posts_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_experience_posts_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_blog_posts_v_blocks_paragraph" CASCADE;
  DROP TABLE "_blog_posts_v_blocks_image" CASCADE;
  DROP TABLE "_blog_posts_v_blocks_code" CASCADE;
  DROP TABLE "_blog_posts_v_blocks_quote" CASCADE;
  DROP TABLE "_blog_posts_v_version_meta_tags" CASCADE;
  DROP TABLE "_blog_posts_v" CASCADE;
  DROP TABLE "_blog_posts_v_locales" CASCADE;
  DROP TABLE "_blog_posts_v_rels" CASCADE;
  DROP TABLE "_experience_posts_v_blocks_paragraph" CASCADE;
  DROP TABLE "_experience_posts_v_blocks_image" CASCADE;
  DROP TABLE "_experience_posts_v_blocks_code" CASCADE;
  DROP TABLE "_experience_posts_v_blocks_quote" CASCADE;
  DROP TABLE "_experience_posts_v_version_meta_tags" CASCADE;
  DROP TABLE "_experience_posts_v" CASCADE;
  DROP TABLE "_experience_posts_v_locales" CASCADE;
  DROP TABLE "_experience_posts_v_rels" CASCADE;
  DROP INDEX IF EXISTS "blog_posts__status_idx";
  DROP INDEX IF EXISTS "experience_posts__status_idx";
  ALTER TABLE "blog_posts_locales" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "blog_posts_locales" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "experience_posts" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "experience_posts" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "experience_posts" ALTER COLUMN "experience_id" SET NOT NULL;
  ALTER TABLE "blog_posts" DROP COLUMN IF EXISTS "_status";
  ALTER TABLE "experience_posts" DROP COLUMN IF EXISTS "_status";
  DROP TYPE "public"."enum_blog_posts_status";
  DROP TYPE "public"."enum__blog_posts_v_version_status";
  DROP TYPE "public"."enum__blog_posts_v_published_locale";
  DROP TYPE "public"."enum_experience_posts_status";
  DROP TYPE "public"."enum__experience_posts_v_version_status";
  DROP TYPE "public"."enum__experience_posts_v_published_locale";`);
}
