package confesiones.auxiliar10.models;

import java.time.LocalDateTime;

import org.springframework.web.multipart.MultipartFile;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;
import jakarta.persistence.Column;

@Entity
@Table(name = "actividad_tema")
public class ActividadTema {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Convert(converter = TemaEnumConverter.class)
    @Column(nullable = false)
    private TemaEnum tema;

    @Column(name = "glosa_otro", length = 15)
    private String glosaOtro;

    @ManyToOne(optional = false)
    @JoinColumn(name = "actividad_id", nullable = false)
    private Actividad actividad;


    public ActividadTema() {}

    public ActividadTema(TemaEnum tema, String glosaOtro, Actividad actividad) {
        this.tema = tema;
        this.glosaOtro = glosaOtro;
        this.actividad = actividad;
    }


    public Long getId() {
        return id;
    }

    public TemaEnum getTema() {
        return tema;
    }

    public String getGlosaOtro() {
        return glosaOtro;
    }

    public Actividad getActividad() {
        return actividad;
    }
}
