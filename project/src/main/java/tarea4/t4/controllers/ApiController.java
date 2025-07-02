package tarea4.t4.controllers;

import org.springframework.web.bind.annotation.RestController;

import tarea4.t4.services.ApiService;


import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class ApiController {
    private final ApiService apiService;
    public ApiController(ApiService apiService) {
        this.apiService = apiService;
    }
    
    @GetMapping("/calcular-promedio")
    public Map<String, Object> calcularPromedio(@RequestParam Long id) {
        System.out.println("hola estoy pasando por la ruta");
        String promedio = apiService.calcularPromedioPorId(id);
        return Map.of("promedio", promedio,"id",id);
    }
}
