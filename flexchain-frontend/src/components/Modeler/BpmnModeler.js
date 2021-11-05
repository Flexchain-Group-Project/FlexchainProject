import raw from 'raw.macro';
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import pizzaDelivery from "../../diagrams/pizzaDelivery.bpmn"
import emptyDiagram from "../../diagrams/emptyDiagram.bpmn"
import Container from "react-bootstrap/Container";
import ChorJS from 'chor-js/lib/Modeler';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Form from "react-bootstrap/Form";
import React, {useState, useEffect} from "react";
import {RiFileAddLine as IconNew} from 'react-icons/ri'
import {RiDownloadCloudFill as IconDownload} from 'react-icons/ri'
import {RiUploadCloudFill as IconUpload} from 'react-icons/ri'



export default function BpmnModeler() {

    const [modeler,setModeler]=useState();

    useEffect(()=>{
        const model = new ChorJS({
            container: '#canvas',
            propertiesPanel: {
                parent: '#properties-panel'
            },
            keyboard: {
                bindTo: document
            }
        });
        setModeler(model);
    },[])

    return (
        <Container className='mt-5'>
            <div className='mb-3' id="canvas" style={{height: 500, width: '90%', border: '1px solid grey'}}/>
            {/* <Button onClick={()=>loadBpmn().then(response => {
                console.log(response);
            }).catch(e => {
                console.log(e);
            })}>Load bpmn</Button>*/}
           <div style={{textAlign:"left"}}>
                <Button title='Create new diagram' onClick={()=>{createNewDiagram(modeler)}}><IconNew size='40' style={{display:'inline-block'}}/></Button>


               <Button title="Download BPMN XML file"  onClick={()=>{DownloadBtnClicked(document.getElementById('download'))}} style={{display:'inline-block',marginLeft: '30px'}}><IconDownload size='40'/></Button>
               <a  id='download' style={{display: "none"}}  onClick={(e)=>{downloadFile(e.target,modeler)}} ></a>

               <Button title="Upload BPMN XML file" onClick={()=>{UploadBtnClicked(document.getElementById('upload'))}} style={{display:'inline-block',marginLeft: '30px'}}><IconUpload size='40'/></Button>

               <Form.Control id='upload' type="file" accept=".bpmn, .xml" onChange={(event) => {
                   loadDiagram(event.target.files[0],modeler)
               }} style={{display:'none'}}/>

           </div>
        </Container>


    );

}
//<div className='mb-2' style={{width: '30%'}}>
/*<Form.Group controlId="formFile" className="mb-3"  style={{display:'inline-block',marginLeft: '30px'}}>
    <Form.Label>Upload BPMN file</Form.Label>
    <Form.Control type="file" accept=".bpmn, .xml" onChange={(event) => {
        loadDiagram(event.target.files[0],modeler)
    }}/>
</Form.Group>*/

function DownloadBtnClicked(download){
 download.click();
}
function UploadBtnClicked(upload){
    upload.click();
}

async function createNewDiagram(modeler) {
       const diagram = raw("../../diagrams/emptyDiagram.bpmn");
       await modeler.importXML(diagram);
}

async function downloadFile(event,modeler){
    const downloadLink = document.getElementById('download');
    console.log(event);
    const result = await modeler.saveXML({ format: true });
    event['href'] = 'data:application/bpmn20-xml;charset=UTF-8,' + encodeURIComponent(result.xml);
    event['download'] = "diagram.bpmn";
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
