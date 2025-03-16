
import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type UserRole = "homeowner" | "provider" | null;

interface User {
  id: string;
  email: string;
  role: UserRole;
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  setUserRole: (role: UserRole) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock login function (will be replaced with Supabase)
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Check if user exists in localStorage (mock)
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const foundUser = storedUsers.find((u: any) => u.email === email);
      
      if (!foundUser || foundUser.password !== password) {
        throw new Error("Invalid email or password");
      }
      
      // Create authenticated user
      const authenticatedUser = {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role
      };
      
      // Save to state and localStorage
      setUser(authenticatedUser);
      localStorage.setItem("user", JSON.stringify(authenticatedUser));
      
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock signup function (will be replaced with Supabase)
  const signup = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      if (storedUsers.some((u: any) => u.email === email)) {
        throw new Error("User already exists");
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email,
        password,
        role
      };
      
      // Save to localStorage
      localStorage.setItem("users", JSON.stringify([...storedUsers, newUser]));
      
      toast.success("Signup successful! Please log in.");
      navigate("/login");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Signup failed");
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const setUserRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    setUserRole
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
