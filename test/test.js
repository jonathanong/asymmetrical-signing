'use strict'

/* eslint-env mocha */

const assert = require('assert')
const sign = require('..')

describe('Asymmetrical Signing', () => {
  let privateKey
  let publicKey

  describe('keys', () => {
    it('should create a private key', () => {
      privateKey = sign.createPrivateKey()
      assert(privateKey)
    })

    it('should create public keys', () => {
      publicKey = sign.createPublicKey(privateKey)
      assert(publicKey)
    })
  })

  describe('creating a message from a ', () => {
    describe('string', () => {

    })

    describe('buffer', () => {

    })

    describe('object', () => {
      it('should make the same message regardless of key order', () => {
        const msg1 = sign.createMessage({
          a: 1,
          b: 2
        })
        const msg2 = sign.createMessage({
          b: 2,
          a: 1
        })
        assert(msg1.equals(msg2))
        assert(!(msg1 % 32))
      })
    })

    describe('array', () => {

    })
  })

  function testSigning (data) {
    const message = sign.createMessage(data)
    const signature = sign.signMessage(message, privateKey)
    assert(sign.verifyMessage(message, signature, publicKey))
  }

  describe('signing a', () => {
    describe('string', () => {
      it('should verify', () => {
        const data = 'lkajsdfljasdfljsadlkfjlaskjdf'
        testSigning(data)
      })
    })

    describe('buffer', () => {
      it('should verify', () => {
        const data = new Buffer('lkajsdfljasdfljsadlkfjlaskjdf')
        testSigning(data)
      })
    })

    describe('object', () => {
      it('should verify', () => {
        const data = {
          a: 1,
          b: 2
        }
        testSigning(data)
      })

      it('should verify large objects', () => {
        const data = {
          a: Math.random(),
          b: Math.random(),
          c: Math.random(),
          d: Math.random(),
          e: Math.random(),
        }
      })
    })

    describe('array', () => {
      it('should verify', () => {
        const data = [1, 2, 3, 4, 5]
        testSigning(data)
      })
    })
  })
})
