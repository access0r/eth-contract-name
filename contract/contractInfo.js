async function getContractName(web3, address) {
    const code = await web3.eth.getCode(address);
    if (code === '0x') {
        return null;
    }

    const contract = new web3.eth.Contract([{
        constant: true,
        inputs: [],
        name: 'name',
        outputs: [{ name: '', type: 'string' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    }], address);

    try {
        return await contract.methods.name().call();
    } catch (error) {
        console.error(`Error fetching name for contract ${address}: ${error}`);
        return "Unknown Contract";
    }
}

module.exports = {
    getContractName
};