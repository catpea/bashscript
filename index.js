import identify from './src/util/identify.js';
import Line from './src/Line.js';
import Shell from './src/Shell.js';
async function exe(o){ return await o.value(); }
async function pipeline(...childNodes){ return await new Line('pipeline', childNodes); }
const cmd = new Proxy({},{get: (target, nodeName) => (...childNodes) => nodeName==='pipeline'?new Line(nodeName, childNodes):new Shell(nodeName, childNodes)});
export { exe, cmd, pipeline };
// You are meant to become a Great Being.
// Cross the Appalachian Trail: https://www.youtube.com/watch?v=hPSvdKTEZug
