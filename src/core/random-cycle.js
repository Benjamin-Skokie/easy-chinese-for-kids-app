function shuffled(items, random = Math.random) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

// Returns every ID once in a random order before starting a new shuffled cycle.
export function nextRandomCycleId(state, cycleKey, ids, random = Math.random) {
  const uniqueIds = [...new Set(ids)];
  if (!uniqueIds.length) return null;

  state.randomPracticeCycles ??= {};
  const previous = state.randomPracticeCycles[cycleKey];
  const signature = uniqueIds.join("\u001f");
  let remainingIds = previous?.signature === signature ? previous.remainingIds.filter((id) => uniqueIds.includes(id)) : [];

  if (!remainingIds.length) {
    remainingIds = shuffled(uniqueIds, random);
    if (previous?.lastId && remainingIds.length > 1 && remainingIds[0] === previous.lastId) {
      [remainingIds[0], remainingIds[1]] = [remainingIds[1], remainingIds[0]];
    }
  }

  const id = remainingIds.shift();
  state.randomPracticeCycles[cycleKey] = { signature, remainingIds, lastId: id };
  return id;
}

// Advances an existing shuffled order and reshuffles it after every complete pass.
export function advanceShuffledOrder(state, orderKey, indexKey, shuffle) {
  const currentOrder = state[orderKey] ?? [];
  if (!currentOrder.length) return;
  const nextIndex = state[indexKey] + 1;
  if (nextIndex < currentOrder.length) {
    state[indexKey] = nextIndex;
    return;
  }

  const nextOrder = shuffle(currentOrder);
  if (nextOrder.length > 1 && nextOrder[0] === currentOrder[currentOrder.length - 1]) {
    [nextOrder[0], nextOrder[1]] = [nextOrder[1], nextOrder[0]];
  }
  state[orderKey] = nextOrder;
  state[indexKey] = 0;
}
