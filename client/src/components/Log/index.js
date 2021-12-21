import React, { useState } from "react";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";

const Log = (props) => {
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [signInModal, setSignInModal] = useState(props.signin);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setSignUpModal(false);
      setSignInModal(true);
    }
  };

  return (
    <div className="w-full">
      <ul className="flex justify-evenly">
        <li
          onClick={handleModals}
          id="login"
          className={signInModal ? "bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded opacity-50" : "scale-50 cursor-pointer bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"}
        >
          Se connecter
          </li>
        <li
          onClick={handleModals}
          id="register"
          className={signUpModal ? "bg-gray-500 hover:bg-gray-500 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded opacity-50" : "scale-50 cursor-pointer bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"}
        >
          S'inscrire
          </li>
      </ul>
      {signUpModal && <SignUpForm />}
      {signInModal && <SignInForm />}
    </div>
  );
};

export default Log;
