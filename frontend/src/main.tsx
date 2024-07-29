import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
} from "react-router-dom";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import App from './App'
import { SettingsProvider } from './contexts/settingscontext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SettingsProvider>
      <MantineProvider defaultColorScheme='light'>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MantineProvider>
    </SettingsProvider>
  </React.StrictMode>,
)
