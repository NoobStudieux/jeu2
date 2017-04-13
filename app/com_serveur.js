var session = require('cookie-session');
var m = require('./modules.js');
exports.loadIoModule = function(server, app)
{
    var io = require('socket.io').listen(server);
    var j = require('./objets/Joueur'), p = require('./objets/Partie');
	session.parties.push(new p.Partie("un jeu"));
console.log("partie juste créee : " + session.parties[0].id + " " + session.parties[0].jeu);

    io.sockets.on('connection', function (socket) {
		function envoiMajInfos()
		{
			var data = {listP: session.parties, listJ: session.joueursConnectes};
			socket.emit('majInfos', data);
			socket.broadcast.emit('majInfos', data);
		}
		socket.on('getInfos', function() {
console.log('demande liste');
			var data = {listP: session.parties, listJ: session.joueursConnectes};
			socket.emit('majInfos', data);
		});
		socket.on('meVoila', function(pseudo) {
			session.sockets.push(socket);
			var joueur = new j.Joueur(pseudo, socket.id);
socket.emit("test");
			joueur.afficher();
			session.joueursConnectes.push(joueur);
			envoiMajInfos();
		});
		socket.on('deconnexion', function(joueur) {
			console.log(joueur.pseudo + " se deco");
			m.DesinscrJDePartie(joueur.pseudo, joueur.idPartie);
		//	m.desincrSiPartie(pseudo);
			m.supprJoueur(joueur.pseudo, socket.id);
//  *****

/*	console.log("verif socket MAJ OK");
	session.joueursConnectes.forEach(function(js){
		console.log(js.pseudo + " - " + js.socket);
	})
	console.log("list socket ");
	session.sockets.forEach(function(sckt){
		console.log(sckt);
	})*/


//  *****
			envoiMajInfos();
		});
		socket.on('jeMinscris', function(data) { // data['idPartie'] && data['pseudo']
				m.InscrJAPartie(data['pseudo'], data['idPartie'])
					.then(function(){
						console.log(data['pseudo'] + " bien inscris partie n° :" + data['idPartie']);
						envoiMajInfos(err => {console.log('err : ' + err)});
					})
					.catch(err => {console.log(err);});
		});
		socket.on('jeMeDesinscris', function(data) { // data['idPartie'] && data['pseudo']
				if(m.DesinscrJDePartie(data['pseudo'], data['idPartie'])){	envoiMajInfos();		}
				else{socket.emit('probleme', "Vous êtes déjà inscris à la Partie n° " + data['idPartie']);}			
		});
		socket.on('demandeCreationPartie', function(data) { // data['pseudo'] && data['jeu']
		console.log(data['pseudo'] + " veut lancer unepartie de : " + data['jeu'] );
		var retourPeutCreerPartie = m.peutCreerPartie(data['pseudo']);
			if(retourPeutCreerPartie[0]){
				if(m.creationPartie(data['pseudo'], data['jeu'])){
					var data = {listP: session.parties, listJ: session.joueursConnectes};
					envoiMajInfos();
				}
				else{socket.emit('probleme', "la partie n'a pas été créee ... ");}
			}else{socket.emit('probleme', "vous ne pouvez pas créer de partie, cause : " + retourPeutCreerPartie[1]);}
		});	
		socket.on('jAnnuleMaPartie', function(data) { // data['pseudo'] && data['idPartie']
			console.log(data['pseudo'] + " veut annuler unepartie de : " + data['idPartie'] );
			var indexP = -1, indexJ = -1, compteur = 0;
			var partieTrouvee = false;
			session.parties.forEach(function(p){
				if(p.id == data['idPartie']){
					if(p.inscrits[0].pseudo == data['pseudo']){
						partieTrouvee =true;
						indexP = compteur;
console.log("sock annulerpartie : indexP : " + indexP + "  p.id :" + p.id + ", p.inscrits[0] : " + p.inscrits[0] + ",  data['pseudo']  "  + data['pseudo']);
					}
					else{socket.emit('probleme', "vous n'êtes pas le chef de la partie : " + data['idPartie']);}
					compteur ++;
			}
			})
			if(partieTrouvee){
				session.parties[indexP].devientAnnulee();
				session.parties[indexP].inscrits.forEach(function(i){
					i.setIdPartie(-1);
				})
				// m.annulerPartie(session.parties[indexP]);
				envoiMajInfos();
			}
			else{	socket.emit('probleme', "partie pas trouvée : " + data['idPartie']);	}
		});
		socket.on('lancerMaPartie', function(data) { // data['pseudo'] && data['idPartie']
			console.log(data['pseudo'] + " veut lancer sa partie : " + data['idPartie'] );

			session.parties.forEach(function(p){
				if(data['idPartie'] == p.id) // on se positionne sur la partie concernée
				{
					p.inscrits.forEach(function(i){
						console.log("test socket : " + i.socket.id);
						var d = {idP: data['idPartie']};
					//	io.sockets.socket(i.socket).emit('lancementPartie', d);
					//	i.socket.emit('lancementPartie', d);
					})
				}
			})
		});

// a supprimer : 
socket.on('devGetListParties', function() {
	var monMess = "";
	session.parties.forEach(function(p){
		monMess += String("\n" + p.id + "  " + p.jeu + ", état : " + p.etat + ", inscrits : ") ;
		p.inscrits.forEach(function(i){
			monMess += i.pseudo + ", ";
		})
	})
	socket.emit('probleme', monMess);
});
socket.on('devGetListJoueurs', function() {
	var monMess = "";
	session.joueursConnectes.forEach(function(j){
		monMess += String("\n" + j.pseudo + ", idPartie : " + j.idPartie) ;
	})
	socket.emit('probleme', monMess);
}); // fin à suppr
    });
}