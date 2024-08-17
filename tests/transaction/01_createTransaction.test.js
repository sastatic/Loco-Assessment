const request = require("supertest");
const app = require("../src/app");

describe("POST /transactionservice/transaction/:transaction_id", () => {
  it("should create a new transaction", async () => {
    const res = await request(app)
      .post("/transactionservice/transaction/7")
      .send({ amount: 1000, type: "groceries", parent_id: 4 });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});
