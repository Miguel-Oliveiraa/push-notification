/* eslint-disable no-restricted-globals */
self.addEventListener('push', function (event) {
    const body = event.data?.text() ?? ''
    event.waitUntil(
        self.registration.showNotification('Push Notification', {
            body
        })
    );
});