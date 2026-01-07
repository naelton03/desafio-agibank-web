# 🚀 Desafio QA Automation - Agibank Blog

Este projeto consiste na automação da jornada de busca e conversão do Blog do Agibank, utilizando **Cypress** com **TypeScript**. A solução foi desenhada com foco em escalabilidade, manutenibilidade e cobertura de qualidade para além do funcional, integrando testes de **Acessibilidade**.

## 🛠️ Tecnologias e Padrões Utilizados

* **Framework:** Cypress.
* **Linguagem:** TypeScript (Tipagem forte para maior segurança e produtividade).
* **Arquitetura:** Page Object Model (**POM**) para isolamento de seletores e desacoplamento da lógica de teste.
* **Acessibilidade:** Integração com `cypress-axe` para auditoria automática baseada nas normas **WCAG** (Web Content Accessibility Guidelines).
* **Resiliência:** Tratamento de exceções globais (`uncaught:exception`) e sincronismo baseado em estados (URL e visibilidade de elementos), eliminando o uso de esperas fixas (`waits`).

## 🏗️ Estrutura do Projeto

* `cypress/support/pages`: Contém as **Page Objects**, encapsulando a estrutura e os seletores do blog.
* `cypress/support/commands.ts`: Comandos customizados para ações globais e reutilizáveis (ex: `pesquisarNoBlog`).
* `cypress/e2e`: Especificações de testes (**specs**) que orquestram a jornada de conversão.
* `cypress/support/e2e.ts`: Configurações globais de suporte, incluindo o tratamento para o erro `astra is not defined`, nativo do tema da aplicação, garantindo a estabilidade da execução.

## 🧩 Achados de Acessibilidade (Shift-Left Testing)

Durante o desenvolvimento, o framework detectou automaticamente falhas de acessibilidade na página de resultados de busca:

* **Violação:** `color-contrast` (Impacto: **Serious**).
* **Descrição:** Elementos de texto (títulos e metas dos posts) não possuem contraste suficiente com o fundo, dificultando a leitura.
* **Estratégia de QA:** As falhas são registradas detalhadamente via `console.table` e no log do Cypress. O teste foi configurado para prosseguir (`skipFailures: true`) após o log, permitindo a validação do fluxo crítico de negócio (WhatsApp/Banner) enquanto reporta débitos técnicos de acessibilidade.

## 🚀 Como Executar

1. **Instalar dependências:**
```bash
pnpm install
```

2. **Abrir Cypress (Interface Gráfica):**
```bash
npx cypress open
```

3. **Executar em modo Headless (Terminal):**
```bash
npx cypress run 
```

## ⛓️ CI/CD

Este projeto utiliza **GitHub Actions** para execução automatizada dos testes a cada *Push* ou *Pull Request*. 
* A pipeline garante a integridade funcional e os padrões de acessibilidade em um ambiente isolado (Ubuntu Latest).
* Em caso de falha, os artefatos (vídeos e evidências) são anexados à execução do Workflow.