import {useState} from "react";

 export const Counter = ()=>{
    const [address,setAddress]=useState(null);

    return {address,setAddress}

};


export const BYTECODE = '0x6080604052348015600f57600080fd5b5060dd8061001e6000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80633fa4f245146037578063e8927fbc146053575b600080fd5b603d605b565b6040518082815260200191505060405180910390f35b60596061565b005b60005481565b6001600054016000819055507f3496c3ede4ec3ab3686712aa1c238593ea6a42df83f98a5ec7df9834cfa577c56000546040518082815260200191505060405180910390a156fea265627a7a72315820a66fce44c481b2e6b45a8fea0e0160100c70ccb02427528cc94fbdb4094effb964736f6c63430005100032';

export const ABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "newValue",
                "type": "uint256"
            }
        ],
        "name": "Increased",
        "type": "event"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "value",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "increase",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];