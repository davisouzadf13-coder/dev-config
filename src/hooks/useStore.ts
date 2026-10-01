import { useState, useEffect } from "react";
import { defaultPlans, Plan } from "../data/plans";
import { defaultSettings, SiteSettings } from "../data/settings";

function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  message: string;
  status: "nova" | "em atendimento" | "respondida" | "arquivada";
  adminReply?: string;
  createdAt: string;
}

export interface Enrollment {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  planId: string;
  studentsQuantity: number;
  shift: string;
  paymentMethod: string;
  notes: string;
  status: string;
  createdAt: string;
}

export function usePlans() {
  return useLocalStorage<Plan[]>("horizonte_plans", defaultPlans);
}

export function useSettings() {
  return useLocalStorage<SiteSettings>("horizonte_settings", defaultSettings);
}

export function useMessages() {
  return useLocalStorage<ContactMessage[]>("horizonte_messages", []);
}

export function useEnrollments() {
  return useLocalStorage<Enrollment[]>("horizonte_enrollments", []);
}
