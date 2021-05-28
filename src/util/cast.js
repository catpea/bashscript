import bug from 'debug';
const debug = bug('cast');
export default function(node, Type){
  debug(node, node.name, node.children);
  return new Type(node.name, node.children)
}
