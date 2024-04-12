import {BASE_URL} from "../../src/utils/domain"

describe('template spec', () => {
  
  it('Зайти на сайт', () => {
    cy.visit('/');
    cy.intercept('GET', `${BASE_URL}/api/ingredients`, { fixture: 'ingredients.json' }).as('ingredientsFixture');
  
  })

  it('Перемещение ингредиентов в конструктор', () => {
   
    cy.visit('/');
    cy.intercept('GET', `${BASE_URL}/api/ingredients`, { fixture: 'ingredients.json' }).as('ingredientsFixture');
    
    const dataTransfer = new DataTransfer();


    cy.get('[data-testid="643d69a5c3f7b9001cfa093c"]').as('bun');

    cy.get('[data-testid="643d69a5c3f7b9001cfa0942"]').as('sauce');
  
    cy.get('[data-testid="643d69a5c3f7b9001cfa0941"]').as('feeling');

    cy.get('[data-test="constr_bun"]').as('constr_bun');
    cy.get('[data-test="ingrid"]').as('ingrid');

    cy.get('@bun').trigger('dragstart', { dataTransfer });
    cy.get('@constr_bun').trigger('drop', { dataTransfer });

    cy.get('@sauce').trigger('dragstart', { dataTransfer });
    cy.get('@ingrid').trigger('drop', { dataTransfer });

    cy.get('@feeling').trigger('dragstart', { dataTransfer });
    cy.get('@ingrid').trigger('drop', { dataTransfer });

    cy.get('[data-test="order-price"]').should('contain', '3024');
  });

  it('Открытие модального окна с описанием ингредиента', () => {

    cy.visit('/');
    cy.intercept('GET', `${BASE_URL}/api/ingredients`, { fixture: 'ingredients.json' }).as('ingredientsFixture');
    
    cy.get('[data-testid="643d69a5c3f7b9001cfa093c"]').trigger('click');
    cy.location('pathname').should('eq', '/ingredients/643d69a5c3f7b9001cfa093c')
    cy.get('[data-test="modal"]').should('exist');
  });

  it('Отображение в модальном окне данных ингредиента', () => {
    
    

    cy.visit('/');
    cy.intercept('GET', `${BASE_URL}/api/ingredients`, { fixture: 'ingredients.json' }).as('ingredientsFixture');

    cy.get('[data-testid="643d69a5c3f7b9001cfa093c"]').click();

    cy.get('[data-test="ingredient-details"]').as('ingredientDetails');

    cy.get('@ingredientDetails')
      .find('[data-test="ingredient-details-image"]')
      .should('have.attr', 'src')
      .and('match', /https:\/\/code\.s3\.yandex\.net\/react\/code\/bun-02[a-zA-Z|-]*\.png/);
    cy.get('@ingredientDetails')
      .find('[data-test="ingredient-details-name"]')
      .should('have.text', 'Краторная булка N-200i');
    cy.get('@ingredientDetails')
      .find('[data-test="ingredient-details-calories"]')
      .should('have.text', '420');
    cy.get('@ingredientDetails')
      .find('[data-test="ingredient-details-proteins"]')
      .should('have.text', '80');
    cy.get('@ingredientDetails')
      .find('[data-test="ingredient-details-fat"]')
      .should('have.text', '24'); //ingredient-details-carbohydrates
    cy.get('@ingredientDetails')
      .find('[data-test="ingredient-details-carbohydrates"]')
      .should('have.text', '53');

    cy.get('[data-test="modal-overlay"]').trigger('click', 'topLeft');
  });

  it('Открытие модального окна с данными о заказе при клике по кнопке "Оформить заказ"', () => {

    cy.visit('/');
    cy.intercept('GET', `${BASE_URL}/api/ingredients`, { fixture: 'ingredients.json' }).as('ingredientsFixture');
    cy.intercept('POST' , 'https://norma.nomoreparties.space/api/auth/login' , { fixture: 'login.json' }).as('login');
    cy.intercept('GET' , 'https://norma.nomoreparties.space/api/auth/user' , { fixture: 'user.json' }).as('user');
    cy.intercept('POST' , 'https://norma.nomoreparties.space/api/orders' , { fixture: 'orders.json' }).as('orders');
    
   

    const dataTransfer = new DataTransfer();


    cy.get('[data-testid="643d69a5c3f7b9001cfa093c"]').as('bun');

    cy.get('[data-testid="643d69a5c3f7b9001cfa0942"]').as('sauce');
  
    cy.get('[data-testid="643d69a5c3f7b9001cfa0941"]').as('feeling');

    cy.get('[data-test="constr_bun"]').as('constr_bun');
    cy.get('[data-test="ingrid"]').as('ingrid');

    cy.get('@bun').trigger('dragstart', { dataTransfer });
    cy.get('@constr_bun').trigger('drop', { dataTransfer });

    cy.get('@sauce').trigger('dragstart', { dataTransfer });
    cy.get('@ingrid').trigger('drop', { dataTransfer });

    cy.get('@feeling').trigger('dragstart', { dataTransfer });
    cy.get('@ingrid').trigger('drop', { dataTransfer });


    cy.get('[data-test="order-info"]').as('orderInfo');
    cy.get('@orderInfo').find('button').as('orderButton');


    
    cy.get('@orderButton')
      .should('be.enabled')
      .click();

    cy.location('pathname').should('eq', '/login')

    cy.get('[data-test="login-form"]').as('loginForm');

   

    cy.get('@loginForm').within(() => {
      cy.get('input[type=email]').type('pupkin@ya.ru');
      cy.get('input[type=password]').type('12345Aa');
    })
      .submit();



    cy.location('pathname').should('eq', '/react-burger');

    cy.get('@orderButton')
      .should('be.enabled')
      .click();

    cy.get('[data-test="modal"]', { timeout: 6000 })
      .should('exist')
      .find('[data-test="order-number"]')
      .should('exist');

      cy.get('[data-test="modal-overlay"]').trigger('click', 'topLeft');
  });


})