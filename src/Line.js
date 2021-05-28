import { pipeline, PassThrough } from 'stream';
import invariant from 'invariant';
import bug from 'debug';
const debug = bug('line-node');
import cast from './util/cast.js';
import Node from './Node.js';
import Pipe from './Pipe.js';

class Line extends Node {
  constructor(nodeName, childNodes) {
    super(nodeName, childNodes.map(node=>cast(node, Pipe)));
  }
  async value(){
    const self = this;
    return new Promise(async function(resolve, reject) {
        try {
          const streams = await Promise.all( self.children.map(i=>i.value())); // NOTE: this will return promises with dcp.spawn.
          debug(`Executing Line: ${self.children.map(i=>i.name).join(' | ')};`);
          pipeline( ...streams, new PassThrough(), (err) => { if (err) throw err } )
          .on("error", function (error) { reject(`Pipeline failue, ${error.message}`); })
          .once("readable", function () {
            resolve( this.read().toString().replace(/\n$/,'') ) // execa strips its own, but we have to strip it here as well.
          });
        } catch (error) {
          reject(`Pipeline failue, ${error.message}`);
        }
    }) // Promise
  }
}

export default Line;
