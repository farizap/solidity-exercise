import { loadFixture } from "@nomicfoundation/hardhat-network-helpers"
import { expect } from "chai"
import { ethers } from "hardhat"

describe("Palindrome", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploy() {
    // Contracts are deployed using the first signer/account by default
    const Palindrome = await ethers.getContractFactory("Palindrome")
    const palindrom = await Palindrome.deploy()

    return { palindrom }
  }

  describe("isPalindrome", function () {
    const testCases = [
      {
        keyword: "",
        expected: false,
      },
      {
        keyword: "s",
        expected: false,
      },
      {
        keyword: "katak",
        expected: true,
      },
      {
        keyword: "mister",
        expected: false,
      },
      {
        keyword: "taat",
        expected: true,
      },
      {
        keyword: "maaf",
        expected: false,
      },
    ]

    const promises = testCases.map(async ({ keyword, expected }) => {
      it(`Should get palindrom=${expected} when keyword=${keyword}`, async function () {
        const { palindrom } = await loadFixture(deploy)

        expect(await palindrom.isPalindrome(keyword)).to.equal(expected)
      })
      await Promise.all(promises)
    })
  })
})
