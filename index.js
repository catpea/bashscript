import { spawn } from "child_process";
import { pipeline } from 'stream/promises';
import Child_Process from 'duplex-child-process';
const os = new Proxy({}, {
  get: function get(target, name) {
    if (typeof name == 'string') return (...args) => Child_Process.spawn(name, args);
  }
});
export default {os, pipe};

function pipe(...bork){
  return new Promise(function(resolve, reject){

    pipeline(...bork, (err) => {if(err) reject(err)})
    .once('readable', function(){
      const result = this.read().toString()
      resolve(result);
    })

  });
}
