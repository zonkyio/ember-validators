import { module, test } from 'qunit';
import validate from 'ember-validators/number';
import processResult from '../../helpers/process-result';
import cloneOptions from '../../helpers/clone-options';

let options, result;

module('Unit | Validator | number');

test('no options', function(assert) {
  assert.expect(3);

  result = validate(undefined, {});
  assert.equal(processResult(result), true);

  result = validate("", {});
  assert.equal(processResult(result), 'This field must be a number');

  result = validate(22, cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('allow string', function(assert) {
  assert.expect(6);

  options = {
    allowString: true
  };

  result = validate('22', cloneOptions(options));
  assert.equal(processResult(result), true);

  result = validate('22.22', cloneOptions(options));
  assert.equal(processResult(result), true);

  result = validate('test', cloneOptions(options));
  assert.equal(processResult(result), 'This field must be a number');

  result = validate('', cloneOptions(options));
  assert.equal(processResult(result), 'This field must be a number');

  options.allowString = false;

  result = validate('22', cloneOptions(options));
  assert.equal(processResult(result), 'This field must be a number');

  result = validate('22.22', cloneOptions(options));
  assert.equal(processResult(result), 'This field must be a number');
});

test('integer', function(assert) {
  assert.expect(3);

  options = {
    integer: true
  };

  result = validate(22, cloneOptions(options));
  assert.equal(processResult(result), true);

  result = validate(22.22, cloneOptions(options));
  assert.equal(processResult(result), 'This field must be an integer');

  result = validate(-2.2, cloneOptions(options));
  assert.equal(processResult(result), 'This field must be an integer');
});

test('is', function(assert) {
  assert.expect(2);

  options = {
    is: 22
  };

  result = validate(1, cloneOptions(options));
  assert.equal(processResult(result), 'This field must be equal to 22');

  result = validate(22, cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('lt', function(assert) {
  assert.expect(3);

  options = {
    lt: 22
  };

  result = validate(21, cloneOptions(options));
  assert.equal(processResult(result), true);

  result = validate(22, cloneOptions(options));
  assert.equal(processResult(result), 'This field must be less than 22');

  result = validate(23, cloneOptions(options));
  assert.equal(processResult(result), 'This field must be less than 22');
});

test('lte', function(assert) {
  assert.expect(3);

  options = {
    lte: 22
  };

  result = validate(21, cloneOptions(options));
  assert.equal(processResult(result), true);

  result = validate(22, cloneOptions(options));
  assert.equal(processResult(result), true);

  result = validate(23, cloneOptions(options));
  assert.equal(processResult(result), 'This field must be less than or equal to 22');
});

test('gt', function(assert) {
  assert.expect(3);

  options = {
    gt: 22
  };

  result = validate(21, cloneOptions(options));
  assert.equal(processResult(result), 'This field must be greater than 22');

  result = validate(22, cloneOptions(options));
  assert.equal(processResult(result), 'This field must be greater than 22');

  result = validate(23, cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('multipleOf', function(assert) {
  assert.expect(11);

  options = {
    multipleOf: 2
  };

  result = validate(5, cloneOptions(options));
  assert.equal(processResult(result), 'This field must be a multiple of 2', '5');

  result = validate(17, cloneOptions(options));
  assert.equal(processResult(result), 'This field must be a multiple of 2', '17');

  result = validate(22, cloneOptions(options));
  assert.equal(processResult(result), true, '22');

  options = {
    multipleOf: -2
  };

  result = validate(5, cloneOptions(options));
  assert.equal(processResult(result), 'This field must be a multiple of -2', '5 with minus');

  result = validate(17, cloneOptions(options));
  assert.equal(processResult(result), 'This field must be a multiple of -2', '17 with minus');

  result = validate(22, cloneOptions(options));
  assert.equal(processResult(result), true, '22 with minus');

  options = {
    multipleOf: 0.01
  };

  result = validate(0.001, cloneOptions(options));
  assert.equal(processResult(result), 'This field must be a multiple of 0.01', '0.001');

  result = validate(11111.111, cloneOptions(options));
  assert.equal(processResult(result), 'This field must be a multiple of 0.01', '0.001');

  result = validate(11, cloneOptions(options));
  assert.equal(processResult(result), true, '11');

  result = validate(11111.11, cloneOptions(options));
  assert.equal(processResult(result), true, '11111.11');

  options = {
    multipleOf: 0.1
  };

  result = validate(123.1, cloneOptions(options));
  assert.equal(processResult(result), true, '123.1');
});

test('gte', function(assert) {
  assert.expect(3);

  options = {
    gte: 22
  };

  result = validate(21, cloneOptions(options));
  assert.equal(processResult(result), 'This field must be greater than or equal to 22');

  result = validate(22, cloneOptions(options));
  assert.equal(processResult(result), true);

  result = validate(23, cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('positive', function(assert) {
  assert.expect(4);

  options = {
    positive: true
  };

  result = validate(-1, cloneOptions(options));
  assert.equal(processResult(result), 'This field must be positive');

  result = validate(-144, cloneOptions(options));
  assert.equal(processResult(result), 'This field must be positive');

  result = validate(0, cloneOptions(options));
  assert.equal(processResult(result), true);

  result = validate(22, cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('odd', function(assert) {
  assert.expect(4);

  options = {
    odd: true
  };

  result = validate(22, cloneOptions(options));
  assert.equal(processResult(result), 'This field must be odd');

  result = validate(-144, cloneOptions(options));
  assert.equal(processResult(result), 'This field must be odd');

  result = validate(21, cloneOptions(options));
  assert.equal(processResult(result), true);

  result = validate(-21, cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('even', function(assert) {
  assert.expect(5);

  options = {
    even: true
  };

  result = validate(22, cloneOptions(options));
  assert.equal(processResult(result), true);

  result = validate(-22, cloneOptions(options));
  assert.equal(processResult(result), true);

  result = validate(22.22, cloneOptions(options));
  assert.equal(processResult(result), 'This field must be even');

  result = validate(21, cloneOptions(options));
  assert.equal(processResult(result), 'This field must be even');

  result = validate(-33, cloneOptions(options));
  assert.equal(processResult(result), 'This field must be even');
});

test('allowBlank', function(assert) {
  assert.expect(3);

  options = {
    allowBlank: true
  };

  result = validate(null, cloneOptions(options));
  assert.equal(processResult(result), true);

  result = validate(undefined, cloneOptions(options));
  assert.equal(processResult(result), true);

  result = validate('', cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('allowNone', function(assert) {
  assert.expect(4);

  options = {
    allowNone: true
  };

  result = validate(null, cloneOptions(options));
  assert.equal(processResult(result), true);

  result = validate(undefined, cloneOptions(options));
  assert.equal(processResult(result), true);

  options.allowNone = false;

  result = validate(null, cloneOptions(options));
  assert.equal(processResult(result), "This field must be a number");

  result = validate(undefined, cloneOptions(options));
  assert.equal(processResult(result), "This field must be a number");
});
