import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { ChannelProvider } from './context/ChannelContext.jsx'
import { SettingProvider } from './context/SettingContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ChannelProvider>
        <SettingProvider>
          <App />
        </SettingProvider>
      </ChannelProvider>
    </AuthProvider>
  </React.StrictMode>,
)
