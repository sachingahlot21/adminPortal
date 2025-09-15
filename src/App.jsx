import { useState } from 'react'
import './App.css'
import AdminDashboard from './components/AdminDashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AdminDashboard />
    </>
  )
}

export default App


