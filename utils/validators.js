function isValidEthereumAddress(web3, address) {
    return web3.utils.isAddress(address);
}

module.exports = {
    isValidEthereumAddress
};