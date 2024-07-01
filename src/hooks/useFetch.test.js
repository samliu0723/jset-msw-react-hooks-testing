import useFetch from "./useFetch";
import { renderHook, waitFor } from "@testing-library/react";
import { server } from "../mocks/server";
import { rest } from "msw";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("it should fetch data from a given URL", async () => {
  const mockUrl = "http://my-backend/fake-date";

  const { result } = renderHook(() => useFetch(mockUrl));

  // Check initial loading state
  expect(result.current.loading).toBe(true);

  await waitFor(() => {
    expect(result.current.loading).toBe(false);
  });
  expect(result.current.data).toEqual(["1", "2", "3"]);
});

test("it should handle errors", async () => {
  const mockUrl = "http://my-backend/fake-date";

  server.use(
    rest.get(mockUrl, (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  const { result } = renderHook(() => useFetch(mockUrl));

  // Check initial loading state
  expect(result.current.loading).toBe(true);

  await waitFor(() => {
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("Network response was not ok");
  });
});
