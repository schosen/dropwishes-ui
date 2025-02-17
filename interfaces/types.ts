import type { Route as NextRouter } from "next";

export type Route = NextRouter;

export type PathName = Route;

export interface CustomLink {
  label: string;
  href: Route;
  targetBlank?: boolean;
}

export type TwMainColor =
  | "pink"
  | "green"
  | "yellow"
  | "red"
  | "indigo"
  | "blue"
  | "purple"
  | "gray";

//
