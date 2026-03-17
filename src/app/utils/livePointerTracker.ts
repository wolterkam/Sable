export type LivePointerSubscriber = (x: number, y: number) => void;

const livePointerSubscribers: LivePointerSubscriber[] = [];

export const subscribeToLivePointer = (subscriber: LivePointerSubscriber) => {
  livePointerSubscribers.push(subscriber);
};

export const unsubscribeFromLivePointer = (subscriber: LivePointerSubscriber) => {
  const index = livePointerSubscribers.indexOf(subscriber);
  if (index === -1) return;
  livePointerSubscribers.splice(index, 1);
};

window.addEventListener('pointermove', (evt) => {
  livePointerSubscribers.forEach((subscriber) => subscriber(evt.clientX, evt.clientY));
});
