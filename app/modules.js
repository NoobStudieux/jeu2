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

exports.supprJoueur = function(pseudo, sockID)
{/*


	if(session.sockets.length == 1 &&){

	}else{

	}*/
	var newSockList = [];
// MAJ list sockets
/*var compteur = 0;*/
	session.sockets.forEach(function(s){
		if(sockID == s.id){} // sauter 
		else{	newSockList.push(s);		}
/*console.log("compteur" + compteur + " , s : " + s.id);
compteur ++;*/
	})
/*newSockList.forEach(function(ns){
	console.log("nouvelle liste : " + ns.id);
})*/
	session.sockets = newSockList;
/*console.log("longueur ancienne liste sockets : " + session.sockets.length);
console.log("longueur new liste sockets : " + newSockList.length);
	
console.log("longueur liste sockets apres réa : " + session.sockets.length);
console.log("nouvelle liste socket : ");
compteur = 0;
session.sockets.forEach(function(s){
	console.log("compteur" + compteur + " , s : " + s.id);
compteur ++;
	})*/
// MAJ liste joueurs
	var newList = [];
	session.joueursConnectes.forEach(function(j) {
			if(j.pseudo == pseudo){return j;}
			else{newList.push(j);}
		})
	//session.joueursConnectes.length = 0;
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
function annulerPartie(idPartie, pseudo)
{
	return new Promise(function(resolve, reject){
// vérification que la demande d'annulation émane d'un joueur connecté :
		var pseudoConnecte = false;
		session.joueursConnectes.forEach(function(j){
			if(j.pseudo == pseudo){		pseudoConnecte = true;		}
		})
		if(!pseudoConnecte){	return reject("la demande d'annulation n'émane  pas d'un joueur connecté !");	}
		var indexP = -1, indexJ = -1, compteur = 0;
		var partieTrouvee = false;
		session.parties.forEach(function(p){
			if(p.id == idPartie){
				if(p.inscrits[0].pseudo == pseudo){
					partieTrouvee =true;
					indexP = compteur;
console.log("sock annulerpartie : indexP : " + indexP + "  p.id :" + p.id + ", p.inscrits[0] : " + p.inscrits[0] + ",  data['pseudo']  "  + pseudo);
				}
				else{return reject("la demande d'annulation n'émane  pas du détenteur de la partie !");}
				compteur ++;
			}
		})
		if(partieTrouvee){
console.log("partie trouvée pour annulation. id : " + session.parties[indexP].id);
			session.parties[indexP].devientAnnulee();
			session.parties[indexP].inscrits.forEach(function(i){
				i.setIdPartie(-1);
			})
			return resolve();
		}
		else{	return reject("la partie à annuler n'a pas été trouvée");	}
	});
}
exports.annulerPartie = annulerPartie;