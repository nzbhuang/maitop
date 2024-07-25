import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
} from "react-router-dom";
import Routes from "./routes/routes"
import './index.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme='light'>
      <App />
      <RouterProvider router={Routes} />
    </MantineProvider>
  </React.StrictMode>,
)
