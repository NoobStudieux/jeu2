socket.on('majInfos', function(data){ // joueurs et parties
// gestion JOUEURS
	window.listJ = data['listJ'];	Page.majListJ(data['listJ']);
	Modules.setWindowClientJ();
// gestion PARTIES
	window.listP = data['listP'];	Page.majListP(data['listP']);
});
socket.on('probleme', function(message){
	alert(message);
});
window.onbeforeunload = function() {
	socket.emit('deconnexion',window.clientPseudo);
}