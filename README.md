# ⚡ StatusQuest

**Visualize. Understand. Debug.**  
StatusQuest is a fun, interactive, and developer-friendly web app that helps you understand HTTP status codes like never before with real-world examples, mock APIs, and detailed breakdowns.

![GitHub repo size](https://img.shields.io/github/repo-size/CodeQuestic/StatusQuest?color=blue)
![GitHub last commit](https://img.shields.io/github/last-commit/CodeQuestic/StatusQuest)
![MIT License](https://img.shields.io/github/license/CodeQuestic/StatusQuest)
![GitHub stars](https://img.shields.io/github/stars/CodeQuestic/StatusQuest?style=social)

---

## 📘 Table of Contents

- [🚀 Live Demo](#-live-demo)
- [🎯 Purpose](#-purpose)
- [✨ Features](#-features)
- [🧩 Tech Stack](#-tech-stack)
- [📦 Installation](#-installation)
- [🧪 Usage](#-usage)
- [📚 Status Code Structure](#-status-code-structure)
- [📜 License](#-license)

---

## 🚀 Live Demo

🌐 [Try StatusQuest Live(Yet to launch)](https://yettolaunch.com)

---

## 🎯 Purpose

HTTP status codes are fundamental to web development, but they’re often overlooked or misunderstood. StatusQuest helps developers **learn faster & debug smarter** with real examples along with mock API behaviour.

---

## ✨ Features

✅ Categorized views for **1xx**, **2xx**, **3xx**, **4xx**, and **5xx** series  
✅ Interactive mock requests and responses  
✅ Emojis, tips, examples, and mock payloads  
✅ Realistic API structure with code and headers  
✅ Built with scalability and simplicity in mind

---

## 🧩 Tech Stack

| Tech         | Use Case                        |
|--------------|---------------------------------|
| `Next.js`    | React-based frontend framework  |
| `SCSS`       | Styling (modular & global)      |
| `TypeScript` | Type safety                     |
| `Vercel`     | Hosting and deployment          |

---

## 📦 Installation

```bash
# 1. Clone the repo
git clone https://github.com/CodeQuestic/StatusQuest.git

# 2. Install dependencies
cd StatusQuest
npm install

# 3. Run locally
npm run dev
````

---

## 🧪 Usage

After launching locally, visit `http://localhost:3000`.

Explore categorized HTTP status codes, click "Try Now" to simulate API calls, and see the request, headers, and responses.

> Ideal for frontend developers, backend engineers, and students.

---

## 📚 Status Code Structure

Each status code includes:

* **Code** and **Title**
* **Short Description**
* **Category** (Informational, Success, Redirection, Client Error, Server Error)
* **Emoji** to visualize purpose
* **Real-world Example**
* **Mock API structure**:

  * `method`
  * `url`
  * `body` (if any)
  * `headers` (like Retry-After)
  * `response`
  * `status`
* **Pro Tip** for developers

---

## 📜 License

This project is licensed under the **MIT License**.

---