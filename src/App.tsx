import React from 'react';
import logo from './logo.svg';
import './App.css'

import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import { Home } from './Home';
import { Setup } from './Setup';
import { Play } from './Play';

const router = createHashRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/setup",
    element: <Setup/>,
  },{
    path: "/play",
    element: <Play/>,
  },
]);



function App() {
  return (
    <div className="App">
     <RouterProvider router={router} />
    </div>
  );
}

export default App;
