
// Client-side 
document.addEventListener('DOMContentLoaded', async () => {
    // connect to MetaMask wallet
    async function connectWallet() {

        if (typeof window.ethereum !== 'undefined') {
            try {
                // Request account access
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                const address = accounts[0];
                document.getElementById('walletStatus').innerText = `Wallet Status: Connected (${address})`;
            } catch (error) {
                console.error('Failed to connect to wallet:', error);
            }
        } else {
            console.error('MetaMask is not installed');
        }
    }

    // Event listener for connecting wallet button
    document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);
});
