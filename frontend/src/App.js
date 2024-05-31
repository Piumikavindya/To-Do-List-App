import React, { useState } from 'react';
import { Routes, Route, useNavigate, Navigate,useLocation } from 'react-router-dom';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import Signin from './components/auth/Signin';
import Signup from './components/auth/SignUp';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);



  const handleSignIn = (user) => {
    console.log("User details:", user);
    setIsAuthenticated(true);
    console.log("User authenticated state:", isAuthenticated);
    setLoggedInUser(user);
    navigate("/auth/signin");
  };

  const handleSignOut = () => {
    console.log("Signing out...");
    setIsAuthenticated(false);
    setLoggedInUser(null);
    console.log("User authenticated state:", isAuthenticated);
    console.log("Logged-in user:", loggedInUser);
    navigate("/");
  };

  return (
    <>
    <div>
  
    <Navbar isAuthenticated={isAuthenticated} handleSignOut={handleSignOut} />  
        <Routes>
        
          <Route path="/" element={<HomePage />} />
          <Route
            path="/auth/signin"
            element={isAuthenticated ? (
              <Navigate to="/" />
            ) : (
              <Signin setIsAuthenticated={setIsAuthenticated} />
            )} />
          <Route path='/auth/signup' element={<Signup />} />

        </Routes>
 
    </div>
    </>
  );
}

export default App;
