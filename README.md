# ZenStay 

Zenstay is a comprehensive web application designed to list and book various types of stays such as apartments, castles, camping spots, and more. Built using Node.js and Express, it leverages MongoDB for data storage and EJS for templating. The application implements the MVC (Model-View-Controller) architecture to ensure a clear separation of concerns and maintainable code.

Features
User Authentication: Allows users to register, log in, and log out securely using Passport.js.
Listing Management: Users can create, edit, and delete listings with details such as title, description, price, and location.
Image Uploads: Integrates Cloudinary for storing and managing listing images.
Booking System: Users can book stays directly through the platform.
Review System: Users can leave reviews and ratings for listings.
Flash Messages: Provides notifications for various actions (e.g., successful login, errors).
Server-Side Validation: Ensures data integrity and user input validation using Joi.
Architecture
Zenstay follows the MVC architecture:

Models: Define the schema and data logic for listings, users, and reviews using Mongoose. Models are located in the models directory.
Views: EJS templates are used to render dynamic content and are stored in the views directory.
Controllers: Handle the request logic and interactions between models and views. Controllers are organized in the routes directory.

# Technologies Used
Node.js
Express.js
MongoDB & Mongoose
EJS
Passport.js
Cloudinary
Joi
Connect-Flash
Method-Override
