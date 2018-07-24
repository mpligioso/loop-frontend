var db = [{
		city1: "habas, France",
		city2: "route de pau, orthez, France"
	}, {
		city1: "amou, France",
		city2: "mugron, France"
	}, {
		city1: "route de cazalis, momuy, France",
		city2: "amou, France"
	}, {
		city1: "sallespisse, France",
		city2: "hagetmau, France"
	}, {
		city1: "peyhorade, France",
		city2: "habas, France"
	}, {
		city1: "dax, France",
		city2: "route de galin, tilh, France"
	}
];
var k;
var durconducteur;

//This function handles the driver trip change: 
//quand de nouvelles valeurs de départ et arrivée (trajet conducteur) sont submit,
//la fonction calculateAndDisplayRoute est appelée
function initMap() {
	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;
	var directionsDisplay2 = new google.maps.DirectionsRenderer;
	mapObj = new google.maps.Map(document.getElementById('map'), {
			zoom: 10,
			center: {
				lat: 43.58,
				lng: -0.83
			}
		});
	directionsDisplay.setMap(mapObj);
	directionsDisplay2.setMap(mapObj);

	var onChangeHandler = function () {
		calculateAndDisplayRoute(directionsService, directionsDisplay, directionsDisplay2);
	};
	document.getElementById('myBtn').addEventListener('click', onChangeHandler);
}

//Cette fonction : 
// - affiche le trajet conducteur initial
// - calcule le meilleur matching possible en limitant la durée additionnelle de transport
// - affiche le trajet proposé
function calculateAndDisplayRoute(directionsService, directionsDisplay, directionsDisplay2) {

  //PREMIERE PARTIE: Afficher le trajet conducteur initial
	directionsService.route(
    //1er argument de la fonction route: la requete trjat conducteur
    {		origin: document.getElementById('istart').value,
		destination: document.getElementById('iend').value,
    travelMode: google.maps.TravelMode.DRIVING
  }, 

    //2e arg de la fct route: call back function qui affiche le trajet conducteur initial (en bleu)
    function (response, status) {
		if (status === google.maps.DirectionsStatus.OK) {
			console.log(response);
			directionsDisplay.setDirections(response);
			directionsDisplay.setOptions({
				polylineOptions: {
					strokeColor: "blue"
				}
      });
      
      //calcule de la durée du trajet conducteur initial
			durconducteur = response.routes[0].legs[0].duration.value;

      //affichage  de la durée du trajet conducteur initial
			document.getElementById('dur1').innerHTML = Math.round(durconducteur / 60) + " minutes";
			document.getElementById('error').innerHTML = '';
		} else {
      //si la requête trajet conducteur initial a échoué, affiche dans le html des valeur vide + erreur
			document.getElementById('dur1').innerHTML = "";
			document.getElementById('dur2').innerHTML = "";
			document.getElementById('city1').innerHTML = "";
			document.getElementById('city2').innerHTML = "";
			document.getElementById('error').innerHTML = '<b>ERREUR impossible de calculer le trajet a cause de :<br/> ' + status + '. Veuillez essayer un autre trajet</b>';
			return;
		}
  });
  
  //DEUXIEME PARTIE: calculer et afficher le trajet Conducteur qui lui permet de prendre un passager 
  //en lui faisant faire le plus court trajet possible
	var mindur = 99999999;
	var minresponse;
	var mincity1;
  var mincity2;
  
  //iteration sur la database de trajets Passager
	for (k = 0, lengg = db.length; k < lengg; k++) {
		directionsService.route(
      //1er arg : requête sur un trajet conducteur, qui integre nimporte quel trajet passager
      {	origin: document.getElementById('istart').value,
			destination: document.getElementById('iend').value,
			waypoints: [{
					location: db[k].city1,
					stopover: true
				}, {
					location: db[k].city2,
					stopover: true
				}
			],
			travelMode: google.maps.TravelMode.DRIVING
    }, 

    //2e arg: fonction call back qui permettra d'afficher le nouveau trajet 
    //apres avoir calculé le meilleur itinéraire possible
    function (response, status) {
			if (status === google.maps.DirectionsStatus.OK) {
				console.log(response);
        var dur = 0;

        //boucle sur toutes les routes qui permettent de se rendre du point A au point D (Conducteur) en passant par B et C (Passager)
        //pour enregistrer leur durée
				for (var j = 0, leng = response.routes[0].legs.length; j < leng; j++) {
					dur += response.routes[0].legs[j].duration.value;
				}
        console.log("duration = " + dur / 60);
        
        //boucle sur les trajets Passager pour enregistrer la ville de départ et d'arrivée du trajet Passager
        // qui correspond à la valeur dur calculée juste au dessus
				for (l = 0, lenggg = db.length; l < lengg; l++) {
					if (db[l].city1 == response.request.waypoints[0].location.query && db[l].city2 == response.request.waypoints[1].location.query) {
						console.log("found city1 " + db[l].city1);
						console.log("found city2 " + db[l].city2);
						break;
					}
        }
        
        //on compare la durée de chaque trajet ABCD pour toutes les valeurs B et C
				db[l].dur = dur;
				db[l].response = response;
				if (dur < mindur) {
					mindur = dur;
					minresponse = response;
					mincity1 = db[l].city1;
					mincity2 = db[l].city2;
				}

        //On affiche en vert sur la carte le résultat (le trajet ABCD qui ajoute le moins de temps supplémentaire par rapport au trajet AD)
				if (l == lenggg - 1) {
					console.log(db);
					console.log(mapObj);
					document.getElementById('dur2').innerHTML = Math.round(mindur / 60) + " minutes (+ " + Math.round((mindur - durconducteur) / 60) + "minutes)";
					document.getElementById('city1').innerHTML = mincity1;
					document.getElementById('city2').innerHTML = mincity2;
					directionsDisplay2.setDirections(minresponse);
					directionsDisplay2.setOptions({
						polylineOptions: {
							strokeColor: "green"
						}
					});

				}
			} else {
				console.log('ERREUR impossible de calculer le trajet a cause de : ' + status);
			}
		});
	}

}