package Main.utils;

import com.sun.net.httpserver.HttpExchange;

import java.io.IOException;

public class CorsUtil {

  // Fügt CORS-Header hinzu, falls sie noch nicht gesetzt sind
  public static void addCorsHeaders(HttpExchange exchange) {
    if (!exchange.getResponseHeaders().containsKey("Access-Control-Allow-Origin")) {
      exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "http://localhost:4200");
    }
    if (!exchange.getResponseHeaders().containsKey("Access-Control-Allow-Methods")) {
      exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    }
    if (!exchange.getResponseHeaders().containsKey("Access-Control-Allow-Headers")) {
      exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }
    if (!exchange.getResponseHeaders().containsKey("Access-Control-Allow-Credentials")) {
      exchange.getResponseHeaders().add("Access-Control-Allow-Credentials", "true");
    }
  }

  // Prüft und beantwortet OPTIONS-Anfragen
  public static boolean handlePreflight(HttpExchange exchange) throws IOException {
    if ("OPTIONS".equals(exchange.getRequestMethod())) {
      // Antwort auf Preflight-Anfragen
      addCorsHeaders(exchange);
      exchange.sendResponseHeaders(200, -1); // Send OK status for OPTIONS request
      return true;
    }
    return false;
  }
}
