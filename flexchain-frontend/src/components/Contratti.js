import {useGlobalState} from "state-pool";
import React, {useState, useEffect} from "react";
import Web3 from 'web3'
import {ABI} from "../contracts/Counter";
import c from "../deployedContracts/Counter.json"



const Contratti = () => {

    const [state, setState] = useState(0);
    const address = '0x2d92Af846551D468698fBD715C4336349adD23dc';
    const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
    const counter = new web3.eth.Contract(ABI, address);
  console.log( c.address);
    async function result(){
        const result = await  counter.getPastEvents('Increased',{});
        return result;
    }

    useEffect(()=>{
        result().then((res)=>{setState(res[0].returnValues.newValue)})
    },)



    counter.events.Increased()
        .on('data', (event) => {
            const value = event.returnValues.newValue;
            setState(value);

        });

    const divStyle = {textAlign: 'center'};
    return (
        <div style={divStyle}>
           <h2>Counter value:</h2>
           <h3>{state}</h3>
        </div>);
}

export default Contratti;

