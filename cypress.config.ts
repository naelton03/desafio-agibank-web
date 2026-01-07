import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {

    setupNodeEvents(on, config) {
      

      on('task', {
        log(message) {
          console.log(message); 
          return null; 
        },
       
        table(message) {
          console.table(message);
          return null;
        }
      });

      return config;
    },
    
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
  },
});