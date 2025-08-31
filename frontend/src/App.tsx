import { Route, Routes } from 'react-router-dom'
import './App.css'
import SignupPage from './components/Pages/SignupPage'
import SigninPage from './components/Pages/SigninPage'
import DashboardPage from './components/Pages/DashboardPage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<DashboardPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/signin' element={<SigninPage/>}/>
      </Routes>
    </>
  )
}

export default App
