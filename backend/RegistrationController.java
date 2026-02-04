
package com.keshava.elite.controller;

import com.keshava.elite.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * REST Controller for Keshava Elite Registrations.
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") 
public class RegistrationController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, String> userData) {
        // Log the arrival of the request in STS Console
        System.out.println(">>> REQUEST RECEIVED: Registration for " + userData.get("firstName") + " " + userData.get("lastName"));
        
        try {
            String firstName = userData.get("firstName");
            String lastName = userData.get("lastName");
            String email = userData.get("email");
            String mobile = userData.get("mobile");
            String role = userData.get("role");
            String approvalLink = userData.get("approvalLink");

            String adminEmail = "chandugoru927@gmail.com";
            String subject = "URGENT: New Elite Hub Enrollment - " + firstName;
            
            String body = "<html><body style='font-family: sans-serif; padding: 20px; line-height: 1.6; color: #1a202c;'>" +
                "<div style='max-width: 600px; margin: auto; border: 2px solid #3b82f6; border-radius: 16px; padding: 40px;'>" +
                "<h2 style='color: #1e3a8a; margin-top: 0;'>New Access Request</h2>" +
                "<p>A new user has requested access to the Keshava Elite Learning Management System:</p>" +
                "<div style='background: #f8fafc; padding: 25px; border-radius: 12px; margin: 25px 0;'>" +
                "<p style='margin: 5px 0;'><strong>Student Name:</strong> " + firstName + " " + lastName + "</p>" +
                "<p style='margin: 5px 0;'><strong>Email:</strong> " + email + "</p>" +
                "<p style='margin: 5px 0;'><strong>Mobile:</strong> " + mobile + "</p>" +
                "<p style='margin: 5px 0;'><strong>Role Requested:</strong> <span style='color: #2563eb; font-weight: bold;'>" + role.toUpperCase() + "</span></p>" +
                "</div>" +
                "<p>Please click the button below to authorize this student's access to the portal.</p>" +
                "<div style='text-align: center; margin-top: 40px;'>" +
                "<a href='" + approvalLink + "' style='background: #2563eb; color: #ffffff; padding: 18px 40px; text-decoration: none; border-radius: 12px; font-weight: 800; display: inline-block; font-size: 16px;'>AUTHORIZE ACCOUNT NOW</a>" +
                "</div>" +
                "<p style='color: #718096; font-size: 11px; margin-top: 40px; border-top: 1px solid #e2e8f0; pt: 20px;'>" +
                "Secure Administration Protocol | Keshava Elite Projects Pvt Ltd" +
                "</p>" +
                "</div>" +
                "</body></html>";

            emailService.sendApprovalEmail(adminEmail, email, subject, body);
            System.out.println(">>> SUCCESS: Email sent to " + adminEmail);

            return ResponseEntity.ok(Map.of("status", "success", "message", "Admin notification successfully dispatched."));
        } catch (Exception e) {
            System.err.println(">>> CRITICAL ERROR: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("status", "error", "message", e.getMessage()));
        }
    }
}
