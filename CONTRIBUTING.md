# Contributing Guide

Thanks for your interest in improving this portfolio! The guidelines below help us keep contributions consistent and easy to review.

## Before You Start
- Read and follow the [Code of Conduct](CODE_OF_CONDUCT.md).
- Fork the repository and create a local clone of your fork.
- Make sure you are using **Node.js 20 LTS** and **npm 10+**.

## Opening Issues
When filing a bug report or feature request:
1. Search existing issues to avoid duplicates.
2. Use a clear, descriptive title in English.
3. Provide context:
   - Current and expected behaviour.
   - Steps to reproduce (if applicable).
   - Screenshots or logs when relevant.
   - Browser and device information for UI issues.
4. For translation issues, specify the language and the page/section where the string appears.

## Pull Requests
- Open an issue before starting major work so we can discuss scope and approach.
- Reference the related issue in the PR description (`Closes #123`).
- Keep changes focused; prefer multiple small PRs to a single large one.
- Update documentation and translations when your change introduces new UI text.
- Fill out the PR template and ensure the checklist items are completed.

### Branch Naming
Use the format `<type>/<short-description>`:
- `feature/add-contact-section`
- `fix/hero-layout`
- `chore/update-dependencies`
- `docs/refresh-readme`

Avoid working directly on `main`.

### Commit Style
- Write commits in the imperative mood (e.g., `Add SSR deployment docs`).
- Squash commits when the history is noisy or contains fixup commits.

## Local Development Workflow
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm start
   ```
3. Run the automated checks before submitting a PR:
   ```bash
   npm run build
   npm test
   npm run test:headless
   ```
   Run the headless test suite in CI-like conditions before marking the PR ready for review.
4. Format SCSS and TypeScript using your editor's Prettier integration. Avoid committing linting errors reported by Angular or TypeScript.

## Translation Guidelines
- Keep language files synchronised. For each new string, update **all** language variants under `src/app/data/` and any other translation bundles introduced in the project.
- Maintain consistent terminology across languages (e.g., `Hero` ↔ `Hero`, `Skills` ↔ `Competenze`).
- Use gender-neutral and inclusive language where possible.
- When in doubt, add translator comments in the data files using TypeScript comments (e.g., `// Translators:`) to provide context.
- If a translation requires additional markup, verify the rendered result across languages.

## Need Help?
Reach us at [maintainers@portfolio.dev](mailto:maintainers@portfolio.dev) for questions about the contribution process.
