# VisionText

VS Code extension to transform images into detailed descriptions and generate custom AI images from text prompts - perfect for developers who need quick visuals for their projects. Powered by Pollinations.AI Vision API.

## Features

- **Image Analysis**: Convert images into detailed descriptions
- **AI Image Generation**: Generate custom images from text descriptions - perfect for placeholder graphics, mockups, and project visuals
- **Smart Clipboard Integration**: Auto-copy descriptions and paste into code
- **Context Menu Actions**: Right-click image files for VisionText options
- **Workspace Integration**: Generated images saved to workspace root
- **Customizable Settings**: Configure token limits and clipboard behavior



https://github.com/user-attachments/assets/36556514-5c66-4017-accd-bc90f50354e7


## Installation

1. Open VS Code Extensions (Ctrl+Shift+X)
2. Search "VisionText"
3. Click Install

Or install from [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=TechRayApps.visiontext).

## Usage 

### Analyzing Images

**Right-click method**: Right-click image file → VisionText → "Analyze Image for Code Tools"

**Command Palette**: Ctrl+Shift+P → "Analyze Image for Code Tools" or "Browse and Analyze Image..."

### Generating AI Images for Your Projects

**Quick Access**: Ctrl+Shift+P → "Generate AI Image..." → Enter description → Image saved to your workspace root

**Perfect for Developers**:
- **Placeholder Graphics**: Need a quick hero image, icon, or banner? Generate it instantly
- **Mockup Images**: Create sample images for prototypes and demos
- **Documentation**: Generate custom visuals for README files and docs
- **Social Media**: Create eye-catching images for project announcements
- **UI/UX Testing**: Generate diverse test images for your interfaces

**Example Prompts**:
- "Modern tech company logo with blue gradient"
- "Clean dashboard interface mockup with charts"
- "Developer workspace with multiple monitors showing code"
- "Abstract background for mobile app splash screen"

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

**Image Analysis Use Cases**:
- **AI/ML Development**: Analyze training data and model outputs
- **Documentation**: Generate descriptions for technical diagrams
- **Code Reviews**: Document UI changes and visual bugs
- **Accessibility**: Create alt-text for images automatically
- **Testing**: Verify visual elements in automated tests

**Image Generation Use Cases**:
- **Rapid Prototyping**: Generate placeholder images without leaving VS Code
- **Project Assets**: Create custom graphics for your applications
- **Marketing Materials**: Generate images for project presentations
- **Design Mockups**: Visualize concepts before implementing them

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

**Slow analysis**: Large images or network latency may cause delays

**Rate limits**: 1 request per 15 seconds

**Error 403 Bad Gateway**: The server is overloaded or rate limits are in place, try again in a few minutes

## License

MIT License - see [LICENSE](LICENSE) file

## Support

- **Issues**: [GitHub Issues](https://github.com/techcow2/visiontext/issues)
- **Marketplace**: [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=TechRayApps.visiontext)

Made by [techcow2](https://github.com/techcow2)
