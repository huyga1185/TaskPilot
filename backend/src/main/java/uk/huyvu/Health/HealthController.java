package uk.huyvu.Health;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/health")
public class HealthController {
    @GetMapping
    public ResponseEntity<Object> getHealth() {
        return ResponseEntity.status(200).body(
                Map.of(
                        "message", "successful"
                )
        );
    }
}
