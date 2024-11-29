// "use client";
// import {
//   Dispatch,
//   SetStateAction,
//   createContext,
//   useContext,
//   useEffect,
//   useState,
// } from "react";
// import { useSupabaseUser } from "./supabase-user-provider";
// import { ProductWithPrice } from "../db/supabase.types";

// type SubscriptionModalContextType = {
//   open: boolean;
//   setOpen: Dispatch<SetStateAction<boolean>>;
// };

// const SubscriptionModalContext = createContext<SubscriptionModalContextType>({
//   open: false,
//   setOpen: () => {},
// });

// export const useSubscriptionModal = () => {
//   return useContext(SubscriptionModalContext);
// };

// export const SubscriptionModalProvider = ({
//   children,
//   products,
// }: {
//   children: React.ReactNode;
//   products: ProductWithPrice[];
// }) => {
//   const [open, setOpen] = useState(false);

//   return (
//     <SubscriptionModalContext.Provider value={{ open, setOpen }}>
//       {children}
//       <SubscriptionModal products={products} />
//     </SubscriptionModalContext.Provider>
//   );
// };

import React from "react";

export const useSubscriptionModal = () => {
  return {};
};

const SubscriptionModalProvider = () => {
  return <div>SubscriptionModalProvider</div>;
};

export default SubscriptionModalProvider;
