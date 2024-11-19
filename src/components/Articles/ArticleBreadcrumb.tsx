import { FC } from "react";

import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";

type Props = {
  title: string;
  lang: Locale;
  collection: "work" | "blog";
};

const ArticleBreadcrumb: FC<Props> = async (props) => {
  const { title, lang, collection } = props;

  const dictionary = await getDictionary(lang);

  return (
    <Breadcrumb className="mb-5 duration-300 animate-in fade-in">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">{dictionary.firstLevelPages.home}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            {collection === "blog" ? (
              <Link href="/blog">{dictionary.firstLevelPages.blog}</Link>
            ) : (
              <Link href="/works">{dictionary.firstLevelPages.works}</Link>
            )}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default ArticleBreadcrumb;
