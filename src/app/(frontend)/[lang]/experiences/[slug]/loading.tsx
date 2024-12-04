import { FC } from "react";

import { cn } from "@/lib/utils";

const Loading: FC = async () => {
  return (
    <div
      className={cn("hidden h-full w-full items-center justify-center lg:flex")}
    >
      <span className="animate-text-gradient via-metal inline-flex bg-linear-to-r from-stone-400 to-stone-400 bg-[200%_auto] bg-clip-text text-center text-3xl font-bold text-transparent md:pl-72">
        Loading experience...
      </span>
    </div>
  );
};

export default Loading;
