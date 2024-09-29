package Main.data;

import java.util.List;
import java.io.File;

public class SharedData {
  private static List<String> selectedFolders;
  private static String filterInput;
  private static File uploadedZipFile;

  public static List<String> getSelectedFolders() {
    return selectedFolders;
  }

  public static void setSelectedFolders(List<String> folders) {
    selectedFolders = folders;
  }

  public static String getFilterInput() {
    return filterInput;
  }

  public static void setFilterInput(String input) {
    filterInput = input;
  }

  public static File getUploadedZipFile() {
    return uploadedZipFile;
  }

  public static void setUploadedZipFile(File zipFile) {
    uploadedZipFile = zipFile;
  }
}
