import './App.css'
import Landing from './views/Landing/Landing'
import Home from './views/Home/Home'
import Detail from './views/Detail/Detail'
import Form from './views/Form/Form'
import Navbar from "./Components/Navbar/Navbar"

import { Routes, Route, useLocation } from 'react-router-dom'


function App() {
  const { pathname } = useLocation()
 

  return (
    <div>

      {
        location.pathname !== "/" 
          ? <Navbar/>
          : null
      }
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/create' element={<Form />} />
      </Routes>

    </div>
  )
}

export default App
