import { createGlobalState } from 'react-hooks-global-state';
import {store,useGlobalState} from "state-pool";

const initialState = {
        name: '',
        address: ''

    }
/*const initialState = {
    count: 0,
    text: 'hello',
};*/



   export const DeployedContracts = ()=>{
       /*const initialState = {
           name: '',
           address: ''

       }
       const { useGlobalState } = createGlobalState(initialState)
       // const [value, update] = useGlobalState('name');

        return{useGlobalState};*/
       store.setState("count", 0);

    }




