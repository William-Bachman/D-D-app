//noSql database URL
var firebaseURL = 'https://dandd-app.firebaseio.com/'

//character constructor (1st STEP)
var player = function (name, race, level, experience, alignment, gamer) {
    this.name = name;
    this.race = race;
    this.level = level;
    this.experience = experience;
    this.alignment = alignment;
    this.gamer = gamer;
    
}
//warrior array which stores info from the constructor
var warrior = [];

// Remember to use lower case html not HTML, this displays the warriors on the page
var addWarrior = function () {
    var name = $('#inputName').val();
    var race = $('#inputRace').val();
    var level = $('#inputLevel').val();
    var experience = $('#inputExperience').val();
    var alignment = $('#inputAlignment').val();
    var gamer = $('#inputPlayerID').val();
    var myPlayer = new player(name, race, level, experience, alignment, gamer);

    postWarrior(myPlayer);
    printWarriors();

    $('#inputName').val('');
    $('#inputRace').val('');
    $('#inputLevel').val('');
    $('#inputExperience').val('');
    $('#inputAlignment').val('');
    $('#inputPlayerID').val('');
 
}
//prints objects to the innerhtml
var printWarriors = function () {
    $('#DisplayWarriors').html = ('');
    var elemString = '';
    for (var i = 0; i < warrior.length; i++) {
        elemString += '<tr>'
        elemString += '<td>' + warrior[i].name + '</td>'
        elemString += '<td>' + warrior[i].race + '</td>'
        elemString += '<td>' + warrior[i].level + '</td>'
        elemString += '<td>' + warrior[i].experience + '</td>'
        elemString += '<td>' + warrior[i].alignment + '</td>'
        elemString += '<td>' + warrior[i].gamer + '</td>'
        elemString += '<td><button class="btn btn-danger" onclick="editWarrior(' + i + ')">Level Up</button><button class="btn btn-danger" onclick="deleteWarrior('+i+')">Delete</button></td>'
        elemString += '</tr>'
    }
    
    $('#DisplayWarriors').html(elemString);
}


// sends the item to the NoSQL database
var postWarrior = function (addWarrior) {
    var request = new XMLHttpRequest();
    request.open('POST', firebaseURL + '.json', true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var response = JSON.parse(this.response);
            addWarrior.key = response.name
            warrior.push(addWarrior);
            printWarriors();
        }
        else{
            console.error(this.response);
        }
    }
    request.send(JSON.stringify(addWarrior));
   
}
// This gets the latest information
var getWarriors = function () {
    var request = new XMLHttpRequest();
    request.open('GET', firebaseURL + '.json', true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var response = JSON.parse(this.response);
            for (var propName in response) {
                response[propName].key = propName;
                warrior.push(response[propName]);
            }
            printWarriors();
        }
        else {
            console.log(this.response);
        }
    }
    request.send();
}
// This puts the edited information on the noSQL server
var putWarrior = function (data, i) {
    var key = warrior[i].key;
    var request = new XMLHttpRequest();
    request.open('PUT', firebaseURL + key + '/.json', true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            data.key = warrior[i].key;
            warrior.splice(i, 1, data);
            printWarriors();
        }
        else {
            console.error(this.response);
        }
    }
    request.send(JSON.stringify(data));
}
// this is the edit function for each element on the DIV
var editWarrior = function (i) {
    document.getElementById('editName').value = warrior[i].name;
    $('#editRace').val(warrior[i].race);
    $('#editExperience').val(warrior[i].experience);
    $('#editLevel').val(warrior[i].level);
    $('#editAligmnet').val(warrior[i].alignment);
    $('#editPlayerID').val(warrior[i].gamer);
    $('#SaveEditButton').html('<button type="button" class="btn btn-primary" data-dismiss="modal" onclick="saveEdit(' + i + ');">Save changes</button>')
    $('#myModal').modal('toggle');
}

// this is the function to save the edit to the div getting information from the Modal
var saveEdit = function (i) {
    var name = $('#editName').val();
    var race = $('#editRace').val();
    var experience = $('#editExperience').val();
    var level = $('#editLevel').val();
    var alignment = $('#editAlignment').val();
    var gamer = $('#editPlayerID').val();
    var newPlayer = new player(name, race, level, experience, alignment, gamer);
    putWarrior(newPlayer, i);
}
//This deletes the information from our noSQL server
var deleteWarrior = function (i) {
    var request = new XMLHttpRequest();
    request.open('DELETE', firebaseURL + warrior[i].key + '/.json', true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            warrior.splice(i, 1);
            printWarriors();
        }
    }
    request.send();
}

// this is calling the get function
getWarriors();