//Mon code qui marche mais beaucoup de répétitions qui pourrait être factoré 
//Voir la correction d'Anthony


//Création d'une fonction qui appliquera mon overlay avec l'ajax loader
function setOverlay(){
    $('body').append('<div class="overlay"><img src="img/ajax-loader.gif"></div>');
}

//Création d'une fonction permettant de supprimer l'overlay
function removeOverlay(){
    $('.overlay').remove();
}

//Création d'une fonction qui affichera message d'erreur
function displayErrorMessage(text){
    $('#view').html('<p class="error">' + text + '</p>');
}

//Fonction équivalente a htmlspecialchars mais en js
function escapeHtml(text) {

    text = text.toString(); //On rajoute cette ligne qui permet la conversion de chiffre en string car la fonction n'est valable de base que pr remplacer les chaines de texte, et nous en dessous on a des chiffres a afficher (humidité, température etc ..)

    var map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// Si le bouton est cliqué
$('button').click(function(){

    // Paramétrages de la geolocalisation
    let options = {
        enableHighAccuracy: true,       // Activation de la haute précision
        timeout: 5000,                  // Temps en ms avant timeout
        maximumAge: 0                   // Desactive le cache gps
    }

   
    // Fonction appelé en cas de pb lors de la récup des coordonnées GPS
    let error = function(e){
        if(e.code == e.TIMEOUT){
            displayErrorMessage('Temps expiré');
        } else if(e.code == e.PERMISSION_DENIED){
            displayErrorMessage('Vous avez refusé la géolocalisation');
        } else if(e.code == e.POSITION_UNAVAILABLE){
            displayErrorMessage('Localisation impossible');
        } else {
            displayErrorMessage('Problème inconnu');
        }
    }

    // Fonction  appelée en cas de réussite de récup des coordonnées GPS
    let success = function(p){

        //Enregistrement des coordonnées GPS récupéré dans variables
        let latitude = p.coords.latitude;
        let longitude = p.coords.longitude;

        //Ca c'est pour moi 
        console.log('Votre latitude actuelle est ' + latitude + ' et votre longitude est ' + longitude);

        //Requête AJAX sur l'api
        $.ajax({
            type: 'GET',
            url: 'https://www.prevision-meteo.ch/services/json/lat='+latitude+'lng='+longitude,
            dataType : 'json',
            timeout: 10000, //erreur de requête si au bout de 10 scdes ya rien 
            success: function(data){ //Code lu en cas de succès

                //ça aussi c'est pour moi 
                console.log(data);
                    
                   

                $('#view').html('');

                $('#view').append(`
                <h2>Météo actuelle sur votre postion</h2>
                <p>`+ escapeHtml(data.current_condition.condition) +` <img src="` + escapeHtml(data.current_condition.icon) + ` "> </p>
                <p>Lever du soleil : `+ escapeHtml(data.city_info.sunrise) +` / Coucher du soleil : ` + escapeHtml(data.city_info.sunset) + `</p>
                <p>Température : ` + escapeHtml(data.current_condition.tmp) + ` degrés </p>
                <p>Humidité : `+ escapeHtml(data.current_condition.humidity) + ` %</p>
                <p>Vent : `+ escapeHtml(data.current_condition.wnd_spd) + ` km/h direction ` + escapeHtml(data.current_condition.wnd_dir) + `</p>
                <p>Pression barométrique : ` + escapeHtml(data.current_condition.pressure) + ` hPa</p>
                `);

                $('.jeudi').html('');

                $('.jeudi').append(`
                <h3>` + escapeHtml(data.fcst_day_1.day_long) +` ( ` + escapeHtml(data.fcst_day_1.date) + `)</h3>
                <p>` + escapeHtml(data.fcst_day_1.condition) + ` <img src="` + escapeHtml(data.fcst_day_1.icon) + ` "  > </p>
                <p>Température : de ` + escapeHtml(data.fcst_day_1.tmin) + ` degrés à ` + escapeHtml(data.fcst_day_1.tmax) + ` degrés</p>
                `);
                
                $('.vendredi').html('');

                $('.vendredi').append(`
                <h3>` + escapeHtml(data.fcst_day_2.day_long) +` ( ` + escapeHtml(data.fcst_day_2.date) + `)</h3>
                <p>` + escapeHtml(data.fcst_day_2.condition) + ` <img src="` + escapeHtml(data.fcst_day_2.icon) + ` "  > </p>
                <p>Température : de ` + escapeHtml(data.fcst_day_2.tmin) + ` degrés à ` + escapeHtml(data.fcst_day_2.tmax) + ` degrés</p>
                `);

                $('.samedi').html('');

                $('.samedi').append(`
                <h3>` + escapeHtml(data.fcst_day_3.day_long) +` ( ` + escapeHtml(data.fcst_day_3.date) + `)</h3>
                <p>` + escapeHtml(data.fcst_day_3.condition) + ` <img src="` + escapeHtml(data.fcst_day_3.icon) + ` " ></p>
                <p>Température : de ` + escapeHtml(data.fcst_day_3.tmin) + ` degrés à ` + escapeHtml(data.fcst_day_3.tmax) + ` degrés</p>
                `);

                $('.dimanche').html('');

                $('.dimanche').append(`
                <h3>` + escapeHtml(data.fcst_day_4.day_long) +` ( ` + escapeHtml(data.fcst_day_4.date) + `)</h3>
                <p>` + escapeHtml(data.fcst_day_4.condition) + ` <img src="` + escapeHtml(data.fcst_day_4.icon) + ` "  > </p>
                <p>Température : de ` + escapeHtml(data.fcst_day_4.tmin) + ` degrés à ` + escapeHtml(data.fcst_day_4.tmax) + ` degrés</p>
                `);



            }, error: function(){
                displayErrorMessage('Problème lors de la récupération des données météo');
                removeOverlay();
            },
            //Avant la requête AJAX
            beforeSend: function(){
                //Mise en place de l'overlay
                setOverlay();
            }, 
            //Au retour de la requête AJAX
            complete: function(){
                //Suppression de l'overlay
                removeOverlay();
            }
        });

    }

    //Récupération des coordonnées de l'utilisateur
    // Code permettant de mettre en place la demande de geolocalisation au navigateur
    navigator.geolocation.getCurrentPosition(success, error, options);

});