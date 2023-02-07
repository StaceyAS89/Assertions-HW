//<reference types="cypress"/>


const paramData =  [
    {testData: {
     position: 'top-right',
     title: 'test title1',
     content: 'test content1',
     time: '1000',
     type: 'primary'
   },
   expectedResult: {
     icon: 'email',
     title: 'test title1',
     content: 'test content1',
     color: 'rgb(51, 102, 255)',
     position: 'justify-content: flex-end; align-items: flex-start;'
   }
   },
   {
     testData: {
       position: 'top-left',
       title: 'test title2',
       content: 'test content2',
       time: '1000',
       type: 'success'
     },
     expectedResult: {
       icon: 'checkmark',
       title: 'test title2',
       content: 'test content2',
       color: 'rgb(0, 214, 143)',
       position: 'justify-content: flex-start; align-items: flex-start;'
     }
   },
   {testData: {
     position: 'bottom-left',
     title: 'test title3',
     content: 'test content3',
     time: '1000',
     type: 'info'
   },
   expectedResult: {
     icon: 'question-mark',
     title: 'test title3',
     content: 'test content3',
     color: 'rgb(0, 149, 255)',
     position: 'justify-content: flex-start; align-items: flex-end;'
   }
   },
   {testData: {
     position: 'bottom-right',
     title: 'test title4',
     content: 'test content4',
     time: '1000',
     type: 'warning'
   },
   expectedResult: {
     icon: 'alert-triangle',
     title: 'test title4',
     content: 'test content4',
     color: 'rgb(255, 170, 0)',
     position: 'justify-content: flex-end; align-items: flex-end;'
   }
   },
   ]
   describe('Using before()', () => {
     beforeEach(() => {
       cy.viewport(1920, 1080);
       cy.visit('https://sanitarskyi-ngx-admin.herokuapp.com/');
       cy.get('[src="assets/images/dark-theme.jpg"]').click();
       cy.get('[title="Modal & Overlays"]').click();
       cy.get('[href="/pages/modal-overlays/toastr"]').click();
     })
     paramData.forEach(({testData, expectedResult}) => {
       it('Param Test', () => {
        cy.get('[ng-reflect-selected="top-right"]').click();
         cy.get(`[ng-reflect-value="${testData.position}"]`)
         .click();
         cy.get(`[ng-reflect-selected="${testData.position}"]`)
         .should('have.text', `${testData.position}`);
     
         cy.get('[name="title"]').clear().type(`${testData.title}`)
         .should('have.value', `${expectedResult.title}`);
     
         cy.get('[name="content"]').clear().type(`${testData.content}`)
         .should('have.value', `${expectedResult.content}`);
     
         cy.get('[ng-reflect-name="timeout"]').clear().type(`${testData.time}`);
     
         cy.get('[ng-reflect-selected="primary"]').click();
         cy.get(`[ng-reflect-value=${testData.type}]`).click();
     
         cy.get('nb-card-footer>button:contains("Show toast")').click();
     
        cy.get('.toastr-overlay-container.cdk-global-overlay-wrapper')
        .then(element => {
         expect(element.attr('style')).to.eq(`${expectedResult.position}`); 
     
       cy.get('nb-toastr-container nb-toast')  
       .should('have.css', 'background-color')
       .and('eq', `${expectedResult.color}`);
     
       cy.get('nb-toast [data-name="Layer 2"] > g')
       .then(element => {
         expect(element.attr('data-name')).to.eq(`${expectedResult.icon}`)
       })
        })
     })
     })
    })
    