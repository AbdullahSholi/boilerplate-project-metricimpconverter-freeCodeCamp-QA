var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {

	suite('Routing Tests', function () {

		suite('GET /api/convert => conversion object', function () {

			test('Convert 10L (valid input)', function (done) {
				chai.request(server)
					.get('/api/convert')
					.query({ input: '10L' })
					.end(function (err, res) {
						assert.equal(res.status, 200);
						assert.equal(res.body.initNum, 10);
						assert.equal(res.body.initUnit, 'L');
						assert.approximately(res.body.returnNum, 2.64172, 0.1); // 0.1 tolerance
						assert.equal(res.body.returnUnit, 'gal');
						done();
					});
			});

			test('Convert 32g (invalid input unit)', function (done) {
				chai.request(server)
					.get('/api/convert')
					.query({ input: '32g' })
					.end(function (err, res) {
						assert.equal(res.status, 200);
						assert.equal(res.text, 'invalid unit');
						done();
					});
			});

			test('Convert 3/7.2/4kg (invalid number)', function (done) {
				chai.request(server)
					.get('/api/convert')
					.query({ input: '3/7.2/4kg' })
					.end(function (err, res) {
						assert.equal(res.status, 200);
						assert.equal(res.text, 'invalid number');
						done();
					});
			});

			test('Convert 3/7.2/4kilomegagram (invalid number and unit)', function (done) {
				chai.request(server)
					.get('/api/convert')
					.query({ input: '3/7.2/4kilomegagram' })
					.end(function (err, res) {
						assert.equal(res.status, 200);
						assert.equal(res.text, 'invalid number and unit');
						done();
					});
			});

			test('Convert kg (no number)', function (done) {
				chai.request(server)
					.get('/api/convert')
					.query({ input: 'kg' })
					.end(function (err, res) {
						assert.equal(res.status, 200);
						assert.equal(res.body.initNum, 1);
						assert.equal(res.body.initUnit, 'kg');
						assert.approximately(res.body.returnNum, 2.20462, 0.1); // 0.1 tolerance
						assert.equal(res.body.returnUnit, 'lbs');
						done();
					});
			});

			test('Convert 1/2mi (fractional input)', function (done) {
				chai.request(server)
					.get('/api/convert')
					.query({ input: '1/2mi' })
					.end(function (err, res) {
						assert.equal(res.status, 200);
						assert.equal(res.body.initNum, 0.5);
						assert.equal(res.body.initUnit, 'mi');
						assert.approximately(res.body.returnNum, 0.80467, 0.1);
						assert.equal(res.body.returnUnit, 'km');
						done();
					});
			});

			test('Convert 5.4/3gal (decimal fraction)', function (done) {
				chai.request(server)
					.get('/api/convert')
					.query({ input: '5.4/3gal' })
					.end(function (err, res) {
						assert.equal(res.status, 200);
						assert.equal(res.body.initNum, 1.8);
						assert.equal(res.body.initUnit, 'gal');
						assert.approximately(res.body.returnNum, 6.81374, 0.1);
						assert.equal(res.body.returnUnit, 'L');
						done();
					});
			});

			test('Convert empty input', function (done) {
				chai.request(server)
					.get('/api/convert')
					.query({ input: '' })
					.end(function (err, res) {
						assert.equal(res.status, 200);
						assert.property(res.body, 'error');
						done();
					});
			});

			test('Convert 0L (zero input)', function (done) {
				chai.request(server)
					.get('/api/convert')
					.query({ input: '0L' })
					.end(function (err, res) {
						assert.equal(res.status, 200);
						assert.equal(res.body.initNum, 0);
						assert.equal(res.body.initUnit, 'L');
						assert.equal(res.body.returnNum, 0);
						assert.equal(res.body.returnUnit, 'gal');
						done();
					});
			});

			test('Convert -5mi (negative input)', function (done) {
				chai.request(server)
					.get('/api/convert')
					.query({ input: '-5mi' })
					.end(function (err, res) {
						assert.equal(res.status, 200);
						assert.equal(res.body.initNum, -5);
						assert.equal(res.body.initUnit, 'mi');
						assert.approximately(res.body.returnNum, -8.04672, 0.1);
						assert.equal(res.body.returnUnit, 'km');
						done();
					});
			});

			test('Convert 1000kg (large number)', function (done) {
				chai.request(server)
					.get('/api/convert')
					.query({ input: '1000kg' })
					.end(function (err, res) {
						assert.equal(res.status, 200);
						assert.equal(res.body.initNum, 1000);
						assert.equal(res.body.initUnit, 'kg');
						assert.approximately(res.body.returnNum, 2204.62, 0.1);
						assert.equal(res.body.returnUnit, 'lbs');
						done();
					});
			});

			test('Convert 0.001L (very small number)', function (done) {
				chai.request(server)
					.get('/api/convert')
					.query({ input: '0.001L' })
					.end(function (err, res) {
						assert.equal(res.status, 200);
						assert.equal(res.body.initNum, 0.001);
						assert.equal(res.body.initUnit, 'L');
						assert.approximately(res.body.returnNum, 0.00026, 0.001);
						assert.equal(res.body.returnUnit, 'gal');
						done();
					});
			});

			test('Convert 5GAL (uppercase unit)', function (done) {
				chai.request(server)
					.get('/api/convert')
					.query({ input: '5GAL' })
					.end(function (err, res) {
						assert.equal(res.status, 200);
						assert.equal(res.body.initNum, 5);
						assert.equal(res.body.initUnit, 'gal');
						assert.approximately(res.body.returnNum, 18.9271, 0.1);
						assert.equal(res.body.returnUnit, 'L');
						done();
					});
			});

			test('Convert 2.5/5lbs (complex fraction)', function (done) {
				chai.request(server)
					.get('/api/convert')
					.query({ input: '2.5/5lbs' })
					.end(function (err, res) {
						assert.equal(res.status, 200);
						assert.equal(res.body.initNum, 0.5);
						assert.equal(res.body.initUnit, 'lbs');
						assert.approximately(res.body.returnNum, 0.22680, 0.1);
						assert.equal(res.body.returnUnit, 'kg');
						done();
					});
			});

			test('Convert 5/0kg (division by zero)', function (done) {
				chai.request(server)
					.get('/api/convert')
					.query({ input: '5/0kg' })
					.end(function (err, res) {
						assert.equal(res.status, 200);
						assert.equal(res.text, 'invalid number');
						done();
					});
			});

			test('Convert 5.5.5L (multiple decimals)', function (done) {
				chai.request(server)
					.get('/api/convert')
					.query({ input: '5.5.5L' })
					.end(function (err, res) {
						assert.equal(res.status, 200);
						assert.equal(res.text, 'invalid number');
						done();
					});
			});

			test('Convert 5 (no unit)', function (done) {
				chai.request(server)
					.get('/api/convert')
					.query({ input: '5' })
					.end(function (err, res) {
						assert.equal(res.status, 200);
						assert.equal(res.text, 'invalid unit');
						done();
					});
			});

			test('Convert abc (invalid input)', function (done) {
				chai.request(server)
					.get('/api/convert')
					.query({ input: 'abc' })
					.end(function (err, res) {
						assert.equal(res.status, 200);
						assert.equal(res.text, 'invalid unit');
						done();
					});
			});

			test('Convert 5xyz (invalid unit)', function (done) {
				chai.request(server)
					.get('/api/convert')
					.query({ input: '5xyz' })
					.end(function (err, res) {
						assert.equal(res.status, 200);
						assert.equal(res.text, 'invalid unit');
						done();
					});
			});

			test('Convert /5/L (invalid fraction)', function (done) {
				chai.request(server)
					.get('/api/convert')
					.query({ input: '/5/L' })
					.end(function (err, res) {
						assert.equal(res.status, 200);
						assert.equal(res.text, 'invalid number');
						done();
					});
			});

			test('Convert 1/2/3/4L (multiple fractions)', function (done) {
				chai.request(server)
					.get('/api/convert')
					.query({ input: '1/2/3/4L' })
					.end(function (err, res) {
						assert.equal(res.status, 200);
						assert.equal(res.text, 'invalid number');
						done();
					});
			});

			test('Convert 10.5km (decimal to mi)', function (done) {
				chai.request(server)
					.get('/api/convert')
					.query({ input: '10.5km' })
					.end(function (err, res) {
						assert.equal(res.status, 200);
						assert.equal(res.body.initNum, 10.5);
						assert.equal(res.body.initUnit, 'km');
						assert.approximately(res.body.returnNum, 6.52407, 0.1);
						assert.equal(res.body.returnUnit, 'mi');
						done();
					});
			});

			test('Convert 3/4gal (fraction to L)', function (done) {
				chai.request(server)
					.get('/api/convert')
					.query({ input: '3/4gal' })
					.end(function (err, res) {
						assert.equal(res.status, 200);
						assert.equal(res.body.initNum, 0.75);
						assert.equal(res.body.initUnit, 'gal');
						assert.approximately(res.body.returnNum, 2.83906, 0.1);
						assert.equal(res.body.returnUnit, 'L');
						done();
					});
			});

		});

	});

});