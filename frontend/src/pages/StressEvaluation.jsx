import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import image from "../assets/Background.png";
import heart from "../assets/heart.png";
import "../styles/StressEvaluation.css";

const steps = [
    {
        category: "Psychological Factors",
        icon: "🧠",
        questions: [
            { id: "anxiety_level", label: "Anxiety Level" },
            { id: "self_esteem", label: "Self Esteem" },
            { id: "mental_health_history", label: "Mental Health History" },
            { id: "depression", label: "Depression" }
        ]
    },
    {
        category: "Physiological Factors",
        icon: "🏥",
        questions: [
            { id: "headache", label: "Headache Frequency" },
            { id: "blood_pressure", label: "Blood Pressure" },
            { id: "sleep_quality", label: "Sleep Quality" },
            { id: "breathing_problem", label: "Breathing Problem" }
        ]
    },
    {
        category: "Environmental Factors",
        icon: "🌆",
        questions: [
            { id: "noise_level", label: "Noise Level" },
            { id: "living_conditions", label: "Living Conditions" },
            { id: "safety", label: "Safety" },
            { id: "basic_needs", label: "Basic Needs" }
        ]
    },
    {
        category: "Academic Factors",
        icon: "🎓",
        questions: [
            { id: "academic_performance", label: "Academic Performance" },
            { id: "study_load", label: "Study Load" },
            { id: "teacher_student_relationship", label: "Teacher-Student Relationship" },
            { id: "future_career_concerns", label: "Future Career Concerns" }
        ]
    },
    {
        category: "Social Factors",
        icon: "🤝",
        questions: [
            { id: "social_support", label: "Social Support" },
            { id: "peer_pressure", label: "Peer Pressure" },
            { id: "extracurricular_activities", label: "Extracurricular Activities" },
            { id: "bullying", label: "Bullying" }
        ]
    }
];

function StressEvaluation() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const handleRating = (questionId, rating) => {
        setFormData(prev => ({
            ...prev,
            [questionId]: rating
        }));
    };

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleSubmit = async () => {
        // Check if all questions are answered
        const allAnswered = steps.every(step =>
            step.questions.every(q => formData[q.id] !== undefined)
        );

        if (!allAnswered) {
            alert("Please answer all questions before submitting.");
            return;
        }

        try {
            const userString = localStorage.getItem("user");
            if (!userString) {
                alert("User session not found. Please log in again.");
                navigate("/login");
                return;
            }

            const user = JSON.parse(userString);
            const userId = user._id || user.id;

            const payload = {
                userId,
                ...formData
            };

            console.log("Submitting Stress Evaluation Data:", payload);
            
            const response = await axios.post("http://localhost:3000/stress/save", payload);

            if (response.data.success) {
                alert("Stress evaluation saved successfully!");
                navigate("/stress");
            } else {
                alert("Failed to save evaluation: " + response.data.message);
            }
        } catch (error) {
            console.error("Error submitting stress evaluation:", error);
            alert("An error occurred while saving your evaluation. Please try again.");
        }
    };

    const currentCategory = steps[currentStep];

    return (
        <Layout>
            <div className="stress-screen">
                <img src={image} alt="background" className="stress-background" />

                {/* Decorative Elements */}
                <img src={heart} alt="heart" className="stress-heart" style={{ top: '15%', left: '8%' }} />
                <img src={heart} alt="heart" className="stress-heart" style={{ bottom: '20%', right: '10%', transform: 'scale(0.8)' }} />

                <h1 className="stress-title">STRESS EVALUATION</h1>

                {/* Progress Stepper */}
                <div className="progress-stepper">
                    {steps.map((_, index) => (
                        <div
                            key={index}
                            className={`step-dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
                        />
                    ))}
                </div>

                {/* Category Header */}
                <div className="category-header">
                    <span className="category-icon">{currentCategory.icon}</span>
                    <h2 className="category-name">{currentCategory.category}</h2>
                </div>

                <div className="stress-grid">
                    {currentCategory.questions.map((q) => (
                        <div className="stress-card" key={q.id}>
                            <p className="q-title">{q.label}</p>

                            <div className="likert-scale">
                                <div className="likert-options">
                                    {[1, 2, 3, 4, 5].map((val) => (
                                        <button
                                            key={val}
                                            className={`likert-btn ${formData[q.id] === val ? 'active' : ''}`}
                                            onClick={() => handleRating(q.id, val)}
                                        >
                                            {val}
                                        </button>
                                    ))}
                                </div>
                                <div className="likert-labels">
                                    <span>Not at all</span>
                                    <span>Extremely</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <div className="nav-container">
                    {currentStep > 0 && (
                        <button className="btn-prev" onClick={prevStep}>
                            ← Previous
                        </button>
                    )}

                    {currentStep < steps.length - 1 ? (
                        <button className="btn-next" onClick={nextStep}>
                            Next Step →
                        </button>
                    ) : (
                        <button className="btn-submit" onClick={handleSubmit}>
                            Submit Evaluation
                        </button>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default StressEvaluation;
