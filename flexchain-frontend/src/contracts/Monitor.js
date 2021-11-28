export const abi=[
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "newContract",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "newContract",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newProcess",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "instantiateProcess",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];