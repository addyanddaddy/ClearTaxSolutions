"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: "client" | "admin";
  serviceNeeded: string[];
  createdAt: string;
  hearAboutUs?: string;
  taxSituation?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (userData: RegisterData) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  serviceNeeded: string[];
  hearAboutUs?: string;
  taxSituation?: string;
}

interface StoredUser extends User {
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_ADMIN: StoredUser = {
  id: "admin-001",
  firstName: "Joseph",
  lastName: "Gasana",
  email: "admin@cleartaxsolutions.com",
  phone: "(555) 000-0000",
  role: "admin",
  serviceNeeded: [],
  createdAt: "2024-01-01T00:00:00.000Z",
  password: "admin123",
};

function getStoredUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem("cts_users");
    const users: StoredUser[] = data ? JSON.parse(data) : [];
    if (!users.find((u) => u.email === DEFAULT_ADMIN.email)) {
      users.push(DEFAULT_ADMIN);
      localStorage.setItem("cts_users", JSON.stringify(users));
    }
    return users;
  } catch {
    return [DEFAULT_ADMIN];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem("cts_users", JSON.stringify(users));
}

function getSession(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem("cts_session");
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

function saveSession(user: User | null) {
  if (user) {
    localStorage.setItem("cts_session", JSON.stringify(user));
  } else {
    localStorage.removeItem("cts_session");
  }
}

function seedDemoData(userId: string, services: string[]) {
  // Seed cases
  const existingCases = localStorage.getItem("cts_cases");
  if (!existingCases) {
    const cases = services.map((service, index) => ({
      id: `case-${userId}-${index}`,
      userId,
      serviceName: service,
      status: index === 0 ? "In Review" : "New",
      createdAt: new Date().toISOString(),
      assignedAgent: "Joseph Gasana, EA",
      events: [
        {
          date: new Date().toISOString(),
          description: `Case created for ${service}`,
          type: "status",
        },
      ],
    }));
    localStorage.setItem("cts_cases", JSON.stringify(cases));
  }

  // Seed activity
  const existingActivity = localStorage.getItem("cts_activity");
  if (!existingActivity) {
    const activity = [
      {
        id: "act-1",
        userId,
        type: "registration",
        description: "Account created successfully",
        date: new Date().toISOString(),
      },
      ...services.map((service, index) => ({
        id: `act-case-${index}`,
        userId,
        type: "case_created",
        description: `New case opened: ${service}`,
        date: new Date().toISOString(),
      })),
    ];
    localStorage.setItem("cts_activity", JSON.stringify(activity));
  }

  // Seed messages
  const existingMessages = localStorage.getItem("cts_messages");
  if (!existingMessages) {
    const messages = [
      {
        id: "msg-welcome",
        userId,
        subject: "Welcome to Clear Tax Solutions!",
        body: "Thank you for creating your account with Clear Tax Solutions. I'm Joseph Gasana, your Enrolled Agent. I'll be personally handling your tax matters. Please upload any relevant documents to get started, and don't hesitate to reach out if you have any questions.",
        from: "Joseph Gasana, EA",
        to: "You",
        date: new Date().toISOString(),
        read: false,
        caseId: null,
      },
    ];
    localStorage.setItem("cts_messages", JSON.stringify(messages));
  }

  // Seed invoices
  const existingInvoices = localStorage.getItem("cts_invoices");
  if (!existingInvoices) {
    localStorage.setItem("cts_invoices", JSON.stringify([]));
  }

  // Seed payments
  const existingPayments = localStorage.getItem("cts_payments");
  if (!existingPayments) {
    localStorage.setItem("cts_payments", JSON.stringify([]));
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = getSession();
    if (session) {
      setUser(session);
    }
    setLoading(false);
  }, []);

  const login = useCallback((email: string, password: string) => {
    const users = getStoredUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) {
      return { success: false, error: "Invalid email or password" };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _pw, ...userData } = found;
    setUser(userData);
    saveSession(userData);
    seedDemoData(userData.id, userData.serviceNeeded);
    return { success: true };
  }, []);

  const register = useCallback((data: RegisterData) => {
    const users = getStoredUsers();
    if (users.find((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
      return { success: false, error: "An account with this email already exists" };
    }
    const newUser: StoredUser = {
      id: `user-${Date.now()}`,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      role: "client",
      serviceNeeded: data.serviceNeeded,
      createdAt: new Date().toISOString(),
      hearAboutUs: data.hearAboutUs,
      taxSituation: data.taxSituation,
      password: data.password,
    };
    users.push(newUser);
    saveUsers(users);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _pw2, ...userData } = newUser;
    setUser(userData);
    saveSession(userData);
    seedDemoData(userData.id, userData.serviceNeeded);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    saveSession(null);
  }, []);

  const updateProfile = useCallback(
    (data: Partial<User>) => {
      if (!user) return;
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      saveSession(updatedUser);
      // Update in users list
      const users = getStoredUsers();
      const index = users.findIndex((u) => u.id === user.id);
      if (index !== -1) {
        users[index] = { ...users[index], ...data };
        saveUsers(users);
      }
    },
    [user]
  );

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
