import { spawn } from "child_process";

const os = new Proxy({}, {
    get: function get(target, prop) {
      if (typeof prop == 'string') return (...args) => command(prop, args);
    }
});

function command(name, args){
  const ls = spawn(name, args);
  ls.stdout.on("data", data => {
      console.log(data);
  });
}

const bs = {os};
export default bs;
