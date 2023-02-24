import { loadFixture } from "@nomicfoundation/hardhat-network-helpers"
import { expect } from "chai"
import { ethers } from "hardhat"

describe("PrimeNumber", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploy() {
    // Contracts are deployed using the first signer/account by default
    const PrimeNumber = await ethers.getContractFactory("PrimeNumber")
    const primeNumber = await PrimeNumber.deploy()

    return { primeNumber }
  }

  describe("isPrimeNumber", function () {
    const testCases = [
      {
        number: -1,
        expected: false,
      },
      {
        number: 0,
        expected: false,
      },
      {
        number: 1,
        expected: false,
      },
      {
        number: 2,
        expected: true,
      },
      {
        number: 3,
        expected: true,
      },
      {
        number: 4,
        expected: false,
      },
      {
        number: 13,
        expected: true,
      },
      {
        number: 6,
        expected: false,
      },
    ]

    const promises = testCases.map(async ({ number, expected }) => {
      it(`Should get prime=${expected} when number=${number}`, async function () {
        const { primeNumber } = await loadFixture(deploy)

        expect(await primeNumber.isPrimeNumber(number)).to.equal(expected)
      })
      await Promise.all(promises)
    })
  })
})
