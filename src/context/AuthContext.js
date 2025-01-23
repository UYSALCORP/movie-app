import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { createContext } from "react";
import { auth } from "../auth/firebase";
import { toastSuccess } from "../helpers/ToastNotify";
import { useNavigate } from "react-router-dom";

export const AuthContextt = createContext();

const AuthContext = ({ children }) => {
  const navigate = useNavigate();

  const createUser = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
    toastSuccess("Register Completed!");
    navigate("/");
  };

  const signInUser = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
    toastSuccess("Logined Succesfully!");
    navigate("/");
  };

  return (
    <AuthContextt.Provider value={{ createUser, signInUser }}>
      {children}
    </AuthContextt.Provider>
  );
};

export default AuthContext;
