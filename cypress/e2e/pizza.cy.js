describe('Quotes App',()=> {
    beforeEach(()=>{
        // each test needs fresh state
        // tests shouldn't rely on other tests
        // every test should work in isolation
        cy.visit('http://localhost:3000'); // CAREFUL this should be equivalent to whatever your front end server is running on
    })

    const nameInput = () => cy.get('input[id=name-input]');
    const specialInput= () => cy.get('input[id=special-text]');
    const pepperoniCheck = () => cy.get('input[name="pepperoni"]');
    const sausageCheck = () => cy.get('input[name="sausage"]');
    const pizzaBtn = () => cy.get(`button[id="order-pizza"]`);
    const submitBtn = () => cy.get(`button[id="order-button"]`);
    const sizeDropdown = () => cy.get('#size-dropdown');

    it('sanity test to make sure tests work',()=>{
        expect(1+1).to.equal(2);
    })

    describe('Can type into text boxes, check multiple toppings and submit the form',()=>{
        it('can type into text boxes',()=>{
            pizzaBtn().click();
            nameInput().type('Sydney');
            nameInput().should('have.value','Sydney');
            sizeDropdown().select('Personal (6inch)');
            sizeDropdown().should('have.value','Personal (6inch)');
            specialInput().type('None');
            specialInput().should('have.value','None');
            pepperoniCheck().check();
            pepperoniCheck().should('be.checked');
            sausageCheck().check();
            sausageCheck().should('be.checked');
            submitBtn().click();
            cy.contains('THANKS FOR YOUR ORDER Sydney!');

        })
    })

});