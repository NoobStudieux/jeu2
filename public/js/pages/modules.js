var Modules;
(function (Modules) {
    function getMonJFromList(listJ)
    {
console.log("getMonJFromList  ddd  " + listJ.length);
		listJ.forEach(function(j){	if(window.clientPseudo === j.pseudo){	
console.log("getMonJFromList  " + j.pseudo); return j;	}	})
	}
    Modules.getMonJFromList = getMonJFromList;
    function setWindowClientJ()
    {
        window.listJ.forEach(function(j){
            if(j.pseudo == window.clientPseudo){ window.clientJ = j; 
console.log('setWindowClientJ, joueur set : ' + window.clientJ.pseudo + "   " + window.clientJ.socketId);
if(j.idPartie){console.log("idPartie : " + j.idPartie);}}
        })
	}
    Modules.setWindowClientJ = setWindowClientJ;
})(Modules || (Modules = {})); // FIN  namespace Modules
var Page;
(function (Page) {
    function checkPseudo(pseudo) {
        if (/^[a-zA-Z0-9\-\_]{2,14}$/.test(pseudo)) {
            var pseudoExistDeja = false;
            window.listJ.forEach(function(j){
                if(j.pseudo == pseudo){       pseudoExistDeja = true;          }
            })
            if(pseudoExistDeja){     $('#resultPseudo').removeClass("advertOK").addClass("advertKO").text("ce pseudo est deja pris"); return false;   }
            else{$('#resultPseudo').text("pseudo OK").removeClass("advertKO").addClass("advertOK"); return true;}
        }
        else {
            $('#resultPseudo').removeClass("advertOK").addClass("advertKO");
            if(pseudo.length < 2){$('#resultPseudo').text("pseudo trop court (2 carac minimum).");}
            else if(pseudo.length > 14){$('#resultPseudo').text("pseudo trop long (14 carac max).");}
            $('#resultPseudo').text("pseudo OK");
            return false;
        }
    }
    Page.checkPseudo = checkPseudo;
    function majListJ(listJ)
    {
        $("#listeJoueurs").children().remove();
        if(listJ.length > 0)
        {
            listJ.forEach(function(j){
                var li = $('<li>').text(j.pseudo);
                $("#listeJoueurs").append(li);
            })
        }
        else{
            var li = $('<li>').text("aucun joueur de connecté");
            $("#listeJoueurs").append(li);
        }
	}
    Page.majListJ = majListJ;
    function updateBandeauLancerPartie()
    {
        if(window.clientJ.idPartie == -1){    $('#lancerPartie').children().show();     }
        else{    $('#lancerPartie').children().hide();     }
    }
    Page.updateBandeauLancerPartie = updateBandeauLancerPartie;
    function isJInscr(inscrits, pseudo)
    {
        var isInscr = false;
        inscrits.forEach(function(i){
            if(i.pseudo == pseudo){    isInscr= true;        }
        })
        return isInscr;
    }
    function majListP(listP)
    {
        function maCouleur()
	    {
			var rgbArray = [];			
			for(i=0; i<3; i++){			rgbArray.push(Math.floor((Math.random() * 255) + 1));		}
			var couleur1 = rgbArray[0]; var couleur2 = rgbArray[1]; var couleur3 = rgbArray[2]; 
			maCouleurString = "rgba(" + couleur1.toString() + "," + couleur2.toString() + "," + couleur3.toString() + ", 0.65)";
			return maCouleurString;
	    }
        $("#parties").children().remove();
        listP.forEach(function(p){
console.log("function majP , forEach : " + p.id + p.jeu + p.nbJMax);
           var div = $('<div>').addClass('partieLancee btn-group').addClass('col-md-5').css('background-color', maCouleur());
           var h4 = $('<h4>').append( $('<a>').text(p.id).addClass('idJeu'), $('<a>').text(" - " + p.jeu)).addClass('h4Jeu').css('background-color', maCouleur()).css('color', maCouleur());
           // var boutonSInscrire = $('<button>');
           // var valBoutonSInscrire = "indéfinie"; //, classBoutonInscription;
           $('#parties').append($(div).append(h4));

            if(p.inscrits.length == 0)
            {
                var h6 = $('<h6>').text("0 inscrits actuellement.");
                $(div).append(h6);
            }else // il y a des inscrits
            {
                var h6 = $('<h6>').text("inscrits : ");
                var ul = $('<ul>');
                p.inscrits.forEach(function(i){
                    var li = $('<li>').text(i.pseudo);
                    $(ul).append(li);
                })
                $(div).append(h6, ul);
            }
            if(p.etat == "lancee"){
/* 
le lanceur peut : 
    - lancer 
    - annuler 
    - se desinscrire, (auquel cas : si il est le seul inscrit la partie sera annulée, sinon le lanceur deviendra mécaniquement le j suivant)
*/   
                if(p.inscrits.length > 0 && p.inscrits[0].pseudo && p.inscrits[0].pseudo == window.clientPseudo){ // le client est le lanceur
                    var boutonSeDesinscrire = $('<button>');
                    $(boutonSeDesinscrire).text("se Désinscrire").addClass('boutonDesinscription');
                    var boutonLancer = $('<button>').addClass('boutonLancer');
                    var boutonAnnuler = $('<button>').addClass('boutonAnnuler').text('annuler');

                    if(p.inscrits.length < p.nbJMin) // pas assez de joueurs
                    {   
                        $(boutonLancer).text("pas assez de j pour lancer").prop('disabled', true);
// ajouter style bouton
                    }
                    else if(p.inscrits.length > p.nbJMax) // trop de joueurs (ne devrait jamais arriver)
                    {
                        $(boutonLancer).text("trop de j pour lancer, cette erreur ne devrait pas être là");
                    }else{ // partie lançable
                        $(boutonLancer).text("démarrer").prop('disabled', false);
                    }
                    $(div).append(boutonSeDesinscrire, "<br />",boutonLancer, "<br />", boutonAnnuler);
                }
                else if(isJInscr(p.inscrits, window.clientPseudo)) //"le joueur est inscrit mais pas lanceur"
                {          
                    var boutonSeDesinscrire = $('<button>').text("se Désinscrire").addClass('boutonDesinscription');
                    $(div).append(boutonSeDesinscrire);
                }
                else // le joueur n'est pas inscrit
                {
                    if(window.clientJ.idPartie != -1){
                        var boutonSInscrire = $('<button>').text('inscris ailleurs').addClass('boutonInscription').prop('disabled', true);
                        $(div).append(boutonSInscrire);
                    }
                    else{

                        var boutonSInscrire = $('<button>').text('s\'inscrire').addClass('boutonInscription');
                        $(div).append(boutonSInscrire);
                    }
                    
                }
            }
            else{ // autre etat que p.etat == lancee
                //valBoutonSInscrire = p.etat; $(boutonSInscrire).prop('disabled', true);
                var info = $('<a>').text('etat partie : ' + p.etat);
                $(div).append(info);
            }
        })
        updateBandeauLancerPartie();
        Events.refreshActionners();
	}
    Page.majListP = majListP;
})(Page || (Page = {})); // FIN  namespace Page

var Events;
(function (Events){
    function initConnexion()
    {
        // SAISIE Pseudo    ***   ***
        $('#inputSaisiePseudo').keyup(function () {
            $('#resultPseudo').text($(this).val());
            if (Page.checkPseudo($(this).val())) {
                $('#resultPseudo').removeClass('pseudoNOK').addClass('pseudoOK');
                $('#rentrer').prop('disabled', false);
            }
            else {
                $('#resultPseudo').removeClass('pseudoOK').addClass('pseudoNOK');
                $('#rentrer').prop('disabled', true);
            }
        });
        $('#rentrer').click(function () {
            if (Page.checkPseudo($('#inputSaisiePseudo').val())) {
                $('#bienvenuePseudo').text($('#inputSaisiePseudo').val());
                window.clientPseudo = $('#inputSaisiePseudo').val();
                socket.emit('meVoila', window.clientPseudo);
                $('#saisiePseudo').fadeOut(800, function () {
                    $('#accueil').fadeIn(500, function () {
                    //   $('#canvas').css('width', document.body.clientWidth - 10).css('height', document.body.clientHeight - 170).css('margin', '5 5 5 5');
                    });
                });
            }
        })
// à voir
        $("#boutonLancerPartie").click(function(){
            var data = {pseudo: window.clientPseudo, jeu: $('#selecNveauJeu').val()};
            socket.emit('demandeCreationPartie', data);
	    });
        $("#plateauJeu").hide();
       

       /*var confirmOnLeave = function(msg) {
 
            window.onbeforeunload = function (e) {
                e = e || window.event;
                msg = "voulez vous vraiement quitter ? ";
        
                // For IE and Firefox
                if (e) {e.returnValue = msg;}
        
                // For Chrome and Safari
                return msg;
            };
        };
        confirmOnLeave();*/

// que pour le dev !!! : 
        $('#getListParties').click(function(){
            socket.emit('devGetListParties');
        }); 
        $('#getListJoueurs').click(function(){
            socket.emit('devGetListJoueurs');
        });
        $('#getListSockets').click(function(){
            socket.emit('devGetListSockets');
        });

        
        $('#pageJoueurs').click(function(){
            console.log("#pageJoueurs");
            window.listJ.forEach(function(j){
                console.log(j.pseudo);
            })
        });
        $('#pageParties').click(function(){     
            console.log("#pageParties");
            window.listP.forEach(function(pa){
                console.log(pa.id + " - " + pa.jeu + " - " + pa.etat);
            })
        }); 
    }
    Events.initConnexion = initConnexion;

    function refreshActionners()
    {
//               boutonAnnuler  boutonLancer boutonDesinscription boutonInscription 
        $('.boutonInscription').click(function(){
            var idPartie = parseInt($(this).parent().children('.h4Jeu').children('.idJeu').text().trim());
            var data = {pseudo: window.clientPseudo, idPartie: idPartie};
            window.socket.emit("jeMinscris", data);
         });
         $('.boutonDesinscription').click(function(){
            var idPartie = parseInt($(this).parent().children('.h4Jeu').children('.idJeu').text().trim());
            var data = {pseudo: window.clientPseudo, idPartie: idPartie};
            window.socket.emit("jeMeDesinscris", data);
         });
         $('.boutonAnnuler').click(function(){
            var idPartie = parseInt($(this).parent().children('.h4Jeu').children('.idJeu').text().trim());
            window.listP.forEach(function(p){
                if(p.id == idPartie){
                    if(p.inscrits[0].pseudo == window.clientPseudo){  // je suis bien le lanceur
console.log("envoi demande annulation partie " + idPartie);
                        var data = {pseudo: window.clientPseudo, idPartie: idPartie};
                        window.socket.emit("jAnnuleMaPartie", data);
                    }
                }
            })
         });
         $('.boutonLancer').click(function(){
            var idPartie = parseInt($(this).parent().children('.h4Jeu').children('.idJeu').text().trim());
            var data = {pseudo: window.clientPseudo, idPartie: idPartie};
            window.socket.emit("lancerMaPartie", data);
         });
	}
    Events.refreshActionners = refreshActionners;
})(Events || (Events = {})); // FIN  namespace Events