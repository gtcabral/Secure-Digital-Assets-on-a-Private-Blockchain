# Secure-Digital-Assets-on-a-Private-Blockchain
In this project, you will build a Star Registry Service that allows users to claim ownership of their favorite star in the night sky. This project uses bitcoin wallet to check the ownership of the bitcoin address.

## Architecture
Local server

1. Node.js - https://nodejs.org/en/
2. Express - https://expressjs.com/
3. Crypto-js - https://www.npmjs.com/package/crypto-js
4. Body-parser - https://www.npmjs.com/package/body-parser
5. LevelDB - http://leveldb.org/
6. hex2ascii - https://www.npmjs.com/package/hex2ascii
7. bitcoinjs - https://github.com/bitcoinjs

__Diagram of Sequence__

![Sequence Diagram](https://github.com/gtcabral/Secure-Digital-Assets-on-a-Private-Blockchain/blob/master/project4-workflow.png)

## Getting Started

To set up the project for review do the following:
1. Download the project or clone the repository --> git clone https://github.com/gtcabral/Secure-Digital-Assets-on-a-Private-Blockchain
2. Rum command __cd Secure-Digital-Assets-on-a-Private-Blockchain__
3. Install __node.js__ (https://nodejs.org/en/download/)
4. Run command __npm install__ to install the project dependencies.
5. Run command __node app.js__ in the root directory.

## Endpoints

### POST Endpoints
__/requestValidation/__ - The user sends the address of his bitcoin wallet. The address is added in mempool until the user proves that he owns the wallet (using __/message-signature/validate__)

```
curl -X POST \
  http://localhost:8000/requestValidation \
  -H 'Postman-Token: 3ad15d14-0dc9-45c3-81a3-f0c1c802f789' \
  -H 'cache-control: no-cache' \
  -d 'address=127My5Q5mg53VNYAaBivBvNx3oUwedWPaw'
```

__/message-signature/validate/__ - Check if the user owns the bitcoin wallet. The user must submit a signed message by his bitcoin wallet. Message format = [walletAddress]:[timeStamp]:starRegistry

```
curl -X POST \
  http://localhost:8000/message-signature/validate \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Postman-Token: e50a3da2-9320-421b-9f55-cbbc1a7bef71' \
  -H 'cache-control: no-cache' \
  -d 'address=127My5Q5mg53VNYAaBivBvNx3oUwedWPaw&signature=H3ZWzLh8PwTGd9YSaaHHhBznscvP1jgIUt6sQo%2BAqF4rUsu5Z9WIQqTF4iqhabgS0%2BHAQy0ZKCAXL%2BVYDIrKNAM%3D'
```
__/block/__ - After the user ensures that he owns the wallet, he can request the registration of a star in the block

```
curl -X POST \
  http://localhost:8000/block \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: d1094c8c-fd80-468e-a779-f24aae46a1aa' \
  -H 'cache-control: no-cache' \
  -d '{
    "address": "127My5Q5mg53VNYAaBivBvNx3oUwedWPaw",
    "star": {
                "dec": "DEC",
                "ra": "RA",
                "mag": "MAG",
                "cen": "CEN",
                "story": "Found star using https://www.google.com/sky/"
            }
}'
```

### GET Endpoints
__stars/hash:[HASH]__ - Get Star block by hash with JSON response.
```
curl -X GET \
  http://localhost:8000/stars/hash:92f929f60802d5f22e8618c0564bb7c2f0cfa3b0efc2d67cfaca2e325d475d8a \
  -H 'Postman-Token: 8ed69f69-3b3b-4e0c-b8ba-e7074af91fc0' \
  -H 'cache-control: no-cache'
```

__stars/address:[ADDRESS]__ - Get star block by star block height with JSON response.
```
curl -X GET \
  http://localhost:8000/block/4 \
  -H 'Postman-Token: cd307a4b-d34b-497a-a660-6ebffce472df' \
  -H 'cache-control: no-cache'
```

__/block/[HEIGHT]__ - Get Star block by wallet address (blockchain identity) with JSON response.
```
curl -X GET \
  http://localhost:8000/stars/address:127My5Q5mg53VNYAaBivBvNx3oUwedWPaw \
  -H 'Postman-Token: c895337f-7e95-4911-a988-deec92dea0d0' \
  -H 'cache-control: no-cache'
```
