var ind = require('./index.js');
var src1 = 'http://50.7.127.18/s/97a901188eceeb576e862d744921fbf1/paradise.kiss/s01e01_360.mp4';
var src = 'http://50.7.127.18/s/97a901188eceeb576e862d744921fbf1/paradise.kiss/s01e02_360.mp4';

var mult = {
    start : function(text){
        console.log(text);
    },
    stop : function(text){
        console.log(text);
    },
    progress : function(text){
        console.log(text);
    },
    ero : function(text){
        console.log(text);
    }
}

// mult.start();

ind.start_load(mult, src);
ind.start_load(mult, src1);