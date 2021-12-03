import raw from 'raw.macro';
import Modeler from 'chor-js/lib/Modeler';
import Viewer from 'chor-js/lib/NavigatedViewer';
import React, {useState, useEffect} from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import {RiUploadCloudFill as IconUpload} from "react-icons/ri";
import Form from "react-bootstrap/Form";
import './style.css'
import {GoChevronRight as RightIcon} from 'react-icons/go'
import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/bpmn';
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css'
import Offcanvas from "react-bootstrap/Offcanvas";
import Web3 from "web3";
import {abi} from "../../contracts/Monitor";
import {getSender} from "../Deployer/DeploymentFunctions";
import SelectAddress from "../SelectAddress";
import hash from 'hash-it';

export default function Updater() {

    const[addressList , setAddressList]=useState([]);
    const[diagramsList , setDiagramsList]=useState([]);
    const [modeler, setModeler] = useState();
    const [viewer, setViewer] = useState();
    const [elementsCount, setElementsCount] = useState();
    const [elementRegistry, setElementRegistry] = useState();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }

    async function getMonitorPastEvents(){
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const contract = new web3.eth.Contract(abi,'0xdCE3eD3ACf2d285338d38B215E0931831840287d');
        const address= await getSender(web3);
        await contract.getPastEvents("newContract",{
            filter:{sender:address},
            fromBlock:0
        }).then(r=>setAddressList(r));
       const diagramsList = await contract.methods.getDiagrams().call();
       setDiagramsList(diagramsList);
       console.log(diagramsList);

    }

    function attachPanel() {
        const properties = modeler.get('propertiesPanel');
        properties.detach();
        properties.attachTo('#panel');
    }

    useEffect(async () => {
        const modeler = new Modeler({
            container: '#canvas-modeler',
            keyboard: {
                bindTo: document
            },
            propertiesPanel: {
                parent: '#properties-panel'
            },
            additionalModules: [
                propertiesPanelModule,
                propertiesProviderModule
            ],
            bpmnRenderer: {
                //  defaultFillColor: 'lime',
                //  defaultStrokeColor: 'lime'
            }
        });
        setModeler(modeler);

        const viewer = new Viewer({
            container: '#canvas-viewer',
            keyboard: {
                bindTo: document
            }
        });
        setViewer(viewer);

      await  getMonitorPastEvents()
    }, [])


    function loadDiagram(file, modeler, viewer) {
        if (file) {
            const reader = new FileReader();
            reader.onload = async () => {
                await modeler.importXML(reader.result).then(() => {
                    setElementsCount(getElementRegistry(modeler).length)
                    setElementRegistry(getElementRegistry(modeler));
                });
                await viewer.importXML(reader.result);
            }
            reader.readAsText(file);
        }

    }

    const props={
        addresses:addressList,
        diagrams:diagramsList
    }

    return (
        <Container fluid className='mt-5'>
            <SelectAddress addressList={addressList} diagramsList={diagramsList}/>
            <div className='mb-3' id="canvas-viewer" style={{height: 600, width: '100%', border: '1px solid grey'}}/>
            <h5 title='Show properties panel' style={{fontFamily:'Arial',width:'auto'}} className='mt-4' onClick={handleShow} onMouseLeave={(e)=>e.target.style.color='black'} onMouseOver={(e)=>e.target.style.color='grey'}><RightIcon/>Properties</h5>
            <div id="properties-panel" style={{display: 'none'}}></div>
            <div className='mb-3' id="canvas-modeler" style={{height: 600, width: '100%', border: '1px solid grey'}}/>
            <Offcanvas show={show} onHide={handleClose} onShow={() => attachPanel()}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Properties Panel</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div id="panel"></div>
                </Offcanvas.Body>
            </Offcanvas>

            <Button title="Upload BPMN XML file" onClick={() => {
                UploadBtnClicked(document.getElementById('upload'))
            }} style={{display: 'inline-block', marginLeft: '30px', marginBottom: '20px'}}><IconUpload
                size='40'/></Button>
            <Button style={{display: 'inline-block', marginLeft: '30px', marginBottom: '20px'}} onClick={() => {
                showChanges(modeler, elementsCount, viewer, elementRegistry)
            }}>Show Changes</Button>
            <Form.Control id='upload' type="file" accept=".bpmn, .xml" onChange={(event) => {
                loadDiagram(event.target.files[0], modeler, viewer);
                console.log(elementsCount);
            }} style={{display: 'none'}}/>
        </Container>

    );
}

function UploadBtnClicked(upload) {
    upload.click();
}


function getElementRegistry(modeler) {
    const elementRegistry = modeler.get('elementRegistry');
    console.log(elementRegistry.getAll());
    const elementList = elementRegistry.getAll();
    const len = elementList.length;

    let items = [];

    elementRegistry.forEach(function (regItem, gfx) {
        items.push(regItem);
    });

    console.log(items);
    return items;
}

function showChanges(modeler, elementsCount, viewer, registry) {
    const modeling = modeler.get('modeling');
    const elementRegistry = modeler.get('elementRegistry');
    const elementList = elementRegistry.getAll();
    const len = elementList.length;
    let items = [];

    elementRegistry.forEach(function (regItem, gfx) {
        items.push(regItem);
    });


    for (let i = 0; i < items.length; i++) {
        if (registry.includes(items[i]) === false) {
            let canvas = modeler.get('canvas');
            canvas.addMarker(items[i], 'highlight_green');
        }
    }

    /*for (let i = 0; i < items.length; i++) {
        if (registry.includes(items[i]) === false) {
            console.log(hash(items[i]));
            let canvas = modeler.get('canvas');
            canvas.addMarker(items[i], 'highlight_yellow');
        }
    }*/

    /*  if(items.length>elementsCount) {
          const elementsToColor = items.slice(elementsCount);

          console.log(elementsToColor.length);
          modeling.setColor(elementsToColor, {
              stroke: 'lime',
              fill: 'lime'
          });
      }*/

    for (let i = 0; i < registry.length; i++) {
        if (items.includes(registry[i]) === false) {
            // sc(viewer,registry[i],'red','red');
            let canvas = viewer.get('canvas');

            canvas.addMarker(registry[i], 'highlight_red');

        }
    }
}



