# Electron-Webpack
This package is a basic integration of electron into the webpack framework.
## Features
#### included
+ development and procduction mode
+ webserver integration when in development mode with live reload
#### still to come
+ some kind of css framework (styling)
+ code linting somewhat (linting)
+ some kind of testing environmnet (testing)
+ packaging of the electron app (packaging)

## Getting started
+ Make sure you have nodeJs installed on your machine
+ Download the repository an store it in a local folder 
+ Open the folder in the command line 
+ Run following command
``` 
// Installs all npm dependencies
npm install
```
+ Installation takes a few moments, wait until it's done
+ A new folder "node_modules" should have been added automatically

### Development mode

+ Run following command to start development mode 
```
npm run dev
```
+ After a little while electron window should come up
  
#### Changing files
+ Change any file in the ./app folder
+ Framework will notice changes and update running electron app

#### Adding new JS or SCSS files
+ Every .JS oder .SCSS file must be added to the ./app folder
+ After adding it must be registered in the 'rendererProcess.js' file with an import statement
```
// Adding example file ./app/newFile.js 
// Following line must be added to 'rendererProcess.js'

import './app/newFile.js'
```
#### Changing HTML content
+ To change the HTML part of the app just change the './app/template.html' and save the changes
+ Framework will notice changes and will adapt the app in development mode or adapt the outputfiles in production mode

### Production mode
+ Run following command to start production mode 
```
npm run prod
```
+ After a little while electron window should come up
+ Production mode is slightly different to development mode
  + whole package will be distributed to the './dist' folder
  + No live reload, because electron only accesses static files form './dist' folder

#### Changing files
+ Make sure electron app is not running
+ Change any file in the ./app folder
+ Run production mode again
