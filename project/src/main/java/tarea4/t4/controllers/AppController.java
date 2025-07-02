package tarea4.t4.controllers;

import java.util.List;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import tarea4.t4.models.Actividad;
import tarea4.t4.models.ActivityRepository;
import tarea4.t4.models.Nota;
import tarea4.t4.models.NotaRepository;
import tarea4.t4.services.AppService;

@Controller
public class AppController {
      private final AppService appService;
    
      private final ActivityRepository activityRepository;
      private final NotaRepository notaRepository;

      public AppController(AppService appService,ActivityRepository activityRepository, NotaRepository notaRepository){
        this.activityRepository = activityRepository;
        this.notaRepository = notaRepository;
        this.appService = appService;
      }

    @GetMapping("/")
    public String indexRoute(Model model) {
        List<Actividad> lista = activityRepository.findAll();
        model.addAttribute("actividades", lista);
        return "portada";
    }

   
   @PostMapping("/evaluar")
    public String evaluarActividad(
        @RequestParam("id") Long id,
        @RequestParam("nota") Integer nota) {

    appService.handleNotaPostRequest(id, nota);
    return "redirect:/notes";
    }


    @GetMapping("/notes")
    public String notesRoute(Model model) {
        List<Actividad> lista_actividades = activityRepository.findAll(); 
        List<Nota> lista_notas = notaRepository.findAll();
        model.addAttribute("actividades", lista_actividades);
        model.addAttribute("notas", lista_notas);
        return "notes";
    }
}
