describe("Testing home", () => {
  it("Testing home word", () => {
    cy.visit("http://localhost:3000/user/Home");
    //   cy.get("input").should("exist").should("be.visible")
    cy.wait(3000);
    cy.title().should("eq", "Home");
    cy.get("#tweet_input").type("Hello All");
    cy.url().should("eq", "http://localhost:3000/user/Home");
    cy.screenshot({
      overwrite: true,
      clip: { x: 0, y: 0, width: "100", height: "100" },
    });
    // cy.get("#tweet_btn").click();
  });
});
