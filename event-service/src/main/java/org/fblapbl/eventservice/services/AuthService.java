package org.fblapbl.eventservice.services;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import org.fblapbl.eventservice.graphql.types.UserRole;
import org.fblapbl.eventservice.repositories.SchoolRepository;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;

@Service
public class AuthService {
    private final FirebaseAuth firebaseAuth;
    private final SchoolRepository schoolRepository;

    public AuthService(FirebaseAuth firebaseAuth, SchoolRepository schoolRepository) {
        this.firebaseAuth = firebaseAuth;
        this.schoolRepository = schoolRepository;
    }

    public UserRecord createAccount(UUID id, String email, String password, UserRole role) {
        try {
            UserRecord.CreateRequest createRequest = new UserRecord.CreateRequest();
            createRequest.setUid(id.toString());
            createRequest.setEmail(email);
            createRequest.setPassword(password);
            UserRecord userRecord = firebaseAuth.createUser(createRequest);
            if (role.equals(UserRole.TEACHER)) {
                firebaseAuth.setCustomUserClaims(userRecord.getUid(), Map.of("role", "teacher"));
            } else {
                firebaseAuth.setCustomUserClaims(userRecord.getUid(), Map.of("role", "student"));
            }
            return userRecord;
        } catch (FirebaseAuthException e) {
            throw new IllegalArgumentException(e);
        }
    }
}
