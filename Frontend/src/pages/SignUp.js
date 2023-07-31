import React from "react";
import { NavLink } from "react-router-dom";
import FormInput from "../components/FormInput";
import Buttons from "../components/Buttons";
import Img from "../images/1.svg";
import "../styles/SignUp.css";

const SignUp = () => {
  return (
    <div className="content-Up">
      <div className="first-content-Up">
      <img src={Img} alt="logo-groupomania-blanc" />
      </div>

      <div className="second-content-Up">
        <div>
          <div className="pbox-Up">
            <p className="p-Up">
              Déja membre ? <NavLink to="/signin">S'identifier</NavLink>
            </p>
          </div>
        </div>

        <div className="hbox-Up">
          <h1 className="h1-Up">Inscrivez-vous à Sociall</h1>
          <div className="fbox-Up">
            <form action="submit">
              <div className="flexcontent">
                <FormInput text="Nom" name="nom" customClass="inputflex" />
                <FormInput
                  text="Prénom"
                  name="prenom"
                  customClass="inputflex"
                />
              </div>
              <FormInput
                text="Adresse mail"
                name="mail"
                type="email"
                customClass="input-wrapper"
              />
              <FormInput
                text="Mot de passe"
                type="password"
                customClass="input-wrapper"
              />
              <Buttons text="Créé un compte" customClass="button-Up" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
