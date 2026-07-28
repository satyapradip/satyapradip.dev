import mongoose from "mongoose";
import dns from "node:dns";

// Fix Node.js DNS SRV resolution issues on Windows local networks
try {
  dns.setDefaultResultOrder("ipv4first");
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {
  // Ignore if custom DNS server override is restricted
}

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    console.log("\n💡 Troubleshooting Tips for ECONNREFUSED / Network Access:");
    console.log("1. Check MongoDB Atlas Network Access: Ensure '0.0.0.0/0' (Allow access from anywhere) is added in Atlas Security settings.");
    console.log("2. Check Network Connection: Ensure your local router/firewall does not block MongoDB port 27017 or DNS SRV queries.\n");
    process.exit(1);
  }
};
