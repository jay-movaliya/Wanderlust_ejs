const initData = require("./initData.js");
const Listing = require("../models/listings.js");
const mongoose = require("mongoose");

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = "pk.eyJ1Ijoiam9obi1kZW8tNzciLCJhIjoiY2x4YmFuc2Y1MXBpeDJxcjBjM295cTJkNiJ9.o4knXQANyJbq7G2iGwNndw";
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

const connectd = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/wanderlust', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("\nMongoDB connected!");
  } catch (error) {
    console.error("MONGODB connection FAILED:", error);
    process.exit(1);
  }
};

const addGeometryToData = async (data) => {
  for (let i = 0; i < data.length; i++) {
    try {
      const response = await geocodingClient
        .forwardGeocode({
          query: data[i].location,
          limit: 1,
        })
        .send();

      if (response.body.features.length > 0) {
        data[i].geometry = response.body.features[0].geometry;
      } else {
        console.warn(`No geometry found for location: ${data[i].location}`);
        data[i].geometry = { type: "Point", coordinates: [0, 0] }; // Default to (0,0) or handle as needed
      }
    } catch (error) {
      console.error(`Error fetching geometry for location ${data[i].location}:`, error);
      data[i].geometry = { type: "Point", coordinates: [0, 0] }; // Handle errors gracefully
    }
  }
};

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
      ...obj,
      owner: "67066403ac3aca625c29209d", // Default owner
    }));

    await addGeometryToData(initData.data); // Add geometry before inserting
    await Listing.insertMany(initData.data);
    console.log("Database initialized with data!");
  } catch (error) {
    console.error("Error initializing data:", error);
  }
};

(async () => {
  await connectd();
  await initDB();
  mongoose.connection.close();
  console.log("Database connection closed.");
})();
