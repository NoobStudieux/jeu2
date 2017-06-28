var session = require('cookie-session');
var m = require('../modules.js');

function randomize()    //  un lancer
{
	var tabTirages = new Array();
	
	for(var i=0; i<6; i++)
	{
		var nveauLance = Math.floor(Math.random() * 6 + 1);
		tabTirages.push(nveauLance);
	}
	var nveauLance = Math.floor(Math.random() * 6);	
	return tabTirages[nveauLance];  // retourne UNE valeur de dé
}
exports.randomize = randomize;

function lancer5Des()    //  lancer des 5 dés
{
	var tabTirages = new Array();
	
	for(var i=0; i<6; i++)
	{
		var nveauLance = Math.floor(Math.random() * 6 + 1);
		tabTirages.push(nveauLance);
	}
	return tabTirages;  // retourne CINQ valeurs de dés dans un array
}
exports.lancer5Des = lancer5Des;

function selecJoueurCommencant(partie)    //  sélection du joueur commencant à jouer
{
    var indexJChoisi = Math.floor(Math.random() * partie.inscrits.length);
	return partie.inscrits[indexJChoisi]; // retourne l'objet joueur
}
exports.selecJoueurCommencant = selecJoueurCommencant;
