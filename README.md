# Secret Family Recipes Cookbook - API

## Auth Endpoint

####Request

_Post_ /auth/register

_Request_

```
{
    firstName
    lastName
    password
    confirmPassword
}
```

_Response_

```
{    
    status: 201
    message: "your account has been created successfully"
    user: {
        firstName
        lastName
    }
}



```

_Post_ /auth/login

_Request_
```
{
    username/email
    password
}
```
_Response_

```
{
    status: 200
    message: "login successfull"
    user: {
        firstName
        lastName
    }
    token
}
```

*Get* api/recipes
 user has to be logged in with a valid token to access this endpoint. 

```
*Request*
 request is made to get /api/recipes

 *response*
 ``` An array containg all recipes in the database ```

 *Put* api/recipes/:id
 user has to be logged in with a valid token to access this endpoint. 

```
*Request*
 request is made to post /api/recipes/:id

 *response*
 ``` An array containg all recipes in the database ```

 