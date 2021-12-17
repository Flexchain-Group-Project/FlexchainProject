
import './App.css';
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import BpmnModeler from "./components/Modeler/BpmnModeler";
import Updater from "./components/Updater/Updater"
import ExecuteMessage from "./components/Executer/ExecuteMessage";


const App = ()=>(
    <Router>
     <NavigationBar/>
      <Routes>
        <Route path='/modeler' element={<BpmnModeler/>}/>
          <Route path='/update' element={<Updater/>}/>
          <Route path='/execute' element={<ExecuteMessage/>}/>
      </Routes>
    </Router>
);

export default App;
