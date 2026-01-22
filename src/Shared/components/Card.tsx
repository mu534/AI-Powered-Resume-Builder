import React from "react";

const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = "",
  ...rest
}) => {
  return (
    <div {...rest} className={`surface p-6 rounded-lg ${className}`}>
      {children}
    </div>
  );
};

export default Card;
