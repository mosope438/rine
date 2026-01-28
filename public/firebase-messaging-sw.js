importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);
// // Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyDL3HKS11LJVLtqtNe9NUFJuwMV8Z9wk0Q",
    authDomain: "yumyfy-a0296.firebaseapp.com",
    projectId: "yumyfy-a0296",
    storageBucket: "yumyfy-a0296.firebasestorage.app",
    messagingSenderId: "224892198397",
    appId: "1:224892198397:web:5e8e0e51603003f5da0d94",
  measurementId: "",
};

firebase?.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase?.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
