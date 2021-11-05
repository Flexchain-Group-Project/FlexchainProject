import raw from 'raw.macro';
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import pizzaDelivery from "../../diagrams/pizzaDelivery.bpmn"
import emptyDiagram from "../../diagrams/emptyDiagram.bpmn"
import Container from "react-bootstrap/Container";
import ChorJS from 'chor-js/lib/Modeler';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, {useState, useEffect} from "react";
import {RiFileAddLine as IconNew} from 'react-icons/ri'
import {RiDownloadCloudFill as IconDownload} from 'react-icons/ri'




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
            <div className='mb-2' style={{width: '30%'}}>
                <Button title='Create new diagram' onClick={()=>{createNewDiagram(modeler)}}><IconNew/></Button>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload BPMN file</Form.Label>
                    <Form.Control type="file" accept=".bpmn, .xml" onChange={(event) => {
                        loadDiagram(event.target.files[0],modeler)
                    }}/>
                </Form.Group>
                <a title="Download BPMN XML file" onClick={(e)=>{downloadFile(modeler)}}><IconDownload/></a>
            </div>
        </Container>


    );

}




async function createNewDiagram(modeler) {
       const diagram = raw("../../diagrams/emptyDiagram.bpmn");
       await modeler.importXML(diagram);
}

async function downloadFile(modeler){
   // console.log(downloadLink);
    const result = await modeler.saveXML({ format: true });
   // downloadLink['href'] = 'data:application/bpmn20-xml;charset=UTF-8,' + encodeURIComponent(result.xml);
   // downloadLink['download'] = "diagram.bpmn";
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
