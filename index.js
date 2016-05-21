'use strict'

const stringify = require('json-stringify-safe')
const secp256k1 = require('secp256k1')
const sort = require('sorted-object')
const crypto = require('crypto')
const _ = require('lodash')

exports.createPrivateKey = () => {
  // generate privKey
  let privKey
  do {
    privKey = crypto.randomBytes(32)
  } while (!secp256k1.privateKeyVerify(privKey))
  return privKey
}

exports.createPublicKey = privateKey => {
  return secp256k1.publicKeyCreate(privateKey)
}

exports.createMessage = data => {
  if (_.isPlainObject(data)) data = stringify(sort(data))
  else if (Array.isArray(data)) data = stringify(data)
  return crypto.createHash('sha256').update(data).digest()
}

exports.signMessage = (message, privateKey) => {
  return secp256k1.sign(message, privateKey).signature
}

exports.verifyMessage = (message, signature, publicKey) => {
  return secp256k1.verify(message, signature, publicKey)
}
