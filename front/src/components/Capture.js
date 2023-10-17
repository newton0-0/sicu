import React, { useRef, useState } from 'react';
import { Grid } from '@mui/material';

import path from './images/Web capture_17-10-2023_183633_www.figma.com.jpeg'

function WebcamCapture() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showVideo, setShowVideo] = useState(true);

  const startWebcam = async () => {
    try {
        setCapturedImage(null);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setShowVideo(true);
      setCapturedImage(null);
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  };

  const captureImage = () => {
    setShowVideo(false);

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the image on the canvas to a data URL and set it as the captured image
    const image = canvas.toDataURL('image/png');
    setCapturedImage(image);
  };

  const redirectToAnotherPage = () => {
    window.location.replace("/dashboard")
    // Add code to redirect to another page using React Router or other navigation methods
    // Example using React Router: history.push('/other-page');
  };

  return (
    <div className='webcap'>
      <Grid container spacing={2}>
        <Grid item md={5} className="poster">
          <img src={path} alt="" />
        </Grid>
        <Grid item md={5} className='face'>
      <h1>Facial Verification</h1>
      {showVideo ? (
        <video ref={videoRef} autoPlay />
      ) : (
        <img src={capturedImage} alt="Captured" />
      )}
      {showVideo && (
        <button onClick={startWebcam}>Start Webcam</button>
      )}
      {showVideo && (
        <button onClick={captureImage}>Capture</button>
      )}
      {!showVideo && (
        <button onClick={() => {window.location.reload()}}>Retake</button>
      )}
      {capturedImage && <button onClick={() => window.location.replace('/dashboard')}>Confirm ?</button>}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
        </Grid>
      </Grid>
    </div>
  );
}

export default WebcamCapture;
