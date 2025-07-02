package tarea4.t4.models;

public enum TemaEnum {
    MUSICA("Música"),
    DEPORTE("Deporte"),
    CIENCIAS("Ciencias"),
    RELIGION("Religión"),
    POLITICA("Política"),
    TECNOLOGIA("Tecnología"),
    JUEGOS("Juegos"),
    BAILE("Baile"),
    COMIDA("Comida"),
    OTRO("Otro");

    private final String etiqueta;

    TemaEnum(String etiqueta) {
        this.etiqueta = etiqueta;
    }

    public String getEtiqueta() {
        return etiqueta;
    }
}

