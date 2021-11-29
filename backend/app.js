// Importation express
const express = require('express');

const bodyParser = require('body-parser');

// Importation mongoose
const mongoose = require('mongoose');

// Importation du chemin
const path = require('path');

// Improtation des routes
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');

// Import package pour utiliser variables environnement
const dotenv = require('dotenv');
const result = dotenv.config();

const app = express();

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

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;

//OKAY