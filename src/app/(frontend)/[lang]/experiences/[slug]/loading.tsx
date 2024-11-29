import { FC } from "react";

import { cn } from "@/lib/utils";

const Loading: FC = async () => {
  return (
    <div
      className={cn("hidden h-full w-full items-center justify-center lg:flex")}
    >
      <span className="inline-flex animate-text-gradient bg-linear-to-r from-stone-400 via-metal to-stone-400 bg-[200%_auto] bg-clip-text text-center  text-3xl font-bold text-transparent md:pl-72">
        Loading work...
      </span>
    </div>
  );
};

export default Loading;
