"use client";

import Link from "next/link";
import { FC, use } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MenuContext } from "@/contexts/MenuContext";

type Props = {
  title: string;
  labels: {
    legalNotice: string;
  };
};

const MiscMenu: FC<Props> = (props) => {
  const { title, labels } = props;

  const { closeMainMenu: closeMenu } = use(MenuContext) ?? {};

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{title}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>
          Thibault Walterspieler - {new Date().getFullYear()}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild onClick={closeMenu}>
            <Link href="/legal/notice">{labels.legalNotice}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild onClick={closeMenu}>
            <Link href="/open-source">Open source</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MiscMenu;
