const hre = require("hardhat")

async function main() {
	const MarketSentiment = await hre.ethers.getContractFactory("MarketSentiment")
	const marketsentiment = await MarketSentiment.deploy()

	await marketsentiment.deployed()

	console.log("MarketSentiment deployed to:", MarketSentiment.address)
}

main().catch((error) => {
	console.error(error)
	process.exitCode = 1
})
