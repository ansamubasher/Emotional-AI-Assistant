import React, { useState, useRef } from "react";
import "../styles/journal.css";

const AudioInput = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const handleRecording = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        chunksRef.current = [];

        mediaRecorder.ondataavailable = (e) => {
          chunksRef.current.push(e.data);
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: "audio/webm" });
          const url = URL.createObjectURL(blob);
          setAudioURL(url);
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Mic access denied:", err);
      }
    } else {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="audio-input-container">
      
      <div className="audio-bar">
        <span className="placeholder-text">
          {isRecording
            ? "Recording..."
            : audioURL
            ? "Recording complete ✔"
            : "Press speaker to start recording"}
        </span>

        <button className="mic-button" onClick={handleRecording}>
          🔊    
        </button>
      </div>

      {audioURL && (
        <audio controls src={audioURL} className="audio-player" />
      )}
    </div>
  );
};

export default AudioInput;