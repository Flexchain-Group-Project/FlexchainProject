
import raw from 'raw.macro';
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import pizzaDelivery from "../../diagrams/pizzaDelivery.bpmn"
import Container from "react-bootstrap/Container";
import ChorJS from 'chor-js/lib/Modeler';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React,{useState,useEffect} from "react";
import {BsFillFileEarmarkArrowUpFill as Icon}  from 'react-icons/bs'

export default function BpmnModeler() {
    const [modelerLoaded,setLoaded]=useState(false);
    let modeler;



    return(
        <Container className='mt-5'>
            <div  className='mb-3' id="canvas" style={{height: 500, width: '90%', border: '1px solid grey'}}/>
            <div id="properties-panel" className="side-panel hidden"></div>
           {/* <Button onClick={()=>loadBpmn().then(response => {
                console.log(response);
            }).catch(e => {
                console.log(e);
            })}>Load bpmn</Button>*/}
            <div className='mb-2' style={{width:'30%'}}>
                <Button><Icon/></Button>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload BPMN file</Form.Label>
                    <Form.Control type="file"   accept=".bpmn, .xml" onChange={(event)=>{loadDiagram(event.target.files[0])}}/>
                </Form.Group>
            </div>

        </Container>


    );

}



async function loadBpmn(){

  //const diagram = raw("../../diagrams/pizzaDelivery.bpmn");
  // await modeler.importXML(diagram);

}
 function loadDiagram(file){
    const modeler = new ChorJS({
        container: '#canvas',
        propertiesPanel: {
            parent: '#properties-panel'
        },
        keyboard: {
            bindTo: document
        }});

    if (file){
        const reader = new FileReader();
        reader.onload =async ()=>{await modeler.importXML(reader.result);}
        reader.readAsText(file);
       //
    }
}