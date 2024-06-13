import { act, render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

test("Button onClick", async () => {
  jest.useFakeTimers();
  render(<Button text="Click me" />);
  fireEvent.click(screen.getByText("Click me"));

  expect(screen.getByText("Click me")).toHaveAttribute("disabled");
  expect(screen.getByText("Click me")).toBeDisabled();
  expect(screen.getByText("Loading...")).toBeInTheDocument();
  act(() => {
    // jest.runAllTimers();
    jest.advanceTimersByTime(3000);
  });
  expect(screen.getByText("Click me")).not.toHaveAttribute("disabled");
  expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
});
