
import './App.css';
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import BpmnModeler from "./components/Modeler/BpmnModeler";
import Deployer from "./components/Deployer/Deployer";
import Contratti from "./components/Contratti";
import Updater from "./components/Updater/Updater"


const App = ()=>(
    <Router>
     <NavigationBar/>
      <Routes>
        <Route path='/modeler' element={<BpmnModeler/>}/>
          <Route path='/deploy' element={<Deployer/>}/>
          <Route path='/update' element={<Updater/>}/>
          <Route path='/contracts' element={<Contratti/>}/>
      </Routes>
    </Router>
);

export default App;
