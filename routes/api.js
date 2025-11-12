'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  
  app.get('/api/convert', (req, res) => {
    const input = req.query.input;
    
    if (!input) {
      return res.json({ error: 'no input provided' });
    }
    
    // Get number and unit from input
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    
    // Check for errors
    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      return res.json({ error: 'invalid number and unit' });
    } else if (initNum === 'invalid number') {
      return res.json({ error: 'invalid number' });
    } else if (initUnit === 'invalid unit') {
      return res.json({ error: 'invalid unit' });
    }
    
    // Get return unit and convert
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    
    // Return the result
    res.json({
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: string
    });
  });
  
};
