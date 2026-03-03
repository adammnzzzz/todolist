describe("Todo App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("menampilkan data dari API", () => {
    cy.contains("Tugas dibuat");
  });

  it("bisa menambah todo", () => {
    cy.get("input[placeholder='Tambah tugas baru']")
      .type("Todo dari Cypress");

    cy.contains("Tambah").click();

    cy.contains("Todo dari Cypress");
  });

  it("bisa toggle todo", () => {
    cy.get(".todo-card").first().click();
  });

  it("bisa menghapus todo", () => {
    cy.get(".todo-card button").first().click();
  });
});