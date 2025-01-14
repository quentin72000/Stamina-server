const { debug, debugError } = require("../utils/debug.js")
const ServerHandling = require("./ServerHandling.js")
const methods = require("../handler.js")
const Room = require("../Game/Room")
const { parse } = require("path")

// Le système de date est obligatoire, car il permettra de mettre en place le systeme de ping et le systeme de pertes des paquets.µ
// Si un paquet est trop vieux on pourra le considérer comme inutile

class DataHandling {

    constructor() {
        this.lobby = []
    }

    /**
     * @description Cette fonction renverra les données au client concernées, peu importe le type de données.
     * @description Elle pourra être utilisée partout, car son unique but est de renvoyer des données.
     * @description Plus tard, il y aura un chiffrement des données pour éviter tout problème.
     * @param {WebSocket} client
     * @param {String} data
     * @param {int} date
     */
    send_data(client, data, date) {
        client.send(Buffer.from(JSON.stringify({ data, date }), "utf-8"))
    }

    /**
     * @description Cette fonction s'occupera de partager les différentes données envoyées du client au serveur vers les "services compétents".
     * @description La position sera par exemple envoyées vers la classe Player et sa fonction ValidatePosition() qui elle renverra au client si la position est valide ou non.
     * @description Elle fonctionne avec une boucle for car plusieurs données utiles sont envoyées dans un seul JSON
     * @param {WebSocket} client
     * @param {String} data
     * @param {int} date
     */
    use_data(client, data, date) {
        let StringMessage = data.toString()
        let parsedMessage = JSON.parse(StringMessage);
        switch(true){
            case !parsedMessage:
                console.log("Invalid message format")
                break;
            case parsedMessage.client_type == "client":
                console.log("something")
                this.handle_data_for_clients(client, parsedMessage)
                break
            case parsedMessage.status == "connexion":
                console.log("Un joueur s'est connecté")
                this.lobby[0].create_players(parsedMessage["data"]["account"]["tag"], parsedMessage.data.account.username, parsedMessage.data.account.id, client)
                break;
            case parsedMessage.status == "deconnexion":
                this.lobby[0].delete_players(parsedMessage.data.account.id, client)
                console.log("Un joueur s'est déconnecté")
                break;
            default:
                console.log("DEFAULT")
        }
    }
    /**
     * @function handle_data_for_clients
     * @description Traite et redirige les données envoyées par un client 
     * @param {WebSocket} client 
     * @param {JSON} data 
     */
    handle_data_for_clients(client, data) {
        //this.lobby[0].players.find(player => player.id == data.id).manage_player(data)
        this.lobby[0].manage_data_to_players(data, data.id)
        //console.log("[TEST] Joueur qui envoie : ", data.id, "Sa position : ", data.PlayerID.Player.Position)
    }

    /**
     * @function handle_data_for_api
     * @description Traite et redirige les données envoyées par un client API
     * @param {String} message 
     * @param {WebSocket} client 
     * @param {String} method 
     * @returns {JSON}
     */
    handle_data_for_api(message, client, method) {
        if (!methods[method]) {
            debug(`Quelqu'un a voulu utiliser la fonction "${method}" qui n'existe pas.`)
            return client.send(JSON.stringify({
                error: 400
            })) // si méthod n'existe pas, renvoyer le code 400

        }
        methods[method].run(message, client)
    }

    /**
     * @function handle_data_for_admin
     * @description Traite et redirige les données envoyées par un administrateur
     * @param {WebSocket} client 
     * @param {JSON} data 
     * @param {String} method 
     */
    handle_data_for_admin(client, data, method) {
        debug("Un admin a envoyé une requête")
    }

    /**
     * @function create_lobby
     * @description Créé une partie
     * @param {int} id 
     * @param {Array} playersID 
     * @param {int} max_players 
     */
    create_lobby(id, max_players) {
        this.lobby.push(new Room(id, max_players))
    }

    /**
     * 
     * @param {*} tag 
     * @param {*} username 
     * @param {*} id 
     * @param {*} socket 
     */
    create_player(tag, username, id, socket) {
        this.lobby[0].create_players(tag, username, id, socket)
        this.lobby[0].find_players(tag, username)
    }

    delete_player(tag, username, socket) {
        this.lobby[0].delete_players(tag, username, socket)
    }
}

module.exports = DataHandling;