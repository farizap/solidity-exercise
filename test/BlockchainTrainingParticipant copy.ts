import { loadFixture } from "@nomicfoundation/hardhat-network-helpers"
import { expect } from "chai"
import { ethers } from "hardhat"

describe("BlockchainTrainingParticipant", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploy() {
    // Contracts are deployed using the first signer/account by default
    const BlockchainTrainingParticipant = await ethers.getContractFactory("BlockchainTrainingParticipant")
    const smartContract = await BlockchainTrainingParticipant.deploy()

    return { smartContract }
  }

  describe("addParticipantName", function () {
    it("Should add names", async function () {
      const { smartContract } = await loadFixture(deploy)

      const initialName = await smartContract.getParticipantName()
      expect(initialName.length).to.equal(0)

      await smartContract.addParticipantName("Budi")

      const afterInsertName1 = await smartContract.getParticipantName()
      expect(afterInsertName1[0]).to.equal("Budi")

      await smartContract.addParticipantName("Joko")
      const afterInsertName2 = await smartContract.getParticipantName()
      expect(afterInsertName2[0]).to.equal("Budi")
      expect(afterInsertName2[1]).to.equal("Joko")
    })
  })
})
