import React, { useState } from "react";
import image from "../assets/Vector.svg"
import "../styles/Lifestyle.css"


function Lifestyle() {
        const [sleepHours, setsleepHours] = useState("");
        const [sleepTime, setsleepTime] = useState("");

  const [rating, setRating] = useState(0);

        function handleConfirm() {
                console.log("Sleep number of hours saved")
        }
        function handleSleep() {
                console.log("Sleep time saved")

        }
        return (
                <div className="screen">
                        {/* // background image */}

                        <img
                                src={image}
                                alt="background"
                                className="background"
                        />
                        
                        {/* // cards */}
                        <div className="card1">


                        </div>
                        <div className="card2">


                        </div>

                        <div className="card3">

                        </div>

                        <p className="headingC1">
                                Number of Hours of Sleep
                        </p>
<h1>
                                LIFESTYLE
                        </h1>
                        {/* //buttons */}
                        <button className="button1" onClick={handleConfirm}>
                                More than 8
                        </button>

                        <button className="button2" onClick={handleConfirm}>
                                8 hours
                        </button>


                        <button className="button3" onClick={handleConfirm}>
                                4-7 hours
                        </button>


                        <button className="button4" onClick={handleConfirm}>
                                Less than 4
                        </button>

                        <button className="button5" onClick={handleSleep}>
                                Late
                        </button>

                        <button className="button6" onClick={handleSleep}>
                                Early
                        </button>
                        <p className="headingC2">
                                When did you sleep?
                        </p>
                        <div className="rating">
                                {[1, 2, 3, 4, 5].map((num) => (
                                        <span
                                                key={num}
                                                onClick={() => setRating(num)}
                                                style={{
                                                        fontSize: "30px",
                                                        cursor: "pointer",
                                                        color: num <= rating ? "gold" : "gray"
                                                }}
                                        >
                                                ★
                                        </span>
                                ))}
                        </div>
                        <p className= "sleepQuality">
                                How well did you sleep?
                        </p>















                </div>



        );
}

export default Lifestyle;