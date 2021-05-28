import bug from 'debug';
const debug = bug('tree-node');

import Node from './Node.js';

class Tree extends Node {
  constructor() {
    super()
  }
  async value(){
    // There should be just one node here, but it is OK to violate this rule;
    // FYI: the type of node here is almost certainly Line.
    return await Promise.all(this.children.map(node=>node.value() /* returns a promise */));
  }
}

export default Tree;
