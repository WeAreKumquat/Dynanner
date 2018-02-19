self.addEventListener('push', (event) => {
  if (!(self.Notification && self.Notification.permission === 'granted')) {
    return;
  }

  let data = {};
  if (event.data) {
    data = event.data.json();
  }
  const { title, message } = data;
  const icon = 'placeholder.png';

  self.clickTarget= data.clickTarget;

  event.waitUntil(self.registration.showNotification(title, {
    body: message,
    tag: 'reminder',
    icon,
    badge: icon,
  }));
});

self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification click received.');

  event.notification.close();

  if (clients.openWindow) {
    event.waitUntil(clients.openWindow(self.clickTarget));
  }
});
