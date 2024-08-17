const request = require("supertest");
const app = require("../../src/app");

describe("GET /transactionservice/types/:type", () => {
  it("should return all transactions of a type", async () => {
    const res = await request(app).get("/transactionservice/types/cars");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([1, 3]);
  });
});
