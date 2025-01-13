import Listener from "./listener";
import Tree     from "./tree";
import Node     from "./node";

export interface Context<T> {
  readonly self: Listener<T>
  readonly tree: Tree
  readonly type: string
  readonly path: string
}

export namespace Context {
  export function tuple(context: Context<any>, defer ?: boolean) {
    return [ 
      context.tree,
      context.type,
      context.self,
      { path: context.path, defer } 
    ] as const;
  }
}

export default Context;