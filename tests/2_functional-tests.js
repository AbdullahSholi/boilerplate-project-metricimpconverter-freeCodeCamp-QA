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

		});

	});

});