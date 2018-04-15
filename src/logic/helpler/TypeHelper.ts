export type DiffKey<T extends string, U extends string> = ({ [P in T]: P } &
  { [P in U]: never } & { [x: string]: never })[T];

export type Omit<T, K extends keyof T> = Pick<T, DiffKey<keyof T, K>>;
