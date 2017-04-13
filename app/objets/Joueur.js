function Joueur(pseudo, socket="socket non définie") { // class Joueur
        this.socket = socket;
        this.pseudo = pseudo;
        this.points = 0;
        this.idPartie = -1;        
        this.afficher = function(){
			console.log(this.pseudo + "    " + this.points + " points    " + this.socket);
	};
        this.setIdPartie = function(idPartie){     this.idPartie = idPartie;	};
};
exports.Joueur = Joueur;
