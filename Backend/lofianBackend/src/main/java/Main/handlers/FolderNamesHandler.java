package Main.handlers;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import Main.data.SharedData;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class FolderNamesHandler implements HttpHandler {
  @Override
  public void handle(HttpExchange exchange) throws IOException {
    // CORS hinzufügen
    addCorsHeaders(exchange);

    if ("OPTIONS".equals(exchange.getRequestMethod())) {
      exchange.sendResponseHeaders(200, -1); // CORS-Preflight
      return;
    }

    if ("GET".equals(exchange.getRequestMethod())) {
      handleGetRequest(exchange);
    } else if ("POST".equals(exchange.getRequestMethod())) {
      handlePostRequest(exchange);
    } else {
      exchange.sendResponseHeaders(405, -1); // Method Not Allowed
    }
  }

  private void handleGetRequest(HttpExchange exchange) throws IOException {
    List<Folder> folderList = new ArrayList<>();
    folderList.add(new Folder("1", "helicWebviewer"));
    folderList.add(new Folder("2", "helicViewerservlet"));
    folderList.add(new Folder("3", "helicApache"));
    folderList.add(new Folder("4", "helicServer"));

    Gson gson = new Gson();
    String jsonResponse = gson.toJson(folderList);

    exchange.getResponseHeaders().set("Content-Type", "application/json");
    exchange.sendResponseHeaders(200, jsonResponse.getBytes().length);
    try (OutputStream os = exchange.getResponseBody()) {
      os.write(jsonResponse.getBytes());
    }
  }

  private void handlePostRequest(HttpExchange exchange) throws IOException {
    InputStream inputStream = exchange.getRequestBody();
    String requestBody = new String(inputStream.readAllBytes());

    Gson gson = new Gson();
    SharedData.folderNames = gson.fromJson(requestBody, new TypeToken<List<String>>() {}.getType());
    System.out.println("Empfangene Ordnernamen: " + SharedData.folderNames);

    String response = "Ordnernamen erfolgreich empfangen!";
    exchange.getResponseHeaders().set("Content-Type", "text/plain");
    exchange.sendResponseHeaders(200, response.getBytes().length);
    try (OutputStream os = exchange.getResponseBody()) {
      os.write(response.getBytes());
    }
  }

  private void addCorsHeaders(HttpExchange exchange) {
    exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
    exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type,Authorization");
  }

  // Simple Folder class
  private static class Folder {
    private String id;
    private String name;

    public Folder(String id, String name) {
      this.id = id;
      this.name = name;
    }
  }
}
