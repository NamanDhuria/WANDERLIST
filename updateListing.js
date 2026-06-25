require('dotenv').config();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

function assignCategory(listing) {
    const text = (listing.title + " " + listing.description).toLowerCase();
    
    if(text.includes("beach") || text.includes("beachfront") || text.includes("coastal")) return "Beach";
    if(text.includes("castle") || text.includes("fort") || text.includes("palace")) return "Castle";
    if(text.includes("cabin") || text.includes("treehouse") || text.includes("camping") || text.includes("camp")) return "Camping";
    if(text.includes("farm") || text.includes("ranch")) return "Farms";
    if(text.includes("pool") || text.includes("penthouse") || text.includes("luxury")) return "Pools";
    if(text.includes("igloo") || text.includes("arctic") || text.includes("ski") || text.includes("snow") || text.includes("chalet")) return "Arctic";
    if(text.includes("dome")) return "Domes";
    if(text.includes("city") || text.includes("downtown") || text.includes("urban") || text.includes("apartment") || text.includes("loft")) return "Iconic Cities";
    
    return "Rooms";
}

async function updateListings() {
    await mongoose.connect(process.env.ATLASDB_URL);
    
    const listings = await Listing.find({});
    
    for (let listing of listings) {
        listing.category = assignCategory(listing);
        await listing.save();
        console.log(`Updated: ${listing.title} → ${listing.category}`);
    }
    
    mongoose.connection.close();
    console.log("Done!");
}

updateListings();