import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("renders Vite and React logos", () => {
  render(<App />);
  const viteLogo = screen.getByAltText("Vite logo");
  const reactLogo = screen.getByAltText("React logo");

  expect(viteLogo).toBeInTheDocument();
  expect(reactLogo).toBeInTheDocument();
  expect(viteLogo.closest("a")).toHaveAttribute("href", "https://vitejs.dev");
  expect(reactLogo.closest("a")).toHaveAttribute("href", "https://react.dev");
});

test("renders Vite + React title", () => {
  render(<App />);
  const title = screen.getByText("Vite + React");
  expect(title).toBeInTheDocument();
});

test("renders button and increments counter", () => {
  render(<App />);
  const button = screen.getByText(/count is 0/i);
  expect(button).toBeInTheDocument();

  fireEvent.click(button);
  expect(button).toHaveTextContent("count is 1");
});

test("renders edit instructions", () => {
  render(<App />);
  const editText = screen.getByText("Edit", { exact: false });
  const codeText = screen.getByText("src/App.jsx", { exact: false });
  const saveText = screen.getByText("and save to test HMR", { exact: false });

  expect(editText).toBeInTheDocument();
  expect(codeText).toBeInTheDocument();
  expect(saveText).toBeInTheDocument();
});

test('renders "read the docs" paragraph', () => {
  render(<App />);
  const readTheDocs = screen.getByText(
    /click on the vite and react logos to learn more/i
  );
  expect(readTheDocs).toBeInTheDocument();
});
