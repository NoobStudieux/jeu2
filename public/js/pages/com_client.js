socket.on('majInfos', function(data){ // joueurs et parties
// gestion JOUEURS
	window.listJ = data['listJ'];	Page.majListJ(data['listJ']);
	Modules.setWindowClientJ();
// gestion PARTIES
	window.listP = data['listP'];	Page.majListP(data['listP']);
});
socket.on('probleme', function(message){
console.log("recep pb : "  + message);
});
socket.on('lancementPartie', function(data){
	alert("la partie n° " + data['idP'] + " à laquelle vous etes inscris va démarrer");
});

window.onbeforeunload = function() {
	socket.emit('deconnexion',window.clientJ);
}

socket.on('test', function(){
	alert("serveur vient de confirmer co");
});