import { server } from "../mocks/server";
import FetchButton from "./FetchButton";
import { render, screen, waitFor, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { rest } from "msw";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("success", async () => {
  const user = userEvent.setup();
  render(<FetchButton />);
  const btn = screen.getByRole("button", { name: /PUSH/i });
  user.click(btn);
  await waitFor(() => {
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(screen.getByRole("list")).toBeInTheDocument();
  });
  const listItems = within(screen.getByRole("list")).getAllByRole("listitem");
  expect(listItems).toHaveLength(3);
  expect(listItems).toMatchInlineSnapshot(`
[
  <li>
    1
  </li>,
  <li>
    2
  </li>,
  <li>
    3
  </li>,
]
`);
});

test("error", async () => {
  server.use(
    rest.get("http://my-backend/fake-date", (req, res, ctx) => {
      return res(ctx.status(400), ctx.json("some_error"));
    })
  );
  const user = userEvent.setup();
  render(<FetchButton />);
  const btn = screen.getByRole("button", { name: /PUSH/i });
  user.click(btn);
  await waitFor(() => {
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
  // await waitFor(() => {
  //   expect(screen.getByText(/some_error/i)).toBeInTheDocument();
  // });

  expect(await screen.findByText(/some_error/i)).toBeInTheDocument();
});
