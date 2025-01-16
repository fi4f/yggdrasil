import Node     from "./node";
import Path     from "./path";
import Action   from "./action";
import Listener from "./listener";

import { forEach } from "lodash";

export function Tree(): Tree {
  return { 
    root : Node(),
    queue: new Array()
  }
}

export interface Tree {
  root : Node
  queue: Array<Action>
}

export namespace Tree {
  export function attach<T>(tree: Tree, type  : string, listener  : Listener<T>, o ?: { path ?: string, defer ?: boolean }) {
    const a: Action.Attach = { action: Action.ATTACH, tree, type, listener, path: o?.path ?? "" };    
    if(o?.defer ?? true) queue(tree, a);
    else                 flush(tree, a);
  }

  export function detach<T>(tree: Tree, type ?: string, listener ?: Listener<T>, o ?: { path ?: string, defer ?: boolean }) {
    const a: Action.Detach = { action: Action.DETACH, tree, type, listener, path: o?.path ?? "" };    
    if(o?.defer ?? true) queue(tree, a);
    else                 flush(tree, a);
  }

  export function dispatch<T>(tree: Tree, type: string, event: T, o ?: { path ?: string, defer ?: boolean }) {
    const a: Action.Dispatch = { action: Action.DISPATCH, tree, type, event, path: o?.path ?? "" };    
    if(o?.defer ?? true) queue(tree, a);
    else                 flush(tree, a);
  }

  export function poll(tree: Tree) {
    forEach(tree.queue.splice(0, tree.queue.length), action => flush(tree, action));
  }

  function queue(tree: Tree, a: Action) {
    tree.queue.push(a);
  }

  function flush(tree: Tree, a: Action) {
    switch(a.action) {
      case Action.ATTACH  : onAttach  (tree, a); break;
      case Action.DETACH  : onDetach  (tree, a); break;
      case Action.DISPATCH: onDispatch(tree, a); break;
    }
  }

  function onAttach  (tree: Tree, a: Action.Attach  ) {
    requireListeners(tree, a.type, a.path).add(a.listener);
  }

  function onDetach  (tree: Tree, a: Action.Detach  ) {
         if( a.type &&  a.listener) requestListeners(tree, a.type, a.path)?.delete(a.listener);
    else if( a.type && !a.listener) requestListeners(tree, a.type, a.path)?.clear();
    else if(!a.type && !a.listener) requestNode(tree, a.path)?.listeners.clear();
    else if(!a.type &&  a.listener) requestNode(tree, a.path)?.listeners.forEach(
      (listeners) => listeners.delete(a.listener!)
    )
  }

  function onDispatch(tree: Tree, a: Action.Dispatch) {
    onDispatchRecursive(a.event, requestNode(tree, a.path), tree, a.type, a.path);
  }

  function onDispatchRecursive(event: any, node: Node | null, tree: Tree, type: string, path: string) {
    if(!node) return
    node.listeners.get(type)?.forEach(self => {
      self(event, { self, tree, type, path })
    })
    node.children.forEach((node, id) => {
      onDispatchRecursive(event, node, tree, type, Path.mend(path, id));
    })
  }

  export function requestNode(tree: Tree, ...path: Array<Path>) {
    return Node.requestNode(tree.root, ...path);
  }

  export function requireNode(tree: Tree, ...path: Array<Path>) {
    return Node.requireNode(tree.root, ...path);
  }

  export function requestListeners(tree: Tree, type: string, ...path: Array<Path>) {
    return Node.requestListeners(Node.requestNode(tree.root, ...path), type);
  }

  export function requireListeners(tree: Tree, type: string, ...path: Array<Path>) {
    return Node.requireListeners(Node.requireNode(tree.root, ...path), type);
  }
}

export default Tree;