# Contributing to atomiccss-gen

Thank you for your interest in contributing to atomiccss-gen! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please be respectful and considerate of others when contributing to this project.

## How to Contribute

### Reporting Issues

If you find a bug or have a feature request, please create an issue on the GitHub repository. When reporting issues, please include:

1. A clear and descriptive title
2. Steps to reproduce the issue
3. Expected behavior
4. Actual behavior
5. Your environment (OS, Node version, etc.)

### Pull Requests

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes
4. Run tests and ensure they pass
5. Commit your changes with clear and descriptive commit messages
6. Push your branch to your fork
7. Submit a pull request to the main repository

### Development Setup

1. Clone the repository

```bash
git clone https://github.com/aryanjha256/atomiccss-gen.git
cd atomiccss-gen
```

2. Install dependencies

```bash
npm install
```

3. Build the project

```bash
npm run build
```

4. Run in development mode

```bash
npm run dev
```

### Code Style

- Follow the existing code style and formatting
- Use TypeScript for all new code
- Include appropriate comments and documentation
- Write tests for new features

## Development Workflow

1. Make sure your feature or bug fix is needed (check existing issues and PRs)
2. Implement your changes
3. Add tests if applicable
4. Update documentation as needed
5. Make sure all tests pass by running `npm test`
6. Submit your PR

## Building and Testing

- Build the project: `npm run build`
- Run tests: `npm test`
- Test locally: `npm run dev`

## Release Process

The maintainers are responsible for releases. The general process is:

1. Update version in package.json
2. Update CHANGELOG.md
3. Create a git tag
4. Publish to npm

## License

By contributing to atomiccss-gen, you agree that your contributions will be licensed under the project's MIT license.
