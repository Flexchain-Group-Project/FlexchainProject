import Web3 from "web3";
import {abi} from '../../contracts/Monitor'

export async function mockAPI(contractName) {
    const response = await fetch('https://8a0e6be3-45af-4b45-9b82-2c5a99bd5d40.mock.pstmn.io/process');
    response.json().then(res => {
        console.log(res);
        // deploy2(res)
        console.log("contractName:"+contractName);
        deploy(contractName,res.abi,res.bytecode);

    });

}

export async function deploy2(contract) {
    await deploy(contract.contractName, contract.abi, contract.bytecode);
}

export function getWeb3() {
    return new Web3(Web3.givenProvider || "ws://localhost:8545");
}

export async function getSender(web3) {
    //  const accounts = await window.ethereum.enable();
    // return accounts[0];
    const accounts = await web3.eth.requestAccounts();
    return accounts[0];
}

export function getContract(web3, abi) {

    return new web3.eth.Contract(abi);

}

export async function deploy(name, abi, bytecode) {
    const web3 = getWeb3();
    const account = await getSender(web3);
    const contract = getContract(web3, abi);
    const cont = await contract.deploy({data: bytecode,arguments:[account,name]}).send({from: account});
    const address = cont.options.address;
    const jsonData = {"address": address, "abi": abi};
    setRules(address,abi,account,web3);

}

export async function setRules(address,abi,account,web3){
    const contract = new web3.eth.Contract(abi,address);
    const ids = await fetch('https://8a0e6be3-45af-4b45-9b82-2c5a99bd5d40.mock.pstmn.io/generate-rules-id');
    const rules = await fetch('https://8a0e6be3-45af-4b45-9b82-2c5a99bd5d40.mock.pstmn.io/generate-rules');
    //ids.json().then(res=>console.log(res));
    const id = (await ids.text()).split(',');
    console.log(id);
    const rul = (await rules.text()).split(',');
    console.log(rul);

  await contract.methods.setRules(id,rul).send({from: account});
}

export async function deployMonitor(){
    const web3 = getWeb3();
    const contract = new web3.eth.Contract(abi)

    const account = await getSender(web3);

    const cont = await contract.deploy({data:'0x608060405234801561001057600080fd5b506101a1806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063a54cbd9814610030575b600080fd5b61004a600480360381019061004591906100b3565b61004c565b005b8073ffffffffffffffffffffffffffffffffffffffff167fe4f1e239ef633924ba611260f27425b0855d45f598b69b49f08f8dd9b2cc0fac836040516100929190610102565b60405180910390a25050565b6000813590506100ad81610154565b92915050565b600080604083850312156100ca576100c961014f565b5b60006100d88582860161009e565b92505060206100e98582860161009e565b9150509250929050565b6100fc8161011d565b82525050565b600060208201905061011760008301846100f3565b92915050565b60006101288261012f565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600080fd5b61015d8161011d565b811461016857600080fd5b5056fea26469706673582212203126e1a7f42d488132dcb6db40faf2f5b65d90983dfb82ea0f98d98c79e1d69864736f6c63430008070033'}).send({gas: 1000000, from: account});
    const address = cont.options.address;
}