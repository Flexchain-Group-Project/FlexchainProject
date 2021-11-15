import raw from 'raw.macro';
import Modeler from 'chor-js/lib/Modeler';
import Viewer from 'chor-js/lib/NavigatedViewer';
import React, {useState, useEffect} from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import {RiUploadCloudFill as IconUpload} from "react-icons/ri";
import Form from "react-bootstrap/Form";



export default function Updater(){


    const [modeler,setModeler]=useState();
    const [viewer,setViewer]=useState();

    useEffect(()=>{
        const modeler = new Modeler({
            container: '#canvas-modeler',
            keyboard: {
                bindTo: document
            },
            bpmnRenderer: {
              //  defaultFillColor: 'lime',
              //  defaultStrokeColor: 'lime'
            }
        });

     console.log(modeler.get('bpmnRenderer'));
     let rend =modeler.get('bpmnRenderer');
     rend = { defaultStrokeColor: 'lime'};
     const canvas = modeler.get('canvas');

        setModeler(modeler);

        const viewer = new Viewer({
            container: '#canvas-viewer',
            keyboard: {
                bindTo: document
            }
        });
        setViewer(viewer);
    },[])


    return (
        <Container className='mt-5'>
            <div className='mb-3' id="canvas-modeler" style={{height: 600, width: '50%', border: '1px solid grey',display:'inline-block'}}/>
            <div className='mb-3' id="canvas-viewer" style={{height: 600, width: '50%', border: '1px solid grey',display:'inline-block'}}/>
            <Button title="Upload BPMN XML file" onClick={()=>{UploadBtnClicked(document.getElementById('upload'))}} style={{display:'inline-block',marginLeft: '30px'}}><IconUpload size='40'/></Button>

            <Form.Control id='upload' type="file" accept=".bpmn, .xml" onChange={(event) => {
                loadDiagram(event.target.files[0],modeler,viewer)
            }} style={{display:'none'}}/>
        </Container>

    );
}

function UploadBtnClicked(upload){
    upload.click();
}

function loadDiagram(file,modeler,viewer) {

    if (file) {
        const reader = new FileReader();
        reader.onload = async () => {
            await modeler.importXML(reader.result);
            await viewer.importXML(reader.result);
        }
        reader.readAsText(file);

    }
}