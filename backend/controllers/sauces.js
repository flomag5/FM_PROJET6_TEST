// ------------ Stockage logique métier et implémentation routes CRUD -------------//

// Importation du modèle de la database
const Sauce = require('../models/Sauce');
// Import module d'interaction avec le système de fichiers
const fs = require('fs');


// Ajout d'une sauce --CREATE--
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    // Suppression id du front car un id auto sera généré par mongodb
    delete sauceObject._id;
    // Instanciation du modèle Sauce pour l'ajout à mongodb
    const sauce = new Sauce({
        ...sauceObject, // opérateur spread copie tous les éléments de req.body
        // Résolution complète de l'Url de l'image
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    // Enregistrement d'une sauce dans la database
    sauce.save()
        .then(() => {
            res.status(201).json({
                message: "Sauce bien enregistrée !",
                contenu: req.body
            })
        })
        .catch((error) => res.status(400).json({ error }))

};

// Lecture de toutes les sauces --READ--
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

// Lecture d'une seule sauce --READ--
exports.getOneSauce = (req, res, next) => {
    // Recherche la sauce avec cet Id
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

// Modification d'une sauce --UPDATE--
exports.modifySauce = (req, res, next) => {
    // Si fichier image dans la requête
    if (req.file) {
        // Recherche de la sauce avec le même id
        Sauce.findOne({ _id: req.params.id })
            .then(sauce => {
                // Extraction du nom de fichier à supprimer
                const filename = sauce.imageUrl.split('/images/')[1];
                // Suppresion de l'ancien fichier image du dossier 'images'
                fs.unlink(`images/${filename}`, (error) => {
                    if (error)
                        throw error
                });
            })
            .catch(error => res.status(400).json({ error }));
    }
    // Si il y a un fichier image dans la requête
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            // Construction de l'URL du fichier enregistré
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    // Modification de celui dont id est le même que id des paramètres de la requête
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: "La sauce a été modifiée" }))
        .catch(error => res.status(400).json({ error }));
};


// Suppression d'une sauce --DELETE--
exports.deleteSauce = (req, res, next) => {
    // Recherche de la ressource à supprimer
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            // Extraction du nom du fichier à supprimer
            const filename = sauce.imageUrl.split('/images/')[1];
            // Supprime l'img du dossier images
            fs.unlink(`images/${filename}`, () => {
                // Callback de supression objet dans database
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: "La sauce a bien été supprimée !" }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};