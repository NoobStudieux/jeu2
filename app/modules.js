var session = require('cookie-session');
var p = require('./objets/Partie');

function getJFromPseudo(pseudo)
{
	return new Promise(function(resolve, reject){
		session.joueursConnectes.forEach(function(j) {
			if(j.pseudo == pseudo){return resolve(j);}
		})
		//ajouter reject ici (et dans com serveur.js)
	})
}
exports.getJFromPseudo = getJFromPseudo;
/*function supprSocket(sockID)
{
	var newSockList = [];
	session.sockets.forEach(function(s){
		if(sockID == s.id){} // sauter 
		else{	newSockList.push(s.id);		}
	})
	session.sockets = newSockList;
}
exports.supprSocket = supprSocket;*/



//  inutilisée


/*function getPFromId(idP)
{
	return new Promise(function(resolve, reject){
		var resolve = false;
		session.parties.forEach(function(p) {
			if(p.id == idP){return resolve(p); resolve = true; }
		})
		if(resolve){}
		else{return reject("la partie n'a pas été trouvée"); }
	})
}
exports.getPFromId = getPFromId;*/
exports.supprJoueur = function(pseudo, sockID)
{
// MAJ list sockets

	var newSockList = [];
	session.sockets.forEach(function(s){
		if(sockID == s.id){} // sauter 
		else{	newSockList.push(s.id);		}
	})
	session.sockets = newSockList;
// MAJ liste joueurs
	var newList = [];
	session.joueursConnectes.forEach(function(j) {
			if(j.pseudo == pseudo){return j;}
			else{newList.push(j);}
		})
	session.joueursConnectes = newList;
}

function InscrJAPartie(pseudo, idPartie)
{
	return new Promise(function(resolve, reject){
		var indexJ = -1, indexP = -1, compteur=0;
		session.joueursConnectes.forEach(function(jo){
			if(jo.pseudo == pseudo){indexJ=compteur;}
			compteur ++;
		})
		compteur=0;
		session.parties.forEach(function(pa){
			if(pa.id == idPartie){indexP=compteur;}
			compteur ++;
		})
		if(indexP != -1 && indexJ != -1){
			session.joueursConnectes[indexJ].setIdPartie(session.parties[indexP].id);	//	dans partie.addJoueur
			session.parties[indexP].addJoueur(session.joueursConnectes[indexJ]);
console.log("session.joueursConnectes[indexJ].setIdPartie :  " + session.joueursConnectes[indexJ].idPartie);
			return resolve(true);
		}
		else{console.log("pb lors de /app/module.js  InscrJAPartie, indexP : " + indexP +", indexJ : " + indexJ); return reject("indexP ou indexJ == -1");}
	})
}
exports.InscrJAPartie = InscrJAPartie;
function DesinscrJDePartie(pseudo, idPartie)
{
	return new Promise(function(resolve, reject){
		var indexJ = -1, indexP = -1, compteur=0;
		session.joueursConnectes.forEach(function(jo){
			if(jo.pseudo == pseudo){indexJ=compteur;}
			compteur ++;
		})
		compteur=0;
		session.parties.forEach(function(pa){
			if(pa.id == idPartie){indexP=compteur;}
			compteur ++;
		})
		if(indexP != -1 && indexJ != -1){
			session.joueursConnectes[indexJ].setIdPartie(-1);
			session.parties[indexP].supprJoueur(pseudo);
			console.log(session.joueursConnectes[indexJ].pseudo + " bien desinscris partie n° :"
			+ session.parties[indexP].id);
			return true;
		}
		else{console.log("pb lors de /app/module.js  DesinscrJDePartie, un joueur ou une partie n'a pas été trouvé"); return false;}
	})	
}
exports.DesinscrJDePartie = DesinscrJDePartie;
/*exports.desincrSiPartie = function(pseudo)		// INUTILE ??
{
//  !!! ne touche qu'aux parties ou le joueur est inscris !!!
	var listIdParties = []; // même si en principe un joueur ne peut être inscrit qu'à une partie
	session.parties.forEach(function(p){
		p.inscrits.forEach(function(i){		if(pseudo ==i){listIdParties.push(p.id);}	})
	})
	if(listIdParties.length > 0){	listIdParties.forEach(function(idP){	DesinscrJDePartie(pseudo, idP);	})		}
}*/
exports.getPartieFromId = function(idPartie)
{
	var partieExiste = false;
	session.parties.forEach(function(p){
		if(p.id == idPartie){partieExiste = true; console.log("return /app/modules.js" + p.id); return p;}
	})
	if(!partieExiste){return false;}
}
exports.peutCreerPartie = function(pseudo) // un joueur peut-il créeer une partie ?
{
	var raisons = ""; // en cas d'impossibilité
	var peut = true;
	session.joueursConnectes.forEach(function(j){
		if(j.pseudo == pseudo){ 
			if(j.idPartie != -1){
				raisons = "le joueur a une partie dans son objet"; peut =false;
				var retour = [peut, raisons]; return retour;
			}
		}
	})
	session.parties.forEach(function(p){
		p.inscrits.forEach(function(i){
			if(i == pseudo){
				raisons = "Une partie compte le joueuir parmis ses inscrits : " + String(p.id); peut =false;
				var retour = [peut, raisons]; return retour;
			}
		})
	})
	if(peut){var retour = [true, "aucune"]; return retour;}
	else{var retour = [false, "aucune"]; return retour;}
}
exports.creationPartie = function(pseudo, jeu) // un joueur peut-il créeer une partie ?
{
	var newPartie = new p.Partie(jeu, session.parties);
	session.parties.push(newPartie);
	InscrJAPartie(pseudo, newPartie.id);
	return true;
}
function annulerPartie(partie)
{
	partie.devientAnnulee();
}
exports.annulerPartie = annulerPartie;