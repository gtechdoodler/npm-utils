import BemIt from './bem-it';

test('Outputs a block', () => {
  const blockString = 'Block';
  const bem = new BemIt(blockString);
  expect(bem.val).toEqual(blockString);
});

test('Outputs an element', () => {
  const block = 'Block';
  const bem = new BemIt(block);
  const element = 'Element';
  expect(bem.el(element).val).toEqual(
    `${block}__${element}`);
});

test('Outputs a modifier', () => {
  const block = 'Block';
  const bem = new BemIt(block);
  const element = 'Element';
  const modifier = 'modifier';
  expect(bem.el(element).mod(modifier)).toEqual(
    `${block}__${element} ${block}__${element}--${modifier}`);
});

test('Outputs multiple modifiers', () => {
  const block = 'Block';
  const bem = new BemIt(block);
  const element = 'Element';
  const modifier1 = 'modifier1';
  const modifier2 = 'modifier2';
  expect(bem.el(element).mod([modifier1, modifier2])).toEqual(
    `${block}__${element} ${block}__${element}--${modifier1} ${block}__${element}--${modifier2}`);
});

test('Empty modifier', () => {
  const block = 'Block';
  const bem = new BemIt(block);
  const element = 'Element';
  const modifier = '';
  expect(bem.el(element).mod(modifier)).toEqual(`${block}__${element}`);
});

test('Clear after val', () => {
  const block = 'Block';
  const bem = new BemIt(block);
  const element = 'Element';
  const val = bem.el(element).val;
  const element2  = 'Element2'
  expect(bem.el(element2).val).toEqual(
    `${block}__${element2}`);
});
