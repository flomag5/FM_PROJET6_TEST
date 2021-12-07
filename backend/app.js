//--- Contient application Express de gestion des réponses du serveur aux requêtes ---//

// Importation express
const express = require('express');

// Import helmet
const helmet = require('helmet');

// Import module express-rate-limit
const rateLimit = require('express-rate-limit');

// Import bodyParser
const bodyParser = require('body-parser');

// Importation mongoose
const mongoose = require('mongoose');

// Utilitaire pour travailler avec les chemins de fichiers et de répertoires
const path = require('path');

// Improtation des routes
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');

// Import package pour utiliser variables environnement
const dotenv = require('dotenv');
const result = dotenv.config();

const app = express();

// Sécurisation des en-têtes de réponse http
app.use(helmet());

// Connexion à la base de données MongoDB
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !!'));

// Debugger mongoose
mongoose.set('debug', true);

// Ajout headers pour gestion des problèmes de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Middleware limitation des demandes répétées à l'API ou endpoints
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limite de requête par IP pour windowsMs
});

app.use(limiter);


app.use(bodyParser.json());

// Gestionnaire de routage
// Configuration du serveur pour renvoyer des fichiers statiques
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes sauces et utilisateurs
app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);


module.exports = app;

