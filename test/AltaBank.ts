import { loadFixture } from "@nomicfoundation/hardhat-network-helpers"
import { expect } from "chai"
import { ethers } from "hardhat"

describe("AltaBank", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploy() {
    // Contracts are deployed using the first signer/account by default
    const AltaBank = await ethers.getContractFactory("AltaBank")
    const smartContract = await AltaBank.deploy()

    return { smartContract }
  }

  describe("transfer", function () {
    it("Should success transfer ", async function () {
      const { smartContract } = await loadFixture(deploy)
      const [owner, addr1] = await ethers.getSigners()

      expect(await smartContract.balanceOf(owner.address)).to.equal(100)
      expect(await smartContract.balanceOf(addr1.address)).to.equal(0)

      await expect(smartContract.transfer(addr1.address, 50)).to.emit(smartContract, "Transfer").withArgs(owner.address, addr1.address, 50)
      expect(await smartContract.balanceOf(owner.address)).to.equal(50)
      expect(await smartContract.balanceOf(addr1.address)).to.equal(50)
    })

    it("Should give error Too few tokens ", async function () {
      const { smartContract } = await loadFixture(deploy)
      const [owner, addr1, addr2] = await ethers.getSigners()

      expect(await smartContract.balanceOf(owner.address)).to.equal(100)
      expect(await smartContract.balanceOf(addr1.address)).to.equal(0)
      expect(await smartContract.balanceOf(addr2.address)).to.equal(0)

      await expect(smartContract.connect(addr1).transfer(addr1.address, 50)).to.be.revertedWith("Too few tokens")
      expect(await smartContract.balanceOf(owner.address)).to.equal(100)
      expect(await smartContract.balanceOf(addr1.address)).to.equal(0)
      expect(await smartContract.balanceOf(addr2.address)).to.equal(0)
    })

    it("Should give error insufficient balance ", async function () {
      const { smartContract } = await loadFixture(deploy)
      const [owner, addr1] = await ethers.getSigners()

      expect(await smartContract.balanceOf(owner.address)).to.equal(100)
      expect(await smartContract.balanceOf(addr1.address)).to.equal(0)

      await expect(smartContract.transfer(addr1.address, 200)).to.be.revertedWith("Insufficient balance")
      expect(await smartContract.balanceOf(owner.address)).to.equal(100)
      expect(await smartContract.balanceOf(addr1.address)).to.equal(0)
    })
  })
})
