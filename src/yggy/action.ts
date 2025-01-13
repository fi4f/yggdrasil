import Listener from "./listener";
import Tree from "./tree";

export type Action = Action.Attach | Action.Detach | Action.Dispatch;

export namespace Action {
  export const ATTACH   = "__attach__";
  export const DETACH   = "__detach__";
  export const DISPATCH = "__dispatch__";

  export interface Attach   { action: typeof Action.ATTACH  , tree: Tree, type  : string, listener  : Listener<any>, path: string}
  export interface Detach   { action: typeof Action.DETACH  , tree: Tree, type ?: string, listener ?: Listener<any>, path: string}
  export interface Dispatch { action: typeof Action.DISPATCH, tree: Tree, type  : string, event: any, path: string}
}

export default Action;


