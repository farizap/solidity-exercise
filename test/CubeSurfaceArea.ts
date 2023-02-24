import { loadFixture } from "@nomicfoundation/hardhat-network-helpers"
import { expect } from "chai"
import { ethers } from "hardhat"

describe("CubeSurfaceArea", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploy() {
    // Contracts are deployed using the first signer/account by default
    const CubeSurfaceArea = await ethers.getContractFactory("CubeSurfaceArea")
    const cubeSurfaceArea = await CubeSurfaceArea.deploy()

    return { cubeSurfaceArea }
  }

  describe("getCubeSurfaceArea", function () {
    it("Should calculate cube area", async function () {
      const { cubeSurfaceArea } = await loadFixture(deploy)

      expect(await cubeSurfaceArea.getCubeSurfaceArea(10)).to.equal(600)
    })
  })
})
