package Main.handlers;

import Main.data.SharedData;
import Main.utils.CorsUtil;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;

import java.io.*;

public class FileUploadHandler implements HttpHandler {
  @Override
  public void handle(HttpExchange exchange) throws IOException {
    CorsUtil.addCorsHeaders(exchange);

    if (!exchange.getRequestMethod().equalsIgnoreCase("POST")) {
      exchange.sendResponseHeaders(405, -1);
      return;
    }

    // Die Datei speichern und im SharedData referenzieren
    File uploadedFile = new File("uploaded.zip");
    try (InputStream is = exchange.getRequestBody(); FileOutputStream fos = new FileOutputStream(uploadedFile)) {
      byte[] buffer = new byte[1024];
      int read;
      while ((read = is.read(buffer)) != -1) {
        fos.write(buffer, 0, read);
      }
      fos.flush();
    }

    // Die hochgeladene Datei in SharedData speichern
    SharedData.setUploadedZipFile(uploadedFile);

    String response = "Datei erfolgreich hochgeladen.";
    exchange.sendResponseHeaders(200, response.length());
    OutputStream os = exchange.getResponseBody();
    os.write(response.getBytes());
    os.close();
  }
}
