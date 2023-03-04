# Tide-a-thon
Codebase for proposed idea

###################### Installation ####################
1. Node Js (to run javscript outside browser) from official website | Verify by typing "**node**" in terminal >> Node REPL Terminal opens up
2. Any Code Editor (VS Code)

###################### Install Dependencies ############
1. Create Mongo Atlas Account, get **DB_URL**
2. Save the above variables path in .env file in parent directory

Navigate into project parent directory 
```
npm install
nodemon index.js
```

Navigate into mlserver directory and start ML Model API
```
cd ./mlserver
python app.py
```