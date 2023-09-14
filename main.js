const fs = require('fs');
const yargs = require('yargs');
const { initializeWeb3 } = require('./utils/web3Initializer');
const { isValidEthereumAddress } = require('./utils/validators');
const { getContractName } = require('./contract/contractInfo');

function readAddressesFromFile(filename) {
    try {
        const data = fs.readFileSync(filename, 'utf8');
        return data.split('\n').filter(address => address.trim() !== '');
    } catch (err) {
        console.error(`Error reading addresses from file: ${err}`);
        return [];
    }
}

async function main() {
    const argv = yargs
        .option('addresses', {
            alias: 'a',
            description: 'Ethereum addresses to check',
            type: 'array',
        })
        .option('rpc-url', {
            alias: 'r',
            description: 'Ethereum RPC URL',
            default: 'https://mainnet.infura.io/v3/<infura api key>',
            type: 'string',
        })
        .help()
        .alias('help', 'h')
        .argv;

    let addresses = readAddressesFromFile('addresses.txt');

    if (argv.addresses && argv.addresses.length > 0) {
        addresses = addresses.concat(argv.addresses);
    }

    if (addresses.length === 0) {
        console.log('No addresses provided or found in addresses.txt');
        return;
    }

    const web3 = initializeWeb3(argv.rpcUrl);

    for (const address of addresses) {
        if (!isValidEthereumAddress(web3, address)) {
            console.log(`${address} is not a valid Ethereum address.`);
            continue;
        }

        const name = await getContractName(web3, address);
        if (name) {
            console.log(`Address ${address} is a contract with name: ${name}`);
        } else {
            console.log(`Address ${address} is not a contract`);
        }
    }
}

main().catch(console.error);