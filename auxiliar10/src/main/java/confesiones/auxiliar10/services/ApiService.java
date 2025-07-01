package confesiones.auxiliar10.services;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import org.springframework.stereotype.Service;

import confesiones.auxiliar10.models.Actividad;
import confesiones.auxiliar10.models.ActivityRepository;
import confesiones.auxiliar10.models.Nota;
import confesiones.auxiliar10.models.NotaRepository;

@Service
public class ApiService {
    private final NotaRepository notaRepository;
    public ApiService(NotaRepository notaRepository) {
        this.notaRepository = notaRepository;
    }

    public double calcularPromedioPorId(Long id) {
        System.out.println("hola estoy calculando el prom");
        int suma = 0;
        int cantidad = 0;
        List<Nota> notas = notaRepository.findAll();
        for(Nota nota: notas){
            if(nota.getActividadId() == id){
                suma += nota.getNota();
                cantidad += 1;
            }
        }
        if(cantidad>0){
        double promedio = suma/cantidad;
        return promedio;
        }
        else{
        return 0;
        }
    }
}
