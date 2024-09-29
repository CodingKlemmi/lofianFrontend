package Main.handlers;

import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import Main.data.SharedData;

import java.io.IOException;
import java.io.OutputStream;


public class FilterHandler implements HttpHandler {
  @Override
  public void handle(HttpExchange exchange) throws IOException {
    addCorsHeaders(exchange);

    if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
      exchange.sendResponseHeaders(204, -1);
      return;
    }

    if ("GET".equals(exchange.getRequestMethod())) {
      handleGetRequest(exchange);
    } else if ("POST".equalsIgnoreCase(exchange.getRequestMethod())) {
      // Handle POST request here
    } else {
      exchange.sendResponseHeaders(405, -1); // Method Not Allowed
    }
  }

  private void handleGetRequest(HttpExchange exchange) throws IOException {
    Gson gson = new Gson();
    String jsonResponse = gson.toJson(SharedData.folderNames);
    exchange.getResponseHeaders().set("Content-Type", "application/json");
    exchange.sendResponseHeaders(200, jsonResponse.getBytes().length);
    try (OutputStream os = exchange.getResponseBody()) {
      os.write(jsonResponse.getBytes());
    }
  }

  private void addCorsHeaders(HttpExchange exchange) {
    exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "http://localhost:4200");
    exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type,Authorization");
    exchange.getResponseHeaders().add("Access-Control-Allow-Credentials", "true");
  }
}
