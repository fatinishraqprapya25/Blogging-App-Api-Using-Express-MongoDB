# 📝 Blogging Website

A simple and usefull blogging platform that allows users to **create, read, update, and delete (CRUD)** blog posts. Only the admin can create blogs directly. But if a user create blogs, admin approval is needed to publish the blog. This project follows **modular and dry principles** built with **Express.js** and **MongoDB** (Mongoose). 

## 🚀 Features
- User Authentication (Login/Signup)
- Code Verification
- Password Forget & Reset
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
   git clone https://github.com/fatinishraqprapya25/Blogging-App-Api-Using-Express-MongoDB
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
## Base Url: not published yet

## 1. Register a User
  **Url**: `Base Url/auth/register`
  **Method**: `POST`
 
In the Request Body you have to provide some user informations to register a user. A Demo Information is given below.

--Request Body: 
```json 
{
    "firstName": "john",
    "lastName": "doe",
    "password": "yourpassword",
    "email": "john.doe@gmail.com",
    "phone": "88017740445**",
    "profilePic": "file"
}
```
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

## 2. Verify a User
  **Url**: `Base Url/auth/verify`
  **Method**: `POST`
 
After registration, a six digit code will be sent to your email address. In the request body, you have to provide the email adress and the code sent to your email.

--Request Body: 
```json 
{
    "email": "john.doe@gmail.com",
    "code": "886565"
}
```

  - **Response: (success)**
  ```json
  {
    "success": true,
    "message": "User is Verified successfully!",
    "data": {
        <!-- user informations -->
    }
  }
```

  - **Response: (failure)**
  ```json
  {
    "success": false,
    "message": "invalid verification code!",
    "error": {}
  }
```


## 3. Login User
  **Url**: `Base Url/auth/login`
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

## 4. Forget Password
  **Url**: `Base Url/auth/sendVc`
  **Method**: `POST`
  
In the request body, you have to provide your email address. Then, we will send you a verification code. 

Request Body: 
```json 
{
    "email": "john.doe@gmail.com",
}
```
 
 **Response: (Success)**
  ```json
  {
    "success": true,
    "message": "We sent a verification code to your email, please verify it to reset password!",
  }
 ```
 
 After that, verify the password in 
   **Url**: `Base Url/auth/resetPass`
   **Method**: `POST`
In the request body, provide your email address & the verification code & new password.

Request Body: 
```json 
{
    "email": "john.doe@gmail.com",
    "code": "657898",
    "password": "new_password",
}
```
 

  **Response: (failure)**
 ```json
  {
    "success": false,
    "message": "incorrect password",
  }
 ```

 ## 5. Update User Informations
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
 
  ## 6. Creating Blog From User
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
 
   ## 7. Finding Blog With Id
  **Url**: `Base Url/blogs/:id`
  **Method**: `GET`
  Pass authorization token in the request header & id in the request parameter to get specific blog.A demo response is given below.
    **Response: (success)**
  ```json
 {
     "success": true,
     "message": "blog created successfully",
     "data": {
         "writter": "mongoDB Id",
         "title": "JavaScript Asynchronous Behavior",
         "description": "the description here",
         "isApproved": true,
         "blogImage": "img" // img path
     }
 }
 ```
   ## 8. Searching Blogs / Fetching Blogs
  **Url**: `Base Url/blogs/`
  **Method**: `GET`
  First, you have to provide authorization token in the request header. Just after doing that if you hit the api, you will get response. But there are some other query params. there is a specific query params called **query** which handles the search functionality. There is also some **limit**, **page** & **sortBy** property in the request query object. 
 
**Response: (success)**
  ```json
 {
     "success": true,
     "message": "blog created successfully",
     "data": [{
         "writter": "mongoDB Id",
         "title": "JavaScript Asynchronous Behavior",
         "description": "the description here",
         "isApproved": true,
         "blogImage": "img" // img path
     },{
         "writter": "mongoDB Id",
         "title": "JavaScript Asynchronous Behavior",
         "description": "the description here",
         "isApproved": true,
         "blogImage": "img" // img path
     }]
 }
 ```
 
   ## 9. Deleting Blog
  **Url**: `Base Url/blogs/:id`
  **Method**: `DELETE`
  First, you have to provide authorization token in the request header. Only the post author and the admin can delete the blog.
  **Response: (success)**
  ```json
 {
     "success": true,
     "message": "blog deleted successfully!",
     "data": {
         "writter": "mongoDB Id",
         "title": "JavaScript Asynchronous Behavior",
         "description": "the description here",
         "isApproved": true,
         "blogImage": "img"
     }
 }
 ```

 ## 10. Like on Blog
  **Url**: `Base Url/blogs/like/:blogId`
  **Method**: `POST`
  First, you have to provide authorization token in the request header. if you are authorized the like will be done. After Liking in the post, if you again hit in the same url, it will remove you like.
  **Response: (success)**
  ```json
 {
     "success": true,
     "message": "action successful!",
     "data": {
     }
 }
 ```

 ## 11. Get all likes
  **Url**: `Base Url/blogs/like/:blogId`
  **Method**: `GET`
  After hitting in the url with GET method, you will get who has already liked in the blog.
  **Response: (success)**
  ```json
 {
     "success": true,
     "message": "likes fetched successfully!",
     "data": {
     }
 }
 ```

  ## 12. Create Comment on Blog
  **Url**: `Base Url/comments`
  **Method**: `POST`
 Provide authorization token in the request header & send request simliar to the example given below.
   **Request Body**
  ```json
 {
     "blogId": "mongoDB_ID",
     "text": "your comment here...",
 }
 ```
   **Response: (success)**
  ```json
 {
     "success": true,
     "message": "comment created successfully",
     "data": {} //new comment here
 }
 ```
 
## 13. Read Comments
  **Url**: `Base Url/comments/:postId`
  **Method**: `GET`
 Provide authorization token in the request header & **blogId** as post id in the request params.
   **Response: (success)**
  ```json
 {
     "success": true,
     "message": "comments retrieved successfully",
     "data": [] //array of comments here
 }
 ```
 
 ## 14. Update Comment
  **Url**: `Base Url/comments/:commentId`
  **Method**: `PATCH`
  Only the comment creator can update the comment. Pass the token as authorization in the request header.
     **Request body**
  ```json
 {
     "text": "new comment",
 }
 ```
 
    **Response: (success)**
  ```json
 {
     "success": true,
     "message": "comment updated successfully",
     "data": {} //updated comment
 }
 ```
  ## 15. Delete Comment
  **Url**: `Base Url/comments/:commentId`
  **Method**: `DELETE`
  Only admin & comment creator can delete comments.
  
**Response: (success)**
  ```json
 {
     "success": true,
     "message": "comment deleted successfully",
     "data": {} //deleted comment
 }
 ```
 
   ## 16. Create Reply Comment
  **Url**: `Base Url/comments/reply/:commentId`
  **Method**: `POST`
  Any logged in user can reply comments.
 **Request body**
  ```json
 {
     "text": "new reply",
 }
 ```
**Response: (success)**
  ```json
 {
     "success": true,
     "message": "reply sent",
     "data": {} //all the replies
 }
 ```
 
   ## 17. Delete Reply
  **Url**: `Base Url/comments/reply/:commentId/:replyId`
  **Method**: `POST`
  Only admin & reply creator can delete replies.
 **Response: (success)**
  ```json
 {
     "success": true,
     "message": "reply deleted successfully!",
     "data": {} // all the comments
 }
 ```
 
   ## 18. Update Reply
  **Url**: `Base Url/comments/reply/:commentId/:replyId`
  **Method**: `POST`
  Only reply creators can update the reply. You have to provide the updated text in the request body.
  **Request body**
  ```json
 {
     "text": "updated reply",
 }
 ```

 **Response: (success)**
  ```json
 {
     "success": true,
     "message": "reply deleted successfully!",
     "data": {} // all the comments
 }
 ```

   # Admin Panel
   **Functionalities**: Admins can create and publish blogs without approval. They can also add or remove other admins from the admin panel. After the first deployment, a default admin (set in the **.env** file) will be available. 
   
 ## 1. Create Admin
  **Url**: `Base Url/admin/
  **Method**: `POST`
  Only admin & default admin can create admin. Provide authorization token in the request header. A Demo Request is given below.
   **Request body**
  ```json
 {
     "user": "User Id",
 }
 ```
  **Response: (success)**
```json
 {
     "success": true,
     "message": "admin created successfully",
     "data": {} // new admin here
 }
 ```
 
  ## 2. Remove Admin
  **Url**: `Base Url/admin/:id
  **Method**: `DELETE`
  Only admin & default admin can remove another admin.
  
   ## 3. Get All Admins
  **Url**: `Base Url/admin/`
  **Method**: `DELETE`
  Only admin & default admin can remove another admin.
**Response: (success)**
```json
 {
     "success": true,
     "message": "admins retrieved successfully",
     "data": [] // all the admins here
 }
 ```
  

   ## 4. Approve Blog
  **Url**: `Base Url/admin/approve/:id`
  **Method**: `DELETE`
  Provide the token in the authorization header and pass the blog id in the request params. If the person is an admin, the blog will be approved.
**Response: (success)**
```json
 {
     "success": true,
     "message": "blog approved successfully",
     "data": {} 
 }
 ```
  
     ## 5. Dissapprove Blog
  **Url**: `Base Url/admin/disapprove/:id`
  **Method**: `DELETE`
  Provide the token in the authorization header and pass the blog id in the request params. If the person is an admin, the blog will be disapproved.
**Response: (success)**
```json
 {
     "success": true,
     "message": "blog disapproved successfully",
     "data": {} 
 }
 ```
  
    
    ## 6. Get Todays Traffic Data
  **Url**: `Base Url/admin/disapprove/:id`
  **Method**: `DELETE`
  Provide the token in the authorization header and pass the blog id in the request params. If the person is an admin, the blog will be disapproved.
**Response: (success)**
```json
 {
     "success": true,
     "message": "blog disapproved successfully",
     "data": {} 
 }
 ```