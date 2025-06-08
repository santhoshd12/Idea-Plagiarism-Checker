import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import InputForm from './components/InputForm';
import ResultPage from './components/ResultPage';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element = {<InputForm/>}/>
      <Route path ="/results" element = {<ResultPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App