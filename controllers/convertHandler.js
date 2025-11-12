function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    
    // Extract number part from input (everything before letters)
    let numMatch = input.match(/^[^a-zA-Z]*/);
    
    if (!numMatch || numMatch[0] === '') {
      result = 1; // Default to 1 if no number provided
    } else {
      let numStr = numMatch[0];
      
      // Check for double fraction (invalid) - like 3/2/3
      if ((numStr.match(/\//g) || []).length > 1) {
        return 'invalid number';
      }
      
      // Check for invalid patterns like ending with /
      if (numStr.endsWith('/') || numStr.startsWith('/')) {
        return 'invalid number';
      }
      
      // Handle fractions
      if (numStr.includes('/')) {
        let parts = numStr.split('/');
        if (parts.length === 2 && parts[0] !== '' && parts[1] !== '' && 
            !isNaN(parseFloat(parts[0])) && !isNaN(parseFloat(parts[1])) && 
            parseFloat(parts[1]) !== 0) {
          result = parseFloat(parts[0]) / parseFloat(parts[1]);
        } else {
          return 'invalid number';
        }
      } else {
        // Handle regular numbers (integer or decimal)
        if (numStr === '' || numStr === '.') {
          result = 1;
        } else {
          result = parseFloat(numStr);
          if (isNaN(result)) {
            return 'invalid number';
          }
        }
      }
    }
    
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    
    // Extract unit part from input (everything after the number)
    let unitMatch = input.match(/[a-zA-Z]+$/);
    
    if (!unitMatch) {
      return 'invalid unit';
    }
    
    let unit = unitMatch[0].toLowerCase();
    
    // Valid units
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    
    if (validUnits.includes(unit)) {
      // Return 'L' in uppercase for liter, others in lowercase
      result = unit === 'l' ? 'L' : unit;
    } else {
      result = 'invalid unit';
    }
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    
    const unitMap = {
      'gal': 'L',
      'L': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    
    result = unitMap[initUnit];
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    
    const unitNames = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    
    result = unitNames[unit];
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    switch(initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      default:
        result = null;
    }
    
    // Round to 5 decimal places
    if (result !== null) {
      result = Math.round(result * 100000) / 100000;
    }
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    
    let initUnitString = this.spellOutUnit(initUnit);
    let returnUnitString = this.spellOutUnit(returnUnit);
    
    result = `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;
    
    return result;
  };

}

module.exports = ConvertHandler;
