

import raw from 'raw.macro';

import "bpmn-js/dist/assets/diagram-js.css";

import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import Canvas from "./Canvas";

import diagram from "../../assets/diagram.bpmn.jsx";
import pizza from "../../assets/pizzaDelivery.bpmn"
import Container from "react-bootstrap/Container";

import ChorJS from 'chor-js/lib/Modeler';
import Button from "react-bootstrap/Button";
export default function BpmnModeler() {

    return(
        <Container className='mt-5'>
            <div id="canvas" style={{height: 500, width: '90%', border: '1px solid grey'}}/>
            <div id="properties-panel" className="side-panel hidden"></div>
            <Button onClick={()=>loadBpmn().then(response => {
                console.log(response);
            }).catch(e => {
                console.log(e);
            })}>Load bpmn</Button>
        </Container>


    );

}
//<Button onClick={()=>mode()}>Instantiate modeler</Button>

async function loadBpmn(){
    const modeler = new ChorJS({
        container: '#canvas',
        propertiesPanel: {
            parent: '#properties-panel'
        },
        keyboard: {
            bindTo: document
        }
    });
  const d = raw("../../assets/pizzaDelivery.bpmn");
   await modeler.importXML(d);


    console.log("here")

}