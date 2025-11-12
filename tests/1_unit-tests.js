const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests',() => {

    test('convertHandler should correctly read a whole number input.', () => {
        assert.equal(convertHandler.getNum('5kg'), '5')
        assert.equal(convertHandler.getNum('3mi'), '3')
    })
    test('convertHandler should correctly read a decimal number input.', () => {
        assert.equal(convertHandler.getNum('5.5km'), '5.5')
        assert.equal(convertHandler.getNum('7.3mi'), '7.3')
    })
    test('convertHandler should correctly read a fractional input.', () => {
        assert.equal(convertHandler.getNum('3/4lbs'), '0.75')
    })
    test('convertHandler should correctly read a fractional input with a decimal', () => {
        assert.equal(convertHandler.getNum('1.5/3kg'), '0.5')
    })
    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', () => {
        assert.equal(convertHandler.getNum('3/2/3mi'), 'invalid number')
    })
    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', () => {
        assert.equal(convertHandler.getNum('kg'), '1')
    })
    test('convertHandler should correctly read each valid input unit.', () => {
        assert.equal(convertHandler.getUnit('1gal'), 'gal')
        assert.equal(convertHandler.getUnit('2L'), 'L')
        assert.equal(convertHandler.getUnit('3/4l'), 'L')
        assert.equal(convertHandler.getUnit('5.7mi'), 'mi')
        assert.equal(convertHandler.getUnit('9/3km'), 'km')
        assert.equal(convertHandler.getUnit('3000lbs'), 'lbs')
        assert.equal(convertHandler.getUnit('2kg'), 'kg')
    })
    test('convertHandler should correctly return an error for an invalid input unit.', () => {
        assert.equal(convertHandler.getUnit('football fields'), 'invalid unit')
    })
    test('convertHandler should return the correct return unit for each valid input unit.', () => {
        assert.equal(convertHandler.getReturnUnit('gal'), 'L')
        assert.equal(convertHandler.getReturnUnit('L'), 'gal')
        assert.equal(convertHandler.getReturnUnit('mi'), 'km')
        assert.equal(convertHandler.getReturnUnit('km'), 'mi')
        assert.equal(convertHandler.getReturnUnit('lbs'), 'kg')
        assert.equal(convertHandler.getReturnUnit('kg'), 'lbs')
    })
    test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', () => {
        assert.equal(convertHandler.spellOutUnit('gal'), 'gallons')
        assert.equal(convertHandler.spellOutUnit('L'), 'liters')
        assert.equal(convertHandler.spellOutUnit('mi'), 'miles')
        assert.equal(convertHandler.spellOutUnit('km'), 'kilometers')
        assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds')
        assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms')
    })
    test('convertHandler should correctly convert gal to L', () => {
        assert.approximately(convertHandler.convert(1, 'gal'), 3.78, 0.1)
    })
    test('convertHandler should correctly convert L to gal.', () => {
        assert.approximately(convertHandler.convert(1, 'L'), 0.26, 0.1)
    })
    test('convertHandler should correctly convert mi to km.', () => {
        assert.approximately(convertHandler.convert(1, 'mi'), 1.60, 0.1)
    })
    test('convertHandler should correctly convert km to mi.', () => {
        assert.approximately(convertHandler.convert(1, 'km'), 0.62, 0.1)
    })
    test('convertHandler should correctly convert lbs to kg.', () => {
        assert.approximately(convertHandler.convert(1, 'lbs'), 0.45, 0.1)
    })
    test('convertHandler should correctly convert kg to lbs.', () => {
        assert.approximately(convertHandler.convert(1, 'kg'), 2.2, 0.1)
    })
});