
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import VotingContract from "./Voting.json";

const contractAddress = "YOUR_CONTRACT_ADDRESS";
const abi = VotingContract.abi;

export default function App() {
    const [candidates, setCandidates] = useState([]);
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        async function loadBlockchainData() {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(contractAddress, abi, signer);

                setContract(contract);
                const accounts = await provider.send("eth_requestAccounts", []);
                setAccount(accounts[0]);

                const candidateList = await contract.getCandidates();
                setCandidates(candidateList.map((c, index) => ({ name: c.name, votes: c.voteCount.toNumber(), index })));
            } else {
                alert("Please install MetaMask");
            }
        }
        loadBlockchainData();
    }, []);

    const vote = async (candidateIndex) => {
        if (contract) {
            const tx = await contract.vote(candidateIndex);
            await tx.wait();
            alert("Vote cast successfully!");
            window.location.reload();
        }
    };

    return (
        <div>
            <h1>Decentralized Voting System</h1>
            <p>Connected Account: {account}</p>
            <ul>
                {candidates.map((candidate) => (
                    <li key={candidate.index}>
                        {candidate.name} - {candidate.votes} votes
                        <button onClick={() => vote(candidate.index)}>Vote</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
