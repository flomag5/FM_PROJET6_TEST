//--- Définition de la logique de routing pour la ressource sauce ---//

// Importation du package Express
const express = require('express');

// Importation middleware du password
const password = require('../middleware/password');

// Classe de gestionnaire de routes
const router = express.Router();

// Importation du controller des routes pour user
const userCtrl = require('../controllers/user');

// Route pour inscription
router.post('/signup', userCtrl.signup);

// Route pour identification
router.post('/login', userCtrl.login);

// Exportation du router
module.exports = router;