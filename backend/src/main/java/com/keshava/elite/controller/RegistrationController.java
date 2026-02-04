package com.keshava.elite.controller;

import com.keshava.elite.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;
import java.util.Date;

@RestController
@RequestMapping("/api")
public class RegistrationController {

    @Autowired
    private EmailService emailService;

    @GetMapping("/health")
    public ResponseEntity<?> healthCheck() {
        System.out.println(">>> [SERVER HEARTBEAT] Handshake successful at: " + new Date());
        Map<String, Object> status = new HashMap<>();
        status.put("active", true);
        status.put("origin", "Spring Boot (STS)");
        status.put("serverTime", new Date().toString());
        return ResponseEntity.ok(status);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, String> userData) {
        String firstName = userData.get("firstName");
        String email = userData.get("email");
        
        System.out.println("\n--- PROCESSING ENROLLMENT ---");
        System.out.println("Source: " + email);
        
        try {
            String lastName = userData.get("lastName");
            String mobile = userData.get("mobile");
            String role = userData.get("role");
            String approvalLink = userData.get("approvalLink");

            String adminEmail = "chandugoru927@gmail.com";
            String subject = "ACTION REQUIRED: New Elite Enrollment - " + firstName;
            
            String body = "<html><body style='font-family: sans-serif; padding: 20px; color: #1e293b;'>" +
                "<div style='max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 20px; padding: 40px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);'>" +
                "<h2 style='color: #2563eb; margin-bottom: 24px;'>Elite Portal Registration</h2>" +
                "<div style='background: #f8fafc; padding: 20px; border-radius: 12px; margin-bottom: 30px;'>" +
                "<p><strong>Name:</strong> " + firstName + " " + lastName + "</p>" +
                "<p><strong>Email:</strong> " + email + "</p>" +
                "<p><strong>Role:</strong> " + role.toUpperCase() + "</p>" +
                "</div>" +
                "<div style='text-align: center;'>" +
                "<a href='" + approvalLink + "' style='background: #2563eb; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-weight: bold; display: inline-block;'>APPROVE STUDENT</a>" +
                "</div>" +
                "</div></body></html>";

            emailService.sendApprovalEmail(adminEmail, email, subject, body);
            
            System.out.println(">>> [SUCCESS] Dispatch confirmed.");
            return ResponseEntity.ok(Map.of("status", "success", "message", "Admin notified via email."));

        } catch (Exception e) {
            System.err.println(">>> [FAILURE] " + e.getMessage());
            return ResponseEntity.status(500).body(Map.of("status", "error", "message", "Email subsystem failure. Check STS logs."));
        }
    }
}
