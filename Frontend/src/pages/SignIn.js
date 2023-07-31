import React from "react";
import { NavLink } from "react-router-dom";
import FormInput from "../components/FormInput";
import Buttons from "../components/Buttons";
import Img from "../images/1.svg";
import "../styles/SignIn.css";

const SignIn = () => {
  return (
    <div className="content">
      <div className="first-content">
        <img src={Img} alt="logo-groupomania-blanc" />
      </div>

      <div className="second-content">
        <div>
          <div className="pbox">
            <p className="p">
              Pas membre ? <NavLink to="/signup">S'inscrire maintenant</NavLink>
            </p>
          </div>
        </div>

        <div className="hbox">
          <h1 className="h1">Connectez-vous à Sociall</h1>
          <div className="fbox">
            <form action="submit">
              <FormInput
                text="Adresse mail"
                id="mail"
                type="email"
                customClass="input-wrapper"
              />
              <FormInput
                text="Mot de passe"
                type="password"
                customClass="input-wrapper"
              />
              <Buttons text="S'identifier" customClass="button" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
