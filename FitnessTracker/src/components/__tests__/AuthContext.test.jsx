import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthProvider, useAuth } from "../context/AuthContext";

function Demo() {
  const { user, isAuthenticated, register, login, logout } = useAuth();

  return (
    <div>
      <div data-testid="auth">{isAuthenticated ? "yes" : "no"}</div>
      <div data-testid="user">{user?.username || "none"}</div>
      <button onClick={() => register({ username: "testuser", email: "test@test.com", password: "123456", role: "regular" })}>
        Register
      </button>
      <button onClick={() => login({ usernameOrEmail: "testuser", password: "123456" })}>
        Login
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

test("login and logout update auth state", async () => {
  const user = userEvent.setup();

  render(
    <AuthProvider>
      <Demo />
    </AuthProvider>
  );

  await user.click(screen.getByText("Register"));
  await user.click(screen.getByText("Login"));

  expect(screen.getByTestId("auth")).toHaveTextContent("yes");
  expect(screen.getByTestId("user")).toHaveTextContent("testuser");

  await user.click(screen.getByText("Logout"));
  expect(screen.getByTestId("auth")).toHaveTextContent("no");
});