import React from "react";

interface LoginTemplateProps {
  children: React.ReactNode;
}

const LoginTemplate: React.FC<LoginTemplateProps> = ({ children }) => {
  return (
    <div
      className="
      h-screen
      p-6 flex 
      justify-center"
    >
      {children}
    </div>
  );
};

export default LoginTemplate;
