import Web3 from "web3";
import {abi} from '../contracts/Monitor'

export async function getProcessTemplateABI(){
    const response = await fetch('https://8a0e6be3-45af-4b45-9b82-2c5a99bd5d40.mock.pstmn.io/process');
   const abi =  await response.json() ;
  // console.log(abi.abi);
   return abi.abi;
}


export async function deployProcessTemplate(contractName) {
    const response = await fetch('https://8a0e6be3-45af-4b45-9b82-2c5a99bd5d40.mock.pstmn.io/process');
    response.json().then(res => {
        console.log(res);
        // deploy2(res)
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

export async function setRules(address){
    const abi = await getProcessTemplateABI()
    const web3 = getWeb3();
    const account = await getSender(web3);
    const contract = new web3.eth.Contract(abi,address);
    const ids = await fetch('https://8a0e6be3-45af-4b45-9b82-2c5a99bd5d40.mock.pstmn.io/generate-rules-id2');
    const rules = await fetch('https://8a0e6be3-45af-4b45-9b82-2c5a99bd5d40.mock.pstmn.io/generate-rules2');
    //ids.json().then(res=>console.log(res));
    const id = (await ids.text()).split(',');
    console.log(id);
    const rul = (await rules.text()).split('$');
    console.log(rul);

  await contract.methods.setRules(id,rul).send({from: account});
}

export async function addRules(address){
    const abi = await getProcessTemplateABI()
    const web3 = getWeb3();
    const account = await getSender(web3);
    const contract = new web3.eth.Contract(abi,address);
    const ids = await fetch('https://8a0e6be3-45af-4b45-9b82-2c5a99bd5d40.mock.pstmn.io/add-rules-id');
    const rules = await fetch('https://8a0e6be3-45af-4b45-9b82-2c5a99bd5d40.mock.pstmn.io/add-rules');
    const id = (await ids.text()).split(',');
    console.log(id);
    const rul = (await rules.text()).split('$');
    console.log(rul);
    await contract.methods.addRules(id,rul).send({from: account});
}

export async function deleteRules(address){
    const abi = await getProcessTemplateABI()
    const web3 = getWeb3();
    const account = await getSender(web3);
    const contract = new web3.eth.Contract(abi,address);
    const ids = await fetch('https://8a0e6be3-45af-4b45-9b82-2c5a99bd5d40.mock.pstmn.io/delete-rules');
    const id = (await ids.text()).split(',');
    console.log(id);
    await contract.methods.deleteRules(id).send({from: account});
}

export async function deployMonitor(){
    const web3 = getWeb3();
    const contract = new web3.eth.Contract(abi)

    const account = await getSender(web3);

    const cont = await contract.deploy({data:'0x608060405234801561001057600080fd5b50610717806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806306e94f2e146100465780638188550c14610064578063a54cbd9814610080575b600080fd5b61004e61009c565b60405161005b91906104a3565b60405180910390f35b61007e6004803603810190610079919061036e565b610175565b005b61009a6004803603810190610095919061032e565b6101b4565b005b60606000805480602002602001604051908101604052809291908181526020016000905b8282101561016c5783829060005260206000200180546100df906105e4565b80601f016020809104026020016040519081016040528092919081815260200182805461010b906105e4565b80156101585780601f1061012d57610100808354040283529160200191610158565b820191906000526020600020905b81548152906001019060200180831161013b57829003601f168201915b5050505050815260200190600101906100c0565b50505050905090565b6000819080600181540180825580915050600190039060005260206000200160009091909190915090805190602001906101b0929190610206565b5050565b8073ffffffffffffffffffffffffffffffffffffffff167fe4f1e239ef633924ba611260f27425b0855d45f598b69b49f08f8dd9b2cc0fac836040516101fa9190610488565b60405180910390a25050565b828054610212906105e4565b90600052602060002090601f016020900481019282610234576000855561027b565b82601f1061024d57805160ff191683800117855561027b565b8280016001018555821561027b579182015b8281111561027a57825182559160200191906001019061025f565b5b509050610288919061028c565b5090565b5b808211156102a557600081600090555060010161028d565b5090565b60006102bc6102b7846104ea565b6104c5565b9050828152602081018484840111156102d8576102d76106aa565b5b6102e38482856105a2565b509392505050565b6000813590506102fa816106ca565b92915050565b600082601f830112610315576103146106a5565b5b81356103258482602086016102a9565b91505092915050565b60008060408385031215610345576103446106b4565b5b6000610353858286016102eb565b9250506020610364858286016102eb565b9150509250929050565b600060208284031215610384576103836106b4565b5b600082013567ffffffffffffffff8111156103a2576103a16106af565b5b6103ae84828501610300565b91505092915050565b60006103c3838361044f565b905092915050565b6103d481610570565b82525050565b60006103e58261052b565b6103ef818561054e565b9350836020820285016104018561051b565b8060005b8581101561043d578484038952815161041e85826103b7565b945061042983610541565b925060208a01995050600181019050610405565b50829750879550505050505092915050565b600061045a82610536565b610464818561055f565b93506104748185602086016105b1565b61047d816106b9565b840191505092915050565b600060208201905061049d60008301846103cb565b92915050565b600060208201905081810360008301526104bd81846103da565b905092915050565b60006104cf6104e0565b90506104db8282610616565b919050565b6000604051905090565b600067ffffffffffffffff82111561050557610504610676565b5b61050e826106b9565b9050602081019050919050565b6000819050602082019050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600061057b82610582565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b82818337600083830152505050565b60005b838110156105cf5780820151818401526020810190506105b4565b838111156105de576000848401525b50505050565b600060028204905060018216806105fc57607f821691505b602082108114156106105761060f610647565b5b50919050565b61061f826106b9565b810181811067ffffffffffffffff8211171561063e5761063d610676565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b6106d381610570565b81146106de57600080fd5b5056fea2646970667358221220ebe6c8a3a9f74d9c8d06c24b466c8994f8bacb9fc0f968389eebb00308cc746064736f6c63430008070033'}).send({gas: 1000000, from: account});
    const address = cont.options.address;
}

 export async function getMonitorPastEvents(){
    const web3 = getWeb3();
    const contract = new web3.eth.Contract(abi,'0xdCE3eD3ACf2d285338d38B215E0931831840287d');
    const address= await getSender(web3);
  const addressList=  await contract.getPastEvents("newContract",{
        filter:{sender:address},
        fromBlock:0
    });
    const diagramsList = await contract.methods.getDiagrams().call();

     const lists = [addressList,diagramsList];
     return lists;

}