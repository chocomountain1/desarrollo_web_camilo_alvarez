/*package confesiones.auxiliar10.controllers;

import org.springframework.web.bind.annotation.RestController;

import confesiones.auxiliar10.models.Actividad;
import confesiones.auxiliar10.services.ApiService;

import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
public class ApiController {
    private final ApiService apiService;
    public ApiController(ApiService apiService) {
        this.apiService = apiService;

    }
    
    @GetMapping("/get-conf/{title_substring}")
    public Map<String, List<Actividad>> getConfessionEndpoint(@PathVariable("title_substring") String titleSubstring) {
        List<Actividad> confessions = apiService.getConfessions(titleSubstring);
        return Map.of("data", confessions); // Encapsula la lista en un mapa con clave "data"
    }
    
    

    @GetMapping("/get-stats-data")
    public List<Map<String, String>> getStatsDataEndpoint() {
        return apiService.getStatsData();
    }

    @GetMapping("get-map-data")
    public List<Actividad> getMapDataEndpoint() {
        return apiService.getMapData();
    }
}
*/