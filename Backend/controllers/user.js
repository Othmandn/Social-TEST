const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Post = require("../models/Post");
const storage = require("../firebase");
const { ref, uploadBytesResumable, deleteObject } = require("firebase/storage");
const ObjectID = require("mongoose").Types.ObjectId;

exports.createAdmin = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        role: "administrateur",
      });
      user
        .save()
        .then(() =>
          res.status(201).json({ message: "Compte administrateur créé !" })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//Auth
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ error: "Paire login/mot de passe incorrecte" });
      } else {
        next();
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

// exports.logout = (req, res) => {
//   res.clearCookie("jwt");
//   res.redirect("/");
// };

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Déconnexion réussie" });
};

//User DB

exports.getAllUsers = (req, res, next) => {
  User.find()
    .select("-password")
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .select("-password")
    .then((users) => res.status(200).json(users))
    .catch(() => res.status(400).json("ID unknown : " + req.params.id));
};

exports.updateUser = (req, res, next) => {
  const userObject = { ...req.body };
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (user._id != req.auth.userId) {
        res.status(401).json({ message: "Non autorisé" });
      } else {
        User.updateOne(
          { _id: req.params.id },
          { ...userObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Profil mis à jour " }))
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.uploadUserProfil = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (user._id != req.auth.userId) {
        res.status(401).json({ message: "Non autorisé" });
      } else {
        let fileName;

        if (user.picture !== null) {
          const desertRef = ref(
            storage,
            `/profil/${req.auth.userId}/${user.picture}`
          );

          deleteObject(desertRef)
            .then(() => {
              console.log("File deleted successfully");
            })
            .catch((error) => {
              console.log("Uh-oh, an error occurred!");
            });
        }

        const storageRef = ref(
          storage,
          `${
            "/profil/" +
            req.auth.userId +
            "/" +
            req.file.originalname.split(" ").join("_") +
            Date.now()
          }`
        );

        const filePath = storageRef.fullPath;
        fileName = filePath.split("/").pop();

        const metadata = {
          contentType: req.file.mimetype,
        };

        uploadBytesResumable(storageRef, req.file.buffer, metadata).then(
          (snapshot) => {
            console.log("file oploaded");
          }
        );

        User.updateOne(
          { _id: req.params.id },
          {
            picture: fileName,
          }
        )
          .then(() =>
            res.status(200).json({ message: "Photo de profil modifiés !" })
          )
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.deleteUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (
        !(req.auth.role === "administrateur" || user._id == req.auth.userId)
      ) {
        res.status(401).json({ message: "Non autorisé" });
      } else {
        //Suppression des post
        Post.find({ userId: `${user._id}` })
          .then((posts) => {
            posts.forEach((post) => {
              if (post.picture) {
                const desertRef = ref(storage, `${"/post/" + post.picture}`);
                deleteObject(desertRef)
                  .then(() => {
                    console.log("Image supprimée de Firebase Storage");
                    Post.deleteOne({ _id: post._id })
                      .then(() => {
                        console.log("Document supprimé de MongoDB");
                      })
                      .catch((error) => {
                        console.error(
                          "Erreur lors de la suppression du document de MongoDB",
                          error
                        );
                      });
                  })
                  .catch((error) => {
                    console.error(
                      "Erreur lors de la suppression de l'image de Firebase Storage",
                      error
                    );
                  });
              } else {
                // Supprimez le document de MongoDB s'il n'y a pas d'image
                Post.deleteOne({ _id: post._id })
                  .then(() => {
                    console.log("Document supprimé de MongoDB");
                  })
                  .catch((error) => {
                    console.error(
                      "Erreur lors de la suppression du document de MongoDB",
                      error
                    );
                  });
              }
            });
          })
          .catch((error) => {
            console.error(error);
          });

        //Suppression de la photo de profil
        if (user.picture !== null) {
          const desertRef = ref(storage, `/profil/${user._id}/${user.picture}`);

          // Delete the file
          deleteObject(desertRef)
            .then(() => {
              console.log("File deleted successfully");
            })
            .catch((error) => {
              console.log("Uh-oh, an error occurred!");
            });
        }

        User.deleteOne({ _id: req.params.id })
          .then(() =>
            res.status(200).json({
              message: "Utilisateurs supprimé !",
            })
          )
          .catch((error) => res.status(400).json({ error }));
        res.cookie("jwt", "", { maxAge: 1 });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.follow = (req, res, next) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToFollow)
  ) {
    return res.status(400).send("ID unknow");
  }

  if (req.params.id === req.body.idToFollow) {
    return res.status(400).send("Vous ne pouvez pas vous suivre");
  }
  User.findOne({ _id: req.params.id })
    .then((user) => {
      User.updateOne(
        { _id: req.params.id },
        { $addToSet: { following: req.body.idToFollow }, _id: req.params.id }
      ).catch((error) => res.status(400).json({ error }));
      User.updateOne(
        { _id: req.body.idToFollow },
        { $addToSet: { followers: req.params.id } }
      )
        .then(() => res.status(200).json({ message: "follow ajouté !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.unfollow = (req, res, next) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnfollow)
  ) {
    return res.status(400).send("ID unknow");
  }

  User.findOne({ _id: req.params.id })
    .then((user) => {
      User.updateOne(
        { _id: req.params.id },
        { $pull: { following: req.body.idToUnfollow }, _id: req.params.id }
      ).catch((error) => res.status(400).json({ error }));
      User.updateOne(
        { _id: req.body.idToUnfollow },
        { $pull: { followers: req.params.id } }
      )
        .then(() => res.status(200).json({ message: "follow supprimé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
