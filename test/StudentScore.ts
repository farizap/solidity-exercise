import { loadFixture } from "@nomicfoundation/hardhat-network-helpers"
import { expect } from "chai"
import { ethers } from "hardhat"

describe("StudentScore", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploy() {
    // Contracts are deployed using the first signer/account by default
    const StudentScore = await ethers.getContractFactory("StudentScore")
    const studentScore = await StudentScore.deploy()

    return { studentScore }
  }

  describe("getStudentScore", function () {
    const testCases = [
      {
        score: -1,
        expectedGrad: "Nilai Invalid",
      },
      {
        score: 0,
        expectedGrad: "E",
      },
      {
        score: 34,
        expectedGrad: "E",
      },
      {
        score: 35,
        expectedGrad: "D",
      },
      {
        score: 49,
        expectedGrad: "D",
      },
      {
        score: 50,
        expectedGrad: "C",
      },
      {
        score: 64,
        expectedGrad: "C",
      },
      {
        score: 65,
        expectedGrad: "B",
      },
      {
        score: 79,
        expectedGrad: "B",
      },
      {
        score: 80,
        expectedGrad: "A",
      },
      {
        score: 100,
        expectedGrad: "A",
      },
      {
        score: 101,
        expectedGrad: "Nilai Invalid",
      },
    ]

    const promises = testCases.map(async ({ score, expectedGrad }) => {
      it(`Should get ${expectedGrad} for score: ${score}`, async function () {
        const { studentScore } = await loadFixture(deploy)

        expect(await studentScore.getStudentScore(score)).to.equal(expectedGrad)
      })
      await Promise.all(promises)
    })
  })
})
