import bug from 'debug';
const debug = bug('main');

class Data {
  #textContent = '';
  constructor(data) {
    this.#textContent = data;
  }
  set text(text){this.#textContent = text;}
  get text(){return this.#textContent;}
  async value(){return this.#textContent;}
}

export default Data;
