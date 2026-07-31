# Publicação futura — bloqueada até aprovação manual

Mantenha o repositório privado e o GitHub Pages desativado durante todo o desenvolvimento e revisão.

Após aprovação expressa do proprietário:

1. Audite novamente arquivos e histórico Git conforme `SECURITY.md`.
2. Torne `Ylaros/zns-portfolio-demo` público manualmente em **Settings → General → Danger Zone**.
3. Copie `docs/pages-workflow.yml.example` para `.github/workflows/pages.yml`.
4. Em **Settings → Pages**, selecione **GitHub Actions** como fonte.
5. Execute o workflow manualmente, valide a rota `/zns-portfolio-demo/` e faça uma nova auditoria do conteúdo acessível.

Não há domínio próprio nem workflow ativo de deploy.
