import BemIt from './bem-it';

test('Output a block.', () => {
  const blockString = 'Block';
  const bem = new BemIt(blockString);
  expect(bem.out).toEqual(blockString);
});

test('Output an element.', () => {
  const
  block = 'Block',
  element = 'element';

  const bem = new BemIt(block);

  expect(bem.el(element).out).toEqual(
    `${block}__${element}`);
});

test('Output an element with modifier.', () => {
  const
  block = 'Block',
  element = 'element',
  modifier = 'modifier';

  const bem = new BemIt(block);

  expect(bem.el(element).mod(modifier).out).toEqual(
    `${block}__${element} ${block}__${element}--${modifier}`);
});

test('Empty string modifier ignored.', () => {
  const
  block = 'Block',
  element = 'element',
  modifier = '';

  const bem = new BemIt(block);

  expect(bem.el(element).mod(modifier).out).toEqual(
    `${block}__${element}`);
});

test('Space string modifier ignored.', () => {
  const
  block = 'Block',
  element = 'element',
  modifier = ' ';

  const bem = new BemIt(block);

  expect(bem.el(element).mod(modifier).out).toEqual(
    `${block}__${element}`);
});

test('Multiple elements.', () => {
  const
  block = 'Block',
  element1 = 'element1',
  element2  = 'element2';

  const bem = new BemIt(block);

  expect(bem.el(element1).el(element2).out).toEqual(
    `${block}__${element1}__${element2}`);
});

test('Multiple elements with modifier.', () => {
  const
  block = 'Block',
  element1 = 'element1',
  element2  = 'element2',
  modifier = 'modifier';

  const bem = new BemIt(block);

  expect(bem.el(element1).el(element2).mod(modifier).out).toEqual(
    `${block}__${element1}__${element2} ${block}__${element1}__${element2}--${modifier}`);
});

test(`Object mods.`, () => {
  const
  block = 'Block',
  element = 'element',
  modifier1 = 'modifier1',
  modifier2 = 'modifier2';

  const bem = new BemIt(block);

  expect(bem.el(element).mod({ modifier1: true, modifier2: true }).out).toEqual(
    `${block}__${element} ${block}__${element}--${modifier1} ${block}__${element}--${modifier2}`);
});

test(`Object mods, all falsy.`, () => {
  const
  block = 'Block',
  element = 'element',
  modifier1 = 'modifier1',
  modifier2 = 'modifier2';

  const bem = new BemIt(block);

  expect(bem.el(element).mod({ modifier1: false, modifier2: false }).out).toEqual(
    `${block}__${element}`);
});

test(`String array mods.`, () => {
  const
  block = 'Block',
  element = 'element',
  modifier1 = 'modifier1',
  modifier2 = 'modifier2';

  const bem = new BemIt(block);

  expect(bem.el(element).mod([ modifier1, modifier2 ]).out).toEqual(
    `${block}__${element} ${block}__${element}--${modifier1} ${block}__${element}--${modifier2}`);
});

test(`Calling 'out' resets value back to block.`, () => {
  const
  block = 'Block',
  element1 = 'element1',
  element2  = 'element2';

  const bem = new BemIt(block);
  bem.el(element1).out;

  expect(bem.el(element2).out).toEqual(
    `${block}__${element2}`);
});

test(`Chaining bems.`, () => {
  const
  block = 'Block',
  element1 = 'element1',
  element2  = 'element2',
  modifier = 'modifier';

  const bem = new BemIt(block);

  expect(bem.el(element1).mod(modifier).and.el(element2).out).toEqual(
    `${block}__${element1} ${block}__${element1}--${modifier} ${block}__${element2}`);
});

test(`An unchained variation.`, () => {
  const
  block = 'Block',
  element1 = 'element1',
  element2  = 'element2',
  modifier = 'modifier';

  const bem = new BemIt(block);
  bem.el(element1);
  bem.el(element2);
  bem.mod(modifier);
  const out = bem.out;

  expect(out).toEqual(
    `${block}__${element1}__${element2} ${block}__${element1}__${element2}--${modifier}`);
});

test(`Component simulation.`, () => {
  const
  block = 'Block',
  element1 = 'element1',
  element2  = 'element2',
  modifier = 'modifier';

  const bem = new BemIt(block);

  expect(bem.out).toEqual(
    `${block}`);

  expect(bem.el(element1).out).toEqual(
    `${block}__${element1}`);

  expect(bem.el(element2).mod(modifier).out).toEqual(
    `${block}__${element2} ${block}__${element2}--${modifier}`);
});

test(`A ridiculous one that I hope you never use.`, () => {
  const
  block = 'Block',
  element1 = 'element1',
  element2  = 'element2',
  element3  = 'element3',
  modifier1 = 'modifier1',
  modifier2 = 'modifier2';

  const bem = new BemIt(block);

  expect(bem.el(element1).el(element2).mod(modifier1).and.el(element3).mod(modifier2).out).toEqual(
    `${block}__${element1}__${element2} ${block}__${element1}__${element2}--${modifier1} ${block}__${element3} ${block}__${element3}--${modifier2}`);
});

test(`Edge case, empty strings.`, () => {
  const block = 'Block';
  const bem = new BemIt(block);
  expect(bem.el('').el('').mod('').out).toEqual(`${block}`);
});

test(`Edge case, undefined.`, () => {
  const block = 'Block';
  const bem = new BemIt(block);
  expect(bem.el(undefined).el(undefined).mod(undefined).out).toEqual(`${block}`);
});

test(`Edge case, null.`, () => {
  const block = 'Block';
  const bem = new BemIt(block);
  expect(bem.el(null).el(null).mod(null).out).toEqual(`${block}`);
});

test(`Edge case, mixed.`, () => {
  const block = 'Block';
  const bem = new BemIt(block);
  expect(bem.el('').el(null).mod(undefined).out).toEqual(`${block}`);
});