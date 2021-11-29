// Importation mongoose
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Schema du modèle de base pour sign up/login
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Sécurise enregistrement d'un email unique
userSchema.plugin(uniqueValidator);

// Exportation du modèle pour User
module.exports = mongoose.model('User', userSchema);