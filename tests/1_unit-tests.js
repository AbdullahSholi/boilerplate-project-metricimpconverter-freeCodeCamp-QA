var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function () {

	suite('Function convertHandler.getNum(input)', function () {

		test('Whole number input', function (done) {
			var input = '32L';
			assert.equal(convertHandler.getNum(input), 32);
			done();
		});

		test('Decimal Input', function (done) {
			var input = '3.1L';
			assert.equal(convertHandler.getNum(input), 3.1);
			done();
		});

		test('Fractional Input', function (done) {
			var input = '1/2L';
			assert.equal(convertHandler.getNum(input), 0.5);
			done();
		});

		test('Fractional Input with Decimal', function (done) {
			var input = '6/2.5L';
			assert.equal(convertHandler.getNum(input), 2.4);
			done();
		});

		test('Invalid Input (double fraction)', function (done) {
			var input = '0/20/20L';
			assert.equal(convertHandler.getNum(input), undefined);
			done();
		});

		test('No Numerical Input (default to 1)', function (done) {
			var input = 'L';
			assert.equal(convertHandler.getNum(input), 1);
			done();
		});

		test('Invalid Input (empty fraction)', function (done) {
			var input = '/L';
			assert.equal(convertHandler.getNum(input), undefined);
			done();
		});

		test('Invalid Input (fraction ending with /)', function (done) {
			var input = '5/L';
			assert.equal(convertHandler.getNum(input), undefined);
			done();
		});

		test('Valid complex fraction', function (done) {
			var input = '1.5/3L';
			assert.equal(convertHandler.getNum(input), 0.5);
			done();
		});

		test('Zero input', function (done) {
			var input = '0L';
			assert.equal(convertHandler.getNum(input), 0);
			done();
		});

		test('Negative number input', function (done) {
			var input = '-5L';
			assert.equal(convertHandler.getNum(input), -5);
			done();
		});

		test('Large number input', function (done) {
			var input = '1000000L';
			assert.equal(convertHandler.getNum(input), 1000000);
			done();
		});

		test('Very small decimal', function (done) {
			var input = '0.001L';
			assert.equal(convertHandler.getNum(input), 0.001);
			done();
		});

		test('Fraction with zero numerator', function (done) {
			var input = '0/5L';
			assert.equal(convertHandler.getNum(input), 0);
			done();
		});

		test('Fraction with zero denominator', function (done) {
			var input = '5/0L';
			assert.equal(convertHandler.getNum(input), undefined);
			done();
		});

		test('Multiple decimal points', function (done) {
			var input = '5.5.5L';
			assert.equal(convertHandler.getNum(input), undefined);
			done();
		});

		test('Letters in number', function (done) {
			var input = '5aL';
			assert.equal(convertHandler.getNum(input), 5);
			done();
		});

		test('Special characters in number', function (done) {
			var input = '5@L';
			assert.equal(convertHandler.getNum(input), undefined);
			done();
		});

		test('Fraction with negative numbers', function (done) {
			var input = '-1/2L';
			assert.equal(convertHandler.getNum(input), -0.5);
			done();
		});

	});

	suite('Function convertHandler.getUnit(input)', function () {

		test('For Each Valid Unit Inputs', function (done) {
			var input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
			input.forEach(function (ele) {
				ele = ele.toLowerCase();

				if (ele === 'l') {
					ele = ele.toUpperCase();
				}

				assert.equal(ele, convertHandler.getUnit(ele));
			});
			done();
		});

		test('Unknown Unit Input', function (done) {
			var input = 'i';
			assert.equal(convertHandler.getUnit(input), undefined);
			done();
		});

		test('Invalid Unit Input (multiple units)', function (done) {
			var input = '5galL';
			assert.equal(convertHandler.getUnit(input), undefined);
			done();
		});

		test('Invalid Unit Input (numbers)', function (done) {
			var input = '5123';
			assert.equal(convertHandler.getUnit(input), undefined);
			done();
		});

		test('Case insensitive unit input', function (done) {
			var input = '5GAL';
			assert.equal(convertHandler.getUnit(input), 'gal');
			done();
		});

		test('Mixed case unit input', function (done) {
			var input = '5KgS';
			assert.equal(convertHandler.getUnit(input), undefined);
			done();
		});

		test('Unit with numbers', function (done) {
			var input = '5kg2';
			assert.equal(convertHandler.getUnit(input), undefined);
			done();
		});

		test('Unit with special characters', function (done) {
			var input = '5kg@';
			assert.equal(convertHandler.getUnit(input), undefined);
			done();
		});

		test('Empty unit', function (done) {
			var input = '5';
			assert.equal(convertHandler.getUnit(input), undefined);
			done();
		});

		test('Only unit no number', function (done) {
			var input = 'gal';
			assert.equal(convertHandler.getUnit(input), 'gal');
			done();
		});

		test('Lowercase L unit', function (done) {
			var input = '5l';
			assert.equal(convertHandler.getUnit(input), 'L');
			done();
		});

		test('Multiple valid units', function (done) {
			var input = '5galkm';
			assert.equal(convertHandler.getUnit(input), undefined);
			done();
		});

		test('Partial unit match', function (done) {
			var input = '5ga';
			assert.equal(convertHandler.getUnit(input), undefined);
			done();
		});

		test('Unit with spaces', function (done) {
			var input = '5 gal';
			assert.equal(convertHandler.getUnit(input), undefined);
			done();
		});

	});

	suite('Function convertHandler.getReturnUnit(initUnit)', function () {

		test('For Each Valid Unit Inputs', function (done) {
			var input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
			var expect = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
			input.forEach(function (ele, i) {
				assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
			});
			done();
		});

		test('Invalid unit returns undefined', function (done) {
			var input = 'invalid';
			assert.equal(convertHandler.getReturnUnit(input), undefined);
			done();
		});

		test('Empty unit returns undefined', function (done) {
			var input = '';
			assert.equal(convertHandler.getReturnUnit(input), undefined);
			done();
		});

		test('Null unit returns undefined', function (done) {
			var input = null;
			assert.equal(convertHandler.getReturnUnit(input), undefined);
			done();
		});

		test('Undefined unit returns undefined', function (done) {
			var input = undefined;
			assert.equal(convertHandler.getReturnUnit(input), undefined);
			done();
		});

	});

	suite('Function convertHandler.spellOutUnit(unit)', function () {

		test('For Each Valid Unit Inputs', function (done) {
			//see above example for hint
			var input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
			var expect = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
			input.forEach(function (ele, i) {
				assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
			});
			done();
		});

		test('Invalid unit spell out', function (done) {
			var input = 'invalid';
			assert.equal(convertHandler.spellOutUnit(input), undefined);
			done();
		});

		test('Empty unit spell out', function (done) {
			var input = '';
			assert.equal(convertHandler.spellOutUnit(input), undefined);
			done();
		});

		test('Null unit spell out', function (done) {
			var input = null;
			assert.equal(convertHandler.spellOutUnit(input), undefined);
			done();
		});

		test('Undefined unit spell out', function (done) {
			var input = undefined;
			assert.equal(convertHandler.spellOutUnit(input), undefined);
			done();
		});

	});

	suite('Function convertHandler.convert(num, unit)', function () {

		test('Gal to L', function (done) {
			var input = [5, 'gal'];
			var expected = 18.9271;
			assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); // 0.1 tolerance
			done();
		});

		test('L to Gal', function (done) {
			var input = [5, 'L'];
			var expected = 1.32086;
			assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); // 0.1 tolerance
			done();
		});

		test('Mi to Km', function (done) {
			var input = [5, 'mi'];
			var expected = 8.04672;
			assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); // 0.1 tolerance
			done();
		});

		test('Km to Mi', function (done) {
			var input = [5, 'km'];
			var expected = 3.10686;
			assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); // 0.1 tolerance
			done();
		});

		test('Lbs to Kg', function (done) {
			var input = [5, 'lbs'];
			var expected = 2.26796;
			assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); // 0.1 tolerance
			done();
		});

		test('Kg to Lbs', function (done) {
			var input = [5, 'kg'];
			var expected = 11.0231;
			assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); // 0.1 tolerance
			done();
		});

		test('Convert zero value', function (done) {
			var input = [0, 'gal'];
			var expected = 0;
			assert.equal(convertHandler.convert(input[0], input[1]), expected);
			done();
		});

		test('Convert negative value', function (done) {
			var input = [-5, 'mi'];
			var expected = -8.04672;
			assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
			done();
		});

		test('Convert fractional value', function (done) {
			var input = [0.5, 'L'];
			var expected = 0.13209;
			assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
			done();
		});

		test('Convert large value', function (done) {
			var input = [1000, 'kg'];
			var expected = 2204.62;
			assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
			done();
		});

		test('Convert invalid unit returns null', function (done) {
			var input = [5, 'invalid'];
			assert.equal(convertHandler.convert(input[0], input[1]), null);
			done();
		});

		test('Convert with string number', function (done) {
			var input = ['5', 'gal'];
			var expected = 18.9271;
			assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
			done();
		});

	});

});