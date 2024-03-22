const developmentChains = ["hardhat", "localhost"]
const blockConfirmations = 6
const networkConfig = {
    1: {
        name: "mainnet",
        ethUsdPriceFeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
        blockConfirmations,
    },
    11155111: {
        name: "sepolia",
        ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
        blockConfirmations,
    },
    137: {
        name: "polygon",
        ethUsdPriceFeed: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
        blockConfirmations,
    },
    80001: {
        name: "mumbai",
        ethUsdPriceFeed: "0x0715A7794a1dc8e42615F059dD6e406A6594651A",
        blockConfirmations,
    },
    31337: {
        name: "hardhat",
        blockConfirmations: 0,
    },
}

const DECIMALS = 8
const INITIAL_ANSWER = 340000000000

export { networkConfig, developmentChains, DECIMALS, INITIAL_ANSWER }
