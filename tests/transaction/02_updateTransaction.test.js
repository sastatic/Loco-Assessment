const request = require("supertest");
const app = require("../src/app");

describe("PUT /transactionservice/transaction/:transaction_id", () => {
  it("should update a new transaction if exists or create new one otherwise", async () => {
    const res = await request(app)
      .put("/transactionservice/transaction/7")
      .send({ amount: 2000, type: "groceries", parent_id: 4 });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});
