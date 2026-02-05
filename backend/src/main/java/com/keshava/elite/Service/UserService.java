
package com.keshava.elite.Service;

import com.keshava.elite.Entity.User;
import com.keshava.elite.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Save user initially (approved = false)
    public User saveUser(User user) {
        user.setApproved(false);
        user.setStatus("PENDING");
        // We set a placeholder password until the admin approves and generates one
        user.setPassword(passwordEncoder.encode("PENDING_ADMIN_APPROVAL"));
        return userRepository.save(user);
    }

    // Approve user by email and generate password
    public String approveUserByEmail(String email) throws Exception {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new Exception("User not found: " + email));

        if (user.isApproved()) {
            throw new Exception("User is already approved");
        }

        String rawPassword = generateRandomPassword(8);
        user.setPassword(passwordEncoder.encode(rawPassword));
        user.setApproved(true);
        user.setStatus("APPROVED");
        userRepository.save(user);

        return rawPassword; // return generated password to send in email
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    // Encode password using BCrypt
    public String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

    // Generate random password
    public String generateRandomPassword(int length) {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%";
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < length; i++) {
            sb.append(chars.charAt(random.nextInt(chars.length())));
        }
        return sb.toString();
    }
}
