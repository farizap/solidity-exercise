import { loadFixture } from "@nomicfoundation/hardhat-network-helpers"
import { expect } from "chai"
import { ethers } from "hardhat"

describe("Vehicle", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploy() {
    // Contracts are deployed using the first signer/account by default
    const Vehicle = await ethers.getContractFactory("Vehicle")
    const smartContract = await Vehicle.deploy()

    return { smartContract }
  }

  describe("identityMyself", function () {
    it("Should return \"I'm Vehicle, I don't have Engine\" ' ", async function () {
      const { smartContract } = await loadFixture(deploy)

      expect(await smartContract.identityMyself()).to.equal("I'm Vehicle, I don't have Engine")
    })
  })
})

describe("Car", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploy() {
    // Contracts are deployed using the first signer/account by default
    const Car = await ethers.getContractFactory("Car")
    const smartContract = await Car.deploy()

    return { smartContract }
  }

  describe("identityMyself", function () {
    it("Should return \"I'm Car, I have Engine\" ' ", async function () {
      const { smartContract } = await loadFixture(deploy)

      expect(await smartContract.identityMyself()).to.equal("I'm Car, I have Engine")
    })
  })
})

describe("Bike", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploy() {
    // Contracts are deployed using the first signer/account by default
    const Bike = await ethers.getContractFactory("Bike")
    const smartContract = await Bike.deploy()

    return { smartContract }
  }

  describe("identityMyself", function () {
    it("Should return \"I'm Bike, I don't have Engine\" ' ", async function () {
      const { smartContract } = await loadFixture(deploy)

      expect(await smartContract.identityMyself()).to.equal("I'm Bike, I don't have Engine")
    })
  })
})
