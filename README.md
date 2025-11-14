# VisionText

VS Code extension to Transform images into detailed descriptions for AI assistants, documentation, and code tools. Powered by Pollinations.AI Vision API.

## Features

- **Image Analysis**: Convert images into detailed descriptions
- **AI Image Generation**: Create images from text prompts
- **Smart Clipboard Integration**: Auto-copy descriptions and paste into code
- **Context Menu Actions**: Right-click image files for VisionText options
- **Workspace Integration**: Generated images saved to workspace root
- **Customizable Settings**: Configure token limits and clipboard behavior

## Installation

1. Open VS Code Extensions (Ctrl+Shift+X)
2. Search "VisionText"
3. Click Install

Or install from [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=techcow2.visiontext).

## Usage

### Analyzing Images

**Right-click method**: Right-click image file → VisionText → "Analyze Image for Code Tools"

**Command Palette**: Ctrl+Shift+P → "Analyze Image for Code Tools" or "Browse and Analyze Image..."

### Generating AI Images

Ctrl+Shift+P → "Generate AI Image..." → Enter description → Image saved to workspace

### Post-Analysis Actions

- **Show**: View description in output channel
- **Copy**: Copy to clipboard
- **Paste**: Insert into active editor

## Settings

- `imageToDescription.maxTokens`: Maximum tokens for descriptions (default: 500)
- `imageToDescription.autoCopyToClipboard`: Auto-copy descriptions (default: true)

## Supported Formats

PNG, JPEG/JPG, GIF, BMP, WebP, SVG

## For Developers

Useful for AI/ML development, documentation, code reviews, accessibility, and testing.

## Technical Details

- API: Pollinations.AI Vision API
- Models: OpenAI-compatible vision models
- Authentication: Anonymous (rate limited)
- Requirements: Internet connection

## Development

```bash
git clone https://github.com/techcow2/visiontext.git
cd visiontext
npm install
npm run compile
```

Press F5 in VS Code to launch Extension Development Host.

## Building

```bash
npm run compile
vsce package
```

## Troubleshooting

**Network errors**: Check internet connection and firewall settings

**No workspace folder**: Ensure VS Code workspace is open

**Slow analysis**: Large images or network latency may cause delays

**Rate limits**: 1 request per 15 seconds for anonymous users

## License

MIT License - see [LICENSE](LICENSE) file

## Support

- **Issues**: [GitHub Issues](https://github.com/techcow2/visiontext/issues)
- **Discussions**: [GitHub Discussions](https://github.com/techcow2/visiontext/discussions)
- **Marketplace**: [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=techcow2.visiontext)

Made by [techcow2](https://github.com/techcow2)
