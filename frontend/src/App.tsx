import { Route, Routes } from 'react-router-dom'
import './App.css'
import SignupPage from './components/Pages/SignupPage'
import SigninPage from './components/Pages/SigninPage'
import DashboardPage from './components/Pages/DashboardPage'
import RequireAuth from './components/Auth/requireAuth'
import NotFoundPage from './components/Pages/NotFoundPage'

function App() {

  return (
    <>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path='/' element={<DashboardPage/>}/>
        </Route>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/signin' element={<SigninPage/>}/>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
