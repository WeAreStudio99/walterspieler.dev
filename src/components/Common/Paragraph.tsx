import { FC } from "react";

type Props = {
  field: string;
};

const ParagraphBlock: FC<Props> = (props) => {
  const { field } = props;

  return (
    <></>
    // <PrismicRichText
    //   components={{
    //     heading1: ({ children }) => <H1>{children}</H1>,
    //     heading2: ({ children }) => <H2>{children}</H2>,
    //     heading3: ({ children }) => <H3>{children}</H3>,
    //     heading4: ({ children }) => <H4>{children}</H4>,
    //     paragraph: ({ children }) => <P>{children}</P>,
    //     list: ({ children }) => <UL className="">{children}</UL>,
    //     preformatted: ({ text }) => (
    //       <SyntaxHighlighter style={nightOwl}>
    //         {text as unknown as string}
    //       </SyntaxHighlighter>
    //     ),
    //     listItem: ({ children }) => <LI>{children}</LI>,
    //     image: ({ node }) => {
    //       return (
    //         <div className="m-auto my-5 flex w-fit flex-col justify-center bg-chinese-black shadow-2xl">
    //           <Image
    //             alt={node.alt || ""}
    //             className="rounded-t-lg object-cover lg:max-h-[550px] lg:max-w-full"
    //             height={node.dimensions.height}
    //             priority={node.copyright?.includes("priority") ? true : false}
    //             sizes="(max-width: 768px) 90vw, (max-width: 1024px) 688px, 768px"
    //             src={node.url}
    //             width={node.dimensions.width}
    //           />
    //           <div className="rounded-b bg-chinese-black px-2 py-1 text-center text-xs text-stone-400 lg:max-w-[900px]">
    //             {node.alt}
    //           </div>
    //         </div>
    //       );
    //     },
    //     hyperlink: ({ text, node }) => {
    //       if (node.data.url === "[copy]") {
    //         return <CopyLink text={text} />;
    //       }

    //       return (
    //         <A href={node.data.url} rel="noopener" target="_blank">
    //           {text}
    //         </A>
    //       );
    //     },
    //   }}
    //   field={field}
    // />
  );
};

export default ParagraphBlock;
