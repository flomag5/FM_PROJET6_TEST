//--- Définition de la logique de routing pour la ressource sauce ---//

// Importation express
const express = require('express');

// Classe de gestionnaire de routes
const router = express.Router();

// Import du controller pour user
const saucesCtrl = require('../controllers/sauces');
// Import du middleware d'authentification
const auth = require('../middleware/auth');
// Import de gestion des fichiers téléchargés
const multer = require('../middleware/multer-config');

// Routes CRUD avec middleware d'authentification
router.post('/', auth, multer, saucesCtrl.createSauce);
router.get('/', auth, saucesCtrl.getAllSauces);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);


// Exportation du module de router
module.exports = router;

