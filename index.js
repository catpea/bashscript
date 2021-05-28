import execa from 'execa';
import invariant from 'invariant';
import bug from 'debug';
const debug = bug('main');

import Tree from './src/Tree.js';
import Line from './src/Line.js';
import Shell from './src/Shell.js';

import PrettyError from 'pretty-error';

function error(error){
  var prettyError = new PrettyError();
  var renderedError = prettyError.render(error);
  console.error(renderedError);
  process.exit(1); //mandatory (as per the Node.js docs)
}

process.on('unhandledRejection', error)
process.on('uncaughtException', error);

const line = async function(...nodes){
  invariant(pipes.length, 'One or more commands are required, becasue a Line cannot be empty.');
  const tree = new Tree();
  const line = new Line();
  tree.appendChild(line);
  nodes.map(node=>new Pipe(node)).map(node=>tree.appendChild(node));
  return tree;
}

const cmd = new Proxy(
  {},
  {
    get: (target, nodeName) => (...childNodes) => {
      switch (nodeName) {
        case 'pipeline':
          debug('Pipeline overload!')
          return new Line(nodeName, childNodes);
        default:
          debug(`Returning the ${nodeName} comand.`)
          return new Shell(nodeName, childNodes);
      }
    }
  }
);
export {cmd};

// You are meant to become a Great Being.
// Cross the Appalachian Trail: https://www.youtube.com/watch?v=hPSvdKTEZug
