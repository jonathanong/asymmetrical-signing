# Asymmetrical Signing

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

Asymmetrical signing using [secp256k1](https://github.com/cryptocoinjs/secp256k1-node).
Sign data with a private key, the allow others to verify the data with a public key.

## Example

```js
const asign = require('asymmetrical-signing')

// create keys
const privateKey = asign.createPrivateKey()
const publicKey = asign.createPublicKey(privateKey)

// convert some data into a message
const message = asign.createMessage({
  message: 'something'
})

// sign it with the private ey
const signature = asign.signMessage(message, privateKey)

// verify the data with a public key
console.log(asign.verifyMessage(message, signature, publicKey))
```

## Data

Types of data supported:

- `string`
- `Buffer`
- `object`s
- `array`s

[npm-image]: https://img.shields.io/npm/v/asymmetrical-signing.svg?style=flat-square
[npm-url]: https://npmjs.org/package/asymmetrical-signing
[travis-image]: https://img.shields.io/travis/jonathanong/asymmetrical-signing/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/jonathanong/asymmetrical-signing
[codecov-image]: https://img.shields.io/codecov/c/github/jonathanong/asymmetrical-signing/master.svg?style=flat-square
[codecov-url]: https://codecov.io/github/jonathanong/asymmetrical-signing
[david-image]: http://img.shields.io/david/jonathanong/asymmetrical-signing.svg?style=flat-square
[david-url]: https://david-dm.org/jonathanong/asymmetrical-signing
[license-image]: http://img.shields.io/npm/l/asymmetrical-signing.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/asymmetrical-signing.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/asymmetrical-signing
