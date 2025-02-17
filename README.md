
# ImaginAI : Text-to-Image Generator

A full-stack AI SaaS application that allows users to generate AI-powered images using the **ClipDrop API**. The app includes a **credit-based system** for image generation, with an integrated **online payment gateway** for purchasing additional credits.  

## 🚀 Features  
- **AI Image Generation** – Uses **ClipDrop API** to generate high-quality images from text prompts.  
- **Credit-Based System** – Users spend credits to generate images and can purchase more via **secure online payments**.  
- **User Authentication** – Secure login and signup with **JWT authentication** and MongoDB.  
- **Responsive UI** – Built with **React.js and Material UI** for an intuitive user experience.  
- **RESTful API** – Backend powered by **Express.js and Node.js** for seamless communication.  

## 🛠 Tech Stack  
- **Frontend:** React.js, Material UI  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **AI Integration:** ClipDrop API  
- **Authentication:** JWT, bcrypt  
- **Payment Gateway:** Razorpay

## 📌 Installation & Setup  

1. **Clone the repository:**  
   ```sh
   git clone https://github.com/ayushiigarg/ImaginAI.git
   cd ImaginAI
   ```

2. **Install dependencies:**  
   ```sh
   # Install frontend dependencies  
   cd client  
   npm install  

   # Install backend dependencies  
   cd ../server  
   npm install  
   ```

3. **Set up environment variables:**  
   - Create a `.env` file in the `server` directory and configure the following:  
     ```env
     MONGO_URI=mongodb+srv://<username>:<password>@cluster0.7g3ke.mongodb.net/
     JWT_SECRET=<your_jwt_secret_key>
     CLIPDROP_API=<your_clipdrop_api_key>
     RAZORPAY_KEY_ID=<your_razorpay_key_id>
     RAZORPAY_KEY_SECRET=<your_razorpay_key_secret>
     CURRENCY=INR
     EMAIL_USER=<your_email>
     EMAIL_PASS=<your_email_password>
     FRONTEND_URL=<your_frontend_url>
     ```
 - Create a `.env` file in the `client` directory and configure the following:  
     ```env
     VITE_RAZORPAY_KEY_ID=<your_razorpay_key_id>
     VITE_BACKEND_URL=<your_backend_url>
     ```
4. **Run the application:**  
   ```sh
   # Start the backend  
   cd server  
   npm run server

   # Start the frontend  
   cd ../client  
   npm run dev
   ```

