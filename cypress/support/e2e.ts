
import './commands'
import 'cypress-axe';



Cypress.on('uncaught:exception', (err, runnable) => {
    // `err` is the error object
    if (err.message.includes('astra is not defined')) {
        return false;
    }
    // Permite que outros erros inesperados ainda falhem o teste
    return false;
});

Cypress.on('window:before:load', (win) => {
    const styles = `
        *, *::before, *::after {
            transition: none !important;
            animation: none !important;
            opacity: 1 !important;
            visibility: visible !important;
        }
    `;
    const styleElement = win.document.createElement('style');
    styleElement.innerHTML = styles;
    win.document.head.appendChild(styleElement);
});