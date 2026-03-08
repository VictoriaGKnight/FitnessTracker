import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthProvider } from "../context/AuthContext";
import Login from "../pages/Login";

test("shows validation error on empty login", async () => {
  const user = userEvent.setup();

  render(
    <AuthProvider>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </AuthProvider>
  );

  await user.click(screen.getByRole("button", { name: /login/i }));
  expect(screen.getByText(/please complete all fields/i)).toBeInTheDocument();
});