/* ===== RequestObject Class =======================
|  Class with a constructor for a RequestMessage   |
|  ===============================================*/

/*
	The response should contain: walletAddress, requestTimeStamp, message and validationWindow.
*/

class RequestObject {
	constructor(walletAddress, requestTimeStamp){
		this.walletAddress = walletAddress,
		this.requestTimeStamp = requestTimeStamp,
		this.message = walletAddress + ":" + requestTimeStamp + ":starRegistry",
		this.validationWindow = ""
	}
}

module.exports.RequestObject = RequestObject;