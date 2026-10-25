# AI-POWERED FOOD SAFETY AND PURITY ANALYSIS
### Food Adulteration Detection & Household Purity Verification Platform

A complete, modern, attractive, and professional full-stack website developed for the **Community Service Project (CSP)** by students of **Sri Vasavi Engineering College (Autonomous)**, Department of Computer Science and Engineering.

---

## 🏛️ Project Details

- **Project Title**: **“AI-POWERED FOOD SAFETY AND PURITY ANALYSIS”**
- **Application Name**: **FoodPure AI**
- **Institution**: Sri Vasavi Engineering College (Autonomous)
- **Department**: Department of Computer Science and Engineering
- **Faculty Guide**: Mr. Syed Akheel Hassan Gori
- **Project Location**: Tanuku and surrounding urban areas, West Godavari District, Andhra Pradesh

---

## 👥 Meet Our Team

| S.No | Name | Roll Number | Presentation Role |
| :---: | :--- | :---: | :--- |
| 1 | **P. Punith Chandra** | `24A81A05G9` | Project Coordinator / Lead |
| 2 | **M. Durga Prasad** | `24A81A05G2` | Research & Documentation |
| 3 | **D. Hemanth** | `24A81A05D8` | Backend & AI Integration |
| 4 | **N. Arun Teja** | `24A81A05G6` | Frontend Development |
| 5 | **K. Jay Vardhan** | `24A81A05F9` | Data & Survey Analysis |
| 6 | **R. Santhosh** | `24A81A05H4` | Testing & Validation |
| 7 | **M. Prasannakumar** | `24A81A05G1` | UI/UX & Presentation |

---

## 💡 System Architecture

```
USER
  ↓
REACT FRONTEND (Vite, Tailwind CSS, Chart.js, Lucide Icons)
  ↓
FASTAPI BACKEND (Python 3.14 / Uvicorn on port 8000)
  ↓
FOOD COMMODITY VALIDATION LAYER (Rejects non-food items e.g., "Laptop")
  ↓
KNOWLEDGE RETRIEVAL & RAG SYSTEM (FSSAI DART, WHO, FAO, CSIR-CFTRI, AGMARK)
  ↓
AI / LLM SYNTHESIS (Google Gemini API with graceful offline fallback)
  ↓
SQLITE DATABASE (Search history, survey analytics, citizen feedback)
  ↓
STRUCTURED FOOD SAFETY ADVISORY (Possible adulterants, test procedure, health hazards, safe buying tips)
```

---

## 📦 Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Chart.js, React-Chartjs-2
- **Backend**: Python FastAPI, Uvicorn, Pydantic, Python-Dotenv, HTTPX
- **Database**: SQLite (`farm_to_fork.db`)
- **AI & RAG**: Google Gemini API (`gemini-1.5-flash`), FSSAI DART Knowledge Base, Hybrid Semantic/Keyword Retrieval
- **Operating Environment**: Windows / Local Dev Server

---

## 🌐 Public Hosting on Render

The repository includes a Render Blueprint (`render.yaml`) that configures the FastAPI backend and Vite frontend as separate free services.

1. Push this project to a GitHub repository.
2. In Render, choose **New + → Blueprint** and connect the repository.
3. Review the detected `foodpure-api` and `foodpure-web` services, then deploy.
4. Open the public URL shown for `foodpure-web`.

The frontend is configured to use the deployed API automatically. The optional `GOOGLE_API_KEY` can be added as a secret environment variable on the `foodpure-api` service to enable Gemini responses; the curated knowledge base works without it.

**Data note:** the SQLite database is stored on the service filesystem. On Render's free web service, local files are not durable across restarts or redeploys, so search history and feedback may reset. Use persistent storage or a managed database if that data must be retained.

---

## 🚀 Quick Start (1-Click Run)

Simply double-click:
```bat
start_all.bat
```
This automatically starts both the FastAPI backend server (`http://localhost:8000`) and the Vite React frontend (`http://localhost:5173`).

---

## 🛠️ Manual Installation & Run Guide

### 1. Backend Setup

```bash
cd D:\punith\farm-to-fork\backend
pip install -r requirements.txt
```

Launch the backend server:
```bash
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
Or double-click `run_backend.bat`.

- Backend API: `http://localhost:8000`
- Interactive API Docs (Swagger): `http://localhost:8000/docs`

### 2. Frontend Setup

```bash
cd D:\punith\farm-to-fork\frontend
npm install
npm run dev
```
Or double-click `run_frontend.bat`.

- Frontend Web Application: `http://localhost:5173`

---

## 🔑 AI API Key Configuration (Optional)

The application features an authentic built-in **RAG Knowledge Base** indexing FSSAI and WHO data, allowing it to work **100% offline and seamlessly out of the box**.

To enable live Google Gemini reasoning:
1. Open `D:\punith\farm-to-fork\backend\.env`
2. Obtain a free Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
3. Set your key:
```env
GOOGLE_API_KEY=your_actual_gemini_api_key_here
```

---

## 📊 Core Features

1. **FoodPure AI Conversational Interface**:
   - Modern conversational layout with sidebar, recent queries history, and audio text-to-speech.
   - Interactive quick-start food chips (Milk, Turmeric, Honey, Edible Oil, Ghee, Chilli Powder).
   - Voice/Microphone speech recognition.
   - Intelligent Non-Food Detector (rejects items like "Laptop" with friendly food suggestions).
2. **Food Knowledge Base**:
   - Curated profiles for 10+ core foods: Milk, Turmeric, Chilli Powder, Sugar, Honey, Edible Oil, Ghee, Tea, Coffee, Rice, Black Pepper, Salt.
3. **FSSAI & AGMARK Certification Standards Guide**:
   - Built-in reference modal outlining Indian packaging regulations, certification seals, and consumer rights.
4. **Field Survey Dashboard**:
   - Interactive Donut Chart displaying the Tanuku Community Survey finding: **65% Aware** vs **35% Needing Additional Awareness**.
   - Category query volume bar charts.
5. **College Presentation Mode**:
   - 1-Click presentation deck designed specifically for presenting the project to professors and project guide Mr. Syed Akheel Hassan Gori.
6. **Meet Our Team**:
   - Interactive cards displaying all 7 CSE team members with university roll numbers, roles, and guide recognition.
7. **Mandatory Safety Disclaimers**:
   - Clearly marks tests as *"Preliminary awareness checks"*, emphasizing that accredited laboratory testing is required for scientific confirmation.
