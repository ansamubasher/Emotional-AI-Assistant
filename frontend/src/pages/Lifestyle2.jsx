import React, { useState } from "react";
import image from "../assets/Vector.svg"
import "../styles/Lifestyle2.css"
function Lifestyle2() {

        const [screenTime, setScreenTime]= useState(0);
        const [workout, setWorkout]= useState("");
        const [steps, setSteps]= useState("");
        const [mealsSkipped, setMealsSkipped]= useState("");
        const [caffeinIntake, setCaffeinIntake]= useState("");
         function handleSave(){
                console.log("All the data entered has been saved")
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


                        
                        <div className="micButton1">
                                
                                        <button >🎤 Start</button>
                                
                                        <button >⏹ Stop</button>
                                


                        </div>


                         <div className="micButton2">
                              
                                        <button >🎤 Start</button>
                              
                                        <button >⏹ Stop</button>
                               

                        </div>


                         <div className="micButton3">
                              
                                        <button >🎤 Start</button>
                              
                                        <button >⏹ Stop</button>
                                

                        </div>
                        <p className="ScreenTime">
                            SCREEN TIME
                        </p>
                        <p className="headingC1">
                                Please enter your total screen time
                        </p>
<h1>
                                LIFESTYLE
                        </h1>
                        <input
                        className ="inputField"
                        >
                        </input>
                        <button className="button5">
                                Yes
                        </button>

                        <button className="button6">
                                No
                        </button>
                        <p className ="physical">
                            PHYSICAL ACTIVITY
                        </p>
                        <p className="headingC2">
                                Did you workout today?
                        </p>

                        <p className="stepsHeading">
                                Number of Steps
                        </p>
                        <input className= "stepsInput">
                        </input>



                        <p className="meal">
                            MEAL
                        </p>
                       <p className="meal2">
                            Any meal skipped?
                        </p>
                        <button className="mealButton">
                            YES
                        </button>

                        <button className="mealButton2">
                            NO
                        </button>
                        <p className= "caffeine">
                            Caffeine Intake

                        </p>
                        <input className= "caffeineInput">
                        </input>
                        <button className= "confirmButton" onClick={handleSave}>
                                Confirm
                        </button>











                </div>



        );
}

export default Lifestyle2;