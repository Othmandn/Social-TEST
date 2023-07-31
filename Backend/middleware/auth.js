const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const verifyPassword = (req, res, next) => {
  bcrypt
    .compare(req.body.password, user.password)
    .then((result) => {
      if (result) {
        const maxAge = 3 * 60 * 60;
        const payload = { sub: req.user._id, role: req.user.role };
        const token = jwt.sign(payload, process.env.RANDOM_TOKEN_SECRET, {
          expiresIn: maxAge,
        });
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000,
        });
        res.status(201).json({
          message: "Connexion réussie",
          role: req.user.role, // Ajout du rôle à la réponse JSON pour récupérer en front
        });
      } else {
        res.sendStatus(401);
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const verifyIsAdmin = (req, res, next) => {
  //auth anciennement
  try {
    const token = req.cookies.jwt;
    if (!token) {
      throw new Error("Authentification échouée");
    }

    const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);

    if (decodedToken.role !== "role de l'admin en fonction de ta bdd") {
      throw new Error("Utilisateur non autorisé");
    }

    req.auth = {
      userId: decodedToken.userId,
      role: decodedToken.role,
    }; // à quoi ça sert ?

    next(); //si le jwt existe et que le rôle correspond tu next et tu passe à la suite de ta route
  } catch (error) {
    res.status(401).json({ error: "Authentification échouée" });
  }
};
const verifyIsUser = (req, res, next) => {
  //auth anciennement
  try {
    const token = req.cookies.jwt;
    if (!token) {
      throw new Error("Authentification échouée");
    }

    const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);

    if (decodedToken.role !== "role du user classique en fonction de ta bdd") {
      throw new Error("Utilisateur non autorisé");
    }

    req.auth = {
      userId: decodedToken.userId,
      role: decodedToken.role,
    }; // à quoi ça sert ?

    next(); //si le jwt existe et que le rôle correspond tu next et tu passe à la suite de ta route
  } catch (error) {
    res.status(401).json({ error: "Authentification échouée" });
  }
};

module.exports = {
  verifyIsAdmin,
  verifyIsUser,
  verifyPassword,
};
