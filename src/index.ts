import Version from "@fi4f/v";

import Tree     from "./yggy/tree";
import Node     from "./yggy/node";
import Path     from "./yggy/path";
import Action   from "./yggy/action";
import Context  from "./yggy/context";
import Listener from "./yggy/listener";

export const VERSION = Version({
  moniker: "yggy",
  major  : 0,
  minor  : 0,
  patch  : 4
})

export default {
  Version,
  VERSION,
  Tree,
  Node,
  Path,
  Action,
  Context,
  Listener
};