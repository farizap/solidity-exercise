import { loadFixture } from "@nomicfoundation/hardhat-network-helpers"
import { expect } from "chai"
import { ethers } from "hardhat"

describe("Exponantial", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploy() {
    // Contracts are deployed using the first signer/account by default
    const Exponantial = await ethers.getContractFactory("Exponantial")
    const exponantial = await Exponantial.deploy()

    return { exponantial }
  }

  describe("isExponantial", function () {
    const testCases = [
      {
        x: 2,
        n: 3,
        expected: 8,
      },
      {
        x: 7,
        n: 2,
        expected: 49,
      },
      {
        x: 2,
        n: 0,
        expected: 1,
      },
      {
        x: -2,
        n: 2,
        expected: 4,
      },
      {
        x: -2,
        n: 3,
        expected: -8,
      },
    ]

    const promises = testCases.map(async ({ x, n, expected }) => {
      it(`Should get prime=${expected} when x=${x} and n=${n}`, async function () {
        const { exponantial } = await loadFixture(deploy)

        expect(await exponantial.getExponantial(x, n)).to.equal(expected)
      })
      await Promise.all(promises)
    })
  })
})
