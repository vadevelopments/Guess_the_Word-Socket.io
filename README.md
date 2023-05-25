# Guess_the_Word-Socket.io

This project is a real-time multiplayer game called "Guess the Word" implemented using Node.js, Express.js, and Socket.IO. The project consists of a server-side script (server.js), a client-side script (client.js), and an HTML template file (index.ejs).

The server-side script sets up an Express.js server and creates a Socket.IO instance. It handles client connections, receives and broadcasts messages, and keeps track of the chat history. The server emits a greeting message to the connected client upon successful connection. When a client submits their username, the server emits the chat history and notifies other clients about the user joining. The server also checks if a chat message matches a specific word ("javascript") and announces the winner if a match is found. If a client disconnects, the server emits the chat history and notifies other clients about the user leaving.

The client-side script is responsible for interacting with the server and updating the UI. It connects to the Socket.IO server, prompts the user to enter their name, and submits the username to the server. The client listens for various events from the server, such as new chat messages, user joining or leaving notifications, chat history updates, and game over announcements. When the user submits a chat message, it is sent to the server. The client updates the UI to display the received messages, including special styling for the winning message.

The HTML template (index.ejs) provides the structure for the web page. It includes a chat box, an input form for sending messages, and placeholders for displaying the word to be guessed and the chat history. It also loads the Socket.IO library and the client-side script.

Overall, this project enables multiple users to join a real-time chat and play a game where they have to guess a specific word ("javascript"). The server manages the game logic and chat history, while the client handles user interactions and updates the UI accordingly.
