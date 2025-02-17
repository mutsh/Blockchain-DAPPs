# Decentralized Voting DApp
A blockchain-based voting system built using Solidity, React, and Hardhat.

## Features
- Secure and transparent voting process.
- MetaMask integration for authentication.
- Smart contract deployed on Ethereum testnet.

## Setup Instructions
1. Clone the repository: `git clone <your-repo-url>`
2. Install dependencies:
   ```sh
   cd frontend && npm install
   cd ../smart-contracts && npm install
   ```
3. Deploy smart contract:
   ```sh
   cd smart-contracts
   npx hardhat run scripts/deploy.js --network goerli
   ```
4. Update frontend `.env` with contract address.
5. Start the frontend:
   ```sh
   cd frontend && npm start
   ```
