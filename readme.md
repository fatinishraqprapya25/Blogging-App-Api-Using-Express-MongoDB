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
  -**Url**: `Base Url/user`
  -**.Method**: `POST`

  - **Response: (if u provide all informations)**
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
`

  - **Response: (if u don't provide all informations)**
  ```json
  {
    "success": false,
    "message": "Failed in creating users",
    "error": {}
  }
```