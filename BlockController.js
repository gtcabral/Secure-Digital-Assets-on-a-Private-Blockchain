

const Mempool = require('./Mempool.js');
//const bodyParser = require('body-parser');
const Body = require('./Body.js');
const Star = require('./Star.js');
//const Block = require('./Block.js');
//const BlockChain = require('./BlockChain.js');

/**
 * Controller Definition to encapsulate routes to work with blocks
 */
class BlockController {

    /**
     * Constructor to create a new BlockController, you need to initialize here all your endpoints
     * @param {*} app 
     */
    constructor(app) {
        this.app = app;
        this.mempool = new Mempool.Mempool();
        this.postRequestValidation();
        this.postValidate();
        this.postBlock();
        this.getStar();
    }

    /**
     * POST Endpoint: Users start out by submitting a validation request to an API endpoint (url: http://localhost:8000/requestValidation)
     */
    postRequestValidation() {
        this.app.post("/requestValidation/", (req, res) => {
            let address = req.body.address;
            //check if the address is already in the mempool
            if (this.mempool.checkAddress(address)){
                console.log("the address " + address + " is already in the mempool");
                res.send (JSON.stringify(this.mempool.getRequestObject(address)).toString());
            } else {
                res.send (JSON.stringify(this.mempool.addRequestValidation(address)).toString());
            } 
            
        });
    }

    /**
     * POST Endpoint: validates message signature (url: http://localhost:8000/message-signature/validate)
     */
    postValidate() {
        this.app.post("/message-signature/validate/", (req, res) => {
            let address = req.body.address;
            let signature = req.body.signature;

            if (this.mempool.checkAddress(address)){
                //the address is already in the mempool
                let requestObject = this.mempool.getRequestObject(address);
                //we have a valid validationWindow
                if (this.mempool.verifyTimeLeft(requestObject.requestTimeStamp) >= 0){
                    //signature checked
                    if (this.mempool.verifyBitcoinMessage(address, signature)){
                        this.mempool.removeTimeOut(address);
                        res.send(this.mempool.getValidRequest(address));
                    } else { 
                        res.send("Signature is not valid! Try again.");
                    }
                }
            } else {
                res.send ("You must to submit a validation request before try to validate de signature!");
            } 
            
        });
    }

    /**
     * POST Endpoint: A user will send star data to be stored (url: http://localhost:8000/block)
       GET Endpoint: Get star block by star block height with JSON response. (url: http://localhost:8000/block/[HEIGHT])
     */
    postBlock() {
        this.app.post("/block/", (req, res) => {

            //check 1: Make sure only one Star can be send in the request
            if (req.body.length){
                res.send("You sent " + req.body.length + " stars. Only one star per request is allowed!");
            } else{
                //check 2: Star story supports ASCII text, limited to 250 words (500 bytes), and hex encoded.
                let story = req.body.star.story;
                let words = story.match(/\S+/g).length;
                if (words > 250){
                    res.send("You sent more than 250 words!");
                } else {
                    let address = req.body.address;
                    if (this.mempool.isValid(address)){
                        let star = new Star.Star();
                        star.ra = req.body.star.ra;
                        star.dec = req.body.star.dec;
                        star.mag = req.body.star.mag;
                        star.cen = req.body.star.cen;
                        star.story = Buffer(req.body.star.story).toString('hex');
                        let body = new Body.Body(address, star);

                        this.mempool.addBlock(body).then((result) => {
                            this.mempool.setIsNotValid(address);
                            res.send(result);
                        });
                    } else {
                        res.send("You should have a valid address before try to register a star");
                    }
                }
                
            }
        });

        this.app.get("/block/:height", (req, res) => {
            let blockHeight = req.params["height"];
            this.mempool.getBlock(blockHeight).then((block) => {
                res.send(block);
             }).catch((err) => { res.send("Star " + blockHeight + " not found!");});
        });
    }

    /**
     * GET Endpoint: Get Star block by hash with JSON response (url: http://localhost:8000/stars/hash:[HASH] or http://localhost:8000/stars/address:[ADDRESS])
     */
    getStar() {
        this.app.get("/stars/:var", (req, res) => {

            let request = req.params["var"].substring(0,req.params["var"].indexOf(":"));
            let value = req.params["var"].substring(req.params["var"].indexOf(":") + 1, req.params["var"].length);

            if (request == "hash"){
                this.mempool.getBlockByHash(value).then((block) => {
                res.send(block);
             }).catch((err) => { res.send("Star " + value + " not found!");});
            } else if (request == "address"){
                this.mempool.getBlockByAddress(value).then((block) => {
                res.send(block);
             }).catch((err) => { res.send("Star " + value + " not found!");});
            } else {
                res.send("You must send a valid request!");
            }
        });

        this.app.get("/stars/", (req, res) => {
            res.send("You must send a valid request!");
        });

    }

}

/**
 * Exporting the BlockController class
 * @param {*} app 
 */
module.exports = (app) => { return new BlockController(app);}