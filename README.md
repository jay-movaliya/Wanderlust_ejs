# Wanderlust - Travel Rental Platform

A full-stack web application for discovering and booking travel accommodations, inspired by Airbnb. Built with Node.js, Express, EJS, and MongoDB.

## 🌟 Features

- **Property Listings**: Browse, search, and filter rental properties
- **User Authentication**: Secure registration, login, and profile management
- **Reviews & Ratings**: Leave reviews and read ratings from other travelers
- **Image Uploads**: Cloudinary integration for property photos
- **Geolocation**: Mapbox integration for location-based search
- **Responsive Design**: Mobile-friendly interface using EJS templates
- **Flash Messaging**: User-friendly notifications and alerts

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **Passport.js** - Authentication middleware
- **Cloudinary** - Image storage and processing
- **Mapbox** - Geolocation and mapping services
- **JWT** - JSON Web Tokens for authentication

### Frontend
- **EJS** - Template engine
- **EJS-Mate** - Layout and partial support
- **Bootstrap/CSS** - Styling (check views folder)
- **JavaScript** - Client-side interactions

### Development Tools
- **Nodemon** - Auto-restart during development
- **Dotenv** - Environment variable management
- **Multer** - File upload handling

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)
- Mapbox account (for geolocation services)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Wanderlust_ejs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URL=mongodb://localhost:27017/wanderlust
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   MAPBOX_ACCESS_TOKEN=your_mapbox_token
   SESSION_SECRET=your_session_secret
   ```

4. **Start the application**
   ```bash
   # Development mode
   npm start
   
   # Or with nodemon for auto-restart
   nodemon server.js
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:5000`

## 📁 Project Structure

```
Wanderlust_ejs/
├── controllers/          # Route controllers
├── db/                   # Database connection
├── init/                 # Database initialization
├── middleware.js         # Custom middleware
├── models/               # Mongoose models
│   ├── listings.js       # Property listing model
│   ├── review.js         # Review model
│   └── user.js           # User model
├── public/               # Static assets (CSS, JS, images)
├── routes/               # API routes
│   ├── listings.js       # Property routes
│   ├── reviews.js        # Review routes
│   ├── user.js           # User routes
│   └── searchdata.js     # Search functionality
├── utils/                # Utility functions
├── views/                # EJS templates
├── cloudinaryconfig.js   # Cloudinary configuration
├── schema.js             # Validation schemas
└── server.js             # Main application file
```

## 🔧 API Endpoints

### Listings
- `GET /listings` - View all listings
- `GET /listings/new` - New listing form
- `POST /listings` - Create new listing
- `GET /listings/:id` - View specific listing
- `GET /listings/:id/edit` - Edit listing form
- `PATCH /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing

### Reviews
- `POST /listings/:id/reviews` - Create review
- `DELETE /listings/:id/reviews/:reviewId` - Delete review

### Users
- `GET /user/signup` - Registration form
- `POST /user/signup` - Create new user
- `GET /user/login` - Login form
- `POST /user/login` - Authenticate user
- `GET /user/logout` - Logout user

### Search
- `GET /data/searchbar` - Search listings

## 🔐 Authentication

The application uses Passport.js with Local Strategy for authentication:
- Session-based authentication
- Password hashing with bcrypt
- Protected routes for authenticated users
- Flash messages for user feedback

## 🗄️ Database Schema

### Listing Model
```javascript
{
  title: String,
  description: String,
  image: {
    url: String,
    filename: String
  },
  price: Number,
  location: String,
  country: String,
  geometry: {
    type: "Point",
    coordinates: [longitude, latitude]
  },
  reviews: [ObjectId],
  owner: ObjectId
}
```

### User Model
```javascript
{
  username: String,
  email: String,
  password: String (hashed)
}
```

### Review Model
```javascript
{
  rating: Number,
  comment: String,
  author: ObjectId,
  listing: ObjectId
}
```

## 🌍 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment mode | No |
| `PORT` | Server port | No |
| `MONGODB_URL` | MongoDB connection string | Yes |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes |
| `MAPBOX_ACCESS_TOKEN` | Mapbox access token | Yes |
| `SESSION_SECRET` | Session secret key | Yes |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the package.json file for details.

## 🐛 Issues

If you encounter any issues or have suggestions, please open an issue on the GitHub repository.

## 📧 Contact

For any questions or inquiries, please reach out through the project's issue tracker.

---

**Happy Traveling!** 🌍✈️