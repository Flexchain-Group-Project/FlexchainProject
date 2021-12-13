
import './App.css';
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import BpmnModeler from "./components/Modeler/BpmnModeler";
import Deployer from "./components/Deployer/Deployer";
import Updater from "./components/Updater/Updater"
import ExecuteMessage from "./components/Executer/ExecuteMessage";
import PopupPage from "./components/PopupPage";


const App = ()=>(
    <Router>
     <NavigationBar/>
      <Routes>
        <Route path='/modeler' element={<BpmnModeler/>}/>
          <Route path='/deploy' element={<Deployer/>}/>
          <Route path='/update' element={<Updater/>}/>
          <Route path='/execute' element={<ExecuteMessage/>}/>
          <Route path='/popup' element={<PopupPage/>}/>
      </Routes>
    </Router>
);

export default App;
