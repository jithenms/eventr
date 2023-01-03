package com.example.events.eventapp.services;

import com.example.events.eventapp.generated.types.RegisterUserInput;
import com.example.events.eventapp.generated.types.UserRole;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class AuthService {
    private final FirebaseAuth firebaseAuth;

    public AuthService(FirebaseAuth firebaseAuth) {
        this.firebaseAuth = firebaseAuth;
    }

    public UserRecord createUser(RegisterUserInput registerUserInput) {
        try {
            UserRecord.CreateRequest createRequest = buildCreateRequest(registerUserInput);
            UserRecord userRecord = firebaseAuth.createUser(createRequest);
            if(registerUserInput.getRole() == UserRole.TEACHER) {
                firebaseAuth.setCustomUserClaims(userRecord.getUid(), Map.of("role", "teacher"));
            } else if(registerUserInput.getRole() == UserRole.STUDENT) {
                firebaseAuth.setCustomUserClaims(userRecord.getUid(), Map.of("role", "student"));
            }
            return userRecord;
        } catch (FirebaseAuthException e) {
            throw new IllegalArgumentException(e);
        }
    }


    private UserRecord.CreateRequest buildCreateRequest(RegisterUserInput registerUserInput) {
        UserRecord.CreateRequest createRequest = new UserRecord.CreateRequest();
        createRequest.setEmail(registerUserInput.getEmail());
        createRequest.setPassword(registerUserInput.getPassword());
        return createRequest;
    }

    public FirebaseToken verifyTeacher(String idToken) {
        try {
            FirebaseToken decodedToken = firebaseAuth.verifyIdToken(idToken);
            if (!decodedToken.getClaims().get("role").equals("teacher"))
                throw new IllegalArgumentException("Invalid Role");
            return decodedToken;
        } catch (FirebaseAuthException e) {
            throw new IllegalArgumentException("Unauthenticated User");
        }
    }

    public FirebaseToken verifyUser(String idToken) {
        try {
            return firebaseAuth.verifyIdToken(idToken);
        } catch (FirebaseAuthException e) {
            throw new IllegalArgumentException("Unauthenticated User");
        }
    }

}
