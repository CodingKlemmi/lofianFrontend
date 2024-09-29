package Main.handlers;

import Main.data.SharedData;
import Main.utils.CorsUtil;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;

import java.io.IOException;
import java.io.InputStream;

public class FilterHandler implements HttpHandler {
  @Override
  public void handle(HttpExchange exchange) throws IOException {
    CorsUtil.addCorsHeaders(exchange);

    if ("POST".equalsIgnoreCase(exchange.getRequestMethod())) {
      InputStream inputStream = exchange.getRequestBody();
      String filterInput = new String(inputStream.readAllBytes());

      // Speichern der Filtereingabe in SharedData
      SharedData.setFilterInput(filterInput);
      System.out.println("Empfangene Filter: " + SharedData.getFilterInput());


      String response = "Filter erfolgreich empfangen.";
      exchange.sendResponseHeaders(200, response.length());
      exchange.getResponseBody().write(response.getBytes());
      exchange.getResponseBody().close();
    }
  }
}
