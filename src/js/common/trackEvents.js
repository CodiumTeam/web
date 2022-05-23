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
  window.ga && window.ga('send', 'event', category, action, label);
}

export function trackEventGTag(eventName, opts = {}) {
  window.dataLayer &&
    window.dataLayer.push({
      event: eventName,
      ...opts,
    });
}
