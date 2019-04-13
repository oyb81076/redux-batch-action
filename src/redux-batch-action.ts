let tx = false;
let currNotify: (() => void) | null = null;
export function batchNotifier(notify: () => void) {
  if (tx) {
    currNotify = notify;
  } else {
    notify();
  }
}
export function batch(fn: () => void) {
  const commit = transaction();
  try {
    fn();
  } finally {
    commit();
  }
}
export function transaction(): () => void {
  if (tx) {
    return loop;
  } else {
    tx = true;
    return commit;
  }
}
function loop() { return; }
function commit() {
  tx = false;
  if (currNotify) {
    const notify = currNotify;
    currNotify = null;
    notify();
  }
}