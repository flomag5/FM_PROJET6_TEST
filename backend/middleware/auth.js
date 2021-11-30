const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Exportation fonction du middleware
module.exports = (req, res, next) => {
    try {
        // Récupération du token dans le headers authorization et décodage 
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY_TOKEN);
        // Récupération userId du token et comparaison avec userId
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User Id non valable !';
        } else {
            next(); // si user authentifié, on passe à l'exécution
        }
    } catch (error) {
        res.status(403).json({ error: error | 'Requête non authentifiée !' });
    }
};