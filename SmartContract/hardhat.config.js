require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("hardhat-deploy")

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners()

    for (const account of accounts) {
        console.log(account.address)
    }
})

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
    solidity: "0.8.7",
    defaultNetwork: "hardhat",

    networks: {
        mumbai: {
            url: process.env.POLYGON_MUMBAI,
            accounts: [process.env.PRIVATE_KEY],
            chainId: 80001,
            blockConfirmations: 6,
        },
    },
    etherscan: {
        apiKey: process.env.API_KEY,
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        user: {
            default: 1,
        },
    },
}

// require("@nomiclabs/hardhat-waffle")
// require("hardhat-gas-reporter")
// require("@nomiclabs/hardhat-etherscan")
// require("dotenv").config()
// require("solidity-coverage")
// require("hardhat-deploy")
// // You need to export an object to set up your config
// // Go to https://hardhat.org/config/ to learn more
// /**
//  * @type import('hardhat/config').HardhatUserConfig
//  */

// module.exports = {
//     solidity: "0.8.7",
//     networks: {
//         mumbai: {
//             url: process.env.POLYGON_MUMBAI,
//             accounts: [process.env.PRIVATE_KEY],
//         },
//     },
//     etherscan: {
//         apiKey: process.env.API_KEY,
//     },
// }
