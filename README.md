# resume.io | Downloader

## Description
This Chrome extension allows you to download your resume from resume.io for free. It monitors network requests to detect the resume blob URL and provides a download button for easy access.

## Features
- Automatically detects resume blobs from resume.io.
- Adds a "FREE PDF" download button to the resume preview panel.
- Simple and easy to use.

## Installation
1. Clone this repository or download the ZIP file.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" by toggling the switch in the top right corner.
4. Click on "Load unpacked" and select the directory where you cloned/downloaded the repository.

## Usage
1. Navigate to your resume on resume.io.
2. The extension will automatically detect the resume blob and add a "FREE PDF" download button.
3. Click the "FREE PDF" button to download your resume.

## Permissions
This extension requires the following permissions:
- `debugger`: To monitor network requests.
- `downloads`: To download the resume file.
- `activeTab`: To interact with the current tab.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.