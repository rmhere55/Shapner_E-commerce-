import { useState, useEffect } from "react";
import { authContext } from "./authContext";
import { checkTokenValidity } from "../../Firebase/authFun";
import { getAuth, signOut } from "firebase/auth";
import firebaseApp from "../../Firebase/initialize";


const auth = getAuth(firebaseApp);

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) { 
      checkTokenValidity(logout);
    }
  }, [token]);

  const login = (token, email) => {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    setToken(token);
  };

  const logout = (isExpired = true) => {
    if (isExpired) {
      localStorage.removeItem('token');
      setToken(null);
      signOut(auth);
    }
  };

  return (
    <authContext.Provider value={{ token, login, logout }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
