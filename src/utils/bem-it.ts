export default class BemIt {

  private _block: string;
  private _value: string;

  constructor(block: string) {
    this._block = block;
    this._value = block;
  }

  public el(val: string): BemIt {
    this._value = `${this._value}__${val}`;
    return this;
  }

  public mod(val: string | string[]): string {
    if (val) {
      const fullMod = (v: string): string => {
        return `${this._value}${v ? `--${v}` : '' }`;
      }      
      const ret = `${this._value} ${Array.isArray(val)
        ? val.map(m => fullMod(m)).join(' ')
        : `${fullMod(val)}`}`;
      
      this._value = this._block;
      return ret;
    }
    return this._value;
  }

  public get val(): string {
    const ret = this._value;
    this._value = this._block;
    return ret;
  }
}