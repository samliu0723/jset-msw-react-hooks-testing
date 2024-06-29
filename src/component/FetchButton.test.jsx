import { server } from "../mocks/server";
import FetchButton from "./FetchButton";
import { render, screen, within, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("success", async () => {
  render(<FetchButton />);
  const btn = screen.getByRole("button", { name: /PUSH/i });
  await userEvent.click(btn);
  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});
