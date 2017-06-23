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
socket.on('lancementPartie', function(idP){
	// alert("la partie n° " + idP + " à laquelle vous etes inscris va démarrer");
	$("#accParties").fadeOut(400, function(){
		$("#plateauJeu").fadeIn(1000, function(){
			var img = new Image();
			img.src = $(location).attr('href') + "web/bipbip.png";
			$(this).append(img);
		});
	});
});
window.onbeforeunload = function() {
	socket.emit('deconnexion',window.clientJ);
}
socket.on('test', function(){
	//alert("serveur vient de confirmer co");
});