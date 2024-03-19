package org.audit.app.service;

import org.springframework.stereotype.Service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;

import com.google.firebase.messaging.Notification;
import com.google.firebase.messaging.Message;

@Service
public class PushNotification {

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
    }
}
