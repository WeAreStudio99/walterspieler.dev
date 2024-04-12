import Link from "next/link";
import { FC } from "react";

import { Button } from "@/components/ui/button";

type Props = {
  label?: string;
  button: {
    label: string;
    path: string;
  };
};

const Error404: FC<Props> = (props) => {
  const { label, button } = props;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center text-white">
      <h2 className="text-9xl font-bold">404</h2>
      <p className="mt-5 text-2xl font-bold">
        {label || "You're lost in the void friend!"}
      </p>
      <Button asChild className="mt-5" variant="secondary">
        <Link href={button.path || "/"}>{button.label}</Link>
      </Button>
    </div>
  );
};

export default Error404;
