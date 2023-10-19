import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { appRoutes } from './routes/index'
import { useState, createContext, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';


function App() {

  
  return (
    <>
      <RouterProvider router={appRoutes} />
      <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
    </>
      
      
  );
}

export default App;
