import { loadFixture } from "@nomicfoundation/hardhat-network-helpers"
import { expect, use } from "chai"
import { ethers } from "hardhat"
import { solidity } from "ethereum-waffle";

use(solidity);

describe("MyContract", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploy() {
    // Contracts are deployed using the first signer/account by default
    const MyContract = await ethers.getContractFactory("MyContract")
    const smartContract = await MyContract.deploy()

    return { smartContract }
  }

  describe("getArrayUnique", async function () {
    const testCases = [
      {
        dataA: [1, 2, 3, 4],
        dataB: [1, 3, 5, 10, 16],
        expected: [2, 4],
      },
      {
        dataA: [3, 8],
        dataB: [2, 8],
        expected: [3],
      },
    ]

    const promises = testCases.map(async ({ dataA, dataB, expected }) => {
      it(`Should get ${expected}`, async function () {
        const { smartContract } = await loadFixture(deploy)

        const initialResult = await smartContract.getArrayUnique()
        expect(initialResult).to.have.all.members([])

        await smartContract.setArrayUnique(dataA, dataB)
        const result = await smartContract.getArrayUnique()
        expected.forEach((num, idx) => {
          expect(result[idx]).to.equal(num)
        })
      })
    })
    await Promise.all(promises)
  })
})
