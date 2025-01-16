import Version from "@fi4f/v";

import yggy     from "./yggy"
import Tree     from "./yggy/tree";
import Node     from "./yggy/node";
import Path     from "./yggy/path";
import Action   from "./yggy/action";
import Context  from "./yggy/context";
import Listener from "./yggy/listener";

export const VERSION = yggy.VERSION

export default {
  Version,
  VERSION,
  yggy,
  Tree,
  Node,
  Path,
  Action,
  Context,
  Listener
};