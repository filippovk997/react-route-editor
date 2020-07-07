describe("<Header />", () => {
    it("Enter in input", () => {
        let input_data = ["Ульяновск", "Казань", "Самара"];
        
        cy.visit("/");
        cy.get("input");
        
        input_data.map((elem) => {
            cy.get('input[name="enter"]')
                .type(elem)
                .type('{enter}')
        });

        cy.get('ul')
            .children()
            .should('have.length', input_data.length)
    });
});