# desarrollo_web_camilo_alvarez Tarea 4
Como parte del desarrollo de la Tarea 4, fue necesario trasladar algunas dependencias de la Tarea 3, originalmente diseñadas para una aplicación en el framework Flask, a una nueva implementación basada en Spring Boot.

En este proceso, y considerando los requerimientos específicos de esta tarea, se modelaron las clases Actividad, ActividadTema, Nota y TemaEnum. Para facilitar el manejo de estas clases y su persistencia en la base de datos, se incorporaron los repositorios ActivityRepository y NotaRepository, permitiendo el uso de funciones estándar de JPA como findAll(). Además, se implementó un TemaEnumConverter para convertir los valores del enum TemaEnum de mayúsculas a minúsculas, dado que los enums en Java son inmutables y por defecto en mayúsculas.

Cabe destacar que la clase Actividad no está asociada a ninguna región ni comuna, ya que para esta tarea la localización detallada no era relevante. Se consideró suficiente con la locación ingresada manualmente por el usuario. Por razones similares, otros atributos como las fotos asociadas a una actividad fueron descartados para efectos de esta implementación.

*Debido a estas simplificaciones, funcionalidades como las estadísticas, el registro de nuevas actividades y la visualización completa de la lista de actividades están desactivadas o no funcionan completamente. Esto también afecta el funcionamiento del index principal*.

En la portada (index) se añadió un botón "Evaluar actividades", que redirige al módulo correspondiente donde es posible evaluar una actividad existente.

Actualmente, la base de datos contiene tres actividades, sin embargo, solo se muestra una debido a la condición que se muestren solo las actividades que han terminado, la que puede ser evaluada, permitiendo visualizar su promedio. Para agregar nuevas actividades, se debe conectar directamente a la base de datos usada en la Tarea 3 y registrar una nueva entrada manualmente.