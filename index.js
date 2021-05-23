import { spawn } from "child_process";

const load = new Proxy({}, {
    get: function get(target, prop) {
      if (typeof prop == 'string') return (...args) => command(prop, args);
    }
});

function command(name, args){
  const ls = spawn(name, args);
  ls.stdout.on("data", data => {
      console.log(`stdout: ${data}`);
  });
}

const bs = {load};
export default bs;
