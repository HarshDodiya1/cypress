"use client";

import { AuthUser, createClient } from "@supabase/supabase-js";

import { createContext, useContext, useEffect, useState } from "react";
import { Subscription } from "../db/supabase.types";
import { useToast } from "@/hooks/use-toast";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getUserSubscriptionStatus } from "../db/queries";

type SupabaseUserContextType = {
  user: AuthUser | null;
  subscription: Subscription | null;
};

const SupabaseUserContext = createContext<SupabaseUserContextType>({
  user: null,
  subscription: null,
});

export const useSupabaseUser = () => {
  return useContext(SupabaseUserContext);
};

interface SupabaseUserProviderProps {
  children: React.ReactNode;
}

export const SupabaseUserProvider: React.FC<SupabaseUserProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const { toast } = useToast();

  //Fetch the user details
  //subscrip
  useEffect(() => {
    const getUser = async () => {
      const response = await fetch("/api/get-session");
      const session = await response.json();
      const user = session?.user;

      if (user) {
        setUser(user);
        const { data, error } = await getUserSubscriptionStatus(user.id);
        if (data) setSubscription(data);
        if (error) {
          toast({
            title: "Unexpected Error",
            description: "Oops! An unexpected error happened. Try again later.",
          });
        }
      }
    };
    getUser();
  }, [toast]);

  console.log(
    "this is sending values of user and subscription: ",
    user,
    subscription
  );

  return (
    <SupabaseUserContext.Provider value={{ user, subscription }}>
      {children}
    </SupabaseUserContext.Provider>
  );
};
