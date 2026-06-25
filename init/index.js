require('dotenv').config();
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

const geocodingClient = mbxGeocoding({ accessToken: process.env.MAP_TOKEN });

main()
.then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(process.env.ATLASDB_URL);
}

const initDB = async () => {
   await Listing.deleteMany({});
   
   for(let obj of initData.data) {
       let response = await geocodingClient.forwardGeocode({
           query: obj.location,
           limit: 1
       }).send();
       
       obj.geometry = response.body.features[0].geometry;
       obj.owner = "6a3d6a86445080566ff11744";
   }
   
   await Listing.insertMany(initData.data);
   console.log("data was initialized");
};

initDB();