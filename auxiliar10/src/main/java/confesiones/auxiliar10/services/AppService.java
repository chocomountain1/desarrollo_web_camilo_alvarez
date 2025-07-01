/*package confesiones.auxiliar10.services;

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

import confesiones.auxiliar10.models.Actividad;
import confesiones.auxiliar10.models.ActivityRepository;

@Service
public class AppService {

    private final String pathStatic;
    private final ActivityRepository confessionRepository;

    public AppService(ActivityRepository confessionRepository) throws IOException {
        this.confessionRepository = confessionRepository;
        // Dynamically resolve the absolute path for the static directory
        Path staticDir = Paths.get(ResourceUtils.getFile("classpath:static").getAbsolutePath());
        this.pathStatic = staticDir.toString();
        System.out.println("Static path resolved to: " + this.pathStatic);
    }

    public List<Map<String, String>> getConfessionsData(Integer pageSize) {
        List<Actividad> confessions = confessionRepository.findAllByOrderByIdDesc(PageRequest.of(0, pageSize)).getContent();
        List<Map<String, String>> confessionsData = new ArrayList<>();
        
        for (Actividad conf : confessions) {
            Map<String, String> confData = new HashMap<>();
            confData.put("id", conf.getId().toString());
            confData.put("author", conf.getUsername());
            confData.put("conf_title", conf.getTitle());
            confData.put("content", conf.getText());
            confData.put("conf_timestamp", conf.getTimestamp().toString());

            Float _confLat = conf.getLat();
            Float _confLng = conf.getLng();
            confData.put("conf_lat", (_confLat == null) ? null : _confLat.toString());
            confData.put("conf_lng", (_confLng == null) ? null : _confLng.toString());
            confData.put("image_filename", conf.getImg());

            confessionsData.add(confData);
        }
        return confessionsData;
    }

    public void handlePostRequest(
        String confTitle,
        String confText,
        String confUsername,
        MultipartFile confImg,
        String _formLat,
        String _formLng) throws Exception {

        // Get current timestamp
        LocalDateTime confTimestamp = LocalDateTime.now();
        Float confLat = _formLat.isEmpty() ? null : Float.parseFloat(_formLat);
        Float confLng = _formLng.isEmpty() ? null : Float.parseFloat(_formLng);

        if (Actividad.validateConfession(confText, confImg)) {
            String _originalFilename = confImg.getOriginalFilename();
            if (_originalFilename == null || _originalFilename.isEmpty()) {
                throw new IllegalArgumentException("File name is empty.");
            }

            // Generate unique filename
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(_originalFilename.getBytes("UTF-8"));
            byte[] hash = md.digest();
            String _filename;
            try (Formatter formatter = new Formatter()) {
                for (byte b : hash) {
                    formatter.format("%02x", b);
                }
                _filename = formatter.toString();
            }

            String _extension = _originalFilename.substring(_originalFilename.lastIndexOf('.') + 1).toLowerCase();
            if (!_extension.matches("jpg|jpeg|png|gif")) {
                throw new IllegalArgumentException("Invalid file extension: " + _extension);
            }

            String imgFilename = _filename + "." + _extension;
            String relativePathImg = "/uploads/" + imgFilename;
            String finalPath = pathStatic + relativePathImg;

            System.out.println("Final image path: " + finalPath);

            // Ensure the uploads directory exists
            Path directoryPath = Paths.get(pathStatic + "/uploads");
            if (!Files.exists(directoryPath)) {
                Files.createDirectories(directoryPath);
                System.out.println("Uploads directory created.");
            }

            // Save the image file
            Path path = Paths.get(finalPath);
            try (InputStream inputStream = confImg.getInputStream()) {
                Files.copy(inputStream, path, StandardCopyOption.REPLACE_EXISTING);
                System.out.println("File successfully saved at: " + path.toAbsolutePath());
            } catch (IOException e) {
                throw new RuntimeException("Failed to save the image file.", e);
            }

            // Save the confession in the database
            Actividad confession = new Actividad(
                confTitle,
                confText,
                relativePathImg,
                confUsername,
                confTimestamp,
                confLat,
                confLng
            );
            confessionRepository.save(confession);
            System.out.println("Confession saved successfully.");
        } else {
            throw new IllegalArgumentException("Confession validation failed.");
        }
    }
}
*/