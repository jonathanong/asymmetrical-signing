'use strict'

/* global suite bench */

const sign = require('..')

const privateKey = sign.createPrivateKey()
const publicKey = sign.createPublicKey(privateKey)

suite('Asymmetrical Signing', () => {
  bench('sign and verify strings', () => {
    signAndVerify(Math.random().toString())
  })

  bench('sign and verify buffers', () => {
    signAndVerify(new Buffer(Math.random().toString()))
  })

  bench('sign and verify objects', () => {
    signAndVerify({
      a: Math.random(),
      b: Math.random(),
      c: Math.random(),
      d: Math.random(),
      e: Math.random()
    })
  })

  bench('sign and verify arrays', () => {
    signAndVerify([
      Math.random(),
      Math.random(),
      Math.random(),
      Math.random(),
      Math.random()
    ])
  })
})

function signAndVerify (data) {
  const message = sign.createMessage(data)
  const signature = sign.signMessage(message, privateKey)
  sign.verifyMessage(message, signature, publicKey)
}
