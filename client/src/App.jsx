import { useState } from 'react'
import './App.css'
import Homepage from './pages/Homepage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { UserProvider } from './components/UserContext'
import Blog from './pages/Blog'
import Account from './pages/Account'
import CreateBlog from './pages/CreateBlog'
import Admin from './pages/Admin'
import UnpublishedPosts from './pages/UnpublishedPosts'
import UnpublishedPostDetail from './pages/UnpublishedPostDetail'
import BlogDetails from './pages/BlogDetails'
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar';
import { AppSidebar } from './components/AppSidebar'
import {   useUser } from './components/UserContext'
import Layout from './components/Layout'


function App() {


 

  return (

    <div className='w-full h-full'>
      <UserProvider>
          <BrowserRouter>
            <SidebarProvider  >
             
                <>
                  <AppSidebar className='relative'  ></AppSidebar>
                  
                </>
            
                 
                  <Layout>
                    <Routes>
                      <Route path='/' element={<Homepage/>} ></Route>
                      <Route path='/sign-up' element={<Signup/>} ></Route>
                      <Route path='/login' element={<Login/>} ></Route>
                      <Route path='/blog/*' element={<Blog/>} >
                        <Route path=':id' element={<BlogDetails/>} ></Route>
                      </Route>
                      <Route path='/create-blog' element={<CreateBlog/>} ></Route>
                      <Route path='/account' element={<Account/>} ></Route>
                      <Route path='/admin/*' element={  <Admin/>   } >
                        <Route path='unpublished-posts' element={<UnpublishedPosts/>} ></Route>
                        <Route path='unpublished-posts/:id' element={<UnpublishedPostDetail/>} ></Route>
                        <Route path='create-blogpost' element={<CreateBlog/>} ></Route>
                      </Route>
                    </Routes>
                  </Layout>

            </SidebarProvider>
          </BrowserRouter>
            </UserProvider>
    </div>


  )
}
export default App
