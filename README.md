# 🏀 BallerTV Video Downloader

A lightweight browser extension that provides a one-click solution for downloading game replays and videos directly from BallerTV. 

## ✨ Features
* **One-Click Downloads:** Automatically finds and extracts hidden `.mp4` video files from the active page.
* **Smart Naming:** Dynamically names the downloaded video file based on the specific game URL for easy organization.
* **Local Processing:** Runs entirely within your browser with zero external server dependencies.

<img width="75%" height="75%" alt="Screenshot of the extension in action" src="https://github.com/user-attachments/assets/0665cbe9-0719-4ef8-8421-73397346d346" />

## 🚀 Installation 

### For Firefox
1. Go to the **Releases** tab on the right side of this repository.
2. Download the latest `.zip` file and extract its contents to a folder on your computer.
3. Open Firefox and type `about:debugging` into the URL bar.
4. Click **This Firefox** on the left-hand menu.
5. Click the **Load Temporary Add-on** button.
6. Navigate to your extracted folder and select the `manifest.json` file.

### For Chrome / Edge (Developer Mode)
1. Download and extract the latest `.zip` file from the **Releases** tab.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Toggle **Developer mode** on in the top right corner.
4. Click **Load unpacked** in the top left and select your extracted folder.

## 📖 Usage
1. Navigate to a video or game replay page on [BallerTV](https://www.ballertv.com/).
2. Click the extension icon in your browser toolbar.
3. The extension will automatically locate the video source and begin your download.

## 🗺️ Roadmap / Future Work
* **In-Browser Video Previewer:** Add a UI to the extension popup allowing users to verify and preview the scraped video file before initiating the download.
* **HLS Stream Support (.m3u8):** Currently, the extension extracts standard `.mp4` URLs. Future updates aim to expand compatibility to handle HTTP Live Streaming (HLS). This will involve capturing `master.m3u8` playlists and implementing in-browser stitching (e.g., via `ffmpeg.wasm`) to combine video chunks into a single downloadable file.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
