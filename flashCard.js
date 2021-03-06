'use strict';

// requiring inquirer npm
var inquirer = require('inquirer');


// obtaining our basic card and cloze card constructors
var Basic = require('./BasicCard.js');
var Cloze = require('./ClozeCard.js');

// variable that will hold the Basic or Cloze constructor
var FlashCard;

// will be used to determine how many flash cards the user needs
var cardAmount = 0;

// keeps track of how many cards we have genorated
var counter = 0;

// push all the flash cards into this array
var FlashCardsList = [];



// function that starts our node flash card app
function makeFlashCards() {
    inquirer.prompt([{
        name: 'cardType',
        type: 'list',
        message: 'What type of flash card would you like to use?',
        choices: ['Basic', 'Cloze', 'Cancel']
    }]).then(function(user) {
    	
    	// set FlashCard var to either basic or cloze constructor
        if (user.cardType === 'Basic') {
            FlashCard = Basic;
            amountOfCards();
        } else if (user.cardType === 'Cloze') {
            FlashCard = Cloze;
            amountOfCards();
        } else {
            console.log('\n Come back when you need to create flash cards!!');
        }
    })
}


// determine how many cards the user wants
function amountOfCards() {
    inquirer.prompt([{
        name: 'cardAmount',
        message: '\n \n How many cards do you need to genorate?'
    }]).then(function(user) {
        // if the input is a number then we begin the process of genorating cards
        if (isNaN(user.cardAmount) === false) {
            cardAmount = user.cardAmount;
            console.log('\n \n Lets get started!');
            cardGenorator();
        } else {
            console.log('\n \n Lets get started!');
            amountOfCards()
        }
    })
}


// we determine how many times cardGenorator will be called
function cardGenorator() {
    if (counter < cardAmount) {
        inquirer.prompt([{
            name: 'cardQuestion',
            message: '\n \n What do you want on the front of the card'
        }, {
            name: 'cardAnswer',
            message: '\n \n What would you like the answer or part to be exlucded for this card to be?'
        }]).then(function(card) {
            var newCard = new FlashCard(card.cardQuestion, card.cardAnswer);
            // push new instance of the card into an array
            FlashCardsList.push(newCard);
            counter++;
            // call our function again until the amount of cards wanted is reacheds
            cardGenorator();
        });
    } else {
    	// counter will now be used to determine which questino we are on
    	// reset it to 0 since the first flash cards that were pushed to FlashCardsList array starting position is 0. 
        counter = 0;
        console.log('\n \n Here are your flash card!')
        practiceFlashCard();
    }
}


// allows the user to use the flash cards
function practiceFlashCard() {
    if (counter < FlashCardsList.length) {
        var currentQuestion = FlashCardsList[counter].question();
        inquirer.prompt([{
            name: 'question',
            message: currentQuestion
        }]).then(function(user) {
            if (user.question === FlashCardsList[counter].answer) {
                console.log('Correct! the right answer was ' + "' " + FlashCardsList[counter].answer + " '");
                counter++;
                practiceFlashCard();
            } else {
                console.log('Sorry, the correct answer was ' +" ' "+ FlashCardsList[counter].answer + " '");
                counter++;
                practiceFlashCard();
            }
        })
    } else {
    	// user decides if they want to reuse the flash cards, 
    	// create new flash cards, or finish using the program
        inquirer.prompt([{
            name: 'nextStep',
            message: '\n \n What would you like to do next?',
            type: 'list',
            choices: ['Make new flash cards', 'reuse these flash cards', 'I am finished, thank you']
        }]).then(function(user) {
            counter = 0;
            if (user.nextStep === 'Make new flash cards') {
                FlashCardsList = [];
                makeFlashCards()
            }
            if (user.nextStep === 'reuse these flash cards') {
                practiceFlashCard();
            } else {
                console.log('Thank you for using me!');
            }
        })
    }
}

// starts the program
makeFlashCards();
