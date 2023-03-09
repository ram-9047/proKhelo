# proKhelo
Assignment for Backend Developer

### Getting Started
To get started with this API, you need to have Node.js and a SQL database installed on your machine.
To install all dependencies and dev-dependencies, follow the steps.

1- Open the app in IDE

2- Open terminal and run the following command
```terminal
npm install
```
3- Now install nodemon

```terminal
npm install nodemon --save-dev
```

4- Done, now run the start script

```terminal
npm start
```


### API Endpoints

1- Sign Up -> POST /signup 

Send `email` and `password` in the body

2- Sign In -> POST /signin

Send ``Email`` and ```Password``` in the body, if the operation is successfull then, a `token` is provided

3-Create Profile -> POST /create-profile

Send the `token` in headers and `name`,`age`,`jobProfile` in body.

4- Edit Profile -> POST /edit-profile

Send the `token` in headers and `name`,`age`,`jobProfile` in body
