import { configureStore } from '@reduxjs/toolkit'
import  counterReducer from './components/counterSlice'
export default configureStore({
    reducer: {
        counter: counterReducer,
    },
})