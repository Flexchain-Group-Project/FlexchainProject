import BpmnJS from "bpmn-js/lib/Modeler";

import "bpmn-js/dist/assets/diagram-js.css";

import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";


import diagram from "../../diagrams/diagram.bpmn";
import Container from "react-bootstrap/Container";

export default function BpmnModeler() {
  return(
      <Container className='mt-5'>
      <p>You are in the modeler</p>
      </Container>
  );
}