import { render, screen } from "@testing-library/react";
import ExerciseCard from "../ExerciseCard.jsx";
import { WorkoutProvider } from "../../context/WorkoutContext.jsx";

test("renders exercise content", () => {
  const ex = { id: "1", name: "squat", bodyPart: "legs", target: "quads", equipment: "barbell" };

  render(
    <WorkoutProvider>
      <ExerciseCard exercise={ex} />
    </WorkoutProvider>
  );

  expect(screen.getByText(/squat/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /add to workout plan/i })).toBeInTheDocument();
});