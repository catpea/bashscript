import bug from 'debug';
const debug = bug('util/identify');

import Tree from './../Tree.js';
import Data from './../Data.js';
import Shell from './../Shell.js';
import Line from './../Line.js';
import Pipe from './../Pipe.js';
import Util from './../Util.js';
import Node from './../Node.js';

export default function(node){

  debug(node);
  debug(node instanceof Util);

  let identification = false;

  if(node instanceof Tree){
    identification = 'Tree';
  } else if(node instanceof Data){
    identification = 'Data';
  } else if(node instanceof Shell){
    identification = 'Shell';
  } else if(node instanceof Line){
    identification = 'Line';
  } else if(node instanceof Pipe){
    identification = 'Pipe';
  } else if(node instanceof Util){
    identification = 'Util';
  } else if(typeof node === 'string'){
    identification = 'string';
  } else if(typeof node === 'number'){
    identification = 'number';
  }

  return identification;
}
