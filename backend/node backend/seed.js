const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/Users");
const Journal = require("./models/Journals");
const LifestyleLog = require("./models/LifestyleLogs");
const Recommendation = require("./models/Recommendations");

dotenv.config();

const seedDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/emence");
    console.log("Connected to MongoDB for seeding...");

    // Clear existing data
    await User.deleteMany({});
    await Journal.deleteMany({});
    await LifestyleLog.deleteMany({});
    await Recommendation.deleteMany({});
    console.log("Cleared existing data.");

    // 1. Create Dummy Users
    const users = await User.insertMany([
      {
        name: "Alice Johnson",
        email: "alice@example.com",
        password: "password123",
        age: 25,
        gender: "Female"
      },
      {
        name: "Bob Smith",
        email: "bob@example.com",
        password: "password123",
        age: 30,
        gender: "Male"
      }
    ]);
    console.log("Users seeded.");

    // 2. Create Dummy Journals
    const journals = await Journal.insertMany([
      {
        userId: users[0]._id,
        title: "Feeling productive",
        type: "text",
        content: "I had a very productive day today! Managed to finish all my tasks ahead of time."
      },
      {
        userId: users[0]._id,
        title: "Morning Voice Note",
        type: "audio",
        audioUrl: "http://example.com/audio/alice_morning.mp3",
        content: "Transcribed: I woke up feeling a bit tired but motivated."
      },
      {
        userId: users[1]._id,
        title: "Long Day",
        type: "text",
        content: "Today was quite stressful. Too many meetings."
      }
    ]);
    console.log("Journals seeded.");

    // 3. Create Dummy Lifestyle Logs
    const logs = await LifestyleLog.insertMany([
      {
        userId: users[0]._id,
        age: 25,
        gender: "Female",
        sleep_hours: 8,
        screen_time_hours: 4,
        study_hours: 6,
        physical_activity: 1,
        caffeine_intake: 2,
        academic_pressure: 3,
        stress_level: "low"
      },
      {
        userId: users[1]._id,
        age: 30,
        gender: "Male",
        sleep_hours: 5,
        screen_time_hours: 8,
        study_hours: 2,
        physical_activity: 0,
        caffeine_intake: 5,
        academic_pressure: 5,
        stress_level: "high"
      }
    ]);
    console.log("Lifestyle logs seeded.");

    // 4. Create Dummy Recommendations
    await Recommendation.insertMany([
      {
        userId: users[0]._id,
        lifestyleLogId: logs[0]._id,
        stress_level: "low",
        recommendations: [
          "Maintain your current sleep schedule.",
          "Keep up the physical activity.",
          "Great job balancing your time!"
        ]
      },
      {
        userId: users[1]._id,
        lifestyleLogId: logs[1]._id,
        stress_level: "high",
        recommendations: [
          "Try to increase your sleep hours to at least 7.",
          "Reduce caffeine intake after 2 PM.",
          "Take short breaks during screen time to reduce eye strain.",
          "Incorporate some light physical activity like walking."
        ]
      }
    ]);
    console.log("Recommendations seeded.");

    console.log("Database seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
