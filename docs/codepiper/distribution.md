# Distribution

## VS Code Marketplace

### Setup (one-time)

1. Create an Azure DevOps account at https://dev.azure.com
2. Create a Personal Access Token (PAT) with `Marketplace (Manage)` scope
3. Create a publisher at https://marketplace.visualstudio.com/manage:
   - Publisher ID: `ModelPiper`
   - Display Name: `ModelPiper`
4. Verify the publisher (may require email verification)

### Publishing

```bash
cd extensions/vscode

# Build GUI
cd ../../gui && npm run build && cd ../extensions/vscode

# Package
npm run prepackage
npm run package

# Publish
npx @vscode/vsce publish -p YOUR_PAT
```

The extension will be available at:
`https://marketplace.visualstudio.com/items?itemName=ModelPiper.codepiper`

### Updating

Bump the version in `extensions/vscode/package.json`, rebuild, and publish again.

## Open VSX (for VSCodium, Gitpod, Theia)

### Setup (one-time)

1. Create an account at https://open-vsx.org
2. Create your namespace: `npx ovsx create-namespace ModelPiper --pat YOUR_TOKEN`

### Publishing

```bash
npx ovsx publish build/codepiper-{version}.vsix -p YOUR_TOKEN
```

## VSIX Sideload (Direct Download)

For users who want to install without the marketplace:

```bash
# Package the extension
cd extensions/vscode && npm run package
# Output: build/codepiper-{version}.vsix

# Install locally
code --install-extension build/codepiper-{version}.vsix
```

Distribute the .vsix via:

- GitHub Releases on the code-piper repo
- modelpiper.com downloads page

## GitHub Releases

Tag releases on the `codepiper` branch:

```bash
git tag v0.1.0
git push origin v0.1.0
```

Then create a GitHub release with the .vsix attached:

```bash
gh release create v0.1.0 build/codepiper-0.1.0.vsix \
  --title "CodePiper v0.1.0" \
  --notes "Initial release — local-first AI coding powered by ToolPiper"
```

## JetBrains Marketplace

The JetBrains plugin (`extensions/intellij/`) is a separate build:

1. Build: `cd extensions/intellij && ./gradlew buildPlugin`
2. Output: `build/distributions/codepiper-{version}.zip`
3. Publish via JetBrains Marketplace portal

This is a separate effort and lower priority than VS Code.
