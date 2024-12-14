"use client";
import { useAppState } from "@/lib/provider/state-provider";
import { useSupabaseUser } from "@/lib/provider/supabase-user-provider";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

interface LogoutButtonProps {
  children: React.ReactNode;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ children }) => {
  const { user } = useSupabaseUser();
  const { dispatch } = useAppState();
  const router = useRouter();
  const logout = async () => {
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
    router.refresh();
    dispatch({ type: "SET_WORKSPACES", payload: { workspaces: [] } });
  };
  return (
    <Button variant="ghost" size="icon" className="p-0" onClick={logout}>
      {children}
    </Button>
  );
};

export default LogoutButton;
