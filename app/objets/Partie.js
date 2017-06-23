function Partie(jeu="jeu non défini", listePartiesExistantes = []) { // class Partie
        this.jeu = jeu;
        this.nbJMin = 2;
        this.nbJMax = 4;
        this.inscrits = [];
        this.etat = "lancee"; // lancee || enCours || finie || annulee
        this.setIdPartie = function(listP){
            if(listP.length == 0){this.id=0;}
            else{
                var idMax=1;
                listP.forEach(function(p){
                    if(idMax > p.id){}
                    else{idMax = p.id + 1;}
                })
                this.id= idMax;
            }
		};
        this.setIdPartie(listePartiesExistantes);
        
        this.afficher = function(){
			console.log(this.pseudo + "    " + this.points + " points    " + this.socketId);
		};
        this.addJoueur = function(joueur){
			this.inscrits.push(joueur);
		};
        this.supprJoueur = function(pseudeo){
            var newList =[];
            this.inscrits.forEach(function(i){
console.log("i.pseudo  :   " + i.pseudo + ", joueur :  " + pseudeo);
                if(i.pseudo == pseudeo){   /**/   }
                else{newList.push(i)}
            })
			this.inscrits = newList;
 console.log("partiesuppr joueur : ");
 this.inscrits.forEach(function(ii){
 console.log(ii.pseudo);    
 })
		};
        this.setIdPartie = function(listP){
            if(listP.length == 0){this.id=0;}
            else{
                var idMax=1;
                listP.forEach(function(p){
                    if(idMax > p.id){}
                    else{idMax = p.id + 1;}
                })
                this.id= idMax;
            }
			
		};
        this.devientAnnulee = function(){this.etat = "annulee";};
        this.devientFinie = function(){this.etat = "finie";};
        this.devientEnCours = function(){this.etat = "enCours";};
};
exports.Partie = Partie;