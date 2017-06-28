socket.on('majInfos', function(data){ // joueurs et parties
// gestion JOUEURS
	window.listJ = data['listJ'];	Page.majListJ(data['listJ']);
	Modules.setWindowClientJ();
// gestion PARTIES
	window.listP = data['listP'];	Page.majListP(data['listP']);
	console.log("recep majInfos .. ");
});
socket.on('probleme', function(message){
	console.log("recep pb : "  + message);
});
socket.on('lancementPartie', function(donnees){
	// alert("la partie n° " + idP + " à laquelle vous etes inscris va démarrer");
	$("#accParties").fadeOut(400, function(){
		$("#plateauJeu").fadeIn(1000, function(){
$("#plateauJeu").append($("<a>").text("le joueur commençant est : " + 
donnees['joueurCommencant'] + "\nLancé : " + donnees['premierLance']));

jeuDes10000.initPlateauJeuDes10000();
//jeuDes10000.afficherLance5Des();
jeuDes10000.nouveauCoup(donnees['premierLance'], donnees['joueurCommencant']);
/*// reproduction de la structure initiale
				// l'indentation illustre la structure du DOM
			var conteneur = $('<div>').attr('id', 'conteneur');
				var des = $('<div>').attr('id', 'Des');
					var sous_Des = $('<div>').attr('id', 'sous_Des');
						var table = $('<table>');
					var coup_courant = $('<div>').attr('id', 'coup_courant')
						.append($('<h5>').attr('id', "nomJCourant").text("nomJCourant"),
								$('<button>').attr('id', "boutonLancer").text("boutonLancer"),
								$('<button>').attr('id', "terminerCoup").text("terminerCoup"));
					var affichPoints = $('<div>').attr('id', 'affichPoints')
						.append($('<div>').attr('id', "deja10000").text("deja10000"),
								$('<div>').attr('id', "affichPoints").text("affichPoints"),
								$('<div>').attr('id', "infosConsignes").text("infosConsignes"),
								$('<div>').attr('id', "infosCoup").text("infosCoup"));
				var encarJ = $('<div>').attr('id', 'encarJ')
					.append($('<div>').attr('id', "affichJoueurs").text("affichJoueurs"),
							$('<div>').attr('id', "infosPoints").text("infosPoints"));
				$(des).append($(sous_Des).append(table), coup_courant, affichPoints);
			$(conteneur).append(des, encarJ);
		//	création des 5 cases de Dés :
			var tabIds5Des = ["caseDeBlanc", "caseDeGris", "caseDeBleu", "caseDeRouge", "caseDeVert"];

			for(i=0; i<5; i++)
			{
				$(table).append($('<tr>').append($('<td>').append('<div>').addClass('caseDes'), $('<td>')
							.append('<div>').attr('id', tabIds5Des[i]).addClass('logo')));
			}*/

			/*var trBlanc = $('<tr>').append($('<td>').append('<div>').addClass('caseDes'), $('<td>')
							.append('<div>').attr('id', 'caseDeBlanc').addClass('logo'));
			var trGris = $('<tr>').append($('<td>').append('<div>').addClass('caseDes'), $('<td>')
							.append('<div>').attr('id', 'caseDeGris').addClass('logo'));
			var trBleu = $('<tr>').append($('<td>').append('<div>').addClass('caseDes'), $('<td>')
							.append('<div>').attr('id', 'caseDeBleu').addClass('logo'));
			var trRouge = $('<tr>').append($('<td>').append('<div>').addClass('caseDes'), $('<td>')
							.append('<div>').attr('id', 'caseDeRouge').addClass('logo'));
			var trVert = $('<tr>').append($('<td>').append('<div>').addClass('caseDes'), $('<td>')
							.append('<div>').attr('id', 'caseDeVert').addClass('logo'));
			$(table).append(trBlanc, trGris, trBleu, trRouge, trVert);*/
		//	$("#plateauJeu").append($(table));
		//	$("#plateauJeu").append($('<table>').append($('<tr>').append($('<td>').append('<div>').addClass('caseDes').text('test')))); //.addClass('caseDes').attr('id', "caseDeBlanc").text('t1'))));

			//var img = new Image();
			//img.src = $(location).attr('href') + "web/bipbip.png";
			//$(this).append(img);
			//var a = $('a')
			//$(this).append("partie : " + donnees['idPartie'] + ", joueur commençant : " + donnees['joueurCommencant'] + ", premierLance" + donnees['premierLance']);
		});
	});
});
window.onbeforeunload = function() {
	socket.emit('deconnexion',window.clientJ);
}
socket.on('test', function(){
	//alert("serveur vient de confirmer co");
});