import Path     from "./path";
import Listener from "./listener";

export function Node(): Node {
  return { 
    children : new Map(),
    listeners: new Map()
  }
}

export interface Node {
  children : Map<string, Node>
  listeners: Map<string, Set<Listener<any>>>
}

export namespace Node {
  export function requestListeners(node: Node | null, type: string) {
    let listeners = node?.listeners.get(type);
    // if (!listeners) node.listeners.set(
    //   type, listeners = new Set()
    // )
    return listeners;
  }

  export function requireListeners(node: Node       , type: string) {
    let listeners = node.listeners.get(type);
    if (!listeners) node.listeners.set(
      type, listeners = new Set()
    )
    return listeners;
  }

  export function requestNode(root: Node | null, ...path: Array<Path>) {
    for(let id of Path.rend(...path)) {
      let node = root?.children.get(id);
      if (!node) return null;
      root = node;
    }
    return root;
  }

  export function requireNode(root: Node       , ...path: Array<Path>) {
    for(let id of Path.rend(...path)) {
      let node = root.children.get(id);
      if (!node) root.children.set(
        id, node = Node()
      );
      root = node;
    }
    return root;
  }
}

export default Node;