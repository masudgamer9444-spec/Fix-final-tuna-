// ══════════════════════════════════════════════
//  M♥S ESPORTS — Firebase Cloud Messaging SW
//  Background Push Notifications
//  GITHUB PE: Root mein rakhna (same folder as HTML)
// ══════════════════════════════════════════════

importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

// ⚠️ APNA FIREBASE CONFIG YAHAN DAALO
const firebaseConfig = {
  apiKey: "AIzaSyCEEpTQoojeUpvlefoSTE86VZh6qhBCeFs",
  authDomain: "fix-final-tuna.firebaseapp.com",
  projectId: "fix-final-tuna",
  storageBucket: "fix-final-tuna.firebasestorage.app",
  messagingSenderId: "53488380628",
  appId: "1:53488380628:web:cd98945a8120b3a5396941"
};

const messaging = firebase.messaging();

// Background message handle karo
messaging.onBackgroundMessage(payload => {
  console.log('[SW] Background message:', payload);

  const n = payload.notification || {};
  const data = payload.data || {};

  const title = n.title || data.title || 'M♥S ESPORTS';
  const body  = n.body  || data.body  || 'Naya notification hai!';
  const icon  = n.icon  || data.icon  || '/icon.png';
  const click = data.click_action || data.url || '/';

  self.registration.showNotification(title, {
    body,
    icon,
    badge: '/icon.png',
    vibrate: [200, 100, 200],
    tag: data.tag || 'msg-gamer',
    data: { url: click },
    actions: [
      { action: 'open', title: '👀 Dekho' },
      { action: 'close', title: 'Close' }
    ]
  });
});

// Notification click pe app kholo
self.addEventListener('notificationclick', event => {
  event.notification.close();
  if(event.action === 'close') return;
  const url = event.notification.data?.url || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for(const c of list){
        if(c.url.includes(self.location.origin) && 'focus' in c){
          return c.focus();
        }
      }
      if(clients.openWindow) return clients.openWindow(url);
    })
  );
});