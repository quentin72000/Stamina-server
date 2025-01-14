# Stamina-server

![](https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=for-the-badge)
![](https://img.shields.io/github/license/Stamina-Organization/Stamina-Server?style=for-the-badge)
![](https://img.shields.io/github/issues/Stamina-Organization/Stamina-Server?style=for-the-badge)
![](https://img.shields.io/discord/880133347446247574?label=Discord&style=for-the-badge)

Stamina-server est un projet sous license MIT pour l'instant, permettant de faire fonctionner la fonction multijoueur du jeu [Stamina-client](https://github.com/Stamina-Organization/Stamina-client). C'est un serveur master (ce n'est pas le véritable terme), c'est à dire qu'il s'occupera de tous ce qui se passe dans le jeu et qu'il est le seul à valider ou non les actions qui se passent en jeu. Cela permets de réduire la triche.

## Configuration

Le fichier de configuration `config.js` se présente de la manière suivante :

```js
module.exports = {
	port: 2025,
	debugEnabled: false,
	playerEnabled: false,
	maxPlayer: 5,
	version: "0.0.1",
};
```

Le serveur utilise par défaut le port 2025. Ce port peut-être modifié à n'importe quel moment en modifiant les valeurs dans le fichier `config.js`.

Vous pouvez activer ou désactiver quand vous voulez le système de débug en changeant la valeur de `debugEnabled`.

Vous pouvez aussi limiter le nombre de personnes qui peuvent se connecter aux serveurs en modifiant la valeur de `maxPlayer`.
