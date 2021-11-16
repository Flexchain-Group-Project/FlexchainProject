import raw from 'raw.macro';
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import Container from "react-bootstrap/Container";
import ChorJS from 'chor-js/lib/Modeler';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, {useState, useEffect} from "react";
import {RiFileAddLine as IconNew} from 'react-icons/ri'
import {RiDownloadCloudFill as IconDownload} from 'react-icons/ri'
import {RiUploadCloudFill as IconUpload} from 'react-icons/ri'
import {TiTick as TickIcon} from 'react-icons/ti'
import Web3 from "web3";
import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/bpmn';
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css'
import "./ModelerStyles.less"
import Offcanvas from 'react-bootstrap/Offcanvas'

export default function BpmnModeler() {

    const [modeler,setModeler]=useState();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () =>{ setShow(true);}


    useEffect(()=>{
        const model = new ChorJS({
            container: '#canvas',
            propertiesPanel: {
                parent: '#properties-panel'
            },
            additionalModules: [
                propertiesPanelModule,
                propertiesProviderModule
            ],
            keyboard: {
                bindTo: document
            }
        });
        setModeler(model);
    },[])

    function p(){
        const properties = modeler.get('propertiesPanel');
        properties.detach();
        properties.attachTo('#panel');
    }


    return (
        <Container className='mt-5'>
            <div className='mb-3' id="canvas" style={{height: 600, width: '100%', border: '1px solid grey'}}/>
            <div id="properties-panel" style={{display:'none'}}></div>

            <Offcanvas show={show} onHide={handleClose} onShow={()=>p()}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Properties Panel</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div id="panel"></div>
                </Offcanvas.Body>
            </Offcanvas>

            <Button variant="primary" onClick={handleShow}>
                Launch
            </Button>

           <div style={{textAlign:"left"}}>
                <Button title='Create new diagram' onClick={()=>{createNewDiagram(modeler)}}><IconNew size='40' style={{display:'inline-block'}}/></Button>

               <Button title="Download BPMN XML file"  onClick={()=>downloadFile(modeler)} style={{display:'inline-block',marginLeft: '30px'}}><IconDownload size='40'/></Button>

               <Button title="Upload BPMN XML file" onClick={()=>{UploadBtnClicked(document.getElementById('upload'))}} style={{display:'inline-block',marginLeft: '30px'}}><IconUpload size='40'/></Button>

               <Form.Control id='upload' type="file" accept=".bpmn, .xml" onChange={(event) => {
                   loadDiagram(event.target.files[0],modeler)
               }} style={{display:'none'}}/>

               <Button style={{display:'inline-block',marginLeft: '30px',height:'54px'}} onClick={()=>mockAPI()}>Deploy<TickIcon/></Button>
           </div>
        </Container>


    );

}



function UploadBtnClicked(upload){
    upload.click();
}

async function createNewDiagram(modeler) {
       const diagram = raw("../../diagrams/emptyDiagram.bpmn");
       await modeler.importXML(diagram);
}

async function downloadFile(modeler){
    const result = await modeler.saveXML({ format: true });
    const url = 'data:application/bpmn20-xml;charset=UTF-8,' + encodeURIComponent(result.xml);
    const link = document.createElement('a');
    link.download = 'diagram.bpmn';
    link.href = url;
    link.click();
}


function loadDiagram(file,modeler) {

    if (file) {
        const reader = new FileReader();
        reader.onload = async () => {
            await modeler.importXML(reader.result);
        }
        reader.readAsText(file);

    }
}

async function mockAPI(){
    let contract
    const response = await fetch('https://8a0e6be3-45af-4b45-9b82-2c5a99bd5d40.mock.pstmn.io/hello');
   response.json().then(res=>{console.log(res); deploy2(res)});

}
async function deploy2(contract){
    await deploy(contract.contractName,contract.abi,contract.bytecode);
}

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

}
