package com.example.backend;

import com.example.backend.CLI.EventCLIApplication;
import com.example.backend.CLI.TicketCLIApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Profile;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {

    @Autowired
    private ApplicationContext context;

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        // If running with the CLI profile, execute CLI applications
        if (args.length > 0) {
            if (args[0].equals("event-cli")) {
                EventCLIApplication eventCLI = context.getBean(EventCLIApplication.class);
                eventCLI.run();
            } else if (args[0].equals("ticket-cli")) {
                TicketCLIApplication ticketCLI = context.getBean(TicketCLIApplication.class);
                ticketCLI.run();
            }
        }
    }
}
