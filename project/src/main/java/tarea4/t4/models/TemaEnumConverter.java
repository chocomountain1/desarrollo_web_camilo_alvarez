package tarea4.t4.models;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class TemaEnumConverter implements AttributeConverter<TemaEnum,String>{

    @Override
    public String convertToDatabaseColumn(TemaEnum attribute) {
        return attribute.name().toLowerCase();
    }

    @Override
    public TemaEnum convertToEntityAttribute(String dbData) {
        return TemaEnum.valueOf(dbData.toUpperCase());
    }
}