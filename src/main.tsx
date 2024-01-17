import '@fortawesome/fontawesome-free/css/all.min.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'animate.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.tsx'
import './Styles/global.scss'
import ToastContextProvider from './Context/ToastContext.tsx'
import AuthContextProvider from './Context/AuthContext.tsx'



const queryClient = new QueryClient()
AOS.init();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ToastContextProvider>
      <AuthContextProvider>
        <ToastContainer />
        <App />
      </AuthContextProvider>
    </ToastContextProvider>
  </QueryClientProvider>
)



