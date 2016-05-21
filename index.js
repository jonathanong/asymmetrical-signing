'use strict'

const { randomBytes, createHash } = require('crypto')
const stringify = require('json-stringify-safe')
const { isPlainObject } = require('lodash')
const secp256k1 = require('secp256k1')
const sort = require('sorted-object')

exports.createPrivateKey = () => {
  // generate privKey
  let privKey
  do {
    privKey = randomBytes(32)
  } while (!secp256k1.privateKeyVerify(privKey))
  return privKey
}

exports.createPublicKey = privateKey => {
  return secp256k1.publicKeyCreate(privateKey)
}

exports.createMessage = data => {
  if (isPlainObject(data)) data = stringify(sort(data))
  else if (Array.isArray(data)) data = stringify(data)
  return createHash('sha256').update(data).digest()
}

exports.signMessage = (message, privateKey) => {
  return secp256k1.sign(message, privateKey).signature
}

exports.verifyMessage = (message, signature, publicKey) => {
  return secp256k1.verify(message, signature, publicKey)
}
