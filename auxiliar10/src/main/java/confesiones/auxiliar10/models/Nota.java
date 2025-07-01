package confesiones.auxiliar10.models;

import jakarta.persistence.*;

@Entity
@Table(name = "nota")
public class Nota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer nota;

    @JoinColumn(name = "actividad_id", nullable = false)
    private Long actividadId;

    public Nota() {}

    public Nota(Integer nota, Long actividadId) {
        this.nota = nota;
        this.actividadId = actividadId;
    }

    public Long getId() {
        return id;
    }

    public Integer getNota() {
        return nota;
    }

    public Long getActividadId() {
        return actividadId;
    }

    public Boolean validateNota(Integer nota){
        if(nota> 7 || nota <1){
            return true;
        }
        else{
            return false;
        }
    }
}

