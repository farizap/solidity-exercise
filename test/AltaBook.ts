import { loadFixture } from "@nomicfoundation/hardhat-network-helpers"
import { expect } from "chai"
import { ethers } from "hardhat"

describe("AltaBook", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploy() {
    // Contracts are deployed using the first signer/account by default
    const AltaBook = await ethers.getContractFactory("AltaBook")
    const smartContract = await AltaBook.deploy()

    return { smartContract }
  }

  describe("setBuku", function () {
    it("Should setBuku ", async function () {
      const { smartContract } = await loadFixture(deploy)

      const initialBook = await smartContract.getBuku()
      expect(initialBook[0]).to.equal("")
      expect(initialBook[1]).to.equal("")
      expect(initialBook[1]).to.equal("")

      await smartContract.setBuku("Alta Blockchain", "Alta", 2023)
      const afterSetBuku = await smartContract.getBuku()
      expect(afterSetBuku[0]).to.equal("Alta Blockchain")
      expect(afterSetBuku[1]).to.equal("Alta")
      expect(afterSetBuku[2]).to.equal("2023")
    })
  })
})
