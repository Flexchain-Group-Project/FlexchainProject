import Web3 from 'web3'
import {useState} from "react";
import Container from "react-bootstrap/Container";
import './Deployer.styles.css'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {Counter,ABI,BYTECODE} from "../contracts/Counter";



const Deployer = () => {
    const [state,setState]=useState('');
    const {setAddress}= Counter();
    const contracts =['counter.sol','example.sol'];

    const handleSelect=(e)=>{
        //e.preventDefault();
        console.log(e);
        setState(e.target.value)
    }

    return (
        <div className='Center'>
            <Container className='mt-5'>
                <h1>You are in the deployer</h1>
                <Dropdown as={ButtonGroup} onSelect={(e)=>{handleSelect(e)}}>
                    <Button variant="success" onClick={()=>setAddress(deploy())}>Deploy</Button>

                    <Dropdown.Toggle split variant="success" id="dropdown-split-basic"/>

                    <Dropdown.Menu>
                        {contracts.map(contract => (
                            <Dropdown.Item key={contract.toString()}>{contract}</Dropdown.Item>
                        ))}
                        {/*<Dropdown.Item href="../../diagrams/diagram.bpmn">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>*/}
                    </Dropdown.Menu>
                </Dropdown>
                <h3>{state}</h3>
            </Container>
        </div>
    );
}
export default Deployer;

function getWeb3() {
   return  new Web3(Web3.givenProvider || "ws://localhost:8545");
}

async function getSender(web3) {
    const accounts = await window.ethereum.enable();
    return accounts[0];

}

function getContract(web3) {

     return new web3.eth.Contract(ABI);

}

async function deploy() {

    const web3 = getWeb3();
    const account = await getSender(web3);
    const contract = getContract(web3);
    const cont = await contract.deploy({data:BYTECODE}).send({gas:1000000,from:account});
   const address = cont.options.address;
   return address;
}