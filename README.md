# library-hackathon
1. Open command navigate to the directory library-hackathon
2. run npm install command on the terminal
3. run npm start command 
4. Server will be listening on port 5000

route for signup
http://localhost:5000/users/signup
response: {
  token: 'token'
}

route for signin
http://localhost:5000/users/singin
response: {
  token: 'token'
}
token will get stored on localStorage or cookies on browser

route for secretPage
http://localhost:5000/users/secret
response: {
  message: 'Authenticated User'
}


route for all users
http://localhost:5000/users/check
response: {
  users: [
    {
    }
  ]
}
