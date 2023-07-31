import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const TestLogin = () => {
  //CREE UN CONTEXTE POUR METTRE LES INFOS
  const [userRole, setUserRole] = useState(null);
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const navigateTo = useNavigate();
  function submitLoginModal() {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/login`, userLogin) //ton endpoint back
      .then((response) => {
        const { role } = response.data;
        if (role) {
          setUserRole(role);
          if (role === "role de l'admin") {
            navigateTo("/admin"); //pour renvoyer à sa page après connexion
          } else if (role === "role du user") {
            navigateTo("/user"); //pour renvoyer à sa page après connexion
          }
          setUserLogin({
            email: "",
            password: "",
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <div>
      <button onClick={submitLoginModal}>Connexion</button>
    </div>
  );
};

export default TestLogin;
