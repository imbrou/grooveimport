var { authenticate } = require('./modules/auth.js') ;
var { getResults } = require('./modules/search.js') ;

authenticate(getResults) ;
