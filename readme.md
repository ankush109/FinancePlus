# Register page

![](https://github.com/ankush109/FinancePlus/blob/main/frontend/app/assets/register.png)

# Login page

![](https://github.com/ankush109/FinancePlus/blob/main/frontend/app/assets/login.png)

# Home page

![](https://github.com/ankush109/FinancePlus/blob/main/frontend/app/assets/home-page.png)

# Add User Page

![](https://github.com/ankush109/FinancePlus/blob/main/frontend/app/assets/add-user.png)

# Edit User Page

![](https://github.com/ankush109/FinancePlus/blob/main/frontend/app/assets/edit-user.png)

Note : I am not taking age in the registration form as we are asking for Date of Birth So it am calculating the age  and then sending the age to the backend ! 

Features :

1. Used ts in frontend and backend for ensuring type validation
2. Used prisma as a orm along with mongodb
3. Used zod for validation
4. CRUD operation
5. Used react-redux toolkit along with react query for state management
6. Used tailwind css

How to run locally :

Go to backend dir : check example env -> make a .env ( with the values from example ) -> npm i -> npx prisma generate -> npm run dev
Go to frontend dir : npm i -f -> npm run dev

How to run with docker :

```sh
docker-compose up
```
access the front via localhost:3000
register localhost:3000/register
login localhost:3000/login




backend endpoints

http://localhost:5000/v1/auth/register 
request body 
{
  "email": "kajol@gmail.com",
  "name": "megha2 Banerjee",
  "age": 30,
  "dob": "1994-05-15T00:00:00.000Z",
  "password": "kajol2@gmail.com",
  "gender": "Male",
  "about": "Software engineer with a passion for backend development.d"
}

response : 
{
    "success": true,
    "message": "User registered successfully!",
    "data": {
        "id": "67c8085d0ba3b8f481ed911c",
        "email": "kajol@gmail.com",
        "name": "megha2 Banerjee",
        "age": 30,
        "dob": "1994-05-15T00:00:00.000Z",
        "gender": "Male",
        "about": "Software engineer with a passion for backend development.d",
        "createdAt": "2025-03-05T08:16:29.863Z",
        "updatedAt": "2025-03-05T08:16:29.863Z"
    }
}


http://localhost:5000/v1/auth/login

request body 

{
    "email" :"kajol@gmail.com",
    "password": "kajol2@gmail.com"
}

response 

{
    "success": true,
    "message": "User logged in successfully!",
    "data": {
        "accessToken": "xxx"
    }
}

http://localhost:5000/v1/user/ID    PATCH
requst body
{
    "name":"souvik",
    "email":"a@gmail.com"
}


http://localhost:5000/v1/user/ID   GET
request response
{
    "success": true,
    "message": "User details fetched successfully!",
    "data": {
        "name": "souvik",
        "email": "a@gmail.com",
        "dob": "1994-05-15T00:00:00.000Z",
        "about": "Software engineer with a passion for backend development.d",
        "gender": "Male"
    }
}

http://localhost:5000/v1/user/ID DELETE

POSTMAN COLLECTION : https://drive.google.com/file/d/1X-X8mhMCsUzCzgBUNhWi9Wa3Uf5AGKRI/view?usp=sharing


