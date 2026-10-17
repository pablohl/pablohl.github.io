import assert from "node:assert/strict";
import test from "node:test";
import { allocateCustomers, bestResponseToPrevious, circularDistance, crowdedQuarterCustomers, uniformCustomers } from "./model.mjs";

test("the first view spreads one hundred customers evenly", () => {
  const customers = uniformCustomers(100);
  assert.equal(customers.length, 100);
  assert.ok(Math.abs((customers[1] - customers[0]) - 0.01) < 1e-10);
});

test("the second view puts sixty customers in one quarter", () => {
  const customers = crowdedQuarterCustomers(100);
  assert.equal(customers.length, 100);
  assert.equal(customers.filter((position) => position < 0.25).length, 60);
  assert.ok(customers.every((position) => position >= 0 && position < 1));
});

test("changing only the customer distribution can change market shares", () => {
  const stands = [0.06, 0.38, 0.72];
  const even = allocateCustomers(uniformCustomers(100), stands).shares;
  const crowded = allocateCustomers(crowdedQuarterCustomers(100), stands).shares;
  assert.notDeepEqual(crowded, even);
  assert.equal(crowded.reduce((sum, share) => sum + share, 0), 100);
});

test("distance wraps around the circular shore", () => {
  assert.ok(Math.abs(circularDistance(0.95, 0.05) - 0.1) < 1e-10);
});

test("a customer chooses the nearest vendor around the circle", () => {
  const { assignments, shares } = allocateCustomers([0.99, 0.47], [0.03, 0.45, 0.7]);
  assert.deepEqual(assignments, [[0], [1]]);
  assert.deepEqual(shares, [1, 1, 0]);
});

test("ties split customers rather than favoring a vendor", () => {
  const { assignments, shares } = allocateCustomers([0.25], [0, 0.5, 0.75]);
  assert.deepEqual(assignments, [[0, 1]]);
  assert.deepEqual(shares, [0.5, 0.5, 0]);
});

test("co-located stands split their shared customers", () => {
  const { shares } = allocateCustomers([0, 0.5], [0, 0, 0.5]);
  assert.deepEqual(shares, [0.5, 0.5, 1]);
});

test("a rival chooses a best location using only the previous positions", () => {
  const customers = uniformCustomers(100);
  const yesterday = [0, 4 / 12, 9 / 12];
  const choice = bestResponseToPrevious(customers, yesterday, 1);
  const chosenShare = allocateCustomers(customers, [yesterday[0], choice, yesterday[2]]).shares[1];

  assert.ok(Number.isInteger(choice * 12));
  for (let slot = 0; slot < 12; slot += 1) {
    const otherShare = allocateCustomers(customers, [yesterday[0], slot / 12, yesterday[2]]).shares[1];
    assert.ok(chosenShare >= otherShare);
  }
  assert.deepEqual(yesterday, [0, 4 / 12, 9 / 12]);
});
