# Pitch Black

### About Pitch Black
Pitch Black is a text-based adventure game with an emphasis on audio playback and atmosphere. Pitch Black is incomplete. The game was built as an exercise in writing OOP in JavaScript. I intend to add to the game over time.

### Motivations Behind the Project
This project is designed to be a reimagining of the classic text-adventure game type. Typically text-adventure games rely solely on text feedback to guide the player. In Pitch Black, the intention is to use audio as a source of feedback to the player. This idea will be developed more as the game is developed. 

### Project Stack Overview
This project is built using HTML5, CSS, and JavaScript (jQuery, Howler JS). The code is tested using unit testing.

### Live Version

Live version: https://e-commerce-johnpooch.herokuapp.com/

### UX Design
The UX design is deliberately simplistic. The lack of instructions encourages players to experiment with different commands. While this design approach would not suit other applications, the enjoyment of playing a TBA often comes from the cryptic nature of the game. Traditionally, TBAs have minimal instructions and players are expected to work out how the system works.

Visually the design is meant to evoke a sense of mystery and unease.

### Features

* Multiple commands: 'go', 'take', 'use', 'examine', 'inventory'
* User input is parsed so that commands like 'pickup the shovel' and 'take shovel' both result in the same outcome.
* Audio feedback occurs when certain actions are carried out.

### Testing

Manual testing was done to ensure:
* The game plays as intended
* Parsing worked as expected

## Deployment
The site is hosted on github pages.  

### Run locally
To run this site locally, in your terminal enter: git clone https://github.com/mparkcode/chicken_cha_cha

### Acknowledgements
The desing of the game borrows from Ron Schnell's 'Dunnet'

## Built With

* [Howler JS](https://howlerjs.com/) - JS audio library.
