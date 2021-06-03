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


    for (const node of childNodes) {
      // TODO: fix this via .arg()
      if( (Object.prototype.toString.call(node) === '[object Object]') && (node.constructor.toString() === 'function Object() { [native code] }') ){
        for (const [key, value] of Object.entries(node)) {
          this.appendChild(new Data(`${key}`))
          this.appendChild(new Data(value))
        }
      }else if(typeof node === 'string'){
        this.appendChild(new Data(node))
      }else if(typeof node === 'number'){
        this.appendChild(new Data(node))
      }else{
        this.appendChild(node);
      }
    } // for

    // childNodes
    //   .map(node=>typeof node === 'string'?new Data(node):node) // Cast string to data.
    //   .map(node=>typeof node === 'number'?new Data(node):node) // Cast number to data.
    //   .map(node=>this.appendChild(node)); // Add



   }

  appendChild(node){

    // Integrity check
    const supportedType = ['Data','Shell','Line','Pipe'].includes(identify(node));
    invariant(supportedType, `Unsupported/Unsafe Child Node Type: ${typeof node}`);

    // Set parent
    node.parent = this;

    // Add node to children.
    this.#childNodes.push(node);
  }

  get commandName(){ return this.name; }
  // No setter; read-only property

  get argumentVector(){ return Promise.all( this.children.map(node=>node.value() /* returns a promise */) ); }
  // No setter; read-only property

  get string(){ return new Promise(async (resolve, reject) => { try{ resolve(this.commandName + ' ' + (await this.argumentVector).join(' ')); }catch(error){ reject(error); } }); }
  // No setter; read-only property


  get exe(){ return this.value() }
  // No setter; read-only property

  get children(){return this.#childNodes;}
  // No setter; read-only property

  get name(){return this.#nodeName;}
  set name(name){this.#nodeName = name;}

  get parent(){return this.#parentNode;}
  set parent(node){this.#parentNode = node;}

  get text(){return this.#textContent;}
  set text(text){this.#textContent = text;}

  async value(){
    throw new Error("Each node type must provide its own value method.")
  }

}

export default Node;
