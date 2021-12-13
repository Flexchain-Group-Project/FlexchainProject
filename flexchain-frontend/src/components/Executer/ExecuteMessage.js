import React, {useState, useEffect} from "react";
import {getMonitorPastEvents, getProcessTemplateABI, getSender, getWeb3} from "../BlockchainFunctions";
import Container from 'react-bootstrap/Container'
import SelectAddress from "../SelectAddress";
import SelectMessage from "../SelectMessage"
import {Button, Form,Row,Col} from 'react-bootstrap';
import Viewer from 'chor-js/lib/NavigatedViewer';
import {RiUploadCloudFill as IconUpload} from "react-icons/ri";
import './style.css'

const ExecuteMessage =  ()=> {

    const[addressList , setAddressList]=useState([]);
    const[parameters , setParameters]=useState();
    const[message , setMessage]=useState();
    const[diagramsList , setDiagramsList]=useState([]);
    const[ids , setIds]=useState([]);
    const [contract,setContract]=useState();
    const[abi,setAbi]=useState();
    const [address,setAddress]=useState();
    const [viewer, setViewer] = useState();
    const web3 = getWeb3();

    useEffect(async ()=>{
        const viewer = new Viewer({
            container: '#canvas-viewer',
            keyboard: {
                bindTo: document
            }
        });
        setViewer(viewer);
        const result = await getMonitorPastEvents();
        setAddressList(result[0]);
        setDiagramsList(result[1]);
       setAbi(await getProcessTemplateABI());
    },[])

    const getAddressFromSelect = async (data) => {
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
       // console.log(ids);
        setIds(ids);
      //  console.log(messages);
    }

    const getMessage= (message)=>{
        setMessage(message);
        highlightMessage(message,viewer);
    }

    function loadDiagram(file) {
        if (file) {
            const reader = new FileReader();
            reader.onload = async () => {
                await viewer.importXML(reader.result);
            }
            reader.readAsText(file);
        }

    }


    return(
        <Container className='mt-5'>
            <SelectAddress  addressList={addressList} diagramsList={diagramsList} childToParent={getAddressFromSelect}/>
            <Form className='mt-4'>
                <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">

                    <Col xs={2}>
                        <SelectMessage idsList={ids} getMessage={getMessage}/>
                    </Col>
                    <Col>
                        <Form.Label style={{marginBottom:'0'}}>Message Parameters</Form.Label>
                        <Form.Control type="text" placeholder="Insert parameters..." style={{width:'30%'}}
                                      value={parameters}
                                      onChange={e => setParameters([e.target.value])}
                        />
                    </Col>
                </Form.Group>
                <Button variant="primary"  onClick={()=>executeMessage(contract,message,parameters)}>
                    Execute message
                </Button>
            </Form>
            <div className='mt-3' id="canvas-viewer" style={{height: 600, width: '100%', border: '1px solid grey'}}>
                <Button title="Upload BPMN XML file" onClick={() => {
                    UploadBtnClicked(document.getElementById('upload'))
                }} ><IconUpload size='40'/></Button>
            </div>
            <Form.Control id='upload' type="file" accept=".bpmn, .xml" onChange={(event) => {
                loadDiagram(event.target.files[0]);
            }} style={{display: 'none'}}/>
        </Container>
    );
}

export default ExecuteMessage;


function UploadBtnClicked(upload) {
    upload.click();
}

function highlightMessage(message,viewer){
    console.log(message);
    let canvas = viewer.get('canvas');


   let registry = viewer.get('elementRegistry')
    const elements =registry.getAll()
     elements.map((element) => {
         console.log(element.businessObject.id)

             canvas.addMarker(element, 'highlight_green');
    })
   // canvas.addMarker(message, 'highlight_green');}
}

 async function executeMessage(contract,message, parameters){
     const web3 = getWeb3();
     const account = await getSender(web3);
     console.log(message)
     console.log(parameters)
    await contract.methods.executeMessage(message,parameters).send({from: account});
}