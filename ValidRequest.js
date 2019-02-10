/* ===== ValidRequest Class =======================
|  Class with a constructor for a ValidRequest     |
|  ===============================================*/

class Status {
	constructor (address, requestTimeStamp){
		this.address = address,
		this.requestTimeStamp = requestTimeStamp,
		this.message = address + ":" + requestTimeStamp + ":starRegistry",
		this.validationWindow = "",
		this.messageSignature = false
	}
}

class ValidRequest {
	constructor(walletAddress, requestTimeStamp){
		this.registerStar = false,
		this.status = new Status(walletAddress, requestTimeStamp)
	}
}

module.exports.ValidRequest = ValidRequest;