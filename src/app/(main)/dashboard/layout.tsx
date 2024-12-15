import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = async ({ children }) => {
  return <main className="flex over-hidden h-screen">{children}</main>;
};

export default Layout;
