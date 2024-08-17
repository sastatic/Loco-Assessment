const request = require("supertest");
const app = require("../../src/app");

describe("GET /transactionservice/transaction/:transaction_id", () => {
  it("should return the transaction details", async () => {
    const res = await request(app).get("/transactionservice/transaction/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      amount: 5000,
      type: "cars",
      parent_id: null,
    });
  });
});
