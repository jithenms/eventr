package org.fblapbl.eventservice.datafetcher;

import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsMutation;
import com.netflix.graphql.dgs.DgsQuery;
import com.netflix.graphql.dgs.InputArgument;
import org.fblapbl.eventservice.graphql.types.*;
import org.fblapbl.eventservice.services.UserService;

import javax.transaction.Transactional;
import java.util.List;

@DgsComponent
public class UserDataFetcher {
    private final UserService userService;

    public UserDataFetcher(UserService userService) {
        this.userService = userService;
    }

    @DgsQuery
    public Student student(@InputArgument String authId) {
        return userService.getStudent(authId);
    }

    @DgsQuery
    public Teacher teacher(@InputArgument String authId) {
        return userService.getTeacher(authId);
    }

    @DgsQuery
    public List<Student> leaderboard(@InputArgument String schoolId, @InputArgument Integer quarter) {
        return userService.getLeaderboard(schoolId, quarter);
    }

    @DgsMutation
    @Transactional
    public School createAccount(@InputArgument CreateAccountInput createAccountInput) {
        return userService.createAccount(createAccountInput);
    }

    @DgsMutation
    @Transactional
    public Student createStudent(@InputArgument CreateStudentInput createStudentInput) {
        return userService.createStudent(createStudentInput);
    }
}
