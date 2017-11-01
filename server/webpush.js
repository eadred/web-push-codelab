const webpush = require('web-push');

// Result of calling webpush.generateVAPIDKeys();
const vapidPublicKey = 'BE_hzdgC6WkehS9oLdN7dFhfpCeGuF64trYt0OkQfBqJm1yeIlCKcb2BOWYi2zLjOH7lTOU18y88Z8QIymU2EJE';
const vapidPrivateKey = 'zxaWP-UVpi6ywpYb9aIuW7Bu1-SKKcPM_7WJOBfX-vM'

const gcmApiKey = 'AIzaSyCYiS4rfcS3H3ebcIoGJuhCovvV8dUX-Fo';

module.exports = function() {
    webpush.setGCMAPIKey(gcmApiKey);

    webpush.setVapidDetails(
      'mailto:example@yourdomain.org',
      vapidPublicKey,
      vapidPrivateKey
    );

    var result = {
        subscription: undefined,
    }

    result.subscribe = function(subscription) {
        result.subscription = subscription;
    }

    result.unsubscribe = function() {
        result.subscription = undefined;
    }

    result.notify = function(payload) {
        if (result.subscription) {
            webpush.sendNotification(result.subscription, payload)
            .catch(err => console.error(err));
        }
    }

    return result;
}