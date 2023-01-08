package org.fblapbl.eventservice.datafetcher;

import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsMutation;
import com.netflix.graphql.dgs.DgsQuery;
import com.netflix.graphql.dgs.InputArgument;
import org.fblapbl.eventservice.graphql.types.CreateEventInput;
import org.fblapbl.eventservice.graphql.types.Event;
import org.fblapbl.eventservice.services.EventService;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@DgsComponent
public class EventDataFetcher {
    private final EventService eventService;

    public EventDataFetcher(EventService eventService) {
        this.eventService = eventService;
    }

    @DgsQuery
    public List<Event> schoolEvents(@InputArgument String schoolId) {
        return eventService.getSchoolEvents(schoolId);
    }

    @DgsQuery
    public Event event(@InputArgument String eventId) {
        return eventService.getEvent(eventId);
    }

    @DgsMutation
    public Event createEvent(@InputArgument CreateEventInput createEventInput) {
        return eventService.createEvent(createEventInput);
    }

    @DgsMutation
    @Transactional
    public Event joinEvent(@InputArgument String eventId, @InputArgument String studentId) {
        return eventService.joinEvent(eventId, studentId);
    }

    @DgsMutation
    @Transactional
    public Event leaveEvent(@InputArgument String eventId, @InputArgument String studentId) {
        return eventService.leaveEvent(eventId, studentId);
    }

    @DgsMutation
    @Transactional
    public Event acceptEventRequest(@InputArgument String eventId, @InputArgument String studentId) {
        return eventService.acceptEventRequest(eventId, studentId);
    }
}