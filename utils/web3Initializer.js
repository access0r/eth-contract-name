const Web3 = require('web3').default;

function initializeWeb3(rpcUrl) {
    return new Web3(rpcUrl);
}

module.exports = {
    initializeWeb3
};