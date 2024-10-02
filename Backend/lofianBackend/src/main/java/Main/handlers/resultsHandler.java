package Main.handlers;

import Main.utils.CorsUtil;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;

public class resultsHandler implements HttpHandler {
  @Override
  public void handle(HttpExchange exchange) throws IOException {
    // CORS-Header hinzufügen
    CorsUtil.addCorsHeaders(exchange);

    if ("GET".equals(exchange.getRequestMethod())) {
      // Pfad zur Datei
      Path filePath = Path.of("results.txt");

      try {
        // Lese die Datei als Byte-Array
        byte[] fileContent = Files.readAllBytes(filePath);

        // Setze die Headers für den Response
        exchange.getResponseHeaders().add("Content-Type", "text/plain; charset=utf-8");
        // CORS-Header sicherstellen, bevor Response gesendet wird
        CorsUtil.addCorsHeaders(exchange);
        exchange.sendResponseHeaders(200, fileContent.length);

        // Sende den Inhalt der Datei
        try (OutputStream os = exchange.getResponseBody()) {
          os.write(fileContent);
        }

        // Konsolenausgabe nach dem Senden der Datei
        System.out.println("Datei 'results.txt' ans Frontend gesendet.");
      } catch (IOException e) {
        e.printStackTrace();
        exchange.sendResponseHeaders(404, -1); // Datei nicht gefunden
        System.out.println("Datei 'results.txt' konnte nicht gefunden werden.");
      }
    }
  }
}
