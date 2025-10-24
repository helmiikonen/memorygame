# Memory game

A simple React JS application created by me in November 2024.

### How to run the application locally

- Make sure you have Git and Node installed
- On your command line terminal, navigate to the directory where you want to clone the project
- Clone the project using the following command:
```
git clone git@github.com:helmiikonen/memorygame.git
```
- Navigate to the root directory of the project and type the following commands:
```
npm install
npm run dev
```
- Open your browser at ```localhost:5173``` (the app will start on port 5173 by default, but check your terminal to make sure)

### How to play the game

- The game consists of 16 "cards", containing 8 "pairs". Each time a new game starts, these cards are shuffled in a random order. 
- To play, first click "Start game". 
- Then try to find all pairs as quick as possible. Click two cards and see if they are a pair or not. It is a pair if the two cards share the same color and letter.
- If a pair is found, these cards will stay visible. If not, the cards are hidden again. Continue by clicking another two cards.
- When all pairs have been found, the game ends. You will see how much time and how many attempts you used (1 attempt = opening 2 cards; minimum amount of attempts is 8). The game keeps a record of the best time and least attempts used while the game is open in the browser.