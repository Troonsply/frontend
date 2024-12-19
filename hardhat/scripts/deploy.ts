import { ethers } from "hardhat";

async function main() {
    // Получаем фабрику контракта
    const Lock = await ethers.getContractFactory("Lock");

    // Передаём аргумент для конструктора: время разблокировки
    const unlockTime = Math.floor(Date.now() / 1000) + 60 * 60; // Текущее время + 1 час
    const contract = await Lock.deploy(unlockTime, { value: ethers.parseEther("1.0") });

    console.log("Contract deploying...");
    await contract.waitForDeployment();

    console.log("Contract deployed to:", await contract.getAddress());
    console.log("Unlock time is:", unlockTime);
}

main().catch((error) => {
    console.error("Error during deployment:", error);
    process.exitCode = 1;
});

