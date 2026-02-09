// src/components/CameraLogo.js
import "./CameraLogo.css";

function CameraLogo({ size = "small" }) {
  return (
    <div className={`camera-logo camera-logo--${size}`}>
      <div className="camera-logo__body">
        <div className="camera-logo__reel camera-logo__reel--left"></div>
        <div className="camera-logo__reel camera-logo__reel--right"></div>
        <div className="camera-logo__lens"></div>
      </div>
    </div>
  );
}

export default CameraLogo;
