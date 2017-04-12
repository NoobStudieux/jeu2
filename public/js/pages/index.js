/*class Canvas{
    c: any; // un élément canvas
    constructor(){}
    checkPseudo(pseudo:string):Boolean{
     if(/^[a-zA-Z0-9\-\_]{2,14}$/.test(pseudo)){ return true;}else{ return false;}
    }
}  // FIN  classe Canvas*/
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
/*$(function(){
    $("#accueil").hide();
    var canvas = document.getElementById("canvas");
    $('#canvas').css('background-color', 'gray');
    if(!canvas){alert('impossible d\'obtenir le canvas'); return; } // inutile
    var contexte = canvas.getContext("2d");
    if(!contexte){alert('impossible d\'extraire le contexte du canevas'); return; }
 $('#resultSizes').css('color', 'red').text("???");
    $('#refreshSizes').click(function(){
        $('#resultSizes').css('color', 'green').text("ha ha");
        $('#canvas').css('width',document.body.clientWidth -10).css('height',document.body.clientHeight -170).css('margin', '5 5 5 5');
    });
})*/ 
