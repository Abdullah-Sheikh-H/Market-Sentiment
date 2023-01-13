const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { network } = require("hardhat")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const args = []

    const marketSentiment = await deploy("MarketSentiment", {
        contract: "MarketSentiment",
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    if (!developmentChains.includes(network.name) && process.env.API_KEY) {
        await verify(marketSentiment.address, args)
    }

    log("---------------------------------------------------")
}

module.exports.tags = ["all", "MarketSentiment"]
