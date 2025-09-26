package com.example.department;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DepartmentLibraryController {
    @GetMapping("/department/info")
    public String info() {
        return "Departmental Library Service is running";
    }
}
