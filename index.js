'use strict'

const stringify = require('json-stringify-safe')
const { isPlainObject } = require('lodash')
const { randomBytes } = require('crypto')
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
  else if (!Buffer.isBuffer(data) && typeof data !== 'string') data = stringify(data)
  const length = Math.ceil(Buffer.byteLength(data) / 32) * 32
  const buffer = new Buffer(length)
  buffer.fill(0)
  if (Buffer.isBuffer(data)) data.copy(buffer)
  else buffer.write(data)
  return buffer
}

exports.signMessage = (message, privateKey) => {
  return secp256k1.sign(message, privateKey).signature
}

exports.verifyMessage = (message, signature, publicKey) => {
  return secp256k1.verify(message, signature, publicKey)
}
