function getCard(wheretoplace, vorname, nachname, strasse, plz, stadt, land, privateOrPublic, type, num) {
    // Create card
    let divCard = document.createElement("div");
    // Add a class for css styles
    divCard.className = "card";
    // We need a uniq id for the card (with connection to the contact)
    divCard.id = `card_${type}_${privateOrPublic}_${num}`;
    // --------We want to have a background image for the card as a picture of a random city from unspalsh.com-------
    // a function to create a random number
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    // Create a random number between 0 and 14
    let randomNumber = getRandomInt(14);
    // Let's choose a random city name based on a number between 0 and 14
    let city;
    switch (randomNumber) {
        case 0:
            city = "moscow";
            break;
        case 1:
            city = "london";
            break;
        case 2:
            city = "rome";
            break;
        case 3:
            city = "paris";
            break;
        case 4:
            city = "helsinki";
            break;
        case 5:
            city = "warsaw";
            break;
        case 6:
            city = "barcelona";
            break;
        case 7:
            city = "tokyo";
            break;
        case 8:
            city = "venice";
            break;
        case 9:
            city = "stockholm";
            break;
        case 10:
            city = "chicago";
            break;
        case 11:
            city = "budapest";
            break;
        case 12:
            city = "lisbon";
            break;
        case 13:
            city = "madrid";
            break;
        case 14:
            city = "oslo";
            break;
        default:
            city = "berlin"
    }
    // Create a background picture with gradient for better readability of the text on it using a random city name (as city)
    divCard.style.backgroundImage = `linear-gradient(
              rgba(0, 0, 0, 0.5),
              rgba(0, 0, 0, 0.5)
            ),url(https://source.unsplash.com/900x900/?${city})`;
    //-----------------------------------------------------------------------------------
    // Create contact for the card
    let divContact = document.createElement("div");
    // We need a uniq id for the contact (with connection to the card)
    divContact.id = `contact_${type}_${num}`;
    // The color could be orange for public and green for private
    let color;
    if (privateOrPublic == 'private') {
        color = 'green';
    } else {
        color = 'orange';
    }
    // Put in the info
    divContact.innerHTML = `<span class="yellow-black">Vorname:</span> <span id='vorname_${type}_${privateOrPublic}_${num}'>${vorname}</span><br /> <span class="yellow-black">Nachname:</span> <span id='nachname_${type}_${privateOrPublic}_${num}'>${nachname}</span><br /> <span class="yellow-black">Strasse:</span><span id='strasse_${type}_${privateOrPublic}_${num}'> ${strasse}</span><br /> <span class="yellow-black" >PLZ:</span> <span id='plz_${type}_${privateOrPublic}_${num}'>${plz}</span><br /> <span class="yellow-black" >Stadt:</span><span id='stadt_${type}_${privateOrPublic}_${num}'> ${stadt}</span><br /> <span class="yellow-black">Land:</span><span id='land_${type}_${privateOrPublic}_${num}'> ${land}</span><br /> <span class='${color}'><span id='private_or_public_${type}_${privateOrPublic}_${num}'>${privateOrPublic}</span></span>`;
    // Append contact to the card
    divCard.append(divContact);
    // ------------- Here we want to create an edit/delete section for the card-----------------------
    // Create the i section
    let i = document.createElement("i");
    i.className = "far fa-edit fa-2x";
    i.setAttribute("data-target", `#target_id_${type}_${num}`);
    i.setAttribute("data-toggle", "modal");
    i.setAttribute("data-whatever", "@mdo");
    i.setAttribute("id", "edit_icon");
    // Create the Label
    let divModalLabel = document.createElement("div");
    divModalLabel.setAttribute("aria-hidden", "true");
    divModalLabel.setAttribute("aria-labelledby", "exampleModalLabel");
    divModalLabel.setAttribute("class", "modal fade");
    divModalLabel.setAttribute("id", `target_id_${type}_${num}`);
    divModalLabel.setAttribute("role", "dialog");
    divModalLabel.setAttribute("tabindex", "-1");
    // Create the Dialog
    let divModalDialog = document.createElement("div");
    divModalDialog.setAttribute("class", "modal-dialog");
    divModalDialog.setAttribute("role", "document");
    // Create the Content
    let divModalContent = document.createElement("div");
    divModalContent.setAttribute("class", "modal-content");
    // Create the Header for the Content
    let divModalHeader = document.createElement("div");
    divModalHeader.setAttribute("class", "modal-header");
    let hDivModalHeader = document.createElement("h5");
    hDivModalHeader.setAttribute("class", "modal-title");
    hDivModalHeader.setAttribute("id", "exampleModalLabel");
    hDivModalHeader.innerHTML = "Edit Address";
    // Create close button
    let buttonDivModalHeader = document.createElement("button");
    buttonDivModalHeader.setAttribute("aria-label", "Close");
    buttonDivModalHeader.setAttribute("class", "close");
    buttonDivModalHeader.setAttribute("data-dismiss", "modal");
    buttonDivModalHeader.setAttribute("type", "button");
    let spanButtonDivModalHeader = document.createElement("span");
    spanButtonDivModalHeader.setAttribute("aria-hidden", "true");
    spanButtonDivModalHeader.innerHTML = "×";
    buttonDivModalHeader.append(spanButtonDivModalHeader);
    divModalHeader.append(hDivModalHeader);
    divModalHeader.append(buttonDivModalHeader);
    // Create the Body for the Content
    let divModalBody = document.createElement("div");
    divModalBody.setAttribute("class", "modal-body");
    divModalBody.setAttribute("id", `modal_body_${type}_${num}`);
    // -------- Here we want to insert different forms ---------------------
    let id_for_label_1 = `recipient-name-${type}-${num}`;
    let id_for_label_2 = `recipient-nachname-${type}-${num}`;
    let id_for_label_3 = `recipient-strasse-${type}-${num}`;
    let id_for_label_4 = `recipient-plz-${type}-${num}`;
    let id_for_label_5 = `recipient-stadt-${type}-${num}`;
    let id_for_label_6 = `recipient-land-${type}-${num}`;
    let text1 = "Vorname";
    let text2 = "Nachname";
    let text3 = "Strasse";
    let text4 = "PLZ";
    let text5 = "Stadt";
    let text6 = "Land";
    let id_for_input1 = `recipient-name-${type}-${num}`;
    let id_for_input2 = `recipient-nachname-${type}-${num}`;
    let id_for_input3 = `recipient-strasse-${type}-${num}`;
    let id_for_input4 = `recipient-plz-${type}-${num}`;
    let id_for_input5 = `recipient-stadt-${type}-${num}`;
    let id_for_input6 = `recipient-land-${type}-${num}`;
    let id_for_input_check = `check_private_${privateOrPublic}_${type}_num_${num}`;
    let id_for_input_check_as_normalo = `id_for_input_check_as_normalo_${type}_${num}`;
    // Create a form synamically
    let form = document.createElement("form");
    form.setAttribute("id", "input_form_contact");
    form.setAttribute("role", "form");
    // Create array
    let array = [1, 2, 3, 4, 5, 6];
    // Create 6 different divs
    function createDivs(value) {
        this["div" + value] = document.createElement("div");
        this["div" + value].classList.add("form-group");
    }
    array.forEach(createDivs);
    // Create 6 different labels
    function createLabels(value) {
        this["label" + value] = document.createElement("Label");
        this["label" + value].classList.add("col-form-label");
        this["label" + value].setAttribute("for", eval(`id_for_label_${value}`));
        this["label" + value].innerHTML = eval(`text${value}`);
    }
    array.forEach(createLabels);
    // Create 6 different inputs
    function createInputs(value) {
        this["input" + value] = document.createElement("input");
        this["input" + value].classList.add("form-control");
        this["input" + value].setAttribute("id", eval(`id_for_input${value}`));
        this["input" + value].setAttribute("required", "true");
        this["input" + value].setAttribute("type", "text2");
    }
    array.forEach(createInputs);
    // Appned all labels and inputs:
    function appendLabels(value) {
        eval(`div${value}`).append(eval(`label${value}`));
        eval(`div${value}`).append(eval(`input${value}`));
    }
    array.forEach(appendLabels);
    // Create a check form (div)
    let divCheck = document.createElement("div");
    divCheck.classList.add("form-check");
    let inputCheck = document.createElement("input");
    inputCheck.classList.add("form-check-input");
    inputCheck.setAttribute("id", id_for_input_check);
    inputCheck.setAttribute("required", "");
    inputCheck.setAttribute("type", "checkbox");
    let labelCheck = document.createElement("Label");
    labelCheck.classList.add("form-check-label");
    labelCheck.setAttribute("for", "check");
    labelCheck.innerHTML = "Privat";
    divCheck.append(inputCheck);
    divCheck.append(labelCheck);
    // Append all 6 divs to the form
    function appendDivs(value) {
        form.append(eval(`div${value}`));
    }
    array.forEach(appendDivs);
    // Append the checkbox input to the form
    form.append(divCheck);
    // Append the form input to the modal body
    divModalBody.appendChild(form);
    //----------------------------------------------------------------------
    // Create the Footer for the Content
    let divModalFooter = document.createElement("div");
    let closeButtonDivModalFooter = document.createElement("button");
    closeButtonDivModalFooter.setAttribute("class", "btn btn-secondary");
    closeButtonDivModalFooter.setAttribute("id", "close_button");
    closeButtonDivModalFooter.setAttribute("data-dismiss", "modal");
    closeButtonDivModalFooter.setAttribute("type", "button");
    closeButtonDivModalFooter.innerHTML = "Close";
    let aEditButtonDivModalFooter = document.createElement("a");
    aEditButtonDivModalFooter.setAttribute("href", `javascript:editCard('card_${type}_${privateOrPublic}_${num}','recipient-name-${type}-${num}', 'recipient-nachname-${type}-${num}','recipient-strasse-${type}-${num}','recipient-plz-${type}-${num}','recipient-stadt-${type}-${num}','recipient-land-${type}-${num}','${id_for_input_check}')`);
    let editButtonDivModalFooter = document.createElement("button");
    editButtonDivModalFooter.setAttribute("class", "btn btn-primary");
    editButtonDivModalFooter.setAttribute("id", "edit_button");
    editButtonDivModalFooter.setAttribute("type", "submit");
    editButtonDivModalFooter.setAttribute("onclick", "alert('Changes saved.')");
    editButtonDivModalFooter.innerHTML = "Edit address";
    aEditButtonDivModalFooter.append(editButtonDivModalFooter);
    // divModalFooter.append(closeButtonDivModalFooter);
    divModalFooter.append(aEditButtonDivModalFooter);
    // Append the Header, the Body, and the Footer to the Content
    divModalContent.append(divModalHeader);
    divModalContent.append(divModalBody);
    divModalContent.append(divModalFooter);
    // Append the Content to the Dialog
    divModalDialog.append(divModalContent);
    // Append the Dialog to the Label
    divModalLabel.append(divModalDialog);
    // Create the delete icon
    let aEditOrDeleteSection = document.createElement("a");
    //TODO: change privateOrPublic dynamically
    aEditOrDeleteSection.setAttribute("href", `javascript:deleteElement('card_${type}_${privateOrPublic}_${num}')`);
    let iForAEditOrDeleteSection = document.createElement("i");
    iForAEditOrDeleteSection.setAttribute("class", "far fa-trash-alt fa-2x");
    iForAEditOrDeleteSection.setAttribute("id", "delete_icon");
    aEditOrDeleteSection.append(iForAEditOrDeleteSection);
    //------------------------------------------------------------------
    // Append the i (edit icon) to the card
    divCard.append(i);
    // Append the Label to the card
    divCard.append(divModalLabel);
    // Append the delete icon to the card
    divCard.append(aEditOrDeleteSection);
    // Find a place where to append the card
    let element = document.getElementById(wheretoplace);
    // Append the card there
    element.append(divCard);
    //Increment the cardsCounter
    cardsCounter++;
}

function editCard(uniqid, name, surname, street, plz, city, country, privateOrPublic) {
    let string = uniqid; // 'card_${type}_${privateOrPublic}_${num}'

    let wordNormalo = string.search("normalo");
    let wordAdmina = string.search("admina");
    let wordPrivate = string.search("private");
    let wordPublic = string.search("public");
    let wordNum = string.search("num");

    // let type;
    // let privateOrPublic;
    let num;

    if (!(wordAdmina == -1)) { // admina
        if (!(wordPrivate == -1)) { // 'card_admina_private_num_${num}'
            // type = recieve.slice(5,11); // admina
            // privateOrPublic = recieve.slice(12,19); // private
            num = string.slice(20, string.length); // num
            console.log(num);
            console.log(eval(`dataContact${num}`));
            eval(`dataContact${num}`).street = `${document.getElementById(street).value}`;
            eval(`dataContact${num}`).plz = `${document.getElementById(plz).value}`;
            eval(`dataContact${num}`).city = `${document.getElementById(city).value}`;
            console.log(eval(`dataContact${num}`));
            if (document.getElementById('username').value == admina.username) {
                getMap(arrayOFHashesAll);
            } else {
                getMap(arrayOFHashesAllExceptAdminaPrivate);
            }
        } else { // 'card_admina_public_num_${num}'
            // type = recieve.slice(5,11); // admina
            // privateOrPublic = recieve.slice(12,18); // public
            num = string.slice(19, string.length); // num
            console.log(num);
            console.log(eval(`dataContact${num}`));
            eval(`dataContact${num}`).street = `${document.getElementById(street).value}`;
            eval(`dataContact${num}`).plz = `${document.getElementById(plz).value}`;
            eval(`dataContact${num}`).city = `${document.getElementById(city).value}`;
            console.log(eval(`dataContact${num}`));
            if (document.getElementById('username').value == admina.username) {
                getMap(arrayOFHashesAll);
            } else {
                getMap(arrayOFHashesAllExceptAdminaPrivate);
            }
        }
    } else {
        // normalo
        if (!(wordPrivate == -1)) { // 'card_normalo_private_num_${num}'
            // type = recieve.slice(5,12); // normalo
            // privateOrPublic = recieve.slice(13,20); // private
            num = string.slice(21, string.length); // num
            console.log(num);
            console.log(eval(`dataContact${num}`));
            eval(`dataContact${num}`).street = `${document.getElementById(street).value}`;
            eval(`dataContact${num}`).plz = `${document.getElementById(plz).value}`;
            eval(`dataContact${num}`).city = `${document.getElementById(city).value}`;
            console.log(eval(`dataContact${num}`));
            if (document.getElementById('username').value == admina.username) {
                getMap(arrayOFHashesAll);
            } else {
                getMap(arrayOFHashesAllExceptAdminaPrivate);
            }
        } else { // 'card_normalo_public_num_${num}'
            // type = recieve.slice(5,12); // normalo
            // privateOrPublic = recieve.slice(13,19); // public
            num = string.slice(20, string.length); // num
            console.log(num);
            console.log(eval(`dataContact${num}`));
            eval(`dataContact${num}`).street = `${document.getElementById(street).value}`;
            eval(`dataContact${num}`).plz = `${document.getElementById(plz).value}`;
            eval(`dataContact${num}`).city = `${document.getElementById(city).value}`;
            console.log(eval(`dataContact${num}`));
            if (document.getElementById('username').value == admina.username) {
                getMap(arrayOFHashesAll);
            } else {
                getMap(arrayOFHashesAllExceptAdminaPrivate);
            }
        }
    }



    let res = string.slice(5, string.length); //{user}_{privacy}_{number}
    let vorname = "vorname_";
    let vornameID = vorname.concat(res); // vorname_{user}_{privacy}_{number}
    let vornameEl = document.getElementById(vornameID);
    vornameEl.innerHTML = `${document.getElementById(name).value}`; // change vorname to the name
    let nachname = "nachname_";
    let nachnameID = nachname.concat(res); // nachname_{user}_{privacy}_{number}
    let nachnameEl = document.getElementById(nachnameID);
    nachnameEl.innerHTML = `${document.getElementById(surname).value}`; // change nachname to the surname
    let plzEdit = "plz_";
    let plzID = plzEdit.concat(res); // plz_{user}_{privacy}_{number}
    let plzEl = document.getElementById(plzID);
    plzEl.innerHTML = `${document.getElementById(plz).value}`; // change plz to the plz
    let streetEdit = "strasse_";
    let streetID = streetEdit.concat(res); // strasse_{user}_{privacy}_{number}
    let streetEl = document.getElementById(streetID);
    streetEl.innerHTML = `${document.getElementById(street).value}`; // change strasse to the street
    let stadt = "stadt_";
    let stadtID = stadt.concat(res); // stadt_{user}_{privacy}_{number}
    let stadtEl = document.getElementById(stadtID);
    stadtEl.innerHTML = `${document.getElementById(city).value}`; // change stadt to the city
    let land = "land_";
    let landID = land.concat(res); // land_{user}_{privacy}_{number}
    let landEl = document.getElementById(landID);
    landEl.innerHTML = `${document.getElementById(country).value}`; // change land to the country
    if (document.getElementById(privateOrPublic).checked == true) {
        let privacy = "private_or_public_";
        let privacyID = privacy.concat(res);
        let privacyEl = document.getElementById(privacyID);
        privacyEl.innerHTML = `private`;
        let parent = privacyEl.parentNode;
        parent.className = "green";
        //--------- hide card from normalo if it's private
        // whereas the function showAllCardsFor(user) hide for normalo all cards which ids contain the words 'card_admina_private', it's enough to change the cards ids
        if (document.getElementById('username').value == admina.username) {
            // For admina id="card_admina_private_2"
            let cardsIdUnchanged1 = document.getElementById(uniqid).id.slice(12, 19); // returns 'private' for admina
            let cardsIdUnchanged2 = document.getElementById(uniqid).id.slice(0, 12); // returns 'card_admina_' for admina
            let cardsIdUnchanged3 = document.getElementById(uniqid).id.slice(19, document.getElementById(uniqid).id.length); // returns '_number'
            // Let's create new id
            let partOfStringToChange = 'private'
            let cardsIdChanged = cardsIdUnchanged2 + partOfStringToChange + cardsIdUnchanged3;
            // Now the card has new id with the word 'private' (not visible for normalo anymore [see showAllCards(user)])
            document.getElementById(uniqid).id = cardsIdChanged;
        } else {
            // For normalo
            let cardsIdUnchanged = document.getElementById(uniqid).id.slice(13, 20); // returns 'private' for normalo

            // For admina id="card_admina_private_2"
            let cardsIdUnchanged1 = document.getElementById(uniqid).id.slice(13, 20); // returns 'private' for normalo
            let cardsIdUnchanged2 = document.getElementById(uniqid).id.slice(0, 13); // returns 'card_normalo_' for normalo
            let cardsIdUnchanged3 = document.getElementById(uniqid).id.slice(20, document.getElementById(uniqid).id.length); // returns '_number'
            // Let's create new id
            let partOfStringToChange = 'private'
            let cardsIdChanged = cardsIdUnchanged2 + partOfStringToChange + cardsIdUnchanged3;
            // Now the card has new id with the word 'private' (not visible for normalo anymore [see showAllCards(user)])
            document.getElementById(uniqid).id = cardsIdChanged;
        }
    } else {
        let privacy = "private_or_public_";
        let privacyID = privacy.concat(res);
        let privacyEl = document.getElementById(privacyID);
        privacyEl.innerHTML = `public`;
        let parent = privacyEl.parentNode;
        parent.className = "orange";
        if (document.getElementById('username').value == admina.username) {
            // For admina id="card_admina_private_2"
            let cardsIdUnchanged1 = document.getElementById(uniqid).id.slice(12, 19); // returns 'public' for admina
            let cardsIdUnchanged2 = document.getElementById(uniqid).id.slice(0, 12); // returns 'card_admina_' for admina
            let cardsIdUnchanged3 = document.getElementById(uniqid).id.slice(19, document.getElementById(uniqid).id.length); // returns '_number'
            // Let's create new id
            let partOfStringToChange = 'public'
            let cardsIdChanged = cardsIdUnchanged2 + partOfStringToChange + cardsIdUnchanged3;
            // Now the card has new id with the word 'public' (not visible for normalo anymore [see showAllCards(user)])
            document.getElementById(uniqid).id = cardsIdChanged;
        } else {
            // For normalo
            let cardsIdUnchanged = document.getElementById(uniqid).id.slice(13, 20); // returns 'public' for normalo
            // For admina id="card_admina_private_2"
            let cardsIdUnchanged1 = document.getElementById(uniqid).id.slice(13, 20); // returns 'public' for normalo
            let cardsIdUnchanged2 = document.getElementById(uniqid).id.slice(0, 13); // returns 'card_normalo_' for normalo
            let cardsIdUnchanged3 = document.getElementById(uniqid).id.slice(20, document.getElementById(uniqid).id.length); // returns '_number'
            // Let's create new id
            let partOfStringToChange = 'public'
            let cardsIdChanged = cardsIdUnchanged2 + partOfStringToChange + cardsIdUnchanged3;
            // Now the card has new id with the word 'public' (not visible for normalo anymore [see showAllCards(user)])
            document.getElementById(uniqid).id = cardsIdChanged;
        }
    }
}

// ----------------------------------------------------------------------------------------------------------
function User(username,password){
  this.username = username;
  this.password = password;
}

let admina = new User('admina', 'admina');
let normalo = new User('normalo', 'normalo');

function Contact(id,name,surname,street,plz,city,country,privacy,creator){
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.street = street;
    this.plz = plz;
    this.city = city;
    this.country = country;
    this.privacy = privacy;
    this.creator = creator;
}

let arrayOFHashesAdmina = [];
let arrayOFHashesNormalo = [];
let arrayOFHashesAll = [];
let arrayOFHashesAllExceptAdminaPrivate = [];

function setContacts() {
    fetch(`http://localhost:3000/adviz/contacts`).then(response => response.json()).then((data) => {
        for (let i = 0; i < data.length; i++) {
            let privacy = 'private';
            if (data[i].privacy == false) {
                privacy = 'public';
            } else {
                privacy = 'private';
            }
            contact = {};
            contact[`${i}`] = new Contact(data[i].id,data[i].name,data[i].surname,data[i].street,data[i].plz,data[i].city,data[i].country,data[i].privacy,data[i].creator);
            arrayOFHashesAll.push(contact[`${i}`]);
        }
    });
    fetch(`http://localhost:3000/adviz/contacts/admina`).then(response => response.json()).then((data) => {
        for (let i = 0; i < data.length; i++) {
            let privacy = 'private';
            if (data[i].privacy == false) {
                privacy = 'public';
            } else {
                privacy = 'private';
            }
            contact = {};
            contact[`${i}`] = new Contact(data[i].id,data[i].name,data[i].surname,data[i].street,data[i].plz,data[i].city,data[i].country,data[i].privacy,data[i].creator);
            arrayOFHashesAdmina.push(contact[`${i}`]);
        }
    });
     fetch(`http://localhost:3000/adviz/contacts/normalo`).then(response => response.json()).then((data) => {
        for (let i = 0; i < data.length; i++) {
            let privacy = 'private';
            if (data[i].privacy == false) {
                privacy = 'public';
            } else {
                privacy = 'private';
            }
            contact = {};
            contact[`${i}`] = new Contact(data[i].id,data[i].name,data[i].surname,data[i].street,data[i].plz,data[i].city,data[i].country,data[i].privacy,data[i].creator);
            arrayOFHashesNormalo.push(contact[`${i}`]);
        }
    });
      fetch(`http://localhost:3000/adviz/contacts/normaloall`).then(response => response.json()).then((data) => {
        for (let i = 0; i < data.length; i++) {
            let privacy = 'private';
            if (data[i].privacy == false) {
                privacy = 'public';
            } else {
                privacy = 'private';
            }
            contact = {};
            contact[`${i}`] = new Contact(data[i].id,data[i].name,data[i].surname,data[i].street,data[i].plz,data[i].city,data[i].country,data[i].privacy,data[i].creator);
            arrayOFHashesAllExceptAdminaPrivate.push(contact[`${i}`]);
        }
    });
}





// let contact1 = new Contact(1,"Angela","Merkel","Am Kupfergraben 6","10117","Berlin","Deutschland",true,'admina');
// let contact2 = new Contact(2,"Bundeskanzlerin","der Bundesrepublik Deutschland","Willy-Brandt-Straße 1","10557","Berlin","Deutschland",false,'admina');
// let contact3 = new Contact(3,"Erich","Fromm","Stralsunder Strasse 14","13355","Berlin","Deutschland",true,'normalo');
// let contact4 = new Contact(4,"Western","Philosopher","Potsdamer Platz 1","10785","Berlin","Deutschland",false,'normalo');

// let arrayOFHashesAdmina = [];
// let arrayOFHashesNormalo = [];
// let arrayOFHashesAll = [];
// let arrayOFHashesAllExceptAdminaPrivate = [];

// arrayOFHashesAdmina.push(contact1);
// arrayOFHashesAdmina.push(contact2);
// arrayOFHashesNormalo.push(contact3);
// arrayOFHashesNormalo.push(contact4);
// arrayOFHashesAll.push(contact1);
// arrayOFHashesAll.push(contact2);
// arrayOFHashesAll.push(contact3);
// arrayOFHashesAll.push(contact4);
// arrayOFHashesAllExceptAdminaPrivate.push(contact2);
// arrayOFHashesAllExceptAdminaPrivate.push(contact3);
// arrayOFHashesAllExceptAdminaPrivate.push(contact4);

// ----------------------------------------------------------------------------------------------------------------------------
function getMap(arrayOFHashes) {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2hsaWFtaW4iLCJhIjoiY2p6cmNla2F6MTNqajNkcjFzY2lrdTMzdiJ9.SUeVEhR4ZI4uGmuntCQpEw';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        center: [13.40, 52.50],
        zoom: 11
    });

    for (let i = 0; i <= arrayOFHashes.length - 1; i++) {

        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${arrayOFHashes[i].street}_${arrayOFHashes[i].plz}_${arrayOFHashes[i].city}.json?access_token=pk.eyJ1Ijoic2hsaWFtaW4iLCJhIjoiY2p6cmNla2F6MTNqajNkcjFzY2lrdTMzdiJ9.SUeVEhR4ZI4uGmuntCQpEw`)
            .then(response => response.json())
            .then((data) => {

                let x;
                let y;
                let arrayCoords = []
                x = data.features[0].center[0];
                y = data.features[0].center[1];
                arrayCoords.push(x);
                arrayCoords.push(y);


                let coords = [];

                coords.push(arrayCoords);




                let geojson = {
                    type: 'FeatureCollection',
                    features: [{
                            type: 'Feature',
                            geometry: {
                                type: 'Point',
                                coordinates: [-77.032, 38.913]
                            },
                            properties: {
                                title: 'Mapbox',
                                description: 'Washington, D.C.'
                            }
                        },
                        {
                            type: 'Feature',
                            geometry: {
                                type: 'Point',
                                coordinates: [-122.414, 37.776]
                            },
                            properties: {
                                title: 'Mapbox',
                                description: 'San Francisco, California'
                            }
                        }
                    ]
                };
                let jsonString = JSON.stringify(geojson);
                let theBeginning = jsonString.slice(0, 39);
                let theMainInfo = '[{"type":"Feature","geometry":{"type":"Point","coordinates":[13.4,52.5]},"properties":{"title":"Mapbox","description":"Washington, D.C."}},{"type":"Feature","geometry":{"type":"Point","coordinates":[13.45, 52.5]},"properties":{"title":"Mapbox","description":"San Francisco, California"}}]'
                // Let's rewrite the main info: -------------------------------------------
                let arrayOfFeaturesSTRINGBeginning = '['
                let arrayOfFeaturesSTRINGEND = ']'
                // let arrayOfArraysOfCoords = coords;
                let amountOfFeatures = coords.length;
                let list = [];
                for (let i = 1; i <= amountOfFeatures; i++) {
                    list.push(i);
                }
                let featureString = '';

                function createFeatures(value) {
                    let xAndY = coords[value - 1];
                    if (list.length <= 1) {
                        let featureStringCHANGED = featureString.concat(`{"type":"Feature","geometry":{"type":"Point","coordinates":[${xAndY}]},"properties":{"title":"Mapbox","description":"feature_${value}"}}`);
                        featureString = featureStringCHANGED;
                    } else {
                        if (value == 1) {
                            let featureStringCHANGED = featureString.concat(`{"type":"Feature","geometry":{"type":"Point","coordinates":[${xAndY}]},"properties":{"title":"Mapbox","description":"feature_${value}"}}`);
                            featureString = featureStringCHANGED;
                        } else {
                            let featureStringCHANGED = featureString.concat(', ').concat(`{"type":"Feature","geometry":{"type":"Point","coordinates":[${xAndY}]},"properties":{"title":"Mapbox","description":"feature_${value}"}}`);
                            featureString = featureStringCHANGED;
                        }
                    }
                }
                list.forEach(createFeatures);
                theMainInfo = arrayOfFeaturesSTRINGBeginning.concat(featureString).concat(arrayOfFeaturesSTRINGEND);
                // -------------------------------------------------------------------------
                let theEnd = '}'
                // Here we want to change the string
                jsonString = theBeginning.concat(theMainInfo).concat(theEnd);
                let geojsonModified = JSON.parse(jsonString);
                // add markers to map
                geojsonModified.features.forEach(function(marker) {
                    // create a HTML element for each feature
                    var el = document.createElement('div');
                    el.className = 'marker';
                    // make a marker for each feature and add to the map
                    new mapboxgl.Marker(el)
                        .setLngLat(marker.geometry.coordinates)
                        .addTo(map);
                });
            });
    }
}

function addNewCard() {
    let user;
    if (document.getElementById('username').value == 'admina') {
        user = 'admina';
    } else {
        user = 'normalo';
    }

    // Create privacy (public or private?)
    let privateOrPublic;
    if (document.getElementById(`check_private_${user}_form`).checked == true) {
        privateOrPublic = 'private';
    } else {
        privateOrPublic = 'public';
    }
    // Create type (normalo or admina?)
    //TODO: change -> only for admina
    let type;
    if (document.getElementById(`id_for_input_check_as_normalo_${user}_form`).checked == true) {
        type = 'normalo';
    } else {
        type = 'admina';
    }
    // Create 6 params
    let vorname = document.getElementById(`recipient-name-${user}-form`).value;
    let nachname = document.getElementById(`recipient-nachname-${user}-form`).value;
    let strasse = document.getElementById(`recipient-strasse-${user}-form`).value;
    let plz = document.getElementById(`recipient-plz-${user}-form`).value;
    let stadt = document.getElementById(`recipient-stadt-${user}-form`).value;
    let land = document.getElementById(`recipient-land-${user}-form`).value;
    // Create num
    let num = cardsCounter + 1;
    // Create wheretoplace
    let wheretoplace = "all_cards";
    // Call getCard
    getCard(wheretoplace, vorname, nachname, strasse, plz, stadt, land, privateOrPublic, type, num);

    // let coolNumber = cardsCounter + 1
    this["dataContact" + num] = {};
    // let dataContact = {};
    this["dataContact" + num]["street"] = strasse;
    this["dataContact" + num]["plz"] = plz;
    this["dataContact" + num]["city"] = stadt;

    // console.log(this["dataContact"+num]["street"]);
    if (user == 'normalo') {
        arrayOFHashesNormalo.push(this["dataContact" + num]);
        arrayOFHashesAll.push(this["dataContact" + num]);
        arrayOFHashesAllExceptAdminaPrivate.push(this["dataContact" + num]);
        getMap(arrayOFHashesAllExceptAdminaPrivate);
    } else {
        if (type == 'normalo') {
            arrayOFHashesNormalo.push(this["dataContact" + num]);
            arrayOFHashesAll.push(this["dataContact" + num]);
            getMap(arrayOFHashesAll);
        } else {
            if (privateOrPublic == 'private') {
                arrayOFHashesAdmina.push(this["dataContact" + num]);
                arrayOFHashesAll.push(this["dataContact" + num]);
                getMap(arrayOFHashesAll);
            } else {
                arrayOFHashesAdmina.push(this["dataContact" + num]);
                arrayOFHashesAll.push(this["dataContact" + num]);
                arrayOFHashesAllExceptAdminaPrivate.push(this["dataContact" + num]);
                getMap(arrayOFHashesAll);
            }
        }
    }
    // getMap(arrayOFHashesAll);
    // console.log(arrayOFHashesAll);

}

function deleteElement(uniqid) {

    // Find the card
    let el = document.getElementById(uniqid);
    // Remove the card
    el.remove();

    let recieve = uniqid; // 'card_${type}_${privateOrPublic}_${num}'

    let wordNormalo = recieve.search("normalo");
    let wordAdmina = recieve.search("admina");
    let wordPrivate = recieve.search("private");
    let wordPublic = recieve.search("public");
    // let wordNum = recieve.search("num");

    let type;
    let privateOrPublic;
    let num;

    if (!(wordAdmina == -1)) { // admina
        if (!(wordPrivate == -1)) { // 'card_admina_private_${num}'
            type = recieve.slice(5, 11); // admina
            privateOrPublic = recieve.slice(12, 19); // private
            num = recieve.slice(20, recieve.length); // num
        } else { // 'card_admina_public_${num}'
            type = recieve.slice(5, 11); // admina
            privateOrPublic = recieve.slice(12, 18); // public
            num = recieve.slice(19, recieve.length); // num
        }
    } else {
        // normalo
        if (!(wordPrivate == -1)) { // 'card_normalo_private_${num}'
            type = recieve.slice(5, 12); // normalo
            privateOrPublic = recieve.slice(13, 20); // private
            num = recieve.slice(21, recieve.length); // num
        } else { // 'card_normalo_public_${num}'
            type = recieve.slice(5, 12); // normalo
            privateOrPublic = recieve.slice(13, 19); // public
            num = recieve.slice(20, recieve.length); // num
        }
    }


    let user;
    if (document.getElementById('username').value == 'admina') {
        user = 'admina';
    } else {
        user = 'normalo';
    }


    if (user == 'normalo') {
        arrayOFHashesNormalo.pop(eval(`dataContact${num}`));
        arrayOFHashesAll.pop(eval(`dataContact${num}`));
        arrayOFHashesAllExceptAdminaPrivate.pop(eval(`dataContact${num}`));
        getMap(arrayOFHashesAllExceptAdminaPrivate);
    } else {
        if (type == 'normalo') {
            arrayOFHashesNormalo.pop(eval(`dataContact${num}`));
            arrayOFHashesAll.pop(eval(`dataContact${num}`));
            getMap(arrayOFHashesAll);
        } else {
            if (privateOrPublic == 'private') {
                arrayOFHashesAdmina.pop(eval(`dataContact${num}`));
                arrayOFHashesAll.pop(eval(`dataContact${num}`));
                getMap(arrayOFHashesAll);
            } else {
                arrayOFHashesAdmina.pop(eval(`dataContact${num}`));
                arrayOFHashesAll.pop(eval(`dataContact${num}`));
                arrayOFHashesAllExceptAdminaPrivate.pop(eval(`dataContact${num}`));
                getMap(arrayOFHashesAll);
            }
        }
    }
}

// Hide something
function hide(element) {
    // Hide this
    document.getElementById(element).style.display = 'none';
}
// Show all cards section differently depends on a user
function showAllCardsFor(user) {
    if (user == 'admina') {
        // Show everything to admina
        let elems = document.querySelectorAll(`[id^='card_'], [id^='edit_icon'], [id^='delete_icon']`);
        let index;
        for (index = 0; index < elems.length; ++index) {
            elems[index].style.display = 'block';
        }
    } else {
        // Show something to normalo
        let elems = document.querySelectorAll(`[id^='card_']`);
        let index;
        for (index = 0; index < elems.length; ++index) {
            elems[index].style.display = 'block';
        }
        // Don't show admina's private cards to normalo
        let cardsToHide = document.querySelectorAll(`[id^='card_admina_private']`);
        let index2;
        for (index2 = 0; index2 < cardsToHide.length; ++index2) {
            cardsToHide[index2].style.display = 'none';
        }
        // Don't show edit/delete icons for normalo
        let iconsToHide = document.querySelectorAll(`[id^='edit_icon'], [id^='delete_icon']`);
        let index3;
        for (index3 = 0; index3 < iconsToHide.length; ++index3) {
            iconsToHide[index3].style.display = 'none';
        }
    }
}
// Hide all cards of an individual user
function hideAllCardsOfUser(userToHide) {
    let elems = document.querySelectorAll(`[id^='card_${userToHide}']`);
    let index;
    for (index = 0; index < elems.length; ++index) {
        elems[index].style.display = 'none';;
    }
}
// Show all elements for a user
function showMine(user) {
    let elems = document.querySelectorAll(`[id^='card_${user}'], [id^='edit_icon'], [id^='delete_icon']`);
    let index;
    for (index = 0; index < elems.length; ++index) {
        elems[index].style.display = 'block';;
    }
}

let cardsCounter = 0;

function setCards(forUser) {
  if(forUser == 'admina'){
    fetch(`http://localhost:3000/adviz/contacts`).then(response => response.json()).then((data) => {
        for (let i = 0; i < data.length; i++) {
            let privacy = 'private';
            if (data[i].privacy == false) {
                privacy = 'public';
            } else {
                privacy = 'private';
            }
            getCard("all_cards", data[i].name, data[i].surname, data[i].street, data[i].plz, data[i].city, data[i].country, privacy, data[i].creator, data[i].id);
        }
    });
  }else{
    fetch(`http://localhost:3000/adviz/contacts`).then(response => response.json()).then((data) => {
        for (let i = 0; i < data.length; i++) {
            let privacy = 'private';
            if (data[i].privacy == false) {
                privacy = 'public';
            } else {
                privacy = 'private';
            } if(data[i].creator == 'normalo' || data[i].privacy == false){
              getCard("all_cards", data[i].name, data[i].surname, data[i].street, data[i].plz, data[i].city, data[i].country, privacy, data[i].creator, data[i].id);
            }
        }
    });
  }
}



