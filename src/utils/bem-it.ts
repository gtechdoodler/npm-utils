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

  public mod(modifier: string | undefined | null): Output {
    modifier = modifier?.trim();
    if (modifier) {
      this._fullBem = `${this._fullBem} ${this._fullBem}${`--${modifier}`}`;
    }
    return new Output(this);
  }
}