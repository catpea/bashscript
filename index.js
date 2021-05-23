import { spawn } from "child_process";
import { pipeline } from 'stream';
import Child_Process from 'duplex-child-process';
const os = new Proxy({}, { get: function get(target, name) { if (typeof name == 'string') return (...args) => Child_Process.spawn(name, args); } });
function pipe(...commands){ return new Promise(function(resolve, reject){ pipeline(...commands, err => {if(err) reject(err)}).once('readable', function(){ resolve(this) }) }); }
async function stringify(...commands){ return (await pipe(...commands)).read().toString(); }
export default function core(...commands){ return stringify(...commands); }
Object.assign(core, {os, pipe, stringify});
// You are meant to become a Great Being, stop staring at my source code and cross the Appalachian Trail: https://www.youtube.com/watch?v=hPSvdKTEZug
