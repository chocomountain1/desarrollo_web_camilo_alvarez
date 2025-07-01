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

    @ManyToOne(optional = false)
    @JoinColumn(name = "actividad_id", nullable = false)
    private Actividad actividad;

    public Nota() {}

    public Nota(Integer nota, Actividad actividad) {
        this.nota = nota;
        this.actividad = actividad;
    }

    public Long getId() {
        return id;
    }

    public Integer getNota() {
        return nota;
    }

    public Actividad getActividad() {
        return actividad;
    }
}

