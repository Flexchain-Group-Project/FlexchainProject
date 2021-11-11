import Web3 from 'web3'
import Container from "react-bootstrap/Container";
import './Deployer.styles.css'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import React, {useEffect, useState} from "react";





const Deployer = () => {
    const [contractName, setContractName] = useState('');
    const [address, setAddress] = useState('');
    const [abi,setAbi]=useState();
    const [bytecode,setBytecode]=useState();

    async function contractUpload(file){
        await import('../../contracts/' + file.name).then((res)=>{
            setContractName(res.contractName);
            setAbi(res.abi);
            setBytecode(res.bytecode);
        });
    }






    return (
        <div className='Center'>
            <Container className='mt-5'>
                <h1>Contract Deployer</h1>
                <Form.Group controlId="formFile" className="mb-3"  style={{display:'inline-block',marginLeft: '30px'}}>
                <Form.Label>Upload contract to deploy</Form.Label>
                <Form.Control type="file" accept=".json" onChange={(e)=>contractUpload(e.target.files[0])} />
            </Form.Group>
            </Container>
            <Button variant="success" onClick={()=>deploy(contractName,abi,bytecode)}>Deploy</Button>
        </div>

    );

}
export default Deployer;




function getWeb3() {
    return new Web3(Web3.givenProvider || "ws://localhost:8545");
}

async function getSender(web3) {
    //  const accounts = await window.ethereum.enable();
    // return accounts[0];
    const accounts = await web3.eth.requestAccounts();
    return accounts[0];
}

function getContract(web3,abi) {

    return new web3.eth.Contract(abi);

}

async function deploy(name,abi,bytecode) {

    const web3 = getWeb3();
    const account = await getSender(web3);
    const contract = getContract(web3,abi);
    const cont = await contract.deploy({data:bytecode}).send({gas: 1000000, from: account});
    const address = cont.options.address;
    const jsonData = {"address":address,"abi":abi};
    saveDeployedContracts(name,jsonData);

}

const saveDeployedContracts = (name,jsonData) => {
    const fileData = JSON.stringify(jsonData);
    const blob = new Blob([fileData], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = name+'.json';
    link.href = url;
    link.click();
}
