import { pipeline } from 'stream';
import childProcess from 'duplex-child-process';
const os = new Proxy({}, { get: function get(target, name) { if (typeof name == 'string') return (...args) => childProcess.spawn(name, args); } });
function pipe(...commands){ return new Promise(function(resolve, reject){ pipeline(...commands, err => {if(err) reject(err)}).once('readable', function(){ resolve(this) }) }); }
async function stringify(...commands){ return (await pipe(...commands)).read().toString(); }
export default function core(...commands){ return stringify(...commands); }
Object.assign(core, {os, pipe, stringify});
// You are meant to become a Great Being. Cross the Appalachian Trail: https://www.youtube.com/watch?v=hPSvdKTEZug
