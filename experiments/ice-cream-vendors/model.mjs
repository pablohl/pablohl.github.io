const EPSILON = 1e-10;

export function uniformCustomers(count) {
  return Array.from({ length: count }, (_, index) => (index + 0.5) / count);
}

export function crowdedQuarterCustomers(count) {
  const crowdedCount = Math.round(count * 0.6);
  const remainingCount = count - crowdedCount;
  const crowded = Array.from(
    { length: crowdedCount },
    (_, index) => (index + 0.5) * 0.25 / crowdedCount
  );
  const remaining = Array.from(
    { length: remainingCount },
    (_, index) => 0.25 + (index + 0.5) * 0.75 / remainingCount
  );
  return [...crowded, ...remaining];
}

export function circularDistance(first, second) {
  const difference = Math.abs(first - second) % 1;
  return Math.min(difference, 1 - difference);
}

export function allocateCustomers(customers, vendors) {
  if (vendors.length === 0) {
    throw new Error("At least one vendor is required.");
  }

  const shares = vendors.map(() => 0);
  const assignments = customers.map((customer) => {
    const distances = vendors.map((vendor) => circularDistance(customer, vendor));
    const nearest = Math.min(...distances);
    const winners = distances.flatMap((distance, index) =>
      Math.abs(distance - nearest) < EPSILON ? [index] : []
    );

    for (const winner of winners) {
      shares[winner] += 1 / winners.length;
    }

    return winners;
  });

  return { assignments, shares };
}

export function bestResponseToPrevious(customers, previousPositions, vendorIndex, slotCount = 12) {
  if (vendorIndex < 0 || vendorIndex >= previousPositions.length || slotCount < 1) {
    throw new Error("A valid vendor and at least one location are required.");
  }

  let bestPosition = 0;
  let bestShare = -1;
  let leastMovement = Infinity;

  for (let slot = 0; slot < slotCount; slot += 1) {
    const candidate = slot / slotCount;
    const hypothetical = [...previousPositions];
    hypothetical[vendorIndex] = candidate;
    const share = allocateCustomers(customers, hypothetical).shares[vendorIndex];
    const movement = circularDistance(candidate, previousPositions[vendorIndex]);

    if (share > bestShare + EPSILON ||
        (Math.abs(share - bestShare) < EPSILON && movement < leastMovement - EPSILON)) {
      bestPosition = candidate;
      bestShare = share;
      leastMovement = movement;
    }
  }

  return bestPosition;
}
