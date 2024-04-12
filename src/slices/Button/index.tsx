import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { cva } from "class-variance-authority";
import { CalendarHeart } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

type Props = SliceComponentProps<Content.ButtonSlice>;

const positionVariants = cva("flex my-6", {
  variants: {
    position: {
      center: "justify-center",
      right: "justify-end",
      left: "justify-start",
    },
  },
  defaultVariants: {
    position: "center",
  },
});

const ButtonSlice: FC<Props> = (props) => {
  const { slice } = props;
  const {
    variation,
    primary: { label, link, position },
  } = slice;
  const href = "url" in link ? link.url : "/";

  return (
    <section
      className={cn(positionVariants({ position }))}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Link className={buttonVariants({ variant: variation })} href={`${href}`}>
        {href?.includes("cal.com") && (
          <CalendarHeart className="mr-2 h-4 w-4" />
        )}
        {label}
      </Link>
    </section>
  );
};

export default ButtonSlice;
