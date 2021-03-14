export class Output {

  private _lastBemIt: BemIt;

  constructor(lastBemIt: BemIt) {
    this._lastBemIt = lastBemIt;
  }

  get out(): string {
    return this._lastBemIt.out;
  }

  get and(): BemIt {
    return new BemIt(this._lastBemIt);
  }
}

export default class BemIt {

  private _block: string = '';
  private _lastBlockObj: BemIt | null = null;
  private _fullBem: string = '';

  constructor(block: string | BemIt) {
    if (typeof block === 'string') {
      this._block = block;
      this._fullBem = block;
    } else {
      this._lastBlockObj = block;
      this._fullBem = block.blockString;
    }
  }

  get blockString(): string {
    if (this._block) {
      return this._block;
    }
    return this._lastBlockObj?.blockString || '';
  }

  get peek(): string {
    return this._fullBem;
  }

  get out(): string {
    const ret = this._block
      ? this._fullBem
      : `${this._lastBlockObj?.out} ${this._fullBem}`;
    this._fullBem = this.blockString;
    this._lastBlockObj = null;
    return ret;
  }

  get and(): BemIt {
    return new BemIt(this);
  }

  public el(element: string | undefined | null): BemIt {
    this._fullBem = element
      ? `${this._fullBem}__${element.trim()}`
      : this._fullBem;

    return this;
  }

  public mod(modifier: string | string[] | object | undefined | null): Output {
    
    const modStr = (val: string) => {
      val = val ? val.trim() : '';
      return val !== '' ? `${this._fullBem}${`--${val.trim()}`}` : undefined;
    };

    const modMap = (val: string[]) => {
      return val.filter(m => m).map(m => modStr(m)).join(' ');
    };
    
    if (typeof modifier === 'string') {
      modifier = modStr(modifier);
    } else if (Array.isArray(modifier)) {
      modifier = modMap(modifier);
    } else if (modifier) {
      const keyArr: string[] = [];
      Object.entries(modifier).forEach(
        ([key, value]) => {
          if (value) {
            keyArr.push(key);
          }
        }
      )
      modifier = modMap(keyArr);
    }

    if (modifier) {
      this._fullBem = `${this._fullBem} ${modifier}`;
    }

    return new Output(this);
  }
}

interface addClassReturn {
  before: (bem: BemIt) => string;
  after: (bem: BemIt) => string;
}

export function addClass(name: string | null | undefined): addClassReturn {
  name = name ? name.trim() : undefined;

  return {
    
    before: function(bem: BemIt | Output): string {
      return `${name ? `${name} ` : ''}${bem.out}`;
    },

    after: function (bem: BemIt | Output): string {
      return `${bem.out}${name ? ` ${name}` : ''}`;
    }
  }
}