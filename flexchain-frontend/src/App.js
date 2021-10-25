
import './App.css';
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import BpmnModeler from "./components/Modeler/BpmnModeler";

const App = ()=>(
    <Router>
     <NavigationBar/>
      <Routes>
        <Route path='/modeler' element={<BpmnModeler/>}/>
      </Routes>
    </Router>
);

export default App;
