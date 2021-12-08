//--- Définition du modèle de ressource "sauce" ---//

// Import de l'outil de modélisation d'objets MongoDB
const mongoose = require('mongoose');

// Création d'un schéma de données pour la sauce
const modelsSauce = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    mainPepper: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: [String], required: true },
    usersDisliked: { type: [String], required: true },
});

// Exportation du modèle de la sauce
module.exports = mongoose.model('sauce', modelsSauce);