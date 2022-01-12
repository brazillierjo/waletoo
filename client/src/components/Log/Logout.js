import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Logout() {
  const logout = async () => {
    await axios({
      method: "get",
      url: `http://localhost:3001/api/logout`,
      withCredentials: true,
    })
      .catch((err) => console.log(err));

    window.location = "/";
  };

  return (
    <Link to="/"
      className="my-2 sm:m-0 sm:mr-12 text-gray-300 hover:bg-gray-700 px-3 rounded-md sm:text-sm"
      onClick={logout}>Déconnexion
      <i className="ml-3 fas fa-sign-out-alt text-red-400"></i>
    </Link>
  )
}