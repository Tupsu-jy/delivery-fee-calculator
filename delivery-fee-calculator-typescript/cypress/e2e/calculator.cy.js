const testCases = require('../fixtures/deliveryFeeTestCases.json')

import { Weekday, DeliveryTimeOption } from '../../types/enums'

describe('Delivery Fee Calculator', () => {
  beforeEach(() => {
    cy.visit('/') // Adjust this if your URL is different
  })

  testCases.forEach((testCase) => {
    it(`${testCase.description}`, () => {
      // Input values into the form
      cy.get('[data-test-id="cartValue"]').type('7.90')
      cy.get('[data-test-id="deliveryDistance"]').type('2235')
      cy.get('[data-test-id="amountOfItems"]').type('4')

      // Select the later delivery time option
      cy.get('[data-test-id="deliveryTimeOption"]')
        .contains(DeliveryTimeOption.Later)
        .click()

      // Select Monday from the day SelectionField
      cy.get('[data-test-id="selectedDay"]').select(Weekday.Monday)

      // Click the calculate button
      cy.get('[data-test-id="calculateButton"]').click()

      // Check if the result is correct
      cy.get('[data-test-id="fee"]').should('contain', 'Delivery Fee: 7.10 €')
    })
  })
})
