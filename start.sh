#!/bin/bash

echo 'start server...'
cd server/
nodemon app.js --ignore static/ &

echo 'start client...'
cd ../client/
node server.js

