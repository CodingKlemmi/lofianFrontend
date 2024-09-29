package Main.utils;

import com.sun.net.httpserver.HttpExchange;

public class CorsUtil {
  public static void addCorsHeaders(HttpExchange exchange) {
    exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
    exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type, Authorization");
  }
}
