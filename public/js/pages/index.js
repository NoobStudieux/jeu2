// DECLA var    ***   ***
var $, pseudo;
// FIN DECLA var    ***   ***
$(function () {
    // init
    socket.emit("getInfos"); 
    $('#rentrer').prop('disabled', true);
 //   $('#inputSaisiePseudo').val("");
    $("#accueil").hide();
    $('#canvas').css('background-color', 'gray');
    Events.initConnexion();
// début partie 
});