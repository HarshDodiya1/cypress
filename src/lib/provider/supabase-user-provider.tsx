"use client";

import { AuthUser } from "@supabase/supabase-js";

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
      const session: any = await getServerSession(authOptions);
      const user = session?.user;
      if (user) {
        console.log(user);
        setUser(user);
        const { data, error } = await getUserSubscriptionStatus(user.id);
        if (data) setSubscription(data);
        if (error) {
          toast({
            title: "Unexpected Error",
            description:
              "Oppse! An unexpected error happened. Try again later.",
          });
        }
      }
    };
    getUser();
  }, [getServerSession, toast]);
  console.log("This is the children we are providing via supabase-user-provider:", children);
  return (
    <SupabaseUserContext.Provider value={{ user, subscription }}>
      {children}
    </SupabaseUserContext.Provider>
  );
};
