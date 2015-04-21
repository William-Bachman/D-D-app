var firebaseURL = 'https://dandd-app.firebaseio.com/'
var player = function (name, race, level, experience, alignment ,gamer){
    this.name = name;
    this.race = race;
    this.level = level;
    this.experience = experience;
    this.alignment = alignment;
    this.gamer = gamer;
    
}
var warrior = [];

// Remember to use lower case html not HTML
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
        elemString += '<td>' + warrior[i].playerID + '</td>'
        elemString += '<td><button class="btn btn-warning" onclick="editWarrior(' + i + ')">Level Up</button><button class="btn btn-danger" onclick="deleteWarrior('+i+')">Delete</button></td>'
        elemString += '</tr>'
    }
    $('#DisplayWarriors').html(elemString);
}


var postWarrior = function (data) {
    var request = new XMLHttpRequest();
    request.open('POST', firebaseURL + '.json', true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var response = JSON.parse(this.response);
            data.key = response.name
            warrior.push(data);
            printWarriors();
        }
        else{
            console.error(this.response);
        }
    }
    request.send(JSON.stringify(data));
   
}
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

var editWarrior = function (i) {
    document.getElementById('editName').value = warrior[i].name;
    $('#editExperience').val(warrior[i].experience);
    $('#editLevel').val(warrior[i].level);
    $('#SaveEditButton').html('<button type="button" class="btn btn-primary" data-dismiss="modal" onclick="saveEdit(' + i + ');">Save changes</button>')
    $('#myModal').modal('toggle');
}

var saveEdit = function (i) {
    var name = $('#editName').val();
    var experience = $('#editExperience').val();
    var level = $('#editlevel').val();
    var newPlayer = new player(name, experience, level);
    putContact(newContact, i);
}

var deleteWarrior = function (i) {
    var request = new XMLHttpRequest();
    request.open('DELETE', firebaseUrl + warrior[i].key + '/.json', true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            warrior.splice(i, 1);
            PrintWarriors();
        }
    }
    request.send();
}

getWarriors();