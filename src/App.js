import { Route, Router, Routes } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

import "./app.scss"
import BlogForm from "./components/BlogForm"
import Navbar from "./components/Navbar"
import ListPage from "./pages/ListPage"
import EditPage from "./pages/EditPage"
import HomePage from "./pages/HomePage"

function App() {
   return (
      <>
         <div className='nav-bar'>
            <Navbar />
         </div>

         <div className='container'>
            <Routes>
               <Route path='/' element={<HomePage/>} />
               <Route path='/blog' element={<ListPage/>} />
               <Route path='/blog/create' element={<BlogForm />} />
               <Route path='/blog/edit' element={<EditPage/>} />
            </Routes>
         </div>
      </>
   )
}

export default App
