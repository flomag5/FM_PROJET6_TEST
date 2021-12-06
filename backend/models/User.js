//--- Définition du modèle de ressource "user" ---//

// Import de l'outil de modélisation d'objets MongoDB
const mongoose = require('mongoose');
// Package de validation d'email unique pour un user
const uniqueValidator = require('mongoose-unique-validator');

// Schema du modèle de base pour sign up/login
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true }, // Pas 2 users avec le même email
    password: { type: String, required: true }
});

// Sécurise enregistrement d'un email unique
userSchema.plugin(uniqueValidator);

// Exportation du modèle pour User
module.exports = mongoose.model('User', userSchema);