# Mastermind

Welcome to Mastermind:  A web version of the board game of the same name.

I have created this project with Angular, splitting the app into 5 components: `app`, `container`, `header`, `board`, and `board-row`.  Separated business logic from `container` and `board-row` into their own services.  Also created a model for a unique object for typing purposes.

Most of the heavy logic takes place in the `board-row` service.

## Steps to run the project

1. Clone this repo to your local machine
2. `cd` into the root folder of this project. `cd mastermind/`
3. Run `npm install` to get all of the necessary dependencies for the project
4. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`, or simply run `ng serve --open` to do both things at once. The application will automatically reload if you change any of the source files.

## Rules of the game

The app, on page load, will generate a random set of 4 numbers.  Each of the 4 numbers can be any numbers between 0 and 7.  The object of the game is to guess the correct set of numbers in the correct order the app has them in.  So, if the set of numbers the app has chosen is "0, 2, 4, 6", you have to guess those exact same numbers in that exact same order.

You will be given 10 chances to do this.  Every time you submit a guess, you will be given feedback on each of the numbers you guessed.  **CNP** - stands for correct number in the correct position, **CN** - stands for correct number, but not in the correct position, and **I** - stands for incorrect, meaning the number does not exist in the set.  

Note, however, that the feedback will be in an order that does not necessarily correspond to the order of the numbers you guessed.

* For example, if the set of numbers the app generated is "0, 2, 4, 6" and you guessed "2, 0, 4, 6", your feedback will display as "CNP, CNP, CN, CN".  The feedback will always be in the order of: CNPs first, CNs second, Is third

Once you win or lose, an alert will pop up, notifying you.  After that, all of the user inputs will be disabled, so you can scroll to the bottom of the page and click the "Reset Game" button to play another game.
