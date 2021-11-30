// Importation express
const express = require('express');
// Classe de gestionnaire de routes
const router = express.Router();

// Importation du controller pour user
const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Routes CRUD avec middleware d'authentification
router.post('/', auth, multer, saucesCtrl.createSauce);
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.get('/', auth, saucesCtrl.getAllSauces);
router.delete('/:id', auth, saucesCtrl.deleteSauce);


// Exportation du module
module.exports = router;

