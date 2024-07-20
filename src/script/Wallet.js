const provider = new ethers.providers.JsonRpcProvider('https://moonbase-alpha.public.blastapi.io');

const privateKey = localStorage.getItem("privateKey");
const wallet = new ethers.Wallet(privateKey, provider);

const contacts = {
    "Pablo": "0xf672563A8Ab2216a5eE083d3C3AD113ED2a0D443",
    "Fox": "0x8ef0cC03eA37A0aeAc59FA52E360856228B209e9",
    "Dom": "0x8dF3dF43766856ECdc4C82cf36568eed865d785a"
}

async function sendEther(amount, person) {
    try {
        const address = contacts[person]

        if (!address) {
            alert(`Address of ${person} not found - cannot send!`)
            return;
        }

        const tx = {
            to: address,
            value: ethers.utils.parseEther(amount)
        };

        const txResponse = await wallet.sendTransaction(tx);
        console.log('Transaction hash:', txResponse.hash);

        outputDiv.textContent = `Sending ${amount} DEV to ${person}, tx hash: ${txResponse.hash}: status - pending`;

        const receipt = await txResponse.wait();
        console.log('Transaction was mined in block', receipt.blockNumber);
        outputDiv.textContent = `Sending ${amount} DEV to ${person}, tx hash: ${txResponse.hash}: status - sent`;
    } catch (error) {
        console.error('Error sending transaction:', error);
    }
}
