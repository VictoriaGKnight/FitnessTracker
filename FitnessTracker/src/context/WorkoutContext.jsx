import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const WorkoutContext = createContext(null);

export function useWorkout() {
  const ctx = useContext(WorkoutContext);
  if (!ctx) throw new Error("useWorkout must be used within WorkoutProvider");
  return ctx;
}

const LS_PLAN_KEY = "ft-plan";
const LS_LOGS_KEY = "ft-logs";

export function WorkoutProvider({ children }) {
  const [plan, setPlan] = useState(() => {
    try {
      const saved = localStorage.getItem(LS_PLAN_KEY);
      return saved ? JSON.parse(saved) : { name: "My Plan", items: [] };
    } catch {
      return { name: "My Plan", items: [] };
    }
  });

  const [logs, setLogs] = useState(() => {
    try {
      const saved = localStorage.getItem(LS_LOGS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(LS_PLAN_KEY, JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem(LS_LOGS_KEY, JSON.stringify(logs));
  }, [logs]);

  function addToPlan(exercise) {
    setPlan((prev) => {
      const exists = prev.items.some((x) => x.id === exercise.id);
      if (exists) return prev;
      return {
        ...prev,
        items: [
          ...prev.items,
          { ...exercise, sets: 3, reps: 10 },
        ],
      };
    });
  }

  function removeFromPlan(id) {
    setPlan((prev) => ({ ...prev, items: prev.items.filter((x) => x.id !== id) }));
  }

  function updatePlanItem(id, patch) {
    setPlan((prev) => ({
      ...prev,
      items: prev.items.map((x) => (x.id === id ? { ...x, ...patch } : x)),
    }));
  }

  function addLogEntry(entry) {
    setLogs((prev) => [{ ...entry, id: crypto.randomUUID() }, ...prev]);
  }

  function removeLogEntry(id) {
    setLogs((prev) => prev.filter((x) => x.id !== id));
  }

  const value = useMemo(
    () => ({
      plan,
      setPlan,
      logs,
      addToPlan,
      removeFromPlan,
      updatePlanItem,
      addLogEntry,
      removeLogEntry,
    }),
    [plan, logs]
  );

  return <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>;
}