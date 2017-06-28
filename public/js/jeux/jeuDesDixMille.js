var jeuDes10000;
(function (jeuDes10000){
    function initPlateauJeuDes10000()
    {
        // reproduction de la structure initiale
				// l'indentation illustre la structure du DOM
			var conteneur = $('<div>').attr('id', 'conteneur');
                // 1ere colonne contenant les dés seulement
				var des = $('<div>').attr('id', 'Des');
					var sous_Des = $('<div>').attr('id', 'sous_Des');
                    var boutonLancer = $('<button>').attr('id', "boutonLancer").text("boutonLancer");
                    var bouttonTerminerCoup = $('<button>').attr('id', "terminerCoup").text("terminerCoup");
              // 2eme colonne
                var infoCoups = $('<div>').attr('id', 'infoCoups');
					var coup_courant = $('<div>').attr('id', 'coup_courant')
						.append($('<h5>').attr('id', "nomJCourant").text("nomJCourant"));
					var affichPoints = $('<div>').attr('id', 'affichPoints')
						.append($('<div>').attr('id', "deja10000").text("deja10000"),
								$('<div>').attr('id', "affichPoints").text("affichPoints"),
								$('<div>').attr('id', "infosConsignes").text("infosConsignes"),
								$('<div>').attr('id', "infosCoup").text("infosCoup"));
                // 3eme col : joueurs et compte de points
				var encarJ = $('<div>').attr('id', 'encarJ')
					.append($('<div>').attr('id', "affichJoueurs").text("affichJoueurs"),
							$('<div>').attr('id', "infosPoints").text("infosPoints"));
        // ----- ---- ----- ----- ----- ----- ----- ----- ----- -----
                var table = $('<table>'); // création du tab 2 col contenant la case à dé + case logo
                var divBtns = $('<div>').append(boutonLancer, "<br />", bouttonTerminerCoup);
				$(des).append($(sous_Des).append(table), divBtns);
                $(infoCoups).append(coup_courant, affichPoints);
			$(conteneur).append(des, infoCoups, encarJ);
		//	création des 5 cases de Dés :
			var tabIds5Des = ["caseDeBlanc", "caseDeGris", "caseDeBleu", "caseDeRouge", "caseDeVert"];

			for(i=0; i<5; i++)
			{
				$(table).append($('<tr>').append($('<td>').append('<div>').attr('id', tabIds5Des[i]).addClass('caseDes'), 
                        $('<td>').append('<div>').addClass('logo')));
			}
            $("#plateauJeu").append(conteneur);
	}
    jeuDes10000.initPlateauJeuDes10000 = initPlateauJeuDes10000;
    function nouveauCoup(array5Des, pseudo) 
                        // dés dans l'ordre  : blanc-gris-bleu-rouge-vert
    {
        $("#nomJCourant").text(pseudo);
        for(var i=0; i<5; i++)
	    {
            var image = new Image(); 
            image.width = String($(".caseDes:first").width()); 
            image.height = String($(".caseDes:first").height());
		
            switch(i)
            {
                case 0:
                    image.src = "web/deBlan" + String(array5Des[i]) + ".png";
                    $('#caseDeBlanc').append(image); 
                    $(image).attr('id', 'deBlan').addClass('dés');
                    break;
                case 1:
                    image.src = "web/deGris" + String(array5Des[i]) + ".png";
                    $('#caseDeGris').append(image); 
                    $(image).attr('id', 'deBleu').addClass('dés');
                    break;
                case 2:
                    image.src = "web/deBleu" + String(array5Des[i]) + ".png";
                    $('#caseDeBleu').append(image); 
                    $(image).attr('id', 'deGris').addClass('dés');
                    break;
                case 3:
                    image.src = "web/deRoug" + String(array5Des[i]) + ".png";
                    $('#caseDeRouge').append(image); 
                    $(image).attr('id', 'deRoug').addClass('dés');
                    break;
                case 4:
                    image.src = "web/deVert" + String(array5Des[i]) + ".png";
                    $(image).attr('id', 'deVert').addClass('dés');
                    $('#caseDeVert').append(image);
                    break;
            }    // fin switch
	    }
    }
    jeuDes10000.nouveauCoup = nouveauCoup;
})(jeuDes10000 || (jeuDes10000 = {})); // FIN  namespace jeuDes10000