# Secure-Digital-Assets-on-a-Private-Blockchain
In this project, you will build a Star Registry Service that allows users to claim ownership of their favorite star in the night sky.

## Architecture
Local server

1. Node.js - https://nodejs.org/en/
2. Express - https://expressjs.com/
3. Crypto-js - https://www.npmjs.com/package/crypto-js
4. Body-parser - https://www.npmjs.com/package/body-parser
5. LevelDB - http://leveldb.org/
6. hex2ascii - https://www.npmjs.com/package/hex2ascii
7. bitcoinjs - https://github.com/bitcoinjs

![Sequence Diagram](https://github.com/gtcabral/Secure-Digital-Assets-on-a-Private-Blockchain/blob/master/project4-workflow.png)

## Getting Started

To set up the project for review do the following:
1. Download the project or clone the repository --> git clone https://github.com/gtcabral/Secure-Digital-Assets-on-a-Private-Blockchain
2. Install __node.js__ (https://nodejs.org/en/download/)
3. Run command __npm install__ to install the project dependencies.
4. Run command __node app.js__ in the root directory.

## Endpoints

### POST Endpoints
__requestValidation__ - Users start out by submitting a wallet addres to validation request to an API endpoint. 

```
curl -X GET \
  http://localhost:8000/block/0 \
  -H 'Content-Type: application/x-www-form-urlencoded'
```

### POST Endpoints
__Post Block with a body value__
```
curl -X POST \
  http://localhost:8000/block/ \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'body=testing%20block'
```
## Usage

### Get Block by id
```
curl -X GET \
  http://localhost:8000/block/0 \
  -H 'Content-Type: application/x-www-form-urlencoded'
```
### Post Block with a body value
```
curl -X POST \
  http://localhost:8000/block/ \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'body=testing%20block'
```
