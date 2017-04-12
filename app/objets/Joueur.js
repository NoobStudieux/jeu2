function Joueur(pseudo, socket="socket non définie") { // class Joueur
        this.socketId = socket;
        this.pseudo = pseudo;
        this.points = 0;
        this.idPartie = -1; // id inscris, si -1 : inscrit nulpart
    //  this.partie; // objet partie si inscrit // TROP DE RECURSIVITE
        
        this.afficher = function(){
			console.log(this.pseudo + "    " + this.points + " points    " + this.socketId);
	};
        this.setIdPartie = function(idPartie){     this.idPartie = idPartie;	};
    //    this.setPartie = function(partie){     this.partie = partie; this.idPartie = partie.id;	};
};
exports.Joueur = Joueur;
