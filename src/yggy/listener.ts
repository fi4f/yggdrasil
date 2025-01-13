import Context from "./context";
import Tree from "./tree";

export type Listener<T> = (event: T, context: Context<T>) => void;

export namespace Listener {  
  export function only<T>(listener: Listener<T>, count=1) {
    return (event: T, context: Context<T>) => {
      count -=1;
      if(count >= 0) listener(event, context);
      if(count <= 0) Tree.detach(...Context.tuple(context));
    }
  }

  export function once<T>(listener: Listener<T>) {
    return Listener.only(listener, 1)
  }
}

export default Listener;