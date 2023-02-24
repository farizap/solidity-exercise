import { loadFixture } from "@nomicfoundation/hardhat-network-helpers"
import { expect } from "chai"
import { ethers } from "hardhat"

describe("Calculator", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploy() {
    // Contracts are deployed using the first signer/account by default
    const Calculator = await ethers.getContractFactory("Calculator")
    const calculator = await Calculator.deploy()

    return { calculator }
  }

  describe("add", function () {
    it("Should 10 + 10 = 20", async function () {
      const { calculator } = await loadFixture(deploy)

      expect(await calculator.add(10, 10)).to.equal(20)
    })
  })

  describe("multiply", function () {
    it("Should 2 * 4 = 8", async function () {
      const { calculator } = await loadFixture(deploy)

      expect(await calculator.multiply(2, 4)).to.equal(8)
    })
  })

  describe("divide", function () {
    it("Should 10 / 5 = 2", async function () {
      const { calculator } = await loadFixture(deploy)

      expect(await calculator.divide(10, 5)).to.equal(2)
    })
  })

  describe("substract", function () {
    it("Should 4 - 6 = -2", async function () {
      const { calculator } = await loadFixture(deploy)

      expect(await calculator.subtract(4, 6)).to.equal(-2)
    })
  })
})
