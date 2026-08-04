# NexaFlow — demonstração fictícia

Interface autoral criada exclusivamente para portfólio. O nome NexaFlow, as empresas, os identificadores, métricas e fluxos são fictícios. Este repositório não contém código, telas, dados, URLs, credenciais ou configurações do ZNS real.

As áreas disponíveis preservam o sentido dos fluxos do produto, mas foram implementadas do zero:

- **Visão geral:** indicadores, atividade, compromissos e alertas;
- **Central de Operações:** dashboard, quadro, solicitações, pendências e cronograma;
- **Fiscal:** painel do período, classificador assistido com confiança, alertas e decisão humana, além do Cofre DF-e;
- **Contábil:** balancete, análise por classificação, conciliação e pendências de fechamento;
- **Trabalhista:** indicadores de folha, comparações, funcionários fictícios e auditorias preventivas;
- **Inteligência de Mercado:** CNAE, recorte regional, prontidão cadastral e benchmark anonimizado;
- **Calendário:** visões de mês, semana, dia e agenda;
- **Empresas:** diretório pesquisável de cadastros demonstrativos;
- **Tecnologias:** ficha técnica pública da arquitetura e das práticas do projeto.

Todas as interações usam apenas estado local e dados sintéticos. Não há conexão com APIs, serviços ou infraestrutura do ZNS.

- Demonstração: https://ylaros.github.io/zns-portfolio-demo/
- Portfólio: https://ylaros.github.io/

## Desenvolvimento local

```bash
npm install
npm run dev
```

## Validação

```bash
npm run lint
npm test
npm run build:pages
```

O deploy é feito por GitHub Actions após alterações aprovadas na branch `main`.
