const request = require("supertest");
const app = require("../../src/app");

describe("GET /transactionservice/sum/:transaction_id", () => {
  it("should return the sum of all transactions linked to a specific transaction", async () => {
    const res = await request(app).get("/transactionservice/sum/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ sum: 20500 });
  });
});
