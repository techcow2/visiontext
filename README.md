# VisionText 🖼️➡️📝

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/techcow2.visiontext.svg)](https://marketplace.visualstudio.com/items?itemName=techcow2.visiontext)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/techcow2.visiontext.svg)](https://marketplace.visualstudio.com/items?itemName=techcow2.visiontext)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/techcow2.visiontext.svg)](https://marketplace.visualstudio.com/items?itemName=techcow2.visiontext)

Transform images into detailed, actionable descriptions perfect for AI assistants, documentation, and code tools. Powered by Pollinations.AI Vision API.

## ✨ Features

- 🖼️ **Image Analysis**: Convert any image into detailed, useful descriptions
- 🎨 **AI Image Generation**: Create images from text prompts directly in your workspace
- 📋 **Smart Clipboard Integration**: Auto-copy descriptions and paste directly into code
- 🎯 **Context Menu Actions**: Right-click on image files to access VisionText submenu with all actions
- 📁 **Workspace Integration**: Generated images are saved to your workspace root
- ⚙️ **Customizable Settings**: Configure token limits and clipboard behavior

## 🚀 Installation

1. Open Visual Studio Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "VisionText"
4. Click Install

Or install directly from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=techcow2.visiontext).

## 📖 Usage

### Analyzing Images

**Method 1: Right-click on image file**
1. Right-click on any image file in your file explorer
2. Hover over "VisionText" submenu
3. Select "Analyze Image for Code Tools"
4. View the generated description and choose your action

**Method 2: Browse and analyze**
1. Click the VisionText status bar item or use Command Palette (Ctrl+Shift+P)
2. Type "Browse and Analyze Image..."
3. Select an image file from your computer

**Method 3: Use Command Palette**
1. Press Ctrl+Shift+P (or Cmd+Shift+P on Mac)
2. Type "Analyze Image for Code Tools"

### Generating AI Images

1. Press Ctrl+Shift+P (or Cmd+Shift+P on Mac)
2. Type "Generate AI Image..."
3. Enter your image description (e.g., "A futuristic city with flying cars at sunset")
4. The image will be generated and saved to your workspace root

### Actions After Analysis

Once an image is analyzed, you can choose from several actions:

- **Show**: View the full description in an output channel
- **Copy**: Copy the description to clipboard
- **Paste**: Paste directly into your active text editor

## ⚙️ Settings

You can configure VisionText through VS Code settings:

### `imageToDescription.maxTokens`
- **Type**: Number
- **Default**: 500
- **Description**: Maximum tokens for AI-generated descriptions

### `imageToDescription.autoCopyToClipboard`
- **Type**: Boolean
- **Default**: true
- **Description**: Automatically copy image descriptions to clipboard

## 🎯 Supported Image Formats

- PNG
- JPEG/JPG
- GIF
- BMP
- WebP
- SVG

## 🛠️ For Developers

VisionText is particularly useful for:

- **AI/ML Development**: Generate training data descriptions
- **Documentation**: Create alt-text and image descriptions
- **Code Reviews**: Analyze screenshots and UI designs
- **Content Creation**: Generate image descriptions for accessibility
- **Testing**: Document visual test cases with AI assistance

## 🔧 Technical Details

- **API**: Powered by Pollinations.AI Vision API
- **Models**: Uses OpenAI-compatible vision models
- **Authentication**: Anonymous access with rate limits
- **Network**: Requires internet connection for AI processing

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/techcow2/visiontext.git
   cd visiontext
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Compile TypeScript:
   ```bash
   npm run compile
   ```

4. Run in development:
   - Press F5 in VS Code to launch a new Extension Development Host window

### Building

```bash
# Compile TypeScript
npm run compile

# Package extension
vsce package
```

## 🐛 Troubleshooting

### Common Issues

**"Network error: Unable to reach Pollinations.AI API"**
- Check your internet connection
- Verify that firewalls aren't blocking API calls
- Try again after a few moments

**"No workspace folder found"** (when generating images)
- Make sure you have a folder/workspace open in VS Code
- Generated images are saved to the workspace root

**Image analysis takes too long**
- Large images may take more time to process
- Network latency can affect processing time
- Consider optimizing image size before analysis

### Rate Limits

- Anonymous users: 1 request every 15 seconds
- For higher limits, consider [registering with Pollinations.AI](https://auth.pollinations.ai)

## 📄 License

This extension is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Pollinations.AI](https://pollinations.ai) for providing the Vision API
- [VS Code API](https://code.visualstudio.com/api) for extension development tools
- The open-source community for inspiration and feedback

## 📞 Support

- **Report Issues**: [GitHub Issues](https://github.com/techcow2/visiontext/issues)
- **Feature Requests**: [GitHub Discussions](https://github.com/techcow2/visiontext/discussions)
- **Marketplace**: [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=techcow2.visiontext)

---

**Made with ❤️ by [techcow2](https://github.com/techcow2)**

If you find VisionText useful, please consider giving it a ⭐ on GitHub and a 👍 on the VS Code Marketplace!