const { Server, WebSocket } = require("ws");

module.exports = {
	/**
	 * @name calc
	 * @description Ceci est une méthode de démonstration qui sert à calculer deux nombres.
	 * @function run
	 * @param {JSON} message
	 * @param {WebSocket} client
	 * @returns {String}
	 */
	name: "calc",
	description:
		"Ceci est une deuxieme methode de demonstration qui sert à calculer deux nombre (à rien en gros mdr)",
	run: function (message, client) {
		let data = message.data;

		if (data.firstN && data.secondN) {
			if (typeof data.firstN === "number" && typeof data.secondN === "number") {
				client.send(
					JSON.stringify({
						method: "calc",
						data: {
							result: data.firstN + data.secondN,
							date: new Date(),
							// On peut aussi recup des info dans une DB ect...
						},
					})
				);
			} else
				client.send(
					JSON.stringify({
						method: "calc",
						error: "not valid number",
					})
				);
		} else
			client.send(
				JSON.stringify({
					method: "calc",
					error: "not valid param",
				})
			);
	},
};
