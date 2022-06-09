export function initTrackEvents() {
  const trackEvents = document.querySelectorAll('[data-trackevent]');
  trackEvents.forEach((element) => {
    element.addEventListener('click', (event) => {
      const events = (event.currentTarget.dataset.trackevent || '').split('.');
      trackEvent(events[0], events[1], events[2]);
    });
  });
}

export function trackEvent(category, action, label) {
  if (location.hostname === 'localhost') return;

  window.ga && window.ga('send', 'event', category, action, label);
}

export function trackEventGTag(eventName, opts = {}) {
  if (location.hostname === 'localhost') return;

  window.dataLayer &&
    window.dataLayer.push({
      event: eventName,
      ...opts,
    });
}
