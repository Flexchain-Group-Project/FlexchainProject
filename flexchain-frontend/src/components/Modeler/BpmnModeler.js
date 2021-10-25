import React from "react";
import './ModelerStyles.css'
import ReactBpmn from './ModelerFunctions'
import model from '../../diagrams/pizzaDelivery.bpmn'
import Container from "react-bootstrap/Container";


const BpmnModeler = ()=>{

    return(
      <div className='canvas'>
      <Container className='mt-5'>
          <ReactBpmn url={model}/>
      </Container>
      </div>
    );
};

export default BpmnModeler;