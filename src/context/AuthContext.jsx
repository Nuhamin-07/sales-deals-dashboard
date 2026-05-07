import { createContext, useState, useContext, useEffect } from "react";
import supabase from "../supabase-client";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    async function getInitialSession() {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          throw error;
        }

        console.log(data.session);
        setSession(data.session);
      } catch (error) {
        console.error("Error fetching session: ", error);
      }
    }

    getInitialSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log("state changed ", session);
    });
  }, []);

  const signInUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password: password,
      });
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true, data: data };
    } catch (error) {
      console.error("Error signing in: ", error.message);
    }
  };

  const signOutUser = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out: ", error.message);
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (error) {
      console.error("Error signing out: ", error.message);
      return { success: false, error: error.message };
    }
  };

  const signUpNewUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.toLowerCase(),
        password: password,
      });
      if (error) {
        console.error("Supabase sign-up error:", error.message);
        return { success: false, error: error.message };
      }
      console.log("Supabase sign-up success:", data);
      return { success: true, data };
    } catch (error) {
      console.error("Unexpected error during sign-up:", error.message);
      return {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{ session, signInUser, signOutUser, signUpNewUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
