import { reduce } from "lodash";

export type Path = string | Array<Path>;

export namespace Path {
  export function rend(...a: Array<Path>): Array<string> {
    return reduce(a, (b, c) => {
      if (typeof c === "string") return [...b, ...c.split("/")];
      else                       return [...b, ...rend( ...c )];
    }, new Array());
  }

  export function mend(...a: Array<Path>): string {
    return rend(...a).join("/");
  }
}

export default Path;