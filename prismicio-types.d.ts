// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismic from '@prismicio/client';

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

type HomeDocumentDataSlicesSlice = ParagraphSlice;

/**
 * Content for Home documents
 */
interface HomeDocumentData {
  /**
   * Slice Zone field in *Home*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: home.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<HomeDocumentDataSlicesSlice> /**
   * Meta Description field in *Home*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: home.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Home*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: home.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;

  /**
   * Meta Title field in *Home*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: home.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_title: prismic.KeyTextField;
}

/**
 * Home document from Prismic
 *
 * - **API ID**: `home`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomeDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<Simplify<HomeDocumentData>, 'home', Lang>;

type NavigationDocumentDataSlicesSlice = NavigationItemSlice;

/**
 * Content for Navigation documents
 */
interface NavigationDocumentData {
  /**
   * Name field in *Navigation*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: navigation.name
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  name: prismic.KeyTextField;

  /**
   * Slice Zone field in *Navigation*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: navigation.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<NavigationDocumentDataSlicesSlice>;
}

/**
 * Navigation document from Prismic
 *
 * - **API ID**: `navigation`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type NavigationDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<
    Simplify<NavigationDocumentData>,
    'navigation',
    Lang
  >;

type WorksDocumentDataSlicesSlice = ParagraphSlice;

/**
 * Content for Works documents
 */
interface WorksDocumentData {
  /**
   * Slice Zone field in *Works*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: works.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<WorksDocumentDataSlicesSlice> /**
   * Meta Description field in *Works*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: works.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Works*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: works.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;

  /**
   * Meta Title field in *Works*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: works.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_title: prismic.KeyTextField;
}

/**
 * Works document from Prismic
 *
 * - **API ID**: `works`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type WorksDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<Simplify<WorksDocumentData>, 'works', Lang>;

export type AllDocumentTypes =
  | HomeDocument
  | NavigationDocument
  | WorksDocument;

/**
 * Primary content in *NavigationItem → Primary*
 */
export interface NavigationItemSliceDefaultPrimary {
  /**
   * Name field in *NavigationItem → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: navigation_item.primary.name
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  name: prismic.KeyTextField;

  /**
   * Link field in *NavigationItem → Primary*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: navigation_item.primary.link
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  link: prismic.LinkField;
}

/**
 * Primary content in *NavigationItem → Items*
 */
export interface NavigationItemSliceDefaultItem {
  /**
   * Child Name field in *NavigationItem → Items*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: navigation_item.items[].child_name
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  child_name: prismic.KeyTextField;

  /**
   * Child link field in *NavigationItem → Items*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: navigation_item.items[].child_link
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  child_link: prismic.LinkField;
}

/**
 * Default variation for NavigationItem Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type NavigationItemSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<NavigationItemSliceDefaultPrimary>,
  Simplify<NavigationItemSliceDefaultItem>
>;

/**
 * Slice variation for *NavigationItem*
 */
type NavigationItemSliceVariation = NavigationItemSliceDefault;

/**
 * NavigationItem Shared Slice
 *
 * - **API ID**: `navigation_item`
 * - **Description**: NavigationItem
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type NavigationItemSlice = prismic.SharedSlice<
  'navigation_item',
  NavigationItemSliceVariation
>;

/**
 * Primary content in *Paragraph → Primary*
 */
export interface ParagraphSliceDefaultPrimary {
  /**
   * text field in *Paragraph → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: paragraph.primary.text
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  text: prismic.RichTextField;
}

/**
 * Default variation for Paragraph Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ParagraphSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<ParagraphSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *Paragraph*
 */
type ParagraphSliceVariation = ParagraphSliceDefault;

/**
 * Paragraph Shared Slice
 *
 * - **API ID**: `paragraph`
 * - **Description**: Paragraph
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ParagraphSlice = prismic.SharedSlice<
  'paragraph',
  ParagraphSliceVariation
>;

declare module '@prismicio/client' {
  interface CreateClient {
    (
      repositoryNameOrEndpoint: string,
      options?: prismic.ClientConfig
    ): prismic.Client<AllDocumentTypes>;
  }

  namespace Content {
    export type {
      HomeDocument,
      HomeDocumentData,
      HomeDocumentDataSlicesSlice,
      NavigationDocument,
      NavigationDocumentData,
      NavigationDocumentDataSlicesSlice,
      WorksDocument,
      WorksDocumentData,
      WorksDocumentDataSlicesSlice,
      AllDocumentTypes,
      NavigationItemSlice,
      NavigationItemSliceDefaultPrimary,
      NavigationItemSliceDefaultItem,
      NavigationItemSliceVariation,
      NavigationItemSliceDefault,
      ParagraphSlice,
      ParagraphSliceDefaultPrimary,
      ParagraphSliceVariation,
      ParagraphSliceDefault,
    };
  }
}
