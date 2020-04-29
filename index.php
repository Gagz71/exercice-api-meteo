<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exercice Api Météo</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>


    <h1>EXERCICE METEO</h1>

    <button>Voir la météo sur ma position actuelle</button>

    

    

    <div class="view" id="view">
        
    </div>

    <div class="previsions">
        <div class="jeudi"></div>
        <div class="vendredi"></div>
        <div class="samedi"></div>
        <div class="dimanche"></div>
    </div>









    <footer>
        <p>Lien pour récupérer les données météo d'une position via coordonnées GPS (longitude et lattitude):
            <a href="https://www.prevision-meteo.ch/services/json/">https://www.prevision-meteo.ch/services/json/lat=XXXlng=YYY</a>
            (remplacer XXX par la latitude et YYY par la longitude)</p>
        <p>pdf explicatif de l'api: 
        <a href="https://prevision-meteo.ch/uploads/pdf/recuperation-donnees-meteo.pdf">https://prevision-meteo.ch/uploads/pdf/recuperation-donnees-meteo.pdf</a></p>
    </footer>

    <script src="https://code.jquery.com/jquery-3.5.0.min.js"></script>
    <script src="js/script.js"></script>
</body>
</html>