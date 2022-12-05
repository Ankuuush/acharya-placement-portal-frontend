import { auth } from "../../firebase";
import AuthContext from "./AuthContext";
import api from "../../api";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

import { useEffect, useState } from "react";

const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  const signup = async (email, password, firstName, lastName) => {
    // const response= await fetch(`https://acharya-palcement-portal.herokuapp.com/api/auth/register`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email: email,
    //     password: password,
    //     firstName: firstName,
    //     lastName: lastName,
    //   }),
    // });
    const response = await api
      .post("/auth/register", {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      })
      .then((response) =>{
         return response;
        }).catch(error=>{
          return error;
        });
    return response;
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if(user){
      user.getIdTokenResult().then((result)=>{
        setToken(result.claims)
      })
      .catch((error)=>{
        console.log(error)
      })}
      else
      setToken(null)
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        login,
        currentUser,
        token,
        logout,
        resetPassword,
        setLoading,
      }}
    >
      {!loading && props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
