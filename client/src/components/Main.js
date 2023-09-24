import React from "react";
import img2 from './images/indi4.jpg'
import img1 from './images/org1.png'

function Main() {
  const containerStyle = {
    // backgroundColor: "#ccd5ae", // Background color for the entire component
    padding: "0px", // Adjust padding as needed
  };

  const boxStyle = {
    width: "100%",
    maxWidth: "400px",
    height: "100%",
    maxHeight: "400px",
    background: "white",
    margin: "100px 25px", // Adjust the margin for spacing between boxes
    padding: "40px 30px 40px",
    borderRadius: "10px",
    alignItems: "center",
    position: "relative",
  };

  const imageStyle = {
    width: "100%",
    maxWidth: "100%",
    height: "auto",
    filter: "blur(0)", // Initial state (no blur)
    transition: "filter 0.1s",
  };

  const textOverlayStyle = {
    position: "absolute",
    bottom: "0%",
    left: "50%",
    borderRadius: "10px",
    transform: "translate(-50%, -50%)",
    fontSize: "25px",
    fontFamily: "Kanit, sans-serif", // Use a suitable font-family
    fontWeight: "bold", // Make the text bold
    backgroundColor: "rgba(0, 128, 0, 0.7)", // Green background color with opacity
    color: "white", // White text color
    padding: "15px 25px", // Add padding to the background color
    opacity: 0, // Initially hidden
    pointerEvents: "none", // Ensure that the overlay doesn't interfere with hover
    transition: "opacity 0.1s",
  };

  const containerRowStyle = {
    display: "flex",
    justifyContent: "space-between", // Distribute elements evenly with space in between
    alignItems: "center", // Center-align items vertically
  };

  const handleImageHover = (e) => {
    e.target.style.filter = "blur(4px)"; // Apply blur on hover
    e.target.nextElementSibling.style.opacity = 1; // Show text on hover
  };

  const handleImageLeave = (e) => {
    e.target.style.filter = "blur(0)"; // Remove blur when leaving hover
    e.target.nextElementSibling.style.opacity = 0; // Hide text when not hovering
  };

  return (
    <div className="container" style={containerStyle}>
      <div className="row" style={containerRowStyle}>
        <div className="col-md-6">
          <div style={boxStyle} className="d-flex flex-column align-items-center justify-content-center">
            <div className="image-container" onMouseEnter={handleImageHover} onMouseLeave={handleImageLeave}>
              <img
                src={img1}
                alt="Organization"
                className="img-fluid"
                style={imageStyle}
              />
              <button style={textOverlayStyle}>Issuer</button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div style={boxStyle} className="d-flex flex-column align-items-center justify-content-center">
            <div className="image-container" onMouseEnter={handleImageHover} onMouseLeave={handleImageLeave}>
              <img
                src={img2}
                alt="Individual"
                className="img-fluid"
                style={imageStyle}
              />
              <button style={textOverlayStyle}>Verifier</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
