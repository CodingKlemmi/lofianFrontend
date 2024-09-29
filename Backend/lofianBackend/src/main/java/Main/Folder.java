package Main;

public class Folder {
  private String id;
  private String name;

  // Konstruktor
  public Folder(String id, String name) {
    this.id = id;
    this.name = name;
  }

  // Getter und Setter für id und name
  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  @Override
  public String toString() {
    return "Folder{id='" + id + "', name='" + name + "'}";
  }
}
