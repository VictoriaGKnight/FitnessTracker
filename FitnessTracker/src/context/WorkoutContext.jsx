/*
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
*/

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext.jsx";

const WorkoutContext = createContext(null);

export function useWorkout() {
  const ctx = useContext(WorkoutContext);
  if (!ctx) throw new Error("useWorkout must be used within WorkoutProvider");
  return ctx;
}

const LS_CURRENT_PLAN_KEY = "ft-current-plan-by-user";
const LS_SAVED_WORKOUTS_KEY = "ft-saved-workouts-by-user";
const LS_LOGS_KEY = "ft-logs-by-user";

export function WorkoutProvider({ children }) {
  const { user } = useAuth();

  const [currentPlanByUser, setCurrentPlanByUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_CURRENT_PLAN_KEY)) || {};
    } catch {
      return {};
    }
  });

  const [savedWorkoutsByUser, setSavedWorkoutsByUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_SAVED_WORKOUTS_KEY)) || {};
    } catch {
      return {};
    }
  });

  const [logsByUser, setLogsByUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_LOGS_KEY)) || {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(LS_CURRENT_PLAN_KEY, JSON.stringify(currentPlanByUser));
  }, [currentPlanByUser]);

  useEffect(() => {
    localStorage.setItem(LS_SAVED_WORKOUTS_KEY, JSON.stringify(savedWorkoutsByUser));
  }, [savedWorkoutsByUser]);

  useEffect(() => {
    localStorage.setItem(LS_LOGS_KEY, JSON.stringify(logsByUser));
  }, [logsByUser]);

  const username = user?.username;

  const plan = username
    ? currentPlanByUser[username] || { name: "My Plan", items: [] }
    : { name: "My Plan", items: [] };

  const savedWorkouts = username ? savedWorkoutsByUser[username] || [] : [];
  const logs = username ? logsByUser[username] || [] : [];

  function loadWorkoutIntoBuilder(workout) {
  if (!username || !workout) return;

  setCurrentPlanByUser((prev) => ({
    ...prev,
    [username]: {
      name: workout.title || workout.name,
      items: workout.items || [],
    },
  }));
}

  function setPlan(updater) {
    if (!username) return;

    setCurrentPlanByUser((prev) => {
      const current = prev[username] || { name: "My Plan", items: [] };
      const nextPlan = typeof updater === "function" ? updater(current) : updater;

      return {
        ...prev,
        [username]: nextPlan,
      };
    });
  }

  function addToPlan(exercise) {
    if (!username) return;

    setPlan((prev) => {
      const exists = prev.items.some((x) => x.id === exercise.id);
      if (exists) return prev;

      return {
        ...prev,
        items: [...prev.items, { ...exercise, sets: 3, reps: 10 }],
      };
    });
  }

  function removeFromPlan(id) {
    if (!username) return;

    setPlan((prev) => ({
      ...prev,
      items: prev.items.filter((x) => x.id !== id),
    }));
  }

  function updatePlanItem(id, patch) {
    if (!username) return;

    setPlan((prev) => ({
      ...prev,
      items: prev.items.map((x) => (x.id === id ? { ...x, ...patch } : x)),
    }));
  }

  function saveCurrentWorkout() {
  if (!username) return;
  if (!plan.name.trim() || plan.items.length === 0) return;

  const workoutToSave = {
    id: crypto.randomUUID(),
    name: plan.name,
    items: plan.items,
  };

  setSavedWorkoutsByUser((prev) => {
    const current = prev[username] || [];
    return {
      ...prev,
      [username]: [...current, workoutToSave],
    };
  });

  setCurrentPlanByUser((prev) => ({
    ...prev,
    [username]: { name: "My Plan", items: [] },
  }));
}

  function removeSavedWorkout(id) {
    if (!username) return;

    setSavedWorkoutsByUser((prev) => {
      const current = prev[username] || [];
      return {
        ...prev,
        [username]: current.filter((w) => w.id !== id),
      };
    });
  }

  function addLogEntry(entry) {
    if (!username) return;

    setLogsByUser((prev) => {
      const current = prev[username] || [];
      return {
        ...prev,
        [username]: [{ ...entry, id: crypto.randomUUID() }, ...current],
      };
    });
  }

  function removeLogEntry(id) {
    if (!username) return;

    setLogsByUser((prev) => {
      const current = prev[username] || [];
      return {
        ...prev,
        [username]: current.filter((x) => x.id !== id),
      };
    });
  }

  const value = useMemo(
    () => ({
      plan,
      setPlan,
      savedWorkouts,
      logs,
      addToPlan,
      removeFromPlan,
      updatePlanItem,
      saveCurrentWorkout,
      removeSavedWorkout,
      addLogEntry,
      removeLogEntry,
      loadWorkoutIntoBuilder,
    }),
    [plan, savedWorkouts, logs]
  );

  return <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>;
}