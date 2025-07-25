# 📝 Node.js DOCX to PDF Converter

## 📌 Project Overview

The **DOCX to PDF Converter** is a full-stack web application built using **Node.js**, designed to seamlessly convert `.docx` files into `.pdf` format.
It features:

* A **clean and responsive UI**
* A robust **Node.js + LibreOffice backend**
* **Cloudinary** integration for secure file storage

> ⚙️ Conversion is handled locally via Dockerized LibreOffice, ensuring full privacy and control.

---
# 🚀 **Check Project Here:**
🔗 [https://nodejs-converter-frontend.onrender.com/](https://nodejs-converter-frontend.onrender.com/)


## ✨ Features

* ✅ **DOCX to PDF Conversion** – Instant `.docx` to `.pdf` transformation.
* ✅ **Local Server-Side Processing** – Uses LibreOffice inside a Docker container.
* ✅ **Responsive UI** – Works on all screen sizes.
* ✅ **Automatic Download** – PDF auto-downloads with the original filename.
* ✅ **Cloud Storage Backup** – PDF is also uploaded to **Cloudinary**.
* ✅ **Auto Cleanup** – Temporary files are deleted after conversion.

---

## 💻 Technologies Used

### 🔹 Frontend

* **HTML5** – Structure of the page
* **CSS3** – Styling + Responsiveness
* **JavaScript (ES6+)** – Handles UI logic, API calls, and downloads

### 🔹 Backend

* **Node.js** – Server-side environment
* **Express.js** – RESTful API framework
* **Multer** – File uploads
* **libreoffice-convert** – DOCX → PDF via LibreOffice
* **Cloudinary SDK** – Cloud storage integration
* **cors** – Handles cross-origin requests
* **dotenv** – Secure environment config

---

## 📦 Deployment Environment

* **Docker** – Isolated environment for Node.js + LibreOffice
* **Render.com** – Hosts both backend (Docker) & frontend (Static Site)
* **LibreOffice** – Core conversion engine
* **xvfb, xauth, default-jre** – Enables headless LibreOffice inside Docker

---

## 🔧 Local Setup Instructions

### 1️⃣ Clone the Repo

```bash
git clone <your_repository_url>
cd <project_directory>
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Install LibreOffice

#### 🪟 Windows:

* Download from: [https://www.libreoffice.org/download/download](https://www.libreoffice.org/download/download)
* In `server.js`:

  ```js
  libre.convert.path = 'C:\\Program Files\\LibreOffice\\program\\soffice.exe';
  ```

#### 🐧 macOS/Linux:

```bash
sudo apt install libreoffice
```

### 4️⃣ Configure `.env`

```env
CLOUDINARY_CLOUD_NAME= your_cloud_name
CLOUDINARY_API_KEY= your_key
CLOUDINARY_API_SECRET=your_actual_secret
PORT=5000
```

### 5️⃣ Run the Server

```bash
npm start
```

### 6️⃣ Launch Frontend

Open `index.html` in your browser.

---

## 🚀 Usage Guide

1. **Select File** → Choose a `.docx` file
2. **Convert** → Click “Convert DOCX to PDF”
3. **Download** → PDF will auto-download
4. **Cloud Copy** → Also saved in your Cloudinary
5. **Ready for Next** → UI resets automatically

---

## 🗂️ Project Structure

```
.
├── server.js               # Express backend
├── Dockerfile              # Docker setup
├── .env                    # Local config (not committed)
├── index.html              # Frontend UI
├── script.js               # Frontend logic
├── style.css               # Frontend styling
├── uploads/                # Temp DOCX storage
├── converted/              # Temp PDF storage
├── package.json            # Project metadata
└── .gitignore              # Ignore rules
```

---

## 🌍 Deployment on Render

### 🔧 Backend (Docker Web Service)

* Push to GitHub
* On Render:

  * **New → Web Service**
  * Connect repo
  * Set environment vars (Cloudinary, PORT)
  * Runtime: **Docker**
  * Leave build/start commands blank
* Wait for “Live” status

### 🖥️ Frontend (Static Site)

* Update `script.js`:

  ```js
  const backendUrl = "https://<your-backend-name>.onrender.com/convert";
  ```
* Push changes
* On Render:

  * **New → Static Site**
  * Set:

    * Root: `.`
    * Publish Dir: `.`
* Done! 🎉

---

## 🧪 Final Test

Open the frontend Render URL and test conversion with any `.docx` file.

---

## 🛠️ Troubleshooting

| Issue                      | Fix                                     |
| -------------------------- | --------------------------------------- |
| `soffice binary not found` | Ensure LibreOffice path is correct      |
| `EADDRINUSE`               | Another app using port 5000 – change it |
| `500 Server Error`         | Check Docker logs, missing dependencies |
| `CORS error`               | Add `app.use(cors())` in server.js      |
| Frontend unresponsive      | Check `script.js`, browser console      |

---

## 📜 License

MIT License – Free to use, modify, and share.


