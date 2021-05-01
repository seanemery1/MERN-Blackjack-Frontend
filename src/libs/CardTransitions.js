//https://czaplinski.io/blog/super-easy-animation-with-react-hooks/
import "./CardTransitions.css";
import React, { useEffect, useState } from "react";

const Fade = ({ show, children }) => {
  const [shouldRender, setRender] = useState(show);

  useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  const onAnimationEnd = () => {
    if (!show) setRender(false);
  };

  return (
    shouldRender && (
      <div
        style={{ animation: `${show ? "dealCards" : "trashCards"} 1s` }}
        //${show ? "ease-out" : "ease-out"} 0.6s
        onAnimationEnd={onAnimationEnd}
      >
        {children}
      </div>
    )
  );
};

export default Fade;