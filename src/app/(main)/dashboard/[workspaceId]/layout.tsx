// import MobileSidebar from '@/components/sidebar/mobile-sidebar';
import Sidebar from "@/components/sidebar/sidebar";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  params: any;
}

const Layout: React.FC<LayoutProps> = ({ children, params }) => {
  return (
    <main className="flex overflow-hidden h-screen w-screen">
      {/* <MobileSidebar>
        <Sidebar params={params} className="w-screen inline-block sm:hidden" />
      </MobileSidebar> */}
      <Sidebar params={params} />
      <div className="dark:boder-Neutrals-12/70 border-l-[1px] w-full relative overflow-hidden">
        {children}
      </div>
    </main>
  );
};

export default Layout;
