package org.fblapbl.eventservice.services;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;
import org.fblapbl.eventservice.graphql.types.CreateAccountInput;
import org.fblapbl.eventservice.graphql.types.UserRole;
import org.fblapbl.eventservice.repositories.SchoolRepository;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.UUID;

@Component
public class AuthService {
    private final FirebaseAuth firebaseAuth;
    private final SchoolRepository schoolRepository;

    public AuthService(FirebaseAuth firebaseAuth, SchoolRepository schoolRepository) {
        this.firebaseAuth = firebaseAuth;
        this.schoolRepository = schoolRepository;
    }

    public UserRecord createAccount(String email, String password, UUID schoolId) {
        try {
            UserRecord.CreateRequest createRequest = new UserRecord.CreateRequest();
            createRequest.setEmail(email);
            createRequest.setPassword(password);
            UserRecord userRecord = firebaseAuth.createUser(createRequest);
            firebaseAuth.setCustomUserClaims(userRecord.getUid(), Map.of("role", "teacher", "school-id", schoolId.toString()));
            return userRecord;
        } catch (FirebaseAuthException e) {
            throw new IllegalArgumentException(e);
        }
    }
}
