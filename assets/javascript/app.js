var wins = 0;
var losses = 0;
var counter = 0;
var winsText = document.getElementById("wins-text");
var lossesText = document.getElementById("losses-text");
var targetAnswer = "";



if (answer === targetAnswer) {
    wins++;
}
else if (answer != targetAnswer) {
    losses++;
}