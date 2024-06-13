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

test("it should update the count to 1 when the button is clicked once", () => {
  render(<App />);
  const button = screen.getByRole("button", { name: /count is 0/i });
  expect(button).toBeInTheDocument();

  fireEvent.click(button);
  expect(button).toHaveTextContent("count is 1");
});

test("snapshot test", () => {
  const { container } = render(<App text={"hello"} />);
  expect(container).toMatchInlineSnapshot(`
<div>
  <div>
    <a
      href="https://vitejs.dev"
      target="_blank"
    >
      <img
        alt="Vite logo"
        class="logo"
      />
    </a>
    <a
      href="https://react.dev"
      target="_blank"
    >
      <img
        alt="React logo"
        class="logo react"
      />
    </a>
  </div>
  <h1>
    Vite + React
  </h1>
  <h2>
    hello
  </h2>
  <div
    class="card"
  >
    <button>
      count is 
      0
    </button>
    <p>
      Edit 
      <code>
        src/App.jsx
      </code>
       and save to test HMR
    </p>
  </div>
  <p
    class="read-the-docs"
  >
    Click on the Vite and React logos to learn more
  </p>
</div>
`);
});

test("it should render the text prop", () => {
  const content = "ok!";
  render(<App text={content} />);
  const text = screen.getByText(content);
  expect(text).toBeInTheDocument();
});
