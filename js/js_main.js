

function init() {
  // gestion de la portée des feux
  let slider = document.getElementById("range");
  let output = document.getElementById("Vportee");
  slider.addEventListener("input", (ev) => {
    output.innerHTML = slider.value;
  })

  let slider2 = document.getElementById("intensity");
  let output2 = document.getElementById("Vintensity");
  slider2.addEventListener("input", (ev) => {
    output2.innerHTML = slider2.value;
  })



  document.getElementById("formCreerCamion").addEventListener("submit", (ev) => {
    ev.preventDefault();
    let form = new FormData(ev.target);
    let truck = Object.fromEntries(form.entries());
    //truck.type='valeurtypeV';
    console.log(truck)
    fetchNewTruck(JSON.stringify(truck));
  })

  document.getElementById("formCreerCamion").addEventListener("submit", (ev) => {
    ev.preventDefault();
    let form = new FormData(ev.target);
    let truck = Object.fromEntries(form.entries());
    //truck.type='valeurtypeV';
    console.log(truck)
    fetchNewTruck(JSON.stringify(truck));
  })

  document.getElementById("formModifierCamion").addEventListener("submit", (ev) => {
    ev.preventDefault().remove(id);
    let form3 = new FormData(ev.target);
    let truck3 = Object.fromEntries(form3.entries());
    var truck3_1 = Object.fromEntries(form3.entries());
    console.log(truck3, truck3_1);
    truck3_1.remove[id];
    fetchModifyCamion(JSON.stringify(truck3, truck3_1));
  })

  document.getElementById("formSupprimerCamion").addEventListener("submit", (ev) => {
    ev.preventDefault();
    let form2 = new FormData(ev.target);
    let truck2 = Object.fromEntries(form2.entries());
    console.log(truck2)
    fetchDeleteCamion(truck2);
  })
}

// ----------------------- REQUÊTES FETCH -----------------------------//

//RECUPERE LA LISTE DES FEUX
function fetchFeu() {

  return fetch("http://localhost:8081/fire", { method: "GET" })
    .then(reponse => reponse.json())
    .then((liste) => {
      return liste.map((ligne) => {
        return {
          "lat": ligne.lon,
          "lon": ligne.lat,
          'range': ligne.range,
          'intensity': ligne.intensity,
          "type": ligne.type
        }
      })
    })
    .catch((error) => {
      alert("Oh lala il y a eu erreur ! " + error.message)
      console.log('Erreur: ' + error.message)
    });

}

//RECUPERE LES CAMIONS
function fetchCamion() {
  return fetch("http://localhost:8081/vehicle", { method: "GET" }) // localhost:8084/ListeVehicule
    .then(reponse2 => reponse2.json())
    .then((liste2) => {
      return liste2.map((ligne) => {
        return {
          "lat": ligne.lon,
          "lon": ligne.lat,
          "type": ligne.type,
          "efficiency": ligne.efficiency,
          "liquidType": ligne.liquidType,
          "liquidQuantity": ligne.liquidQuantity,
          "liquidConsumption": ligne.liquidConsumption,
          "fuel": ligne.fuel,
          "fuelConsumption": ligne.fuelConsumption,
          "crewMember": ligne.crewMember,
          "crewMemberCapacity": ligne.crewMemberCapacity,
          "facilityRefID": ligne.facilityRefID,
          "id": ligne.id
        }
      })
    })
    .catch((error) => {
      alert("Oh lala il y a eu erreur ! " + error.message)
      console.log('Erreur: ' + error.message)
    });

}

//ENVOIE UN CAMION A L'API
function fetchNewTruck(truck) {
  fetch("http://localhost:8081/vehicle", { method: "POST", body: truck, headers: { 'Content-Type': 'application/json' } })
    .then(reponse => reponse.json())
    .then((data) => {console.log(data);})
    .catch((error) => {
      alert("Problème d'envoi ! " + error.message)
    });
}

//MODIFIE UN CAMION
function fetchModifyCamion(truck3, truck3_1) {
  console.log("modification du camion d'id: " + truck3.id)
  return fetch("http://localhost:8081/vehicle/" + truck3.id, { method: "PUT", body: truck3_1, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } })
/*    .then(reponse3 => reponse3.json())
    .then(reponse3 => console.log(reponse3))*/

    .catch((error) => {
      alert("Oh lala il y a eu erreur ! " + error.message)
      console.log('Erreur: ' + error.message)
    });
}

//SUPPRIME UN CAMION
function fetchDeleteCamion(idCamion) {
  console.log("Suppression du camion d'id: " + idCamion.idCamion)
  return fetch("http://localhost:8081/vehicle/" + idCamion.idCamion, { method: "DELETE", headers: { 'Access-Control-Allow-Origin': '*' } }) // localhost:8084/ListeVehicule
    .then(reponse4 => reponse4.json())
    .then(reponse4 => console.log(reponse4))

    .catch((error) => {
      alert("Oh lala il y a eu erreur ! " + error.message)
      console.log('Erreur: ' + error.message)
    });
}

// ----------------------- DEMANDES D'AFFICHAGE -----------------------------//


function DemandeAffichageFeu() {
  //if(layerfires.contains)
  //layerFires.remove;
  fetchFeu().then(
    (data) => {
      var range = document.getElementById("range").value;
      var intensity = document.getElementById("intensity").value;
      var typeFire = document.getElementById("type-fire-select").value;

      let layerFires = L.layerGroup()
      data.filter(ligne => ligne.range == range & ligne.intensity == intensity & ligne.type == typeFire).forEach((ligne) => {
        let circle = L.circle([ligne.lon, ligne.lat], ligne.range, {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
        }).bindPopup("Lon: " + ligne.lon + " " + "Lat: " + ligne.lat + " " + "Range: " + ligne.range + " " + "Intensity: " + ligne.intensity);
        layerFires.addLayer(circle)
      })
      layerFires.addTo(mymap)
    }
  );
}

function DemandeAffichageCamion() {
  fetchCamion().then(
    (data) => {
      let layermarker = L.layerGroup()
      var logocamion = L.icon({
        iconUrl: 'https://api.geoapify.com/v1/icon/?type=material&color=%236391f0&size=large&icon=truck&iconType=awesome&apiKey=1eb2e4342f824d07afceee68599ec014',
        iconSize: [31, 46], // size of the icon
        iconAnchor: [15.5, 42], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -45] // point from which the popup should open relative to the iconAnchor
      });
      data.forEach((ligne) => {
        let marker = L.marker([ligne.lat, ligne.lon], { icon: logocamion })
          .bindPopup("Lon:" + ligne.lon + " " + " Lat:" + ligne.lat + " " + " type:" + ligne.type + " efficiency:" + ligne.efficiency +
            " liquidType:" + ligne.liquidType + " liquidQuantity:" + ligne.liquidQuantity + " liquidConsumption:" + ligne.liquidConsumption +
            " fuel:" + ligne.fuel + " fuelConsumption:" + ligne.fuelConsumption + " crewMember:" + ligne.crewMember +
            " crewMemberCapacity:" + ligne.crewMemberCapacity + " facilityRefID:" + ligne.facilityRefID);
        layermarker.addLayer(marker)
      })
      layermarker.addTo(mymap)
    }
  )
}

// ----------------------- GESTION BOUTON DEROULANT (dans le formulaire) -----------------------------//


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}