// Importation de multer
const multer = require('multer');

// Création d'un objet type dictionnaire
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// Objet de configuration de multer
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        // Génération d'un nom de fichier unique
        callback(null, name + Date.now() + '.' + extension);
    }
});

// Exportation du middleware en signifiant qu'il s'agit de fichier image uniquement
module.exports = multer({ storage }).single('image');