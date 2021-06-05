

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

  // ----------------------- GESTION FORMULAIRE CREER CAMION -----------------------------//


  document.getElementById("formCreerCamion").addEventListener("submit", (ev) => {
    ev.preventDefault();
    let form = new FormData(ev.target);
    let truck = Object.fromEntries(form.entries());
    //truck.type='valeurtypeV';
    console.log(truck)
    let toto = {
      "lon": 4.828066,
      "lat": 45.747389,
      "type": "CAR",
      "efficiency": 10.0,
      "liquidType": "WATER",
      "liquidQuantity": 100.0,
      "liquidConsumption": 1.0,
      "fuel": 100.0,
      "fuelConsumption": 10.0,
      "crewMember": 8,
      "crewMemberCapacity": 8,
      "facilityRefID": 0
    }
    createNewTruck(JSON.stringify(truck));
  })

}

function createNewTruck(truck) {
  fetch("http://localhost:8081/vehicle", { method: "POST", body: truck, headers: { 'Content-Type': 'application/json' } })
    .then(reponse => reponse.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      alert("Problème d'envoi ! " + erreur.message)
    });
}

// ----------------------- GESTION AFFICHAGE FEU -----------------------------//


function fetchFeu() {

  return fetch("http://localhost:8081/fire", { method: "GET" })
    .then(reponse => reponse.json())
    .then((liste) => {
      return liste.map((ligne) => {
        return {
          "lon": ligne.lon,
          "lat": ligne.lat,
          'range': ligne.range,
          'intensity': ligne.intensity,
          "type": ligne.type
        }
      })
    })
    .catch((error) => {
      alert("Oh lala il y a eu erreur ! " + erreur.message)
      console.log('Erreur: ' + error.message)
    });

}

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

// ----------------------- GESTION AFFICHAGE CAMION -----------------------------//




function fetchCamion() {
  return fetch("http://localhost:8081/vehicle", { method: "GET" }) // localhost:8084/ListeVehicule
    .then(reponse2 => reponse2.json())
    .then((liste2) => {
      return liste2.map((ligne) => {
        return {
          "lon": ligne.lon,
          "lat": ligne.lat,
          "type": ligne.type,
          "efficiency": ligne.efficiency,
          "liquidType": ligne.liquidType,
          "liquidQuantity": ligne.liquidQuantity,
          "liquidConsumption": ligne.liquidConsumption,
          "fuel": ligne.fuel,
          "fuelConsumption": ligne.fuelConsumption,
          "crewMember": ligne.crewMember,
          "crewMemberCapacity": ligne.crewMemberCapacity,
          "facilityRefID": ligne.facilityRefID
        }
      })
    })
    .catch((error) => {
      alert("Oh lala il y a eu erreur ! " + erreur.message)
      console.log('Erreur: ' + error.message)
    });

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
        let marker = L.marker([ligne.lon, ligne.lat], { icon: logocamion })
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












/*class destination {
    constructor(nom, prix, p1, p2, im1, im2, id, reference) {
        this._nom = nom;
        this._prix = prix;
        this._p1 = p1;
        this._p2 = p2;
        this._id = id;
        this._im1 = im1;
        this._im2 = im2;
        this._reference = reference;
    }

    get nom() { return this._nom; }
    get prix() { re this._prix; }
    get p1() { return this._p1; }
    get p2() { return this._p2; }
    get id() { return this._id; }
    get im1() { return this._im1; }
    get im2() { return this._im2; }
    get reference() { return this._reference; } //la référence correpond à l'id du div de la destination sur la page main
}

function changeText(nom, p1, p2, im1, im2) { //modifie les paragraphes, les images et le titre pour la page de résa en fonction de la destination

    document.getElementById("titre").firstChild.innerHTML = nom;
    document.getElementById("parag_1").innerHTML = p1;
    document.getElementById("parag_2").innerHTML = p2;
    document.getElementsByClassName("elmt2")[0].style.backgroundImage = im1;
    document.getElementsByClassName("elmt3")[0].style.backgroundImage = im2;
}

function maj() {
    let sejour_id = new URLSearchParams(window.location.search).get("id");  //récupère l'id de la destination
    changeText(tab_destinations[sejour_id].nom, tab_destinations[sejour_id].p1, tab_destinations[sejour_id].p2, tab_destinations[sejour_id].im1, tab_destinations[sejour_id].im2);
}

function changeActive() {   //redéfinie l'onglet actif comme étant "réservation"
    document.getElementsByClassName("dropdown_button")[0].style["background-color"] = "#e2d7cf";
    document.getElementsByClassName("dropdown_button")[0].style["color"] = "#ffffff";
}

function prixVoyage() { //calcul le prix du voyage et le met à jour en direct
    window.addEventListener('keydown',function(e){if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){if((e.target.nodeName == 'INPUT' && e.target.type == 'text') || e.target.type == 'date'|| e.target.type == 'checkbox' || e.target.type == 'number'){e.preventDefault();return false;}}},true);
    let sejour_id = new URLSearchParams(window.location.search).get("id");  //récupère l'id de la destination
    var Ddep = document.getElementById("date_dep");
    var Dret = document.getElementById("date_ret");
    Ddep = Ddep.value;
    Dret = Dret.value;
    Ddep = new Date(Ddep);
    Dret = new Date(Dret);
    Ddep = Date.parse(Ddep);
    Dret = Date.parse(Dret);
    var duree = Dret - Ddep;
    duree = Math.floor(duree/86400000);

    var test;
    if (duree <= 0) {   //saisie protégée de la date
        alert("Attention ! Veuillez saisir une date de retour postérieure à la date de départ !");
        document.getElementById("validate_button").style["visibility"] = "hidden";
        test = 0
    } else {
        document.getElementById("validate_button").style["visibility"] = "visible";
        ts 1
    }

    var nbAdultes = document.getElementById("nb_adultes");
    nbAdultes = nbAdultes.valuee;    //nombre d'adultes

    var nbEnfants = document.getElementById("nb_enfants");
    nbEnfants = nbEnfants.value;    //nombre d'enfants

    if (nbAdultes == 0 && nbEnfants != 0) {     //test nécessaires avant la validation du form
        alert("Attention ! Une réservation doit au moins comporter un adulte !");
        document.getElementById("validate_button").style["visibility"] = "hidden";
        disableEnter(this);
    } else if (test == 1) {
        document.getElementById("validate_button").style["visibility"] = "visible";
    }

    var prixTot = document.getElementById("prix_total");    //div correspondant au prix total du séjour dans le form
    prixTot = prixTot.value;

    var somme = nbAdultes*tab_destinations[sejour_id].prix*duree + nbEnfants*tab_destinations[sejour_id].prix*0.40*duree;
    if (document.getElementById("check_dej").checked == true) {     //test si l'on prend le petit déjeuner
        somme += 12*nbAdultes*duree + 12*nbEnfants*duree;
    }
    prixTot = somme;
    document.getElementById("prix_total").innerHTML = prixTot;
}

//---Données correspondants à chaque séjour---//

var ptahiti1 = "Avec 1 042 km2 et 183 645 habitants en 2012, Tahiti est à la fois la plus grande et la plus peuplée des îles de la Polynésie française.<br/> L’île concentre l’essentiel des activités économiques de l’archipel polynésien. La ville de Papeete, située sur la côte nord-ouest de l’île, est la capitale de la Polynésie française et en abrite toutes les institutions politiques.";
var ptahiti2 = "Partez à Tahiti pour 230€/jour par adulte et 92€/jour par enfant.<br/> Profitez d'un voyage unique au monde grâce à nos services prestiges exclusifs !";
var im1_tahiti = "url('../images_villes/tahiti_1.jpg')";
var im2_tahiti = "url('../images_villes/tahiti_2.jpg')";

var psri_lanka1 = "Le pays possède une diversité religieuse, culturelle et linguistique marquée. Ainsi, le Sri Lanka possède deux langues officielles reconnues par la Constitution du pays à parts égales, le cingalais et le tamoul.<br/> La première est prédominante dans la plus grande partie du pays, car environ 73,8 % de locuteurs sont cingalais, pour environ 26,1 % de tamouls.<br/> Oui ça n'est pas vendeur du tout !";
var psri_lanka2 = "Partez au Sri Lanka pour 330€/jour par adulte et 132€/jour par enfant.<br/> Profitez d'un voyage unique au monde grâce à nos services prestiges exclusifs !";
var im1_sri = "url('../images_villes/sri_lanka_1.jpg')";
var im2_sri = "url('../images_villes/sri_lanka_2.jpeg')";

var psao_paulo1 = "Sao Paulo compte de nombreux monuments, parcs ou musées comme le Mémorial de l'Amérique Latine, le Parc d'Ibirapuera, le Museu Paulista, le Musée d'art de São Paulo ou le Musée de la langue portugaise.<br/> Elle accueille également d'importants événements sportifs et artistiques, comme la Biennale d'art, la Fashion Week de São Paulo, l'Open du Brésil de tennis et le Grand Prix automobile du Brésil.";
var psao_paulo2 = "Partez à Sao Paulo pour 150€/jour par adulte et 60€/jour par enfant.<br/> Profitez d'un voyage unique au monde grâce à nos services prestiges exclusifs !";
var im1_sao = "url('../images_villes/sao_paulo_1.jpg')";
var im2_sao = "url('../images_villes/sao_paulo_2.jpg')";

var pparis1 = "Découvrez notre voyage exceptionnel au coeur de la capitale française !<br/> Symbole de la culture française, connue dans le monde entier pour sa beauté et son élégance.<br/> Abritant de nombreux monuments, la ville, surnommée la Ville Lumière, attire en 2019 près de 35 millions de visiteurs, ce qui en fait une des capitales les plus visitées au monde.";
var pparis2 = "Partez à Paris pour 300€/jour par adulte et 120€/jour par enfant.<br/> Profitez d'un voyage unique au monde grâce à nos services prestiges exclusifs !";
var im1_paris = "url('../images_villes/champ_ely.jpg')";
var im2_paris = "url('../images_villes/tour_eiffel.jpg')";

var pny1 = "New York accueille quelque 50 millions de visiteurs annuellement.<br/> Times Square, « The Crossroads of the World », est l'une des intersections les plus populaires du monde, et le quartier des théâtres de Broadway est la plaque tournante du spectacle dans le pays tout entier et un centre majeur de l'industrie du divertissement dans le monde.<br/> La ville abrite un grand nombre de ponts et tunnels, gratte-ciel et parcs de renommée mondiale.";
var pny2 = "Partez à New York pour 270€/jour par adulte et 108€/jour par enfant.<br/> Profitez d'un voyage unique au monde grâce à nos services prestiges exclusifs !";
var im1_ny = "url('../images_villes/ny_1.jpg')";
var im2_ny = "url('../images_villes/ny_2.jpg')";

var pmoscou1 = "Le cœur de la capitale a été construit sur les berges de la rivière Moskova qui la traverse de part en part du nord-est au sud-ouest en formant de nombreux méandres.<br/> Ce fleuve, a formé successivement au cours du temps trois terrasses, la plus ancienne dominant le lit actuel d'une trentaine de mètres.";
var pmoscou2 = "Partez à Moscou pour 96€/jour par adulte et 38,4€/jour par enfant.<br/> Profitez d'un voyage unique au monde grâce à nos services prestiges exclusifs !";
var im1_moscou = "url('../images_villes/moscou_1.jpg')";
var im2_moscou = "url('../images_villes/moscou_2.jpg')";

var tahiti = new destination("Tahiti", 230, ptahiti1, ptahiti2, im1_tahiti, im2_tahiti, 0, "tahiti");
var sri_lanka = new destination("Sri Lanka", 330, psri_lanka1, psri_lanka2, im1_sri, im2_sri, 1, "sri");
var sao_paulo = new destination("Sao Paulo", 150, psao_paulo1, psao_paulo2, im1_sao, im2_sao, 2, "sao");
var paris = new destination("Paris", 300, pparis1, pparis2, im1_paris, im2_paris, 3, "paris");
var ny = new destination("New York", 270, pny1, pny2, im1_ny, im2_ny, 4, "ny");
var moscou = new destination("Moscou", 96, pmoscou1, pmoscou2, im1_moscou, im2_moscou, 5, "moscou");

var tab_destinations = [tahiti, sri_lanka, sao_paulo, paris, ny, moscou];

//---------------------recap sejour-----------------------//

function recap1() {     //récupère les données du formulaire contenues dans l'url et les affiches dans le tableau de recap

    let sejour_id = new URLSearchParams(window.location.search).get("id");
    var destinationR = tab_destinations[sejour_id].nom;
    var adulteR = new URLSearchParams(window.location.search).get("nb_ald");
    var enfantR = new URLSearchParams(window.location.search).get("nb_enf");
    var petit_dejR = new URLSearchParams(window.location.search).get("dej");
    var nomR = new URLSearchParams(window.location.search).get("nom");
    var prenomR = new URLSearchParams(window.location.search).get("prenom");
    var emailR = new URLSearchParams(window.location.search).get("email");
    var telephoneR = new URLSearchParams(window.location.search).get("numero_tel");
    var Prix_voyage_totR = new URLSearchParams(window.location.search).get("prix_total");
    var DdepR = new URLSearchParams(window.location.search).get("date_dep");
    var DretR = new URLSearchParams(window.location.search).get("date_ret");
    var randomNb = Math.floor((Math.random() * 10000) + 1);

    document.getElementById("destination").innerHTML = destinationR;
    document.getElementById("nom").innerHTML = nomR + " " + prenomR;
    document.getElementById("email").innerHTML = emailR;
    document.getElementById("tel").innerHTML = telephoneR;
    document.getElementById("dateSej").innerHTML = "du" + " " + DdepR + " " + "au" + " " + DretR;
    document.getElementById("nbAdultes").innerHTML = adulteR;
    document.getElementById("nbEnfants").innerHTML = enfantR;
    document.getElementById("dej").innerHTML = petit_dejR;
    document.getElementById("prix_tot").innerHTML = Prix_voyage_totR;
    document.getElementById("numResa").innerHTML = randomNb;

    localStorage.setItem(destinationR, randomNb.toString() + "/" + Prix_voyage_totR.toString());    //ajoute la réservation au storage
    returnStorage();
    window.alert("Votre réservation numéro" + " " + randomNb + " " + "pour" + " " + destinationR + " " + "\na bien été ajoutée à votre panier.");
}

function recup_form() {     //récupère les données du formulaire
    var nom = document.getElementById("name").value;
    var prenom = document.getElementById("prenom").value;
    var email = document.getElementById("mail").value;
    var date_depart = document.getElementById("date_dep").value;
    var date_retour = document.getElementById("date_ret").value;
    var telephone = document.getElementById("numero_tel").value;
    var prixTot = document.getElementById("prix_total").innerHTML;
    var nb_enf = document.getElementById("nb_enfants").value;
    var nb_ald = document.getElementById("nb_adultes").value;
    if (document.getElementById("check_dej").checked == true) {
        var dej = "Oui"
    }   else {
        var dej = "Non"
    }
    var recup = [nom, prenom, email, date_depart, date_retour, telephone, prixTot, nb_enf, nb_ald, dej];
    return recup;
}

function url_send() {   //rajoute dans l'url de récapitulatif les valeurs du formulaire
    event.preventDefault();
    recup = recup_form();
    let sejour_id = new URLSearchParams(window.location.search).get("id");
    window.location.href = "recap.html?id=" + sejour_id + "&nom=" + recup[0] + "&prenom=" + recup[1] + "&email=" + recup[2] + "&date_dep=" + recup[3] + "&date_ret=" + recup[4] + "&numero_tel=" + recup[5] + "&prix_total=" + recup[6] + "&nb_enf=" + recup[7] + "&nb_ald=" + recup[8] + "&dej=" + recup[9] + "";
}

//------------------Authentification-----------------//

class utilisateur {
    constructor(username, pass) {
        this._username = username;
        this._pass = pass;
    }
    get username() { return this._username }
    get pass() { return this._pass }
}
//base de données des comptes
var compte1 = new utilisateur("Chuck", "Norris");
var compte2 = new utilisateur("Ken", "LeSurvivant");
var compte3 = new utilisateur("Barack", "Obama");
var compte4 = new utilisateur("Tony", "Hawk");
var compte5 = new utilisateur("Tupac", "Shakur");

var ListeComptes = [compte1, compte2, compte3, compte4, compte5];

function deAffichageCo() {      //remplace le bloc notifiant que l'utilisateur est connecté par le formulaire de connexion
    document.getElementsByClassName("form_connexion")[0].innerHTML = '<button class="connexion_bouton">Connexion</button><form method="GET" onsubmit="authentification();"><input id="userID" type="text" title="identifiant" placeholder="Identifiant" /><input id="userPass" type="password" title="mot de passe" placeholder="Mot de passe" /><button type="submit" class="bouton_connexion">Connexion</button></form>';
}

function affichageCo() {    //supprime le formualaire de connexion et y fait apparaitre le bloc notifiant que l'utilisateur est bien connecté
    document.getElementsByClassName("form_connexion")[0].innerHTML = '<div class="dropdown"><button class="connexion_bouton">Vous êtes connecté !</button><div class="dropdown_content"><button onclick="deconnexion();">Déconnexion</button></div></div>';
}

function authentification() {   //vérifie si l'utilisateur entre des identifiants valides, si oui il est connecté, sinon un pop up indique une erreur
    event.preventDefault();
    var username = document.getElementById("userID").value;
    var pass = document.getElementById("userPass").value;
    for (const compte in ListeComptes) {
        //on parcours tous les comptes pour vérifier si les informations rentrées correspondent à un compte enregistré sur le site
        if (username === ListeComptes[compte].username && pass === ListeComptes[compte].pass) {
            affichageCo();
            window.localStorage.removeItem('checkCo');      //supprime la valeur de checkCo si jamais cette variable existait
            window.localStorage.setItem('checkCo', '1');    //stock dans le local storage une variable indiquant que l'utilisateur est connecté
            return
            }
        }
    window.alert("Identifiant ou mot de passe incorrect !\nVeuillez réessayer.");
    }

function deconnexion() {    //deconnecte l'utilisateur et enregistre en local une variable indiquant qu'il est déconnecté
    deAffichageCo();
    window.localStorage.removeItem('checkCo');
    window.localStorage.setItem('checkCo', '0');
}

function verifCo() {    //vérifie si l'utilisateur est connecté ou non, si oui on affiche le bloc correspondant à la connexion sinon on laisse le formulaire de connexion
    let statusCo = window.localStorage.getItem('checkCo');
    if (statusCo === '1') { affichageCo();}
}


//-----------------Filtrage----------------//

function filtrage() {
    let prixMax = document.getElementById("prixMax").value;
    let prixMin = document.getElementById("prixMin").value;
    for (let desti of tab_destinations) {
        if (desti.prix > prixMax || desti.prix < prixMin) {
            document.getElementById(desti.reference).style.display = "none";
        } else {
            document.getElementById(desti.reference).style.display = "block";
        }
    }
}

//--------Panier---------//

function returnStorage() {  //retourne le prix et le numéro de résa des commandes effectuées à partir du storage sous forme de listes
    //parcours for des voyages + test si le nom est le meme que la clé + decoupage de la valeur de la clé
    let tailleStock = localStorage.length;
    let listeLieu = [];
    let listeNumResa = [];
    let listePrix = [];

    for (let pays of tab_destinations) {
        for (let indiceStock = 0; indiceStock < tailleStock; indiceStock++) {
            if (localStorage.key(indiceStock) === pays.nom) {
                let cle = localStorage.key(indiceStock);
                listeLieu.push(cle);
                let strDeTransfert = "";
                for (let indiceStr = 0; indiceStr < localStorage.getItem(cle).length; indiceStr++) {
                    let strResaPrix = localStorage.getItem(cle);

                    if (strResaPrix[indiceStr] !== '/') {
                        strDeTransfert = strDeTransfert + strResaPrix[indiceStr];

                    } else if (strResaPrix[indiceStr] === '/') {
                        listeNumResa.push(strDeTransfert);
                        strDeTransfert = "";
                    }
                }
                listePrix.push(strDeTransfert);
            }

fetch("https://localhost8081/fire")
.then(reponse => reponse.json)
.then(response => alert(JSON.stringify(response)))
.catch(error => alert("Erreur : " + error));

fetch("https://localhost8081/fire")
.then(function(response) {
    if(response.ok) {
      response.blob().then(function(myBlob) {
        var objectURL = URL.createObjectURL(myBlob);
        myImage.src = objectURL;
      });
    } else {
      console.log('Mauvaise réponse du réseau');
    }
  })
  .catch(function(error) {
    console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
  });
    //    } else {
    //        lieuTEST = lieuTEST + lettre;
    //    }
    //}

    let lieuTEST = lieu.id;
    console.log(lieuTEST);
    localStorage.removeItem(lieuTEST);
    affichagePanier();
}
*/
