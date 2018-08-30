# Pitch Black

### About Pitch Black
Pitch Black is a text-based adventure game with an emphasis on audio playback and atmosphere. Pitch Black is incomplete. The game was built as an exercise in writing OOP in JavaScript. I intend to add to the game over time.

### Motivations Behind the Project
This project is designed to be a reimagining of the classic text-based adventure game type. Typically text-adventure games rely solely on text feedback to guide the player. In Pitch Black, the intention is to use audio as a source of feedback to the player. This idea will be developed more over time. 

### Project Stack Overview
This project is built using HTML5, CSS, and JavaScript (jQuery, Howler JS). The code is tested using unit testing.

### Live Version

Live version: https://johnpooch.github.io/audiobasedadventure/

### Design
The design is deliberately simplistic. The lack of instructions encourages players to experiment with different commands. While this design approach would not suit other applications, the enjoyment of playing a TBA often comes from the cryptic nature of the game. Traditionally, TBAs have minimal instructions and players are expected to work out how the system works.

Visually the design is meant to evoke a sense of mystery and atmosphere.

### Features

* Multiple commands: 'go', 'take', 'use', 'examine', 'inventory'
* User input is parsed so that commands like 'pick up the shovel' and 'take shovel' both result in the same outcome.
* Audio feedback occurs when players give valid commands.

### Testing

Manual testing was done to ensure:
* The game played as intended
* Parsing worked as expected

### Issues

##### Short length
The game is very short and features very little in terms of actual game play. Building the engine for the game took a long time. The code is scalable so it will be possible to extend the game easily.

##### Audio game mechanic
The initial idea for the game was to use audio playback as a source of feedback for the player. This hasn't been implemented yet. A system has been built which allows audio sources to have a distance from the player and a directionality. This could be used to guide players in specific directions or in other game contexts.

##### Procedural code
The source code for this project represents a hybrid between procedural coding and OOP. Items and rooms are objects but verbs and commands are not. The code ewould be more scalable and robust if more OOP coding was used.

## Deployment
The site is hosted on github pages. To run this site locally, in your terminal enter: git clone https://github.com/johnpooch/audiobasedadventure

### Acknowledgements
The design of the game borrows from Ron Schnell's 'Dunnet'

## Built With

* [Howler JS](https://howlerjs.com/) - JS audio library.
