var rollD3 = function (){
    var die3 = document.getElementById("d3");
    var status = document.getElementById("status"); 
    var d3 = Math.floor(Math.random() * 3) + 1;
    die3.innerHTML = d3;
    status.innerHTML = "You rolled "+diceTotal+".";
}

var rollD6 = function (){
    var die6= document.getElementById("d6");
    var status = document.getElementById("status"); 
    var d6 = Math.floor(Math.random() * 6) + 1;
    die6.innerHTML = d6;
    status.innerHTML = "You rolled "+diceTotal+".";
}
var rollD12 = function (){
    var die12= document.getElementById("d12");
    var status = document.getElementById("status"); 
    var d12 = Math.floor(Math.random() * 12) + 1;
    die12.innerHTML = d12;
    status.innerHTML = "You rolled "+diceTotal+".";
}
var rollD20 = function () {
    var die20 = document.getElementById("d20");
    var status = document.getElementById("status");
    var d20 = Math.floor(Math.random() * 20) + 1;
    die20.innerHTML = d20;
    status.innerHTML = "You rolled " + diceTotal + ".";
    if (d20 === 20) {
        status.innerHTML += "You rolled a natural 20";
    }
}
