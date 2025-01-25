import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../auth/firebase";
import { toastError, toastSuccess } from "../helpers/ToastNotify";
import { useNavigate } from "react-router-dom";


export const AuthContextt = createContext();

const AuthContext = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState()

  useEffect(()=>{
    userTakip()
  }, [])

  const createUser = async (email, password, displayName) => {
    await createUserWithEmailAndPassword(auth, email, password);
    toastSuccess("Register Completed!");
    navigate("/");

    await updateProfile(auth.currentUser, {
      displayName: displayName
    });
  };

  const signInUser = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
    toastSuccess("Logined Succesfully!");
    navigate("/");
  };

  const signInGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        toastSuccess("Logined with Google Succesfully!");
        navigate("/");
      })
      .catch((error) => {
        toastError("Can't keep Google account!")
      });
  };

  const logOut = () => {
    signOut(auth);
    toastSuccess("Logged Out!")
  }

  const userTakip = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const {email, displayName, photoURL} = user
        setCurrentUser({email:email, displayName:displayName, photoURL:photoURL})
      } else {
        setCurrentUser(false)
      }
    });
  }

  return (
    <AuthContextt.Provider value={{ createUser, signInUser, signInGoogle, logOut, currentUser }}>
      {children}
    </AuthContextt.Provider>
  );
};

export default AuthContext;
