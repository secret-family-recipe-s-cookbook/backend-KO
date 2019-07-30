# Secret Family Recipes Cookbook

### PITCH

Anyone can go out and buy a cookbook these days, but I want a place to store all my secret family recipes, handed down from generation to generation.

API request url : https://lambda-cook-book.herokuapp.com/ 

### API Specifications. Request And Response Examples

#### Auth User Registration

_Post_ api/auth/register

_Request_ body

```
    {
        "firstname": "jacksin",
        "lastname": "ogbonna",
        "username": "laboo",
        "email": "lackson@yahoo.com",
        "password": "12345",
        "confirmPassword": "12345"
    }
```

_Response_ body

This response is sent if request is successful

```
    {
        "message": "user created successfully",
        "user": {
            "id": 6,
            "firstname": "jacksin",
            "lastname": "ogbonna",
            "username": "laboo",
            "email": "lackson@yahoo.com"
        }
    }
```

If user data input is not complete or does not pass the validations, an array of error messages is returned.
username and email has to be unique.

_Request_ body

```
    {
        "firstname": "",
        "lastname": "",
        "username": "",
        "email": "",
        "password": "5",
        "confirmPassword": ""
    }
```

_Response_ body

```
    {
        "status": 400,
        "error": [
            "firstname must contain only alphabets",
            "firstname must have atleast 2 characters",
            "firstname cannot contain whitespaces",
            "lastname must contain only alphabets",
            "lastname must have atleast 2 characters",
            "lastname cannot contain whitespaces",
            "lastname must have atleast 2 characters",
            "lastname cannot contain whitespaces",
            "Please input a valid email address",
            "password must have atleast 5 characters",
            "password cannot contain whitespaces",
            "Password confirmation does not match password"
            ]
    }
```

#### Auth User Login

_Post_ api/auth/login

The usernameoremail object key can take either the username or email as an input.

_Request_ body

```
    {
        "usernameoremail": "laboo",
        "password": "12345"
    }
```

_Response_ body

This response is sent if request is successful

```
    {
        "message": "Welcome laboo",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJsYWJvbyIsImVtYWlsIjoibGFja3NvbkB5YWhvby5jb20iLCJpYXQiOjE1NjQ0ODQzNjMsImV4cCI6MTU2NDU3MDc2M30.gVRACnwYjHAL_ke3gBoIXkzjAem2zNIICPNaAJNsWWI"
    }
```

If the request is not successful a _400_ status and error message is returned

```
    {
        "message": "Invalid details, please input a username or email"
    }
```
