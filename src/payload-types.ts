/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    users: User;
    pages: Page;
    blogPosts: BlogPost;
    experiencePosts: ExperiencePost;
    experiences: Experience;
    socials: Social;
    media: Media;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {
    experiences: {
      relatedExperiencePosts: 'experiencePosts';
    };
  };
  collectionsSelect: {
    users: UsersSelect<false> | UsersSelect<true>;
    pages: PagesSelect<false> | PagesSelect<true>;
    blogPosts: BlogPostsSelect<false> | BlogPostsSelect<true>;
    experiencePosts: ExperiencePostsSelect<false> | ExperiencePostsSelect<true>;
    experiences: ExperiencesSelect<false> | ExperiencesSelect<true>;
    socials: SocialsSelect<false> | SocialsSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: number;
  };
  globals: {
    me: Me;
    mainMenu: MainMenu;
  };
  globalsSelect: {
    me: MeSelect<false> | MeSelect<true>;
    mainMenu: MainMenuSelect<false> | MainMenuSelect<true>;
  };
  locale: 'en' | 'fr';
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  fullName: string;
  role?: string | null;
  website?: string | null;
  owner?: boolean | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: number;
  title: string;
  slug: string;
  content?:
    | (
        | {
            paragraph?: {
              root: {
                type: string;
                children: {
                  type: string;
                  version: number;
                  [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
              };
              [k: string]: unknown;
            } | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'Paragraph';
          }
        | {
            image?: (number | null) | Media;
            id?: string | null;
            blockName?: string | null;
            blockType: 'Image';
          }
        | {
            code?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'Code';
          }
        | {
            quote?: {
              root: {
                type: string;
                children: {
                  type: string;
                  version: number;
                  [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
              };
              [k: string]: unknown;
            } | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'Quote';
          }
        | {
            experiencePost?: (number | ExperiencePost)[] | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'Experience';
          }
        | {
            socials?: (number | Social)[] | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'MySocials';
          }
        | {
            label?: string | null;
            isExternal?: boolean | null;
            page?: (number | null) | Page;
            externalUrl?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'button';
          }
      )[]
    | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: (number | null) | Media;
    tags?:
      | {
          tag?: string | null;
          id?: string | null;
        }[]
      | null;
    authors?:
      | {
          relationTo: 'users';
          value: number | User;
        }[]
      | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number;
  alt: string;
  _key?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "experiencePosts".
 */
export interface ExperiencePost {
  id: number;
  slug: string;
  title: string;
  description?: string | null;
  experience: number | Experience;
  content?:
    | (
        | {
            paragraph?: {
              root: {
                type: string;
                children: {
                  type: string;
                  version: number;
                  [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
              };
              [k: string]: unknown;
            } | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'Paragraph';
          }
        | {
            image?: (number | null) | Media;
            id?: string | null;
            blockName?: string | null;
            blockType: 'Image';
          }
        | {
            code?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'Code';
          }
        | {
            quote?: {
              root: {
                type: string;
                children: {
                  type: string;
                  version: number;
                  [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
              };
              [k: string]: unknown;
            } | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'Quote';
          }
      )[]
    | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: (number | null) | Media;
    tags?:
      | {
          tag?: string | null;
          id?: string | null;
        }[]
      | null;
    authors?:
      | {
          relationTo: 'users';
          value: number | User;
        }[]
      | null;
  };
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "experiences".
 */
export interface Experience {
  id: number;
  companyName: string;
  companyLogo?: (number | null) | Media;
  companyDescription?: string | null;
  companyWebsite?: string | null;
  startDate: string;
  endDate?: string | null;
  usedTechnologies?:
    | {
        technology?: string | null;
        id?: string | null;
      }[]
    | null;
  relatedExperiencePosts?: {
    docs?: (number | ExperiencePost)[] | null;
    hasNextPage?: boolean | null;
  } | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "socials".
 */
export interface Social {
  id: number;
  name: string;
  link: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "blogPosts".
 */
export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  description?: string | null;
  authors?: (number | User)[] | null;
  mainImage?: (number | null) | Media;
  content?:
    | (
        | {
            paragraph?: {
              root: {
                type: string;
                children: {
                  type: string;
                  version: number;
                  [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
              };
              [k: string]: unknown;
            } | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'Paragraph';
          }
        | {
            image?: (number | null) | Media;
            id?: string | null;
            blockName?: string | null;
            blockType: 'Image';
          }
        | {
            code?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'Code';
          }
        | {
            quote?: {
              root: {
                type: string;
                children: {
                  type: string;
                  version: number;
                  [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
              };
              [k: string]: unknown;
            } | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'Quote';
          }
      )[]
    | null;
  relatedExperiencePosts?: (number | ExperiencePost)[] | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: (number | null) | Media;
    tags?:
      | {
          tag?: string | null;
          id?: string | null;
        }[]
      | null;
    authors?:
      | {
          relationTo: 'users';
          value: number | User;
        }[]
      | null;
  };
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: number;
  document?:
    | ({
        relationTo: 'users';
        value: number | User;
      } | null)
    | ({
        relationTo: 'pages';
        value: number | Page;
      } | null)
    | ({
        relationTo: 'blogPosts';
        value: number | BlogPost;
      } | null)
    | ({
        relationTo: 'experiencePosts';
        value: number | ExperiencePost;
      } | null)
    | ({
        relationTo: 'experiences';
        value: number | Experience;
      } | null)
    | ({
        relationTo: 'socials';
        value: number | Social;
      } | null)
    | ({
        relationTo: 'media';
        value: number | Media;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  fullName?: T;
  role?: T;
  website?: T;
  owner?: T;
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages_select".
 */
export interface PagesSelect<T extends boolean = true> {
  title?: T;
  slug?: T;
  content?:
    | T
    | {
        Paragraph?:
          | T
          | {
              paragraph?: T;
              id?: T;
              blockName?: T;
            };
        Image?:
          | T
          | {
              image?: T;
              id?: T;
              blockName?: T;
            };
        Code?:
          | T
          | {
              code?: T;
              id?: T;
              blockName?: T;
            };
        Quote?:
          | T
          | {
              quote?: T;
              id?: T;
              blockName?: T;
            };
        Experience?:
          | T
          | {
              experiencePost?: T;
              id?: T;
              blockName?: T;
            };
        MySocials?:
          | T
          | {
              socials?: T;
              id?: T;
              blockName?: T;
            };
        button?:
          | T
          | {
              label?: T;
              isExternal?: T;
              page?: T;
              externalUrl?: T;
              id?: T;
              blockName?: T;
            };
      };
  meta?:
    | T
    | {
        title?: T;
        description?: T;
        image?: T;
        tags?:
          | T
          | {
              tag?: T;
              id?: T;
            };
        authors?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "blogPosts_select".
 */
export interface BlogPostsSelect<T extends boolean = true> {
  slug?: T;
  title?: T;
  description?: T;
  authors?: T;
  mainImage?: T;
  content?:
    | T
    | {
        Paragraph?:
          | T
          | {
              paragraph?: T;
              id?: T;
              blockName?: T;
            };
        Image?:
          | T
          | {
              image?: T;
              id?: T;
              blockName?: T;
            };
        Code?:
          | T
          | {
              code?: T;
              id?: T;
              blockName?: T;
            };
        Quote?:
          | T
          | {
              quote?: T;
              id?: T;
              blockName?: T;
            };
      };
  relatedExperiencePosts?: T;
  meta?:
    | T
    | {
        title?: T;
        description?: T;
        image?: T;
        tags?:
          | T
          | {
              tag?: T;
              id?: T;
            };
        authors?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "experiencePosts_select".
 */
export interface ExperiencePostsSelect<T extends boolean = true> {
  slug?: T;
  title?: T;
  description?: T;
  experience?: T;
  content?:
    | T
    | {
        Paragraph?:
          | T
          | {
              paragraph?: T;
              id?: T;
              blockName?: T;
            };
        Image?:
          | T
          | {
              image?: T;
              id?: T;
              blockName?: T;
            };
        Code?:
          | T
          | {
              code?: T;
              id?: T;
              blockName?: T;
            };
        Quote?:
          | T
          | {
              quote?: T;
              id?: T;
              blockName?: T;
            };
      };
  meta?:
    | T
    | {
        title?: T;
        description?: T;
        image?: T;
        tags?:
          | T
          | {
              tag?: T;
              id?: T;
            };
        authors?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "experiences_select".
 */
export interface ExperiencesSelect<T extends boolean = true> {
  companyName?: T;
  companyLogo?: T;
  companyDescription?: T;
  companyWebsite?: T;
  startDate?: T;
  endDate?: T;
  usedTechnologies?:
    | T
    | {
        technology?: T;
        id?: T;
      };
  relatedExperiencePosts?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "socials_select".
 */
export interface SocialsSelect<T extends boolean = true> {
  name?: T;
  link?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  _key?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "me".
 */
export interface Me {
  id: number;
  fullName: string;
  role: string;
  description: string;
  email: string;
  socials?: (number | Social)[] | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "mainMenu".
 */
export interface MainMenu {
  id: number;
  menuItems?:
    | {
        label: string;
        type: 'home' | 'blog' | 'lab' | 'experiences' | 'contact' | '99Stud' | 'other';
        external: boolean;
        page?: (number | null) | Page;
        path?: string | null;
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "me_select".
 */
export interface MeSelect<T extends boolean = true> {
  fullName?: T;
  role?: T;
  description?: T;
  email?: T;
  socials?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "mainMenu_select".
 */
export interface MainMenuSelect<T extends boolean = true> {
  menuItems?:
    | T
    | {
        label?: T;
        type?: T;
        external?: T;
        page?: T;
        path?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}