# FlorentMagnoac_Piiquante Back-end #  

![App_sauce](https://user-images.githubusercontent.com/86949841/194278063-29628de0-ced7-4bd8-9146-2e2da5e665c4.jpg)

## Objectifs : ##
Création d’une API sécurisée pour une application d'évaluation culinaire en NODEJS, EXPRESS et MONGO DB

### Scénario : ###
Développement de l'application web de critiques de sauces "Hot Takes" pour la marque Piiquante. Cette application sera une galerie de sauces permettant aux utilisateurs de télécharger leurs sauces piquantes préférées et de liker ou disliker les sauces que d'autres partagent.

## Test de l'application : ##
Cloner le Repository  
Depuis le frontend : npm install et lancer "npm start"  
Depuis le Backend : lancer "nodemon serve"  
Front accessible a l'adresse : http://localhost:8081  
Exécution du backend: http://localhost:3000 

## Sécurité ##
Cryptage de l'email avec crypto-js  
Complexification du mot de passe avec password-validator  
Hashage du mot de passe utilisateur avec bcrypt
Manupulation sécurisée de la base de donnée avec mongoose
Vérification que l'email utilisateur soit unique dans la base de données avec mongoose-unique-validator
Utilisation de variables d'environnement pour les données sensibles avec dotenv
Authentification de l'utilisateur par token avec jsonwebtoken
Protection des headers avec helmet

