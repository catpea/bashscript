import dcp from "duplex-child-process";
import bug from 'debug';
import invariant from 'invariant';
const debug = bug('pipe-node');
import Node from './Node.js';

class Pipe extends Node {
  #result = null;
  constructor(nodeName, childNodes) {
    invariant(nodeName, `Node name is required. Received ${nodeName}`);
    super(nodeName, childNodes);
  }
  async value(){
    /*
      NOTE:
      This must return dcp.spawn streams.
      There are no subshells here.
      No strings this is the UNIX equvalent of $: (cat package) | (grep name) | ONLY_COMMANDS in between pipes! |
    */
    const self = this;
    return new Promise(async function(resolve, reject) {
      try {
        const resolvedArray = await Promise.all( self.children.map(node=>node.value() /* returns a promise */) );
        debug(`Creating Pipe: ${self.name} ${resolvedArray.join(" ")}`);
        self.#result = dcp.spawn(self.name, resolvedArray); // only commands in a line have a .pipe
        self.#result.on('error', (error) => {throw new Error(`Dcp spawn stream error for ${self.name}(): ${JSON.stringify(error)}`)} ) // TODO: verify behaviour
        resolve(self.#result); // await of node.execute will return the stream created by dcp.spawn
      } catch (error) {
        reject(error);
      }
    }) // Promise
  }

  get result(){return this.#result;}
  // No setter; read-only property

}

export default Pipe;
