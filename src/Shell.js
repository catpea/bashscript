import execa from 'execa';
import invariant from 'invariant';
import bug from 'debug';
const debug = bug('shell-node');
import Node from './Node.js';

class Shell extends Node {

  #result = null;

  constructor(nodeName, childNodes) {
    invariant(nodeName, 'Node name is required')
    super(nodeName, childNodes);
  }

  async value(){
    if(this.#result) return this.#result.stdout;
    try {
      const commandName = this.name;
      invariant(commandName, 'Command name is required')
      // this.#result = await execa(this.commandName, await this.argumentVector);
      const argumentVector = await Promise.all( this.children.map(node=>node.value() /* returns a promise */) );
      debug(`Executing Command: ${commandName} ${argumentVector.join(" ")};`);
      this.#result = await execa(commandName, argumentVector);
      return this.#result.stdout; // execa stripFinalNewline by default
    } catch (error) {
      throw error;
    }
  }

  get result(){return this.#result;}
  // No setter; read-only property

}

export default Shell;
