import { http, HttpResponse } from "msw";

const handlers = [
  http.get("http://my-backend/fake-date", () => {
    return HttpResponse.json('["2021-01-01", "2021-01-02", "2021-01-03"]');
  }),
];

export { handlers };
