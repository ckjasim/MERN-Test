import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import router from './router/router.tsx'
import { Provider } from 'react-redux'
import store, { persistor } from './redux/store.ts'
import { Toaster } from 'react-hot-toast'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
  <StrictMode>
    <Toaster />
    <RouterProvider router={router} />
  </StrictMode>
  </PersistGate>
  </Provider>,
)
