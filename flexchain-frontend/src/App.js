
import './App.css';
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import BpmnModeler from "./components/Modeler/BpmnModeler";
import Deployer from "./components/Deployer/Deployer";
import Contratti from "./components/Contratti";
import {DeployedContracts} from "./contracts/DeployedContracts";
import Canvas from "./components/Modeler/Canvas";

const App = ()=>(
    <Router>
     <NavigationBar/>
      <Routes>
        <Route path='/modeler' element={<BpmnModeler/>}/>
          <Route path='/deploy' element={<Deployer/>}/>
          <Route path='/contracts' element={<Contratti/>}/>
          <Route path='/canvas' element={<Canvas/>}/>
      </Routes>
    </Router>
);

export default App;
