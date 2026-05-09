import { createContext, useState, useContext, useEffect } from "react";
import supabase from "../supabase-client";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);
  const [users, setUsers] = useState([]);

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

  useEffect(() => {
    if (!session) return;
    async function fetchUsers() {
      try {
        const { data, error } = await supabase
          .from("user_profiles")
          .select("id, name, account_type");
        if (error) {
          throw error;
        }
        console.log("Fetched users:", data);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    }
    fetchUsers();
  }, [session]);

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

  const signUpNewUser = async (email, password, name, accountType) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.toLowerCase(),
        password: password,
        options: {
          data: {
            name: name,
            account_type: accountType,
          },
        },
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
      value={{ session, signInUser, signOutUser, signUpNewUser, users }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
