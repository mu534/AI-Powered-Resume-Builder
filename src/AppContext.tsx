import React, { createContext, useState, useContext, ReactNode } from "react";

console.log("React in context file:", React);

interface AppContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => !!localStorage.getItem("authToken")
  );

  console.log(
    "AppProvider mounted at:",
    new Date().toISOString(),
    "with context:",
    {
      isAuthenticated,
      setIsAuthenticated,
    }
  );

  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  console.log(
    "useAppContext called at:",
    new Date().toISOString(),
    "with context:",
    context
  );
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
