
package com.keshava.elite.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEliteEmail(String to, String replyTo, String subject, String htmlBody) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom("chandugoru927@gmail.com");
        helper.setTo(to);
        helper.setReplyTo(replyTo);
        helper.setSubject(subject);
        helper.setText(htmlBody, true);

        mailSender.send(message);
        System.out.println(">>> [MAIL DISPATCHED] Subject: " + subject + " | Target: " + to);
    }
}
