// Import de bcrypt pour hachage password
const bcrypt = require('bcrypt');
// Import de crypto-js pour chiffrer adresse mail
const cryptojs = require('crypto-js');
// Import de package token d'authentification
const jwt = require('jsonwebtoken');

// Import package pour gérer et manipuler les variables d'environnement
const dotenv = require("dotenv");
const result = dotenv.config();

// Importation du models user de la base de donnée
const User = require('../models/User');


//-------- Enregistrement d'un nouveau user dans la database SIGNUP -------------//
exports.signup = (req, res, next) => {

    // Cryptage de l'adresse mail
    const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, `${process.env.EMAIL_CRYPTOJS_KEY}`).toString();
    console.log(emailCryptoJs);

    /* Hachage du password du user
    salt = 10 nombre de fois d'exécution algorithme de hachage */
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            // Instanciation d'un modèle User pour écriture dans la database
            const user = new User({
                email: emailCryptoJs,
                password: hash
            });
            // Envoie du user dans la database MongoDB
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé et enregistré !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};


//--------------- Identification d'un utilisateur LOGIN --------------------//
exports.login = (req, res, next) => {
    // Crypter l'email de la requête
    const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, `${process.env.EMAIL_CRYPTOJS_KEY}`).toString();

    // Recherche si user déjà enregistré dans la database
    User.findOne({ email: emailCryptoJs })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ error: "Utilisateur non enregistré" })
            }
            /* Contrôler la validité du password:
            .compare le mot de passe de la requête avec le mot de passe hashé de la database*/
            bcrypt.compare(req.body.password, user.password)
                .then((checkpassword) => {
                    console.log(checkpassword);
                    if (!checkpassword) {
                        return res.status(401).json({ error: "Mot de passe erroné" })
                    }
                    // Mot de passe valide
                    res.status(200).json({
                        // Attribution d'un token
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.JWT_KEY_TOKEN,
                            { expiresIn: "24h" }
                        )
                    });
                })
                .catch((error) => res.status(500).json({ error }))
        })
        .catch((error) => res.status(500).json({ error }));
};

