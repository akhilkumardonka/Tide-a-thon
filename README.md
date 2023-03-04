# Tide-a-thon
Codebase for proposed idea

## Presentation
Link : [PPT](https://iith-my.sharepoint.com/:p:/g/personal/ee22mtech02002_iith_ac_in/ESXtHHoYtY9IvUkVnlmeN7QBLRf6XQNMQfxGOktBCS_OJA?e=xUEKJP)

## Video of Demo
Link : [Video](https://drive.google.com/drive/folders/1aUT9-6p6FvTJLYqSiA-OGj3TXy4QYBO4?usp=sharing)

###################### Installation ####################
1. Node Js (to run javscript outside browser) from official website | Verify by typing "**node**" in terminal >> Node REPL Terminal opens up
2. Any Code Editor (VS Code)

###################### Install Dependencies ############
1. Create Mongo Atlas Account, get **DB_URL**
2. Save the above variable path in .env file in parent directory
3. Also add a **SECRET** variable in .env file

Navigate into project parent directory and start express server
```
npm install
nodemon index.js
```

On another terminal, Navigate into mlserver directory and start ML Model API
```
cd ./mlserver
python app.py
```