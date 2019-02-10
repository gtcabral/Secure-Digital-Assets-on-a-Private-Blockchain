/* ===== Body Class +==============================
|  Class with a constructor for body 			   |
|  ===============================================*/

const Star = require('./Star.js');

class Body {
	constructor(address, star){
		this.address = address,
		this.star = star
	}
}

module.exports.Body = Body;