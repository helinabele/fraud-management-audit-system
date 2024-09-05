package org.audit.app.service;

import org.springframework.stereotype.Service;

@Service
public class PushNotification {
/* 
    public void sendPushNotification(String recipientToken, String title, String body) {
            // Create the push notification message
            Notification notification = Notification.builder()
            .setTitle(title)
            .setBody(body)
            .build();

        Message message = Message.builder()
            .setNotification(notification)
            .setToken(recipientToken)
            .build();

        try {
            FirebaseMessaging.getInstance().send(message);
        } catch (FirebaseMessagingException e) {
            // Handle the exception
            e.printStackTrace();
        }
    } */
}
