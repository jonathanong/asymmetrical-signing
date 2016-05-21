'use strict'

const secp256k1 = require('secp256k1')
const hash = require('object-hash')
const crypto = require('crypto')

const OBJECT_HASH_OPTIONS = {
  algorithm: 'sha256',
  encoding: 'buffer',
  respectType: false,
  unorderedArrays: false,
}

exports.createPrivateKey = () => {
  // generate privateKey
  let privateKey
  do {
    privateKey = crypto.randomBytes(32)
  } while (!secp256k1.privateKeyVerify(privateKey))
  return privateKey
}

exports.createPublicKey = privateKey => {
  return secp256k1.publicKeyCreate(privateKey)
}

exports.createMessage = data => {
  return hash(data, OBJECT_HASH_OPTIONS)
}

exports.signMessage = (message, privateKey) => {
  return secp256k1.sign(message, privateKey).signature
}

exports.verifyMessage = (message, signature, publicKey) => {
  return secp256k1.verify(message, signature, publicKey)
}
