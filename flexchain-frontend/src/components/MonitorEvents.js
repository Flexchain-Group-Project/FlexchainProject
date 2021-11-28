import React, {useState, useEffect} from "react";
import Web3 from 'web3'
import {abi} from "../contracts/Monitor";
import {getSender} from "./Deployer/DeploymentFunctions";


const MonitorEvents =  ()=> {

    async function eventListener() {


    const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
    const address = await getSender(web3);
    const monitor = new web3.eth.Contract(abi, address);


    monitor.events.newContract().on('data', (event) => {
        console.log(event);
    })
}
    return(<h3>You are in the monitor</h3>);
}

export default MonitorEvents;