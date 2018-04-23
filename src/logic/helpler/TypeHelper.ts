import { isArray } from "util";

export type DiffKey<T extends string, U extends string> = ({ [P in T]: P } &
  { [P in U]: never } & { [x: string]: never })[T];

export type Omit<T, K extends keyof T> = Pick<T, DiffKey<keyof T, K>>;

export function isReactElement(target: any): target is React.ReactElement<any> {
  return target != null && (target as any).props != null;
}

export type ReactElementType<T> =
  | string
  | number
  | true
  | {}
  | React.ReactElement<T>
  | Array<string | number | boolean | any[] | React.ReactElement<T>>
  | React.ReactPortal;
