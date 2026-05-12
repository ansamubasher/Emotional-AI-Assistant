const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const User = require("./models/Users");
const Journal = require("./models/Journals");
const LifestyleLog = require("./models/LifestyleLogs");
const Recommendation = require("./models/Recommendations");
const StressLog = require("./models/StressLogs");


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
    await StressLog.deleteMany({});

    console.log("Cleared existing data.");

    // 1. Create Dummy Users
    const hashedPassword = await bcrypt.hash("password123", 10);
    const users = await User.insertMany([
      {
        name: "Alice Johnson",
        email: "alice@example.com",
        password: hashedPassword,
        age: 25,
        gender: "Female"
      },
      {
        name: "Bob Smith",
        email: "bob@example.com",
        password: hashedPassword,
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

    // 5. Create Dummy Stress Logs
    await StressLog.insertMany([
      {
        userId: users[0]._id,
        anxiety_level: 14,
        self_esteem: 20,
        mental_health_history: 0,
        depression: 12,
        headache: 2,
        blood_pressure: 1,
        sleep_quality: 3,
        breathing_problem: 2,
        noise_level: 2,
        living_conditions: 3,
        safety: 4,
        basic_needs: 4,
        academic_performance: 3,
        study_load: 3,
        teacher_student_relationship: 3,
        future_career_concerns: 3,
        social_support: 3,
        peer_pressure: 2,
        extracurricular_activities: 2,
        bullying: 1,
        stress_level: "Medium",
        confidence: { Low: 0.2, Medium: 0.7, High: 0.1 }
      },
      {
        userId: users[0]._id,
        anxiety_level: 5,
        self_esteem: 28,
        mental_health_history: 0,
        depression: 4,
        headache: 1,
        blood_pressure: 1,
        sleep_quality: 5,
        breathing_problem: 1,
        noise_level: 1,
        living_conditions: 5,
        safety: 5,
        basic_needs: 5,
        academic_performance: 5,
        study_load: 2,
        teacher_student_relationship: 5,
        future_career_concerns: 2,
        social_support: 5,
        peer_pressure: 1,
        extracurricular_activities: 4,
        bullying: 0,
        stress_level: "Low",
        confidence: { Low: 0.95, Medium: 0.04, High: 0.01 }
      },
      {
        userId: users[1]._id,
        anxiety_level: 20,
        self_esteem: 10,
        mental_health_history: 1,
        depression: 25,
        headache: 5,
        blood_pressure: 3,
        sleep_quality: 1,
        breathing_problem: 4,
        noise_level: 5,
        living_conditions: 1,
        safety: 2,
        basic_needs: 2,
        academic_performance: 1,
        study_load: 5,
        teacher_student_relationship: 1,
        future_career_concerns: 5,
        social_support: 1,
        peer_pressure: 5,
        extracurricular_activities: 1,
        bullying: 4,
        stress_level: "High",
        confidence: { Low: 0.01, Medium: 0.09, High: 0.9 }
      },
      {
        userId: users[1]._id,
        anxiety_level: 12,
        self_esteem: 18,
        mental_health_history: 0,
        depression: 15,
        headache: 3,
        blood_pressure: 2,
        sleep_quality: 2,
        breathing_problem: 3,
        noise_level: 3,
        living_conditions: 2,
        safety: 3,
        basic_needs: 3,
        academic_performance: 2,
        study_load: 4,
        teacher_student_relationship: 2,
        future_career_concerns: 4,
        social_support: 2,
        peer_pressure: 3,
        extracurricular_activities: 2,
        bullying: 2,
        stress_level: "Medium",
        confidence: { Low: 0.15, Medium: 0.75, High: 0.1 }
      }
    ]);
    console.log("Stress logs seeded.");


    console.log("Database seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
