package org.fblapbl.eventservice.datafetcher;

import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsMutation;
import com.netflix.graphql.dgs.DgsQuery;
import com.netflix.graphql.dgs.InputArgument;
import org.fblapbl.eventservice.graphql.types.CreatePrizeInput;
import org.fblapbl.eventservice.graphql.types.Prize;
import org.fblapbl.eventservice.services.PrizeService;

import java.util.List;

@DgsComponent
public class PrizeDataFetcher {
    private final PrizeService prizeService;

    public PrizeDataFetcher(PrizeService prizeService) {
        this.prizeService = prizeService;
    }

    @DgsQuery
    public List<Prize> schoolPrizes(@InputArgument String schoolId) {
        return prizeService.getSchoolPrizes(schoolId);
    }

    @DgsQuery
    public List<Prize> studentPrizes(@InputArgument String studentId) {
        return prizeService.getStudentPrizes(studentId);
    }


    @DgsMutation
    public Prize createPrize(@InputArgument CreatePrizeInput createPrizeInput) {
        return prizeService.createPrize(createPrizeInput);
    }

    @DgsMutation
    public Prize redeemPrize(@InputArgument String prizeId, @InputArgument String studentId) {
        return prizeService.redeemPrize(prizeId, studentId);
    }
}
