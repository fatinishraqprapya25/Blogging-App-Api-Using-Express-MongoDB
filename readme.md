# 📝 Blogging Website

A simple and usefull blogging platform that allows users to **create, read, update, and delete (CRUD)** blog posts. Only the admin can create blogs directly. But if a user create blogs, admin approval is needed to publish the blog. This project follows **modular and dry principles** built with **Express.js** and **MongoDB** (Mongoose). 

## 🚀 Features
- User Authentication (Login/Signup)
- Create, Read, Update, and Delete Blogs
- Admin Approval System for Blogs
- Responsive API with error handling
- Modular Code Architecture (Scalable and Maintainable)

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)
- **API Testing:** Postman

---

## 📂 Project Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/blogging-website.git
   cd blogging-website

### ⚙️ Environment Setup (.env File)
Create a .env file in the root directory to store your environment variables. This is must to run the entire application.
### Example `.env` File:

```bash
PORT=5000
DATABASE_URL=<mongodb database string>
JWT_SECRET=your_jwt_secret_key
DEFAULT_ADMIN=default admin
BCRYPT_CIRCLE_COUNT=hashing password circle count in NUMBER
```


# 🚀API Endpoints
## Base Url: https://yourdomain.com/api/v1

## 1. Register a User
  **Url**: `Base Url/user`
  **Method**: `POST`
 
In the Request Body you have to provide some user informations to register a user. A Demo Information is given below.

--Request Body: ```json 
{
    "firstName": "john",
    "lastName": "doe",
    "password": "yourpassword",
    "email": "john.doe@gmail.com",
    "phone": "88017740445**",
    "profilePic": "file"
}
profilePic is optional. If you don't provide it pick a random one.

  - **Response: (success)**
  ```json
  {
    "success": true,
    "message": "User is Registered successfully!",
    "data": {
        "_id": "mongodb id",
        "firstName": "john",
        "lastName": "doe",
        "email": "johndoe@gmail.com",
        "phone": "01707248**"
    }
  }
```

  - **Response: (failure)**
  ```json
  {
    "success": false,
    "message": "Failed in creating users",
    "error": {}
  }
```

## 2. Login User
  **Url**: `Base Url/user/login`
  **Method**: `POST`
  
In the Request Body you have to provide some user email & password to be logged in. A Demo is given below.

Request Body: 
```json 
{
    "email": "john.doe@gmail.com",
    "password": "yourpassword"
}
```
 **Response: (Success)**
  ```json
  {
    "success": true,
    "message": "user logged in successfully!",
    "token": "it will provide a token"
  }
 ```
 
 If u provide wrong password, it will also respond. A demo response is given below.
  **Response: (failure)**
 ```json
  {
    "success": false,
    "message": "incorrect password",
  }
 ```
 ## 3. Update User Informations
  **Url**: `Base Url/user/`
  **Method**: `PATCH`

 To update user informations, you have to login. You have to provide a authorization token in the request header. Make sure that you follow the Bearer Standard. You have to provide the new informations in the request body. A demo is given below.
 
 **Token in the header be like:**
 ```bash
 authorization=Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 ```
 **Request body**
 ```json
 {
     "firstName": "Kuddus"
 }
 ```
 If the provided token is valid It will update the firstName to 'Kuddus' and respond the updated data.

  **Response: (Success)**
  
  ```json
  {
    "success": true,
    "message": "User updated successfully!",
    "data": {}
  }
 ```
 
 If the provided token is invalid, it will not update user informations.
 
   **Response: (failure)**
 ```json
  {
    "success": false,
    "message": "invalid token",
  }
 ```
 
  ## 4. Creating Blog From User
  **Url**: `Base Url/blogs/`
  **Method**: `POST`
  To create a new blog user must be logged in and have to provide token via request header. User must provide blog contents and **Image** as well in the request body.For example, a demo request is given below.
  
   **Token in the header be like:**
 ```bash
 authorization=Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 ```
  **Request body**
 ```json
 {
     "title": "JavaScript Closure",
     "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
     "blogImage": "file"
 }
 ```
 If you provide all the informations in the correct way, you will get a response similiar to the one below.
 
  **Response: (success)**
  ```json
 {
     "success": true,
     "message": "blog created successfully",
     "data": "blog Details"
 }
 ```
 
 