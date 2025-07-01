package confesiones.auxiliar10.models;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table
public class Actividad {

    @Id
    @SequenceGenerator(
        name = "activity_sequence",
        sequenceName = "activity_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "activity_sequence"
    )
    private Long id;

    @Column(length = 100)
    private String sector;
    
    @Column(nullable = false, length = 200)
    private String nombre;

    @Column(nullable = false, length = 100)
    private String email;

    @Column(name = "dia_hora_inicio", nullable =false)
    private LocalDateTime diaHoraInicio;
    
    @Column(name = "dia_hora_termino")
    private LocalDateTime diaHoraTermino;
    @Column(length = 500)
    private String descripcion;

    @OneToMany(mappedBy = "actividad", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ActividadTema> temas;

    public Actividad() {}

    public Actividad(String sector,
                    String nombre,
                    String email,
                    LocalDateTime diaHoraInicio,
                    LocalDateTime diaHoraTermino,
                    String descripcion,
                    List<ActividadTema> temas) {

        this.sector = sector;
        this.nombre = nombre;
        this.email = email;
        this.diaHoraInicio = diaHoraInicio;
        this.diaHoraTermino = diaHoraTermino;
        this.descripcion = descripcion;
        this.temas = temas;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return nombre;
    }

    public String getEmail() {
        return email;
    }

    public LocalDateTime getDiaHoraInicio() {
        return diaHoraInicio;
    }

    public LocalDateTime getDiaHoraTermino() {
        return diaHoraTermino;
    }

    public String getDescription() {
        return descripcion;
    }

    public List<ActividadTema> getTemas() {
        return temas;
    }

    public static Boolean validateActivity(String confText, MultipartFile confImg) {
        // Ejercicio: implementar validacion de confesiones :)
        return true;
    }
}