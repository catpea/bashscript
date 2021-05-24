import { pipeline, PassThrough } from 'stream';
import os from 'munchhausen';
function pipe(...commands){ return new Promise(function(resolve, reject){ pipeline(...commands, new PassThrough(), err => {if(err) reject(err)}).once('readable', function(){ resolve(this) }) }); }
async function stringify(...commands){ return (await pipe(...commands)).read().toString(); }
export default Object.assign(function core(...commands){ return stringify(...commands); }, {os, pipe, stringify});
// You are meant to become a Great Being. Cross the Appalachian Trail: https://www.youtube.com/watch?v=hPSvdKTEZug
