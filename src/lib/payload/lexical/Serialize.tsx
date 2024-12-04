import { Fragment, JSX } from "react";

import Image from "next/image";

import { A, H1, H2, H3, H4, LI, P, UL } from "@/components/Common/Typography";
import { Media } from "@payload-types";

import {
  IS_BOLD,
  IS_CODE,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  IS_UNDERLINE,
} from "./nodeFormat";

import type { SerializedListItemNode, SerializedListNode } from "@lexical/list";
import type { SerializedHeadingNode } from "@lexical/rich-text";
import type {
  LinkFields,
  SerializedLinkNode,
  SerializedUploadNode,
} from "@payloadcms/richtext-lexical";
import type {
  SerializedElementNode,
  SerializedLexicalNode,
  SerializedTextNode,
} from "lexical";

interface Props {
  nodes: SerializedLexicalNode[];
}

function escapeHtml(value: string) {
  const string = String(value);
  const matchHtmlRegExp = /["'&<>]/;

  if (!matchHtmlRegExp.test(string)) {
    return string;
  }

  return string.replace(/[&<>"']/g, function (str) {
    switch (str) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return str;
    }
  });
}

export default function SerializeLexical({ nodes }: Props): JSX.Element {
  return (
    <Fragment>
      {nodes?.map((_node, index): JSX.Element | null => {
        if (_node.type === "text") {
          const node = _node as SerializedTextNode;
          let text = (
            <span
              dangerouslySetInnerHTML={{ __html: escapeHtml(node.text) }}
              key={index}
            />
          );
          if (node.format & IS_BOLD) {
            text = <strong key={index}>{text}</strong>;
          }
          if (node.format & IS_ITALIC) {
            text = <em key={index}>{text}</em>;
          }
          if (node.format & IS_STRIKETHROUGH) {
            text = (
              <span key={index} style={{ textDecoration: "line-through" }}>
                {text}
              </span>
            );
          }
          if (node.format & IS_UNDERLINE) {
            text = (
              <span key={index} style={{ textDecoration: "underline" }}>
                {text}
              </span>
            );
          }
          if (node.format & IS_CODE) {
            text = <code key={index}>{text}</code>;
          }
          if (node.format & IS_SUBSCRIPT) {
            text = <sub key={index}>{text}</sub>;
          }
          if (node.format & IS_SUPERSCRIPT) {
            text = <sup key={index}>{text}</sup>;
          }

          return text;
        }

        if (_node == null) {
          return null;
        }

        // NOTE: Hacky fix for
        // https://github.com/facebook/lexical/blob/d10c4e6e55261b2fdd7d1845aed46151d0f06a8c/packages/lexical-list/src/LexicalListItemNode.ts#L133
        // which does not return checked: false (only true - i.e. there is no prop for false)
        const serializedChildrenFn = (
          node: SerializedElementNode,
        ): JSX.Element | null => {
          if (node.children == null) {
            return null;
          } else {
            if (
              node?.type === "list" &&
              (node as SerializedListNode)?.listType === "check"
            ) {
              for (const item of node.children) {
                if ("checked" in item) {
                  if (!item?.checked) {
                    item.checked = false;
                  }
                }
              }
              return SerializeLexical({ nodes: node.children });
            } else {
              return SerializeLexical({ nodes: node.children });
            }
          }
        };

        const serializedChildren =
          "children" in _node
            ? serializedChildrenFn(_node as SerializedElementNode)
            : "";

        switch (_node.type) {
          case "linebreak": {
            return <br key={index} />;
          }
          case "paragraph": {
            return <P key={index}>{serializedChildren}</P>;
          }
          case "heading": {
            const node = _node as SerializedHeadingNode;

            type Heading = Extract<
              keyof JSX.IntrinsicElements,
              "h1" | "h2" | "h3" | "h4" | "h5"
            >;
            const Tag = node?.tag as Heading;

            switch (Tag) {
              case "h1":
                return <H1 key={index}>{serializedChildren}</H1>;
              case "h2":
                return <H2 key={index}>{serializedChildren}</H2>;
              case "h3":
                return <H3 key={index}>{serializedChildren}</H3>;
              case "h4":
                return <H4 key={index}>{serializedChildren}</H4>;
              default:
                break;
            }
          }
          case "label":
            return <P key={index}>{serializedChildren}</P>;

          case "largeBody": {
            return <P key={index}>{serializedChildren}</P>;
          }
          case "list": {
            const node = _node as SerializedListNode;

            type List = Extract<keyof JSX.IntrinsicElements, "ol" | "ul">;
            const Tag = node?.tag as List;

            switch (Tag) {
              case "ul":
                return <UL key={index}>{serializedChildren}</UL>;
              default:
                break;
            }
          }
          case "listitem": {
            const node = _node as SerializedListItemNode;

            if (node?.checked != null) {
              return (
                <LI
                  aria-checked={node.checked ? "true" : "false"}
                  className={`component--list-item-checkbox ${
                    node.checked
                      ? "component--list-item-checkbox-checked"
                      : "component--list-item-checked-unchecked"
                  }`}
                  key={index}
                  role="checkbox"
                  tabIndex={-1}
                >
                  {serializedChildren}
                </LI>
              );
            } else {
              return <LI key={index}>{serializedChildren}</LI>;
            }
          }
          case "quote": {
            // const node = _node as SerializedQuoteNode;

            return <blockquote key={index}>{serializedChildren}</blockquote>;
          }
          case "link": {
            const node = _node as SerializedLinkNode;

            const fields: LinkFields = node.fields;

            if (fields.linkType === "custom") {
              const rel = fields.newTab ? "noopener noreferrer" : undefined;

              return (
                <A
                  href={escapeHtml(fields.url)}
                  key={index}
                  rel={rel}
                  target={fields.newTab ? "_blank" : undefined}
                >
                  {serializedChildren}
                </A>
              );
            } else {
              return <span key={index}>Internal link coming soon</span>;
            }
          }
          case "upload": {
            const node = _node as SerializedUploadNode;
            const value = node.value as Media;

            if (value.mimeType?.includes("image") && value.url) {
              return (
                <div
                  className="bg-chinese-black m-auto my-5 flex w-fit flex-col justify-center shadow-2xl"
                  key={node.id}
                >
                  <Image
                    alt={value.alt}
                    className="rounded-t-lg object-cover lg:max-h-[550px] lg:max-w-full"
                    height={value.height ?? 0}
                    sizes="(max-width: 768px) 90vw, (max-width: 1024px) 688px, 768px"
                    src={value.url}
                    width={value.width ?? 0}
                  />
                  <div className="bg-chinese-black rounded-b px-2 py-1 text-center text-xs text-stone-400 lg:max-w-[900px]">
                    {value.alt}
                  </div>
                </div>
              );
            }
          }

          default:
            return null;
        }
      })}
    </Fragment>
  );
}
