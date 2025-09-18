import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Layout from './Layout.jsx'
import AdminLogin from './components/AdminLogin.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import PublicOnlyRoute from './components/PublicOnlyRoute.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import ManageBills from './components/ManageBills.jsx'
import ManageOrders from './components/ManageOrders.jsx'
import AuthProvider from './context/AuthContext.jsx'
import ViewProducts from './components/ViewProducts.jsx'
import AddProduct from './components/AddProducts.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/admin/login"
        element={
          <PublicOnlyRoute>
            <AdminLogin />
          </PublicOnlyRoute>
        }
      />
      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<Layout />}>
          <Route path='' element={<App />} />
          <Route path='admin/manage-orders' element={<ManageOrders />} />
          <Route path='admin/manage-bills' element={<ManageBills />} />
          <Route path='/admin/products/view' element={<ViewProducts />} />
          <Route path='/admin/products/add' element={<AddProduct />} />
        </Route>
      </Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)


