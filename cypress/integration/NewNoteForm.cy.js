import App from "../../src/App";

describe("input form", () => {
  it("focus input on load", () => {
    cy.mount(<App />);

    cy.focused()
      .should('have.class', 'form__input')
  });

  it.only('accepts input', () => {
    const typedText = 'close a door'
    cy.mount(<App />)

    cy.get('.new-note')
      // .type(typedText)
      // .should('have.value', typedText)
  })
});
