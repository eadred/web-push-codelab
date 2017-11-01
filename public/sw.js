/*
*
*  Push Notifications codelab
*  Copyright 2015 Google Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      https://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License
*
*/

/* eslint-env browser, serviceworker, es6 */

'use strict';

const DefaultUrl = 'http://www.zuehlke.com';

self.addEventListener('push', function (event) {
    const data = event.data ? event.data.json() : {msg: '<no data>'};
    if (!data.url) data.url = DefaultUrl;

    console.log(`[Service Worker] Push had this data: "${JSON.stringify(data)}"`);

    const title = 'Push Codelab';
    const options = {
        body: data.msg,
        icon: 'images/icon.png',
        badge: 'images/badge.png', // Only used by Android?
        tag: 'FixedTag' // Ensure only one message ever shown
    };

    const notificationPromise = self.registration.showNotification(title, options);
    event.waitUntil(notificationPromise);
});

self.addEventListener('notificationclick', function (event) {
    console.log('[Service Worker] Notification click Received.');
    console.log(JSON.stringify(event));

    event.notification.close();

    event.waitUntil(
        clients.openWindow(DefaultUrl) // How can we get the Url associated with the message?
    );
});
