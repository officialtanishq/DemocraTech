import React, { useState } from 'react';
import Web3 from 'web3';

function App() {
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);
    const [voted, setVoted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [voteOption, setVoteOption] = useState('');

    const connectToBlockchain = async () => {
        try {
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum);
                await window.ethereum.enable();
                const accounts = await web3Instance.eth.getAccounts();
                setWeb3(web3Instance);
                setAccount(accounts[0]);
            } else {
                alert('Please install MetaMask to use this dApp.');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to connect to blockchain.');
        }
    };

    const vote = async () => {
        try {
            setLoading(true);
            // Your voting logic here
            setLoading(false);
            setVoted(true);
            alert('Vote submitted successfully!');
        } catch (error) {
            console.error(error);
            setLoading(false);
            alert('Failed to submit vote.');
        }
    };

    return (
        <div className="App">
            <h1>DemocraTech: Trustworthy Voting Systems</h1>
            <p>Connect your wallet to vote:</p>
            <button onClick={connectToBlockchain}>Connect Wallet</button>
            {account && (
                <div>
                    <h2>Vote</h2>
                    {!voted ? (
                        <div>
                            <input
                                type="text"
                                placeholder="Enter your vote"
                                value={voteOption}
                                onChange={(e) => setVoteOption(e.target.value)}
                            />
                            <button onClick={vote} disabled={!voteOption || loading}>
                                {loading ? 'Submitting Vote...' : 'Submit Vote'}
                            </button>
                        </div>
                    ) : (
                        <p>You have already voted.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
