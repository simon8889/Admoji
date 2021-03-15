# Admoji 🤔
Admoji is a web app that allows you to create, solve and share emoji puzzles, it is built with express and react, the data is stored in a free mongoDB cluster. the Admoji react client  is deployed in netlify and the Admoji api backend is deployed in heroku.
Go to get fun: https://admoji.netlify.app/
### Installation
you need to have node js installed and a mongo database.
```sh
$ git clone https://github.com/simon8889/Admoji
$ cd Admoji
```
### .env variables setup:
For client side: ( Admoji/client/.env )
```sh
REACT_APP_API_DIRECTION= api direction (connect client to api)
REACT_APP_CLIENT_DIRECTION= the domain name of the client (get the share links)
```
For server side: ( Admoji/sever/.env )
```sh
PORT = custom port (to run api, it's optional)
DB_URL = mongoDB direction (connect api whit database)
```
### Run api:
For run the admoji api:
```sh
$ cd server
$ npm install
$ npm start
```
### Run client:
```sh
$ cd client
$ npm install
$ npm start
```
### Contributing
---
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

### License
----
MIT