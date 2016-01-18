// tools.js

// http://stackoverflow.com/questions/7837456/comparing-two-arrays-in-javascript
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}

Array.prototype.beginsWith = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length < array.length)
        return false;

    for (var i = 0; i < array.length; i++) {
        if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}

Array.prototype.hexToAscii = function(array) {
    if(!this)
        return "";
    var result = "";
    for (var i = 0; i <= this.length - 1; i++) {   
        var val=parseInt(this[i], 16);
        if(val>19 && val<127){
            result += String.fromCharCode(val);
        }
        else{
            result += ".";
        }
    };
    return result;
} 

Array.prototype.intToAscii = function(array) {
    if(!this)
        return "";
    var result = "";
    for (var i = 0; i <= this.length - 1; i++) {   
        var val=this[i];
        if(val>19 && val<127){
            result += String.fromCharCode(val);
        }
        else{
            result += ".";
        }
    };
    return result;
} 

String.prototype.asciiToHex = function(string) {
    if(!this)
        return [];
    var input=this;
    var result = [];
    for (a = 0; a <= input.length - 1; a++) {
        result.push(input.charCodeAt(a).toString(16));
    }
    return result;
} 

String.prototype.asciiToHexString = function(string) {
    if(!this)
        return [];
    var input=this;
    var result = "";
    for (a = 0; a <= input.length - 1; a++) {
        var hex=input.charCodeAt(a).toString(16);
        result += (hex.length<2 ? "0" + hex : hex) + " ";
    }
    return result.trim();
} 

String.prototype.padLeft = function (length, character) { 
    try{
        return new Array(length - this.length + 1).join(character || ' ') + this; 
    }
    catch (err){
        return this;
    }
};

String.prototype.padRight = function (length, character) { 
    try{
    return this + new Array(length - this.length + 1).join(character || ' '); 
    }
    catch (err){
        return this;
    }
};

Date.prototype.toFormattedString = function () {
    var result = String(this.getHours()).padLeft(2, '0') + ':' + String(this.getMinutes()).padLeft(2, '0') + ':' + String(this.getSeconds()).padLeft(2, '0') + '.' + String(this.getMilliseconds()).padLeft(3, '0');
    return result;
};

module.exports ={
    convertToInt: function(hex) {
        var result=[];
        for (var i = 0; i < hex.length; i++) {
            result.push(parseInt(hex[i], 16));
        };
        return result;
    }

}