import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../auth/firebase";
import { toastError, toastSuccess } from "../helpers/ToastNotify";
import { useNavigate } from "react-router-dom";

export const AuthContextt = createContext();

const AuthContext = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    userTakip();
  }, []);

  const createUser = async (email, password, displayName) => {
    await createUserWithEmailAndPassword(auth, email, password);
    toastSuccess("Registered Successfully!");
    navigate("/");

    //? USERTAKİPTEN SONRA -----kullanıcı profilini güncellemek için kullanılan firebase metodu, login logout da userTakip sayesinde güncelleniyor ama register da isim güncellemesi yok, o da bu şekilde oluyor.alttakini yazmazsam (register ile girdiğimde) navbarda displayName i göremem. alttakini yazmazsam sadece google ile girersem görürüm
    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });
  };

  const signInUser = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
    toastSuccess("Logined Successfully");
    navigate("/");
  };

  const signInGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        toastSuccess("Countunied with Google");
        navigate("/");
      })
      .catch((error) => {
        toastError("Can't Keep Google Account!");
      });
  };

  const cikis = () => {
    signOut(auth);
    toastSuccess("Log Outted!");
  };

  const userTakip = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName, photoURL } = user;

        setCurrentUser({
          email: email,
          displayName: displayName,
          photoURL: photoURL,
        });
      } else {
        setCurrentUser(false);
      }
    });
  };

  return (
    <AuthContextt.Provider
      value={{ createUser, signInUser, signInGoogle, cikis, currentUser }}
    >
      {children}
    </AuthContextt.Provider>
  );
};

export default AuthContext;
