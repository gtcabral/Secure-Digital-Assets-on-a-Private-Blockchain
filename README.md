# Secure-Digital-Assets-on-a-Private-Blockchain
In this project, you will build a Star Registry Service that allows users to claim ownership of their favorite star in the night sky.

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
## Architecture
Local server

1. Node.js - https://nodejs.org/en/
2. Express - https://expressjs.com/
3. Crypto-js - https://www.npmjs.com/package/crypto-js
4. Body-parser - https://www.npmjs.com/package/body-parser
5. LevelDB - http://leveldb.org/

## Getting Started

To set up the project for review do the following:
1. Download the project or clone the repository --> git clone https://github.com/gtcabral/RestfullPrivateBlockchain
2. Install __node.js__ (https://nodejs.org/en/download/)
3. Run command __npm install__ to install the project dependencies.
4. Run command __node app.js__ in the root directory.

## Endpoints

### GET Endpoints
__Get block by ID__
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

