# Publicação aprovada

A publicação foi autorizada pelo proprietário após revisão privada. O workflow ativo valida e publica somente a demonstração estática gerada a partir da branch `main`.

Para uma nova versão:

1. Audite novamente arquivos e histórico Git conforme `SECURITY.md`.
2. Abra uma pull request a partir de uma branch separada.
3. Aguarde lint, build, testes e auditoria.
4. Faça merge em `main`; o workflow `.github/workflows/pages.yml` publica o site.
5. Valide `https://ylaros.github.io/zns-portfolio-demo/` e repita a auditoria do conteúdo acessível.

Não há domínio próprio configurado.
