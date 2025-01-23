import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { createContext } from "react";
import { auth } from "../auth/firebase";
import { toastSuccess } from "../helpers/ToastNotify";
import { useNavigate } from "react-router-dom";

export const AuthContextt = createContext();

const AuthContext = ({ children }) => {

  const navigate = useNavigate()

  const createUser=async(email, password)=>{
  await createUserWithEmailAndPassword(auth, email, password);
    toastSuccess("Register Completed!")
    navigate("/")
  }



  return <AuthContextt.Provider value={{createUser}}>
  {children}
  </AuthContextt.Provider>;
};

export default AuthContext;
