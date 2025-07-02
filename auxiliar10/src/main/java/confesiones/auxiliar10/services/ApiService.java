package confesiones.auxiliar10.services;

import java.util.List;
import org.springframework.stereotype.Service;
import java.text.DecimalFormat;

import confesiones.auxiliar10.models.Nota;
import confesiones.auxiliar10.models.NotaRepository;

@Service
public class ApiService {
    private final NotaRepository notaRepository;
    public ApiService(NotaRepository notaRepository) {
        this.notaRepository = notaRepository;
    }

    public String calcularPromedioPorId(Long id) {
        System.out.println("hola estoy calculando el prom");
        double suma = 0;
        double cantidad = 0;
        DecimalFormat df = new DecimalFormat("#.0");
        List<Nota> notas = notaRepository.findAll();
        for(Nota nota: notas){
            if(nota.getActividadId() == id){
                suma += nota.getNota();
                cantidad += 1;
            }
        }
        if(cantidad>0){
        double promedio = suma/cantidad;
        String prom_formateado = df.format(promedio);
        return prom_formateado;
        }
        else{
        return "0";
        }
    }
}
