const request = require("supertest");
const app = require("../../src/app");

describe("Concurrent Requests", () => {
  it("should handle concurrent requests correctly", async () => {
    const concurrentRequests = [
      request(app).get("/transactionservice/sum/1"),
      request(app).get("/transactionservice/sum/2"),
      request(app).get("/transactionservice/types/cars"),
      request(app)
        .put("/transactionservice/transaction/8")
        .send({ amount: 3000, type: "electronics", parent_id: 4 }),
      request(app).get("/transactionservice/transaction/3"),
    ];

    const responses = await Promise.all(concurrentRequests);

    // Validate the responses
    expect(responses[0].status).toBe(200);
    expect(responses[0].body).toEqual({ sum: 20500 });

    expect(responses[1].status).toBe(200);
    expect(responses[1].body).toEqual({ sum: 12500 });

    expect(responses[2].status).toBe(200);
    expect(responses[2].body).toEqual([1, 3]);

    expect(responses[3].status).toBe(200);
    expect(responses[3].body).toEqual({ status: "ok" });

    expect(responses[4].status).toBe(200);
    expect(responses[4].body).toEqual({
      id: 3,
      amount: 3000,
      type: "cars",
      parent_id: 1,
    });
  });
});
