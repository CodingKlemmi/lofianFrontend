package Main.handlers;

import Main.data.SharedData;
import Main.utils.CorsUtil;
import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;

public class InfoPanelHandler implements HttpHandler {
  @Override
  public void handle(HttpExchange exchange) throws IOException {
    CorsUtil.addCorsHeaders(exchange);

    if (CorsUtil.handlePreflight(exchange)) {
      return; // Preflight wurde bearbeitet, keine weitere Verarbeitung nötig
    }

    // OPTIONS-Anfrage für den CORS-Preflight beantworten
    if ("OPTIONS".equals(exchange.getRequestMethod())) {
      exchange.sendResponseHeaders(200, -1); // Send OK status for OPTIONS request
      return;
    }

    if ("GET".equals(exchange.getRequestMethod())) {
      // Erstelle ein Map-Objekt, um die Daten zu speichern
      Map<String, Object> infoData = new HashMap<>();

      // Hochgeladene Zip-Datei (falls vorhanden)
      infoData.put("zipFile", SharedData.getUploadedZipFile() != null ? SharedData.getUploadedZipFile().getName() : "Keine Datei hochgeladen");

      // Ausgewählte Ordner
      infoData.put("selectedFolders", SharedData.getSelectedFolders() != null ? SharedData.getSelectedFolders() : "Keine Ordner ausgewählt");

      // Filtereingabe
      infoData.put("filterInput", SharedData.getFilterInput() != null ? SharedData.getFilterInput() : "Kein Filter eingegeben");

      // Konvertiere die Daten in JSON
      Gson gson = new Gson();
      String jsonResponse = gson.toJson(infoData);

      // Sende die JSON-Antwort zurück
      exchange.getResponseHeaders().set("Content-Type", "application/json");
      exchange.sendResponseHeaders(200, jsonResponse.getBytes().length);
      OutputStream os = exchange.getResponseBody();
      os.write(jsonResponse.getBytes());
      os.close();
    } else {
      exchange.sendResponseHeaders(405, -1); // Methode nicht unterstützt
    }
  }
}
