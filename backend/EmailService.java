package com.keshava.elite.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import java.util.UUID;

/**
 * Service to handle Email Dispatches using Spring Boot's JavaMailSender.
 * Hardened for Gmail Primary Tab delivery.
 */
@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendApprovalEmail(String toAdmin, String studentEmail, String subject, String htmlContent) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        
        // Use true for multipart/HTML
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        // Identity must match the authenticated username exactly
        helper.setFrom("chandugoru927@gmail.com"); 
        helper.setTo(toAdmin);
        helper.setReplyTo(studentEmail);
        helper.setSubject(subject);
        helper.setText(htmlContent, true); 

        // Gmail Primary Tab Optimization Headers
        message.addHeader("X-Priority", "1");
        message.addHeader("Importance", "High");
        message.addHeader("X-Auto-Response-Suppress", "All");
        
        // This makes the email look like a unique transactional notification
        String threadId = UUID.randomUUID().toString();
        message.addHeader("X-Entity-Ref-ID", threadId);
        message.addHeader("References", threadId);

        mailSender.send(message);
        System.out.println("SUCCESS: Mail dispatched to " + toAdmin + " via Gmail SMTP.");
    }
}