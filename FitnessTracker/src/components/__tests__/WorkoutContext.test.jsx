import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { WorkoutProvider, useWorkout } from "../WorkoutContext.jsx";

function Demo() {
  const { plan, addToPlan } = useWorkout();
  return (
    <div>
      <div data-testid="count">{plan.items.length}</div>
      <button onClick={() => addToPlan({ id: "x", name: "push up" })}>Add</button>
    </div>
  );
}

test("adds item to plan through context", async () => {
  const user = userEvent.setup();
  render(
    <WorkoutProvider>
      <Demo />
    </WorkoutProvider>
  );

  expect(screen.getByTestId("count")).toHaveTextContent("0");
  await user.click(screen.getByRole("button", { name: "Add" }));
  expect(screen.getByTestId("count")).toHaveTextContent("1");
});