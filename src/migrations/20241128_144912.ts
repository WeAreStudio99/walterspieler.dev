import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'fr');
  CREATE TYPE "public"."enum_main_menu_menu_items_type" AS ENUM('home', 'blog', 'lab', 'experiences', 'contact', 'weAreStudio99', 'other');
  CREATE TABLE IF NOT EXISTS "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"full_name" varchar DEFAULT 'Peter Griffin' NOT NULL,
  	"website" varchar,
  	"owner" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "users_locales" (
  	"role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "users_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"_key" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "blog_posts_blocks_paragraph" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"paragraph" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_posts_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_posts_blocks_code" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_posts_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_posts_meta_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "blog_posts_locales" (
  	"slug" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"main_image_id" integer,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "blog_posts_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "blog_posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"experience_posts_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_paragraph" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"paragraph" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_code" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_experience" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_my_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"is_external" boolean DEFAULT false,
  	"page_id" integer,
  	"external_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_meta_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_locales" (
  	"title" varchar NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "pages_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"experience_posts_id" integer,
  	"socials_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "experiences_used_technologies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"technology" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "experiences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"company_name" varchar NOT NULL,
  	"company_logo_id" integer,
  	"company_website" varchar,
  	"start_date" timestamp(3) with time zone DEFAULT '2024-01-01' NOT NULL,
  	"end_date" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "experiences_locales" (
  	"company_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "experiences_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "experience_posts_blocks_paragraph" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"paragraph" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "experience_posts_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "experience_posts_blocks_code" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "experience_posts_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "experience_posts_meta_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "experience_posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"title" varchar DEFAULT 'Untitled' NOT NULL,
  	"description" varchar,
  	"experience_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "experience_posts_locales" (
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "experience_posts_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "experience_posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "socials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"link" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"blog_posts_id" integer,
  	"pages_id" integer,
  	"experiences_id" integer,
  	"experience_posts_id" integer,
  	"socials_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "me" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"full_name" varchar DEFAULT 'Thibault Walterspieler' NOT NULL,
  	"role" varchar DEFAULT 'Software Engineer' NOT NULL,
  	"description" varchar DEFAULT 'I''''m a software engineer' NOT NULL,
  	"email" varchar DEFAULT 'thibs@wearestudio99.fr' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "me_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"socials_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "main_menu_menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_main_menu_menu_items_type" NOT NULL,
  	"external" boolean DEFAULT false NOT NULL,
  	"page_id" integer,
  	"path" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "main_menu_menu_items_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "main_menu_menu_items_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "main_menu" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  DO $$ BEGIN
   ALTER TABLE "users_locales" ADD CONSTRAINT "users_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_posts_blocks_paragraph" ADD CONSTRAINT "blog_posts_blocks_paragraph_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_posts_blocks_image" ADD CONSTRAINT "blog_posts_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_posts_blocks_image" ADD CONSTRAINT "blog_posts_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_posts_blocks_code" ADD CONSTRAINT "blog_posts_blocks_code_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_posts_blocks_quote" ADD CONSTRAINT "blog_posts_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_posts_meta_tags" ADD CONSTRAINT "blog_posts_meta_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_posts_locales" ADD CONSTRAINT "blog_posts_locales_main_image_id_media_id_fk" FOREIGN KEY ("main_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_posts_locales" ADD CONSTRAINT "blog_posts_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_posts_locales" ADD CONSTRAINT "blog_posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_posts_rels" ADD CONSTRAINT "blog_posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_posts_rels" ADD CONSTRAINT "blog_posts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_posts_rels" ADD CONSTRAINT "blog_posts_rels_experience_posts_fk" FOREIGN KEY ("experience_posts_id") REFERENCES "public"."experience_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_paragraph" ADD CONSTRAINT "pages_blocks_paragraph_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_image" ADD CONSTRAINT "pages_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_image" ADD CONSTRAINT "pages_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_code" ADD CONSTRAINT "pages_blocks_code_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_quote" ADD CONSTRAINT "pages_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_experience" ADD CONSTRAINT "pages_blocks_experience_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_my_socials" ADD CONSTRAINT "pages_blocks_my_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_button" ADD CONSTRAINT "pages_blocks_button_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_button" ADD CONSTRAINT "pages_blocks_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_meta_tags" ADD CONSTRAINT "pages_meta_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_experience_posts_fk" FOREIGN KEY ("experience_posts_id") REFERENCES "public"."experience_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_socials_fk" FOREIGN KEY ("socials_id") REFERENCES "public"."socials"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "experiences_used_technologies" ADD CONSTRAINT "experiences_used_technologies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "experiences" ADD CONSTRAINT "experiences_company_logo_id_media_id_fk" FOREIGN KEY ("company_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "experiences_locales" ADD CONSTRAINT "experiences_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "experience_posts_blocks_paragraph" ADD CONSTRAINT "experience_posts_blocks_paragraph_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experience_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "experience_posts_blocks_image" ADD CONSTRAINT "experience_posts_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "experience_posts_blocks_image" ADD CONSTRAINT "experience_posts_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experience_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "experience_posts_blocks_code" ADD CONSTRAINT "experience_posts_blocks_code_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experience_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "experience_posts_blocks_quote" ADD CONSTRAINT "experience_posts_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experience_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "experience_posts_meta_tags" ADD CONSTRAINT "experience_posts_meta_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experience_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "experience_posts" ADD CONSTRAINT "experience_posts_experience_id_experiences_id_fk" FOREIGN KEY ("experience_id") REFERENCES "public"."experiences"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "experience_posts_locales" ADD CONSTRAINT "experience_posts_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "experience_posts_locales" ADD CONSTRAINT "experience_posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experience_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "experience_posts_rels" ADD CONSTRAINT "experience_posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."experience_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "experience_posts_rels" ADD CONSTRAINT "experience_posts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_experiences_fk" FOREIGN KEY ("experiences_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_experience_posts_fk" FOREIGN KEY ("experience_posts_id") REFERENCES "public"."experience_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_socials_fk" FOREIGN KEY ("socials_id") REFERENCES "public"."socials"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "me_rels" ADD CONSTRAINT "me_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."me"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "me_rels" ADD CONSTRAINT "me_rels_socials_fk" FOREIGN KEY ("socials_id") REFERENCES "public"."socials"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "main_menu_menu_items" ADD CONSTRAINT "main_menu_menu_items_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "main_menu_menu_items" ADD CONSTRAINT "main_menu_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."main_menu"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "main_menu_menu_items_locales" ADD CONSTRAINT "main_menu_menu_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."main_menu_menu_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "blog_posts_blocks_paragraph_order_idx" ON "blog_posts_blocks_paragraph" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_posts_blocks_paragraph_parent_id_idx" ON "blog_posts_blocks_paragraph" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_posts_blocks_paragraph_path_idx" ON "blog_posts_blocks_paragraph" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_posts_blocks_paragraph_locale_idx" ON "blog_posts_blocks_paragraph" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "blog_posts_blocks_image_order_idx" ON "blog_posts_blocks_image" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_posts_blocks_image_parent_id_idx" ON "blog_posts_blocks_image" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_posts_blocks_image_path_idx" ON "blog_posts_blocks_image" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_posts_blocks_image_locale_idx" ON "blog_posts_blocks_image" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "blog_posts_blocks_image_image_idx" ON "blog_posts_blocks_image" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "blog_posts_blocks_code_order_idx" ON "blog_posts_blocks_code" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_posts_blocks_code_parent_id_idx" ON "blog_posts_blocks_code" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_posts_blocks_code_path_idx" ON "blog_posts_blocks_code" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_posts_blocks_code_locale_idx" ON "blog_posts_blocks_code" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "blog_posts_blocks_quote_order_idx" ON "blog_posts_blocks_quote" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_posts_blocks_quote_parent_id_idx" ON "blog_posts_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_posts_blocks_quote_path_idx" ON "blog_posts_blocks_quote" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_posts_blocks_quote_locale_idx" ON "blog_posts_blocks_quote" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "blog_posts_meta_tags_order_idx" ON "blog_posts_meta_tags" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_posts_meta_tags_parent_id_idx" ON "blog_posts_meta_tags" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_posts_updated_at_idx" ON "blog_posts" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "blog_posts_created_at_idx" ON "blog_posts" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "blog_posts_main_image_idx" ON "blog_posts_locales" USING btree ("main_image_id","_locale");
  CREATE INDEX IF NOT EXISTS "blog_posts_meta_meta_image_idx" ON "blog_posts_locales" USING btree ("meta_image_id","_locale");
  CREATE INDEX IF NOT EXISTS "blog_posts_rels_order_idx" ON "blog_posts_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "blog_posts_rels_parent_idx" ON "blog_posts_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "blog_posts_rels_path_idx" ON "blog_posts_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "blog_posts_rels_users_id_idx" ON "blog_posts_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "blog_posts_rels_experience_posts_id_idx" ON "blog_posts_rels" USING btree ("experience_posts_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_paragraph_order_idx" ON "pages_blocks_paragraph" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_paragraph_parent_id_idx" ON "pages_blocks_paragraph" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_paragraph_path_idx" ON "pages_blocks_paragraph" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_paragraph_locale_idx" ON "pages_blocks_paragraph" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_order_idx" ON "pages_blocks_image" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_parent_id_idx" ON "pages_blocks_image" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_path_idx" ON "pages_blocks_image" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_locale_idx" ON "pages_blocks_image" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_image_idx" ON "pages_blocks_image" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_code_order_idx" ON "pages_blocks_code" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_code_parent_id_idx" ON "pages_blocks_code" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_code_path_idx" ON "pages_blocks_code" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_code_locale_idx" ON "pages_blocks_code" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_quote_order_idx" ON "pages_blocks_quote" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_quote_parent_id_idx" ON "pages_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_quote_path_idx" ON "pages_blocks_quote" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_quote_locale_idx" ON "pages_blocks_quote" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_experience_order_idx" ON "pages_blocks_experience" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_experience_parent_id_idx" ON "pages_blocks_experience" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_experience_path_idx" ON "pages_blocks_experience" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_experience_locale_idx" ON "pages_blocks_experience" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_my_socials_order_idx" ON "pages_blocks_my_socials" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_my_socials_parent_id_idx" ON "pages_blocks_my_socials" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_my_socials_path_idx" ON "pages_blocks_my_socials" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_my_socials_locale_idx" ON "pages_blocks_my_socials" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_button_order_idx" ON "pages_blocks_button" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_button_parent_id_idx" ON "pages_blocks_button" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_button_path_idx" ON "pages_blocks_button" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_button_locale_idx" ON "pages_blocks_button" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_button_page_idx" ON "pages_blocks_button" USING btree ("page_id");
  CREATE INDEX IF NOT EXISTS "pages_meta_tags_order_idx" ON "pages_meta_tags" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_meta_tags_parent_id_idx" ON "pages_meta_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_title_idx" ON "pages_locales" USING btree ("title","_locale");
  CREATE INDEX IF NOT EXISTS "pages_meta_meta_image_idx" ON "pages_locales" USING btree ("meta_image_id","_locale");
  CREATE INDEX IF NOT EXISTS "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "pages_rels_experience_posts_id_idx" ON "pages_rels" USING btree ("experience_posts_id","locale");
  CREATE INDEX IF NOT EXISTS "pages_rels_socials_id_idx" ON "pages_rels" USING btree ("socials_id","locale");
  CREATE INDEX IF NOT EXISTS "pages_rels_users_id_idx" ON "pages_rels" USING btree ("users_id","locale");
  CREATE INDEX IF NOT EXISTS "pages_rels_locale_idx" ON "pages_rels" USING btree ("locale");
  CREATE INDEX IF NOT EXISTS "experiences_used_technologies_order_idx" ON "experiences_used_technologies" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "experiences_used_technologies_parent_id_idx" ON "experiences_used_technologies" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "experiences_company_name_idx" ON "experiences" USING btree ("company_name");
  CREATE INDEX IF NOT EXISTS "experiences_company_logo_idx" ON "experiences" USING btree ("company_logo_id");
  CREATE INDEX IF NOT EXISTS "experiences_updated_at_idx" ON "experiences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "experiences_created_at_idx" ON "experiences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "experience_posts_blocks_paragraph_order_idx" ON "experience_posts_blocks_paragraph" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "experience_posts_blocks_paragraph_parent_id_idx" ON "experience_posts_blocks_paragraph" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "experience_posts_blocks_paragraph_path_idx" ON "experience_posts_blocks_paragraph" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "experience_posts_blocks_paragraph_locale_idx" ON "experience_posts_blocks_paragraph" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "experience_posts_blocks_image_order_idx" ON "experience_posts_blocks_image" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "experience_posts_blocks_image_parent_id_idx" ON "experience_posts_blocks_image" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "experience_posts_blocks_image_path_idx" ON "experience_posts_blocks_image" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "experience_posts_blocks_image_locale_idx" ON "experience_posts_blocks_image" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "experience_posts_blocks_image_image_idx" ON "experience_posts_blocks_image" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "experience_posts_blocks_code_order_idx" ON "experience_posts_blocks_code" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "experience_posts_blocks_code_parent_id_idx" ON "experience_posts_blocks_code" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "experience_posts_blocks_code_path_idx" ON "experience_posts_blocks_code" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "experience_posts_blocks_code_locale_idx" ON "experience_posts_blocks_code" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "experience_posts_blocks_quote_order_idx" ON "experience_posts_blocks_quote" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "experience_posts_blocks_quote_parent_id_idx" ON "experience_posts_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "experience_posts_blocks_quote_path_idx" ON "experience_posts_blocks_quote" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "experience_posts_blocks_quote_locale_idx" ON "experience_posts_blocks_quote" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "experience_posts_meta_tags_order_idx" ON "experience_posts_meta_tags" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "experience_posts_meta_tags_parent_id_idx" ON "experience_posts_meta_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "experience_posts_slug_idx" ON "experience_posts" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "experience_posts_experience_idx" ON "experience_posts" USING btree ("experience_id");
  CREATE INDEX IF NOT EXISTS "experience_posts_updated_at_idx" ON "experience_posts" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "experience_posts_created_at_idx" ON "experience_posts" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "experience_posts_meta_meta_image_idx" ON "experience_posts_locales" USING btree ("meta_image_id","_locale");
  CREATE INDEX IF NOT EXISTS "experience_posts_rels_order_idx" ON "experience_posts_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "experience_posts_rels_parent_idx" ON "experience_posts_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "experience_posts_rels_path_idx" ON "experience_posts_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "experience_posts_rels_users_id_idx" ON "experience_posts_rels" USING btree ("users_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "socials_name_idx" ON "socials" USING btree ("name");
  CREATE INDEX IF NOT EXISTS "socials_updated_at_idx" ON "socials" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "socials_created_at_idx" ON "socials" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_blog_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_posts_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_experiences_id_idx" ON "payload_locked_documents_rels" USING btree ("experiences_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_experience_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("experience_posts_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_socials_id_idx" ON "payload_locked_documents_rels" USING btree ("socials_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "me_rels_order_idx" ON "me_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "me_rels_parent_idx" ON "me_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "me_rels_path_idx" ON "me_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "me_rels_socials_id_idx" ON "me_rels" USING btree ("socials_id");
  CREATE INDEX IF NOT EXISTS "main_menu_menu_items_order_idx" ON "main_menu_menu_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "main_menu_menu_items_parent_id_idx" ON "main_menu_menu_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "main_menu_menu_items_page_idx" ON "main_menu_menu_items" USING btree ("page_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "main_menu_menu_items_label_idx" ON "main_menu_menu_items_locales" USING btree ("label","_locale");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "users" CASCADE;
  DROP TABLE "users_locales" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "blog_posts_blocks_paragraph" CASCADE;
  DROP TABLE "blog_posts_blocks_image" CASCADE;
  DROP TABLE "blog_posts_blocks_code" CASCADE;
  DROP TABLE "blog_posts_blocks_quote" CASCADE;
  DROP TABLE "blog_posts_meta_tags" CASCADE;
  DROP TABLE "blog_posts" CASCADE;
  DROP TABLE "blog_posts_locales" CASCADE;
  DROP TABLE "blog_posts_rels" CASCADE;
  DROP TABLE "pages_blocks_paragraph" CASCADE;
  DROP TABLE "pages_blocks_image" CASCADE;
  DROP TABLE "pages_blocks_code" CASCADE;
  DROP TABLE "pages_blocks_quote" CASCADE;
  DROP TABLE "pages_blocks_experience" CASCADE;
  DROP TABLE "pages_blocks_my_socials" CASCADE;
  DROP TABLE "pages_blocks_button" CASCADE;
  DROP TABLE "pages_meta_tags" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "experiences_used_technologies" CASCADE;
  DROP TABLE "experiences" CASCADE;
  DROP TABLE "experiences_locales" CASCADE;
  DROP TABLE "experience_posts_blocks_paragraph" CASCADE;
  DROP TABLE "experience_posts_blocks_image" CASCADE;
  DROP TABLE "experience_posts_blocks_code" CASCADE;
  DROP TABLE "experience_posts_blocks_quote" CASCADE;
  DROP TABLE "experience_posts_meta_tags" CASCADE;
  DROP TABLE "experience_posts" CASCADE;
  DROP TABLE "experience_posts_locales" CASCADE;
  DROP TABLE "experience_posts_rels" CASCADE;
  DROP TABLE "socials" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "me" CASCADE;
  DROP TABLE "me_rels" CASCADE;
  DROP TABLE "main_menu_menu_items" CASCADE;
  DROP TABLE "main_menu_menu_items_locales" CASCADE;
  DROP TABLE "main_menu" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_main_menu_menu_items_type";`)
}
