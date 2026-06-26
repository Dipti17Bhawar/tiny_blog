import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowseRouter, Routes ,Route} from "react-router";

import AllBlog from "./views/AllBlog";
import NewBlog from "./views/NewBlog";
import EditBlog from "./views/EditBlog";
import ReadBlog from "./views/ReadBlog";
import Login from "./views/Login";
import Signup from "./views/Signup";


createRoot(document.getElementById('root')).render(
  <BrowseRouter>
    <Routes>
      <Route path ="/"  element={<AllBlog/>}/>
      <Route path ="/new"  element={<NewBlog/>}/>
      <Route path ="/edit/:id"  element={<editBlog/>}/>
      <Route path ="/blog/:slug"  element={<ReadBlog/>}/>
      <Route path ="/login"  element={<Login/>}/>
      <Route path ="/signup"  element={<Signup/>}/>

      <Route path ="*"  element={<h1 ClassName="text-center mt-5"> 404 Not found</h1>}/>


    </Routes>
  </BrowseRouter>
  
  
)
