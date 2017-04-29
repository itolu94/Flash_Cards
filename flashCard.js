'use strict';

// requiring inquirer npm
var inquirer = require('inquirer');


// obtaining our basic card and cloze card constructors
var Basic = require('./BasicCard.js');
var Cloze = require('./ClozeCard.js');

var flashCard;
var cardAmount = 0;

// keeps track of how many cards we have genorated
var counter = 0;

// push all the flash cards into this array
var flashCardsList = [];




function makeFlashCards() {
    inquirer.prompt([{
        name: 'cardType',
        type: 'list',
        message: 'What type of flash card would you like to use?',
        choices: ['Basic', 'Cloze', 'cancel']
    }]).then(function(user) {
        if (user.cardType === 'Basic') {
            flashCard = Basic;
            amountOfCards();
        } else if (user.cardType === 'Cloze') {
            flashCard = Cloze;
            amountOfCards();
        } else {
            console.log('Come back when you need to create flash cards!!');
        }
    })
}


// determine how many cards the user wants
function amountOfCards() {
    inquirer.prompt([{
        name: 'cardAmount',
        message: 'How many cards do you need to genorate?'
    }]).then(function(user) {
        if (isNaN(user.cardAmount) === false) {
            // we determine how many times cardGenorator will be called
            // each time it is called a new question is pushed to question array
            cardAmount = user.cardAmount;
            console.log('Lets get started!');
            cardGenorator();
        } else {
            amountOfCards()
        }
    })
}



function cardGenorator() {
    if (counter < cardAmount) {
        inquirer.prompt([{
            name: 'cardQuestion',
            message: 'What do you want on the front of the card'
        }, {
            name: 'cardAnswer',
            message: 'What would you like the answer or part to be exlucded for this card to be?'
        }]).then(function(card) {
            var newCard = new flashCard(card.cardQuestion, card.cardAnswer);
            flashCardsList.push(newCard);
            counter++;
            // console.log(typeof(flashCardsList[0].question.toString()));
            cardGenorator();
        });
    } else {
        counter = 0;
        practiceFlashCard();
    }
}


function practiceFlashCard() {
    if (counter < flashCardsList.length) {
        console.log(counter);
        var currentQuestion = flashCardsList[counter].question();
        console.log(currentQuestion);
        // var currentQuestion = currentQuestion.toString();
        var testing = 'whats up'
        console.log(typeof(currentQuestion));
        inquirer.prompt([{
            name: 'question',
            message: currentQuestion
        }]).then(function(user) {
            if (user.question === flashCardsList[counter].answer) {
                console.log('Correct!');
                counter++;
                practiceFlashCard();
            } else {
                console.log('Sorry, the correct answer was ' + flashCardsList[counter].answer);
                counter++;
                practiceFlashCard();
            }
        })
    } else {
        inquirer.prompt([{
            name: 'nextStep',
            message: 'What would you like to do next?',
            type: 'list',
            choices: ['Make new flash cards', 'reuse these flash cards', 'I am finished, thank you']
        }]).then(function(user) {
            counter = 0;
            if (user.nextStep === 'Make new flash cards') {
                flashCardsList = [];
                makeFlashCards()
            }
            if (user.nextStep === 'reuse these flash cards') {
            	practiceFlashCard();
            }
            else{
            	console.log('Thank you for using me!');
            }
        })
    }
}


makeFlashCards();