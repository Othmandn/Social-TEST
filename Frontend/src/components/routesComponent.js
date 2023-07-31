import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import UnauthorizedPage from "../pages/Unauthorized"; //Page où renvoyer en cas de tentative de connexion non autorisé
import AdminHome from "../pages/AdminHome";
import UserHome from "../pages/AdminHome"; //j'ai mis au hasard pour illustrer tu remplaceras

export default function RoutesComponent() {
  const { userRole } = useContext(AuthContext); //met le role dans un context pour l'avoir partout
  return (
    //si le role correspond tu renvoies vers sa page, sinon tu renvoies vers la page unauthorized, et en front tu n'auras que le role de sauvegarder donc c'est safe
    <div className="App">
      {userRole === 0 || userRole === 1 ? <NavBarUser /> : <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/admin"
          element={
            userRole === "role de l'admin" ? (
              <AdminHome />
            ) : (
              <UnauthorizedPage />
            )
          }
        />

        <Routes
          path="/user"
          element={
            userRole === "role du user" ? <UserHome /> : <UnauthorizedPage />
          }
        />
      </Routes>
    </div>
  );
}
