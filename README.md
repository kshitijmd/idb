# SWE-IDB


## Run backend as a python application
Set up PostgreSQL with a database named "playlistr" and set the password of the "postgres" user to "justiceleague"
```
python3 main.py
```
The backend will run on localhost:8000. Try http://localhost:8000/tracks


## Run frontend directly
The backend needs to be running first, see above.
```
npm install
npm run dev
```
Then, in a new tab
```
node server
```
Any code changes will recompile automatically. If you aren't developing, npm start will build and run the server. It requires the backend to be running on the machine as well, unless if you change the api_host in [musicApi.js](src/services/api/musicApi.js) to `api.hackapellas.me`. Then the server will use data from the deployed API.



## Run frontend as a container
First, reconfigure the frontend to use the deployed api at api.hackappellas.me (see above)
```
docker build -t frontend .
docker run --rm -p 9000:9000 frontend
```
Navigate to http://localhost:9000


## Contributing

Configure your editor for the following tools:

* ESLint: Catches mistakes such as using undefined variables (usually due to a mispelling). [Sublime plugin](https://github.com/roadhump/SublimeLinter-eslint)

* Prettier: Auto-formats any JS code in a consistent style. [Sublime plugin](https://github.com/jonlabelle/SublimeJsPrettier)
