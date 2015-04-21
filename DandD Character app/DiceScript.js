var rollD3 = function (){
    var die3 = document.getElementById('d3');
    var status = document.getElementById('StatusD3'); 
    var d3 = Math.floor(Math.random() * 3) + 1;
    die3.innerHTML = d3;
    StatusD3.innerHTML = "You rolled "+ d3 +".";
}

var rollD6 = function (){
    var die6 = document.getElementById('d6');
    var status = document.getElementById('StatusD6'); 
    var d6 = Math.floor(Math.random() * 6) + 1;
    die6.innerHTML = d6;
    StatusD6.innerHTML = "You rolled "+ d6 +".";
}
var rollD12 = function (){
    var die12= document.getElementById('d12');
    var status = document.getElementById('StatusD12'); 
    var d12 = Math.floor(Math.random() * 12) + 1;
    die12.innerHTML = d12;
    StatusD12.innerHTML = "You rolled "+ d12 +".";
}
var rollD20 = function () {
    var die20 = document.getElementById('d20');
    var status = document.getElementById('StatusD20');
    var d20 = Math.floor(Math.random() * 20) + 1;
    die20.innerHTML =  d20;
    status.innerHTML = "You rolled " + d20 + ".";
    if (d20 > 19) {
        Status.innerHTML = "You rolled a natural 20";
    }
}
