import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginIndex from './pages/login/LoginIndex';
import Feed from './pages/feed/Feed';
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();
  return (
    <BrowserRouter>
    <main>
      <Routes>
        <Route element={user ? <Feed/> : <LoginIndex />} path='/' />
        <Route element={!user ? <LoginIndex /> : <Navigate to="/" />} path='/' />
      </Routes>
    </main>
  </BrowserRouter>
  )
}

export default App
