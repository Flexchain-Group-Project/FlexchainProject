import React, {useState, useEffect} from "react";
import {getMonitorPastEvents,getProcessTemplateABI,getWeb3} from "./BlockchainFunctions";
import Container from 'react-bootstrap/Container'
import SelectAddress from "./SelectAddress";
import SelectMessage from "./SelectMessage"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Row from "react-bootstrap/Row"


const ExecuteMessage =  ()=> {

    const[addressList , setAddressList]=useState([]);
    const[diagramsList , setDiagramsList]=useState([]);
    const[ids , setIds]=useState([]);
    const [contract,setContract]=useState();
    const[abi,setAbi]=useState();
    const [address,setAddress]=useState();
    const web3 = getWeb3();

    useEffect(async ()=>{
        const result = await getMonitorPastEvents();
        setAddressList(result[0]);
        setDiagramsList(result[1]);
       setAbi(await getProcessTemplateABI());
    },[])

    const childToParent = async (data) => {
        setAddress(data);
        const cont= new web3.eth.Contract(abi, data);
        setContract(cont);
        const ids = await cont.methods.getIDs().call();
       // const mess= await cont.methods.getMessage(ids[0]).call();
        let messages=[];
        for(let i=0;i<ids.length;i++){
           const mess= await cont.methods.getMessage(ids[i]).call();
           const string =await cont.methods.getString(mess).call();
           console.log(string);
           messages.push(mess);
        }
        console.log(ids);
        setIds(ids);
        console.log(messages);
    }



     const getIds = async()=>{

       //
       //
     }

   /* contract.events.newContract().on('data', (event) => {
        console.log(event);
    })*/


    return(
        <Container className='mt-5'>
            <SelectAddress  addressList={addressList} diagramsList={diagramsList} childToParent={childToParent}/>
           <Row>
            <SelectMessage idsList={ids}/>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic" label="Parameters" variant="outlined" />
            </Box>
           </Row>
        </Container>
    );
}

export default ExecuteMessage;