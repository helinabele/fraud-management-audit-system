package org.audit.app.service;

import java.io.FileInputStream;
import java.util.List;
import java.util.Set;

import org.audit.app.service.dto.AssignTaskDTO;
import org.audit.app.service.dto.EmployeeDTO;
import org.audit.app.service.dto.TaskDTO;
import org.audit.app.service.dto.TeamDTO;
import org.springframework.stereotype.Service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.core.io.ClassPathResource;
import java.io.InputStream;

@Service
public class NotificationService {

    private final PushNotification pushNotification;

    @Autowired
    public NotificationService(PushNotification pushNotification) {
        this.pushNotification = pushNotification;
        initializeFirebase();
    }

    @SuppressWarnings("deprecation")
    
    private void initializeFirebase() {
        try {
            // Use ClassPathResource to load the JSON file from resources
            ClassPathResource resource = new ClassPathResource("fraudmgt-641a2-firebase-adminsdk-z6ols-0656ddc8cc.json");
            InputStream serviceAccount = resource.getInputStream();
    
            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();
    
            // Check if FirebaseApp with the name [DEFAULT] already exists
            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
            }
    
        } catch (Exception e) {
            // Handle initialization errors
            e.printStackTrace();
        }
    }    public void sendTaskAssignmentNotification(AssignTaskDTO assignTaskDTO) {
        // Retrieve necessary information from the AssignTaskDTO
        TaskDTO task = assignTaskDTO.getTask();
        TeamDTO team = assignTaskDTO.getTeam();

        // Check if either task or team is null
        if (task == null || team == null) {
            // Handle the case when either task or team is null
            // For example, you can log an error and return early
            System.err.println("Error: task or team is null.");
            return;
        }

        // Extract the relevant data from the TaskDTO
        String taskTitle = task.getTitle();

        // Retrieve the employees under the team
        List<EmployeeDTO> employee = team.getEmployee();

        // Check if employees are not null
        if (employee != null && !employee.isEmpty()) {
            for (EmployeeDTO employee1 : employee) {
                String recipientToken = getRecipientTokenForEmployee(employee1);

                // Send notification to each employee
                if (recipientToken != null) {
                    pushNotification.sendPushNotification(recipientToken, "Task Assigned",
                            "You have been assigned a new task: " + taskTitle);
                }
            }
        } else {
            // Handle the case when the employees under the team are null or empty
            System.err.println("Error: No employees found under the team.");
        }
    }

    private String getRecipientTokenForEmployee(EmployeeDTO employee) {
        // Retrieve the recipient token for the employee from the database or another
        // source
        // For demonstration purposes, returning a mock token
        return "mockRecipientToken";
    }
}
