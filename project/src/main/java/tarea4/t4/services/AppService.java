package tarea4.t4.services;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.MessageDigest;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Formatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import tarea4.t4.models.Actividad;
import tarea4.t4.models.ActivityRepository;
import tarea4.t4.models.Nota;
import tarea4.t4.models.NotaRepository;

@Service
public class AppService {

    private final NotaRepository notaRepository;

    public AppService(NotaRepository notaRepository){
        this.notaRepository = notaRepository;
    }

    public void handleNotaPostRequest(Long actividad_id,Integer nota) {

            Nota nueva_nota = new Nota(
                nota,
                actividad_id
            );
            if (nueva_nota.validateNota(nota)) {
                throw new IllegalArgumentException("¡La nota debe ser entre 1 y 7!");
            }
            notaRepository.save(nueva_nota);
            System.out.println("¡Nota guardada exitosamente!.");
    }
}
