package Main;

import com.sun.net.httpserver.HttpServer;
import Main.handlers.FileUploadHandler;
import Main.handlers.FolderNamesHandler;
import Main.handlers.FilterHandler;

import java.io.IOException;
import java.net.InetSocketAddress;

public class Main {
  public static void main(String[] args) {
    try {
      int port = 8080;
      HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);

      // Set up Endpoints
      server.createContext("/upload", new FileUploadHandler());
      server.createContext("/folders", new FolderNamesHandler());
      server.createContext("/filter", new FilterHandler());

      server.setExecutor(null); // Default executor
      server.start();

      System.out.println("Server läuft auf http://localhost:" + port);
      System.out.println("/upload bereit unter http://localhost:" + port + "/upload");
      System.out.println("/folders bereit unter http://localhost:" + port + "/folders");
      System.out.println("/filter bereit unter http://localhost:" + port + "/filter");
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
