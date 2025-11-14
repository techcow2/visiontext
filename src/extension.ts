import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';
import * as FormData from 'form-data';

interface ImageAnalysisResult {
    description: string;
    success: boolean;
    error?: string;
}

interface ImageGenerationResult {
    success: boolean;
    filename?: string;
    error?: string;
}

export function activate(context: vscode.ExtensionContext) {
    console.log('Image to Description extension is now active!');

    // Register the main command
    const analyzeImageCommand = vscode.commands.registerCommand('imageToDescription.analyzeImage', async (uri: vscode.Uri) => {
        await analyzeImageHandler(uri);
    });

    // Register browse for image command
    const browseForImageCommand = vscode.commands.registerCommand('imageToDescription.browseForImage', async () => {
        await analyzeImageHandler(); // Call without uri to trigger file picker
    });

    // Register generate image command
    const generateImageCommand = vscode.commands.registerCommand('imageToDescription.generateImage', async () => {
        await generateImageHandler();
    });

    // Create status bar item
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = 'imageToDescription.analyzeImage';
    statusBarItem.text = '$(file-media) Analyze Image';
    statusBarItem.tooltip = 'Analyze image for code tools';
    statusBarItem.show();

    context.subscriptions.push(
        analyzeImageCommand,
        browseForImageCommand,
        generateImageCommand,
        statusBarItem
    );
}

async function analyzeImageHandler(uri?: vscode.Uri): Promise<void> {
    try {
        let imagePath: string;

        if (uri) {
            // Use the URI from context menu (right-click on file)
            imagePath = uri.fsPath;
        } else {
            // Fallback to file picker for status bar usage
            const options: vscode.OpenDialogOptions = {
                canSelectMany: false,
                openLabel: 'Analyze',
                filters: {
                    'Images': ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp', 'svg'],
                    'All files': ['*']
                }
            };

            const fileUri = await vscode.window.showOpenDialog(options);

            if (!fileUri || fileUri.length === 0) {
                return;
            }

            imagePath = fileUri[0].fsPath;
        }
        
        // Show progress notification
        const analysisResult: ImageAnalysisResult = await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Analyzing image...",
            cancellable: false
        }, async (progress) => {
            progress.report({ increment: 0 });

            try {
                const result = await analyzeImageWithPollinations(imagePath);
                progress.report({ increment: 100 });
                return result;
            } catch (error) {
                progress.report({ increment: 100 });
                throw error;
            }
        });

        // Show result notification after progress completes
        if (analysisResult.success) {
            // Get configuration
            const config = vscode.workspace.getConfiguration('imageToDescription');
            const autoCopy = config.get<boolean>('autoCopyToClipboard', true);

            // Copy to clipboard if enabled (but don't show notification)
            if (autoCopy) {
                await vscode.env.clipboard.writeText(analysisResult.description);
            }

            // Store result globally for access by notification handlers
            (global as any).lastImageAnalysisResult = analysisResult.description;

            // Show persistent notification with essential actions
            const selection = await vscode.window.showInformationMessage(
                'Image analysis complete! Click to paste text when ready.',
                { modal: false },
                'Show',
                'Copy',
                'Paste'
            );

            if (selection === 'Show') {
                // Show result only when user requests it
                const outputChannel = vscode.window.createOutputChannel('Image Analysis');
                outputChannel.clear();
                outputChannel.appendLine('=== Image Analysis Result ===');
                outputChannel.appendLine(analysisResult.description);
                outputChannel.show();
            } else if (selection === 'Copy') {
                await vscode.env.clipboard.writeText(analysisResult.description);
                vscode.window.showInformationMessage('Image description copied to clipboard!');
            } else if (selection === 'Paste') {
                // Paste into active text editor
                const editor = vscode.window.activeTextEditor;
                if (editor) {
                    await editor.edit(editBuilder => {
                        editBuilder.insert(editor.selection.active, analysisResult.description);
                    });
                } else {
                    vscode.window.showWarningMessage('No active text editor to paste into');
                }
            }

        } else {
            vscode.window.showErrorMessage(`Image analysis failed: ${analysisResult.error || 'Failed to analyze image'}`);
        }

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to analyze image';
        vscode.window.showErrorMessage(`Error: ${errorMessage}`);
    }
}

async function generateImageHandler(): Promise<void> {
    try {
        // Show input box for image description
        const prompt = await vscode.window.showInputBox({
            prompt: 'Enter a description for the AI image you want to generate',
            placeHolder: 'e.g., A futuristic city with flying cars at sunset',
            validateInput: (value) => {
                if (!value || value.trim().length === 0) {
                    return 'Please enter a description for the image';
                }
                return null;
            }
        });

        if (!prompt) {
            return; // User cancelled
        }

        // Show progress notification
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Generating AI image...",
            cancellable: false
        }, async (progress) => {
            progress.report({ increment: 0 });

            try {
                const result = await generateImageWithPollinations(prompt.trim());
                progress.report({ increment: 100 });

                if (result.success) {
                    vscode.window.showInformationMessage(`AI image generated and saved as: ${result.filename}`);
                } else {
                    vscode.window.showErrorMessage(`Failed to generate image: ${result.error}`);
                }
            } catch (error) {
                progress.report({ increment: 100 });
                throw error;
            }
        });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to generate image';
        vscode.window.showErrorMessage(`Error: ${errorMessage}`);
    }
}



async function generateImageWithPollinations(prompt: string): Promise<ImageGenerationResult> {
    try {
        // Get workspace root folder
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            return {
                success: false,
                error: 'No workspace folder found. Please open a folder to generate images.'
            };
        }

        const workspaceRoot = workspaceFolders[0].uri.fsPath;

        // Create a safe filename from the prompt
        const safePrompt = prompt.replace(/[^a-zA-Z0-9\s]/g, '').trim().substring(0, 30);
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `ai-generated-${safePrompt.replace(/\s+/g, '-')}-${timestamp}.png`;
        const imagePath = path.join(workspaceRoot, filename);

        // Encode the prompt for URL
        const encodedPrompt = encodeURIComponent(prompt);

        // Pollinations image generation endpoint with no logo
        const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&model=flux&nologo=true`;

        // Download the image
        const response = await axios.get(imageUrl, {
            responseType: 'arraybuffer',
            timeout: 60000 // 60 second timeout
        });

        // Save the image to workspace root
        fs.writeFileSync(imagePath, response.data);

        return {
            success: true,
            filename: filename
        };

    } catch (error) {
        let errorMessage = 'Failed to generate image';

        if (axios.isAxiosError(error)) {
            if (error.response) {
                errorMessage = `API Error: ${error.response.status} - ${error.response.statusText}`;
            } else if (error.request) {
                errorMessage = 'Network error: Unable to reach Pollinations.AI API';
            } else {
                errorMessage = `Request error: ${error.message}`;
            }
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }

        return {
            success: false,
            error: errorMessage
        };
    }
}

async function analyzeImageWithPollinations(imagePath: string): Promise<ImageAnalysisResult> {
    try {
        // Read image file
        const imageBuffer = fs.readFileSync(imagePath);
        const base64Image = imageBuffer.toString('base64');
        
        return await analyzeImageBase64WithPollinations(base64Image);
    } catch (error) {
        return {
            success: false,
            description: '',
            error: error instanceof Error ? error.message : 'Failed to read image file'
        };
    }
}

async function analyzeImageBase64WithPollinations(base64Image: string): Promise<ImageAnalysisResult> {
    try {
        // Get configuration
        const config = vscode.workspace.getConfiguration('imageToDescription');
        const maxTokens = config.get<number>('maxTokens', 500);
        
        // Prepare the request payload
        const payload = {
            model: "openai",
            messages: [{
                role: "user",
                content: [
                    {
                        type: "text",
                        text: "Describe this image in detail. Focus only on what you can see - the visual content, layout, text, elements, and technical details. Do not provide suggestions, recommendations, or advice. Just describe what is present in the image."
                    },
                    {
                        type: "image_url",
                        image_url: {
                            url: `data:image/jpeg;base64,${base64Image}`
                        }
                    }
                ]
            }],
            max_tokens: maxTokens
        };
        
        // Make API request to Pollinations.AI
        const response = await axios.post('https://text.pollinations.ai/openai', payload, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 30000 // 30 second timeout
        });
        
        if (response.data && response.data.choices && response.data.choices.length > 0) {
            const description = response.data.choices[0].message.content;
            return {
                success: true,
                description: description
            };
        } else {
            return {
                success: false,
                description: '',
                error: 'Invalid response from API'
            };
        }
        
    } catch (error) {
        let errorMessage = 'Failed to analyze image';
        
        if (axios.isAxiosError(error)) {
            if (error.response) {
                errorMessage = `API Error: ${error.response.status} - ${error.response.statusText}`;
            } else if (error.request) {
                errorMessage = 'Network error: Unable to reach Pollinations.AI API';
            } else {
                errorMessage = `Request error: ${error.message}`;
            }
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }
        
        return {
            success: false,
            description: '',
            error: errorMessage
        };
    }
}

export function deactivate() {
    console.log('Image to Description extension is now deactivated!');
}