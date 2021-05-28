import bug from 'debug';
const debug = bug('node-node');
import invariant from 'invariant';
import Util from './Util.js';
import Data from './Data.js';
import identify from './util/identify.js';

class Node extends Util {
  #nodeName = "";
  #childNodes = [];
  #parentNode = null;
  #textContent = null;

  constructor(nodeName, childNodes) {
    super()
    this.name = nodeName;
    childNodes
      .map(node=>typeof node === 'string'?new Data(node):node) // Cast string to data.
      .map(node=>typeof node === 'number'?new Data(node):node) // Cast number to data.
      .map(node=>this.appendChild(node)); // Add
   }

  appendChild(node){

    // Integrity check
    const supportedType = ['Data','Shell','Line','Pipe'].includes(identify(node));
    invariant(supportedType, `Unsupported/Unsafe Child Node Type: ${typeof node}`);

    // Set parent
    this.#parentNode = this;

    // Add node to children.
    this.#childNodes.push(node);
  }

  get children(){return this.#childNodes;}
  // No setter; read-only property

  get name(){return this.#nodeName;}
  set name(name){this.#nodeName = name;}

  get parent(){return this.#parentNode;}
  // No setter; read-only property

  get text(){return this.#textContent;}
  set text(text){this.#textContent = text;}

  async value(){
    throw new Error("Each node type must provide its own value method.")
  }

}

export default Node;
