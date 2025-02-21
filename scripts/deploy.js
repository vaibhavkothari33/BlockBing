const hre = require("hardhat");

async function main() {
  const MovieNFT = await hre.ethers.getContractFactory("MovieNFT");
  const movieNFT = await MovieNFT.deploy();

  await movieNFT.deployed();

  console.log("MovieNFT deployed to:", movieNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 