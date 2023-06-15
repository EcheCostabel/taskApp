import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';
import { HomePage } from './pages/HomePage';
import { TasksPage } from './pages/TasksPage';
import { TaskFormPage } from './pages/TaskFormPage';
import { ProfilePage } from './pages/ProfilePage';
import { ProtectedRoute } from './ProtectedRoute';
import { TaskProvider } from './context/TaskContext.jsx';
import { NavBar } from './components/NavBar';

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <main className='container mx-auto px-10'>
            <NavBar />
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/login' element={<LoginPage /> } />
              <Route path='/register' element={<RegisterPage />} />

              {/* PROTEGEMOS TODAS LAS RUTAS DENTRO DE ESTA */}
              <Route element={<ProtectedRoute />}> 
                <Route path='/tasks' element={<TasksPage />} />
                <Route path='/add-task' element={<TaskFormPage />} />
                <Route path='/tasks/:id' element={<TaskFormPage />} />
                <Route path='/profile' element={<ProfilePage />} />
              </Route>

            </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App;