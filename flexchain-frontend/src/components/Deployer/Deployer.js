import Web3 from 'web3'
import Container from "react-bootstrap/Container";
import './Deployer.styles.css'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {Counter, ABI, BYTECODE} from "../../contracts/Counter";
import React, {useEffect, useState} from "react";
import {useStore,useSelector, useDispatch} from 'react-redux'
import {decrement, increment} from '../counterSlice'

//let loaded=false;

const Deployer = () => {
    const [contractName, setContractName] = useState('');
    const [address, setAddress] = useState('');
    const c = ['counter.sol', 'example.sol'];
    const store=useStore();
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    // if(loaded===false){DeployedContracts(); loaded=true;}

    // const [count, setCount]=useGlobalState("count");

    const clicked = (e) => {
        dispatch(increment());
        console.log('count:', count);

    }


    const handleSelect = (e) => {
        e.preventDefault();
        // console.log(e.target.text);
        setContractName(e.target.text);
    }

    const saveContract = async () => {
        setAddress(await deploy());
        const element = {
            name: contractName,
            address: address
        }

    }

    return (
        <div className='Center'>
            <Container className='mt-5'>
                <h1>You are in the deployer</h1>
                <Dropdown as={ButtonGroup}>
                    <Button variant="success" onClick={() => saveContract()}>Deploy</Button>

                    <Dropdown.Toggle split variant="success" id="dropdown-split-basic"/>

                    <Dropdown.Menu>
                        {c.map(contract => (
                            <Dropdown.Item key={contract.toString()} onClick={(e) => {
                                handleSelect(e)
                            }}>{contract}</Dropdown.Item>
                        ))}
                        {/*<Dropdown.Item href="../../diagrams/diagram.bpmn">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>*/}
                    </Dropdown.Menu>
                </Dropdown>
                <h3 className='mt-3'>{contractName}</h3>
            </Container>
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

function getContract(web3) {

    return new web3.eth.Contract(ABI);

}

async function deploy() {

    const web3 = getWeb3();
    const account = await getSender(web3);
    const contract = getContract(web3);
    const cont = await contract.deploy({data: BYTECODE}).send({gas: 1000000, from: account});
    const address = cont.options.address;
    return address;

}