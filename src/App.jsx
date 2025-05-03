import { Routes } from 'react-router-dom'
// import './App.css'
import NavBar from './components/NavBar'
import AppRoutes from './routes/Routes.jsx'

function App() {


  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-purple-300 via-blue-100 to-white'>
     <NavBar />
      <AppRoutes />
    </div>
  )
}

export default App
