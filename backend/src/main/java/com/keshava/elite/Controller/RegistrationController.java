
package com.keshava.elite.Controller;

import com.keshava.elite.Entity.User;
import com.keshava.elite.Service.EmailService;
import com.keshava.elite.Service.UserService;
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
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @GetMapping("/health")
    public ResponseEntity<?> healthCheck() {
        Map<String, Object> status = new HashMap<>();
        status.put("active", true);
        status.put("serverTime", new Date().toString());
        status.put("port", 9090);
        status.put("version", "1.0.0-ELITE");
        return ResponseEntity.ok(status);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Map<String,String> userData) {
        try {
            User user = new User();
            user.setFirstName(userData.get("firstName"));
            user.setLastName(userData.get("lastName"));
            user.setEmail(userData.get("email"));
            user.setRole(userData.get("role"));
            user.setMobile(userData.get("mobile"));

            User savedUser = userService.saveUser(user);

            // Notify admin for approval
            String approvalLink = "http://localhost:9090/api/approveUser?email=" + savedUser.getEmail();
            String adminEmail = "chandugoru927@gmail.com";
            emailService.sendApprovalEmailToAdmin(adminEmail,
                    savedUser.getFirstName(), savedUser.getLastName(),
                    savedUser.getEmail(), savedUser.getRole(), approvalLink);

            return ResponseEntity.ok(Map.of("status","success","message","Student registered, admin notified."));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("status","error","message","Failed to register user"));
        }
    }

    @PostMapping("/enroll")
    public ResponseEntity<?> enrollCourse(@RequestBody Map<String, Object> enrollmentData) {
        try {
            String studentName = (String) enrollmentData.get("studentName");
            String courseTitle = (String) enrollmentData.get("courseTitle");
            String totalAmount = enrollmentData.get("totalAmount").toString();
            
            String adminEmail = "chandugoru927@gmail.com";
            String subject = "ELITE PAYMENT: New Enrollment - " + courseTitle;
            String body = "Successful payment received from: " + studentName + 
                         "\nCourse: " + courseTitle + 
                         "\nAmount: ₹" + totalAmount;
            
            emailService.sendEmail(adminEmail, subject, body);
            return ResponseEntity.ok(Map.of("status", "success", "txId", "TXN_" + System.currentTimeMillis()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("status","error","message", e.getMessage()));
        }
    }

    @GetMapping("/approveUser")
    public ResponseEntity<?> approveUser(@RequestParam String email) {
        try {
            String password = userService.approveUserByEmail(email);
            User user = userService.getUserByEmail(email);

            // Send credentials to user
            emailService.sendUserApprovalEmail(user.getEmail(), user.getFirstName(), password);

            return ResponseEntity.ok(Map.of("status","success","message","Student approved and email sent."));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("status","error","message", e.getMessage()));
        }
    }
}
