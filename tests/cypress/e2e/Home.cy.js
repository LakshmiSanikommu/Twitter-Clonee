describe("Testing home", () => {
  it("Testing home word", () => {
    cy.visit("http://localhost:3000/user/Home");
    cy.wait(3000);
    // cy.screenshot({
    //   overwrite: true,
    // });
    // cy.viewport(1000, 500);
    cy.matchImageSnapshot("");
    // cy.get("#tweet_btn").click();
    // cy.get("input").should("exist").should("be.visible")
    //  cy.title().should("eq", "Home");
    //  cy.get("#tweet_input").type("Hello All");
    //  cy.url().should("eq", "http://localhost:3000/user/Home");
  });
});
