package Main.handlers;

import Main.Folder;
import Main.data.SharedData;
import Main.utils.CorsUtil;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

public class FolderNamesHandler implements HttpHandler {
  @Override
  public void handle(HttpExchange exchange) throws IOException {
    // CORS-Header hinzufügen und Preflight (OPTIONS) abfangen
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
      // Erstelle eine Liste von Folder-Objekten
      List<Folder> folderList = new ArrayList<>();
      folderList.add(new Folder("1", "helicWebviewer"));
      folderList.add(new Folder("2", "helicViewerservlet"));
      folderList.add(new Folder("3", "helicApache"));
      folderList.add(new Folder("4", "helicServer"));

      // Konvertiere die Liste in JSON und sende sie an das Frontend
      Gson gson = new Gson();
      String jsonResponse = gson.toJson(folderList);

      exchange.getResponseHeaders().set("Content-Type", "application/json");
      exchange.sendResponseHeaders(200, jsonResponse.getBytes().length);
      OutputStream os = exchange.getResponseBody();
      os.write(jsonResponse.getBytes());
      os.close();
    } else if ("POST".equals(exchange.getRequestMethod())) {
      // Lese die Auswahl, die vom Frontend gesendet wurde
      InputStream inputStream = exchange.getRequestBody();
      String requestBody = new String(inputStream.readAllBytes());

      // Konvertiere die Auswahl in eine Liste von Ordnernamen
      Gson gson = new Gson();
      List<String> selectedFolders = gson.fromJson(requestBody, new TypeToken<List<String>>() {}.getType());

      // Speichere die Auswahl in SharedData
      SharedData.setSelectedFolders(selectedFolders);
      System.out.println("Empfangene Ordnerauswahl: " + SharedData.getSelectedFolders());

      // Sende eine Bestätigung zurück
      String response = "Ordnerauswahl erfolgreich empfangen.";
      exchange.getResponseHeaders().set("Content-Type", "text/plain");
      exchange.sendResponseHeaders(200, response.getBytes().length);
      OutputStream os = exchange.getResponseBody();
      os.write(response.getBytes());
      os.close();
    } else {
      // Nicht unterstützte Methoden
      exchange.sendResponseHeaders(405, -1);
    }
  }
}
