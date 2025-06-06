# 🧠 AI Agent Coding – Terminal + Streamlit Interface

An autonomous AI coding agent that takes natural language prompts and builds full-stack projects using **HTML, CSS, and JavaScript**, with support for terminal command execution and live debugging.

### 🚀 Features

* Converts natural prompts (e.g., *"Build me a todo app"*) into full code projects
* Supports:

  * Project scaffolding
  * Writing HTML, CSS, JS files
  * API integrations with `.env` setup
  * Debugging (syntax, logic, structure)
* Modular agent reasoning via `step`: `observe`, `action`, `output`
* Runs in:

  * 🖥️ Terminal (interactive shell)
  * 🌐 Streamlit web UI (with live agent thinking!)

---

### 🗂️ Project Structure

```
AI-AGENT-CODING/
├── main.py                 # Main agent runtime logic (no Streamlit dependencies)
├── streamlit_app.py        # Live web interface using Streamlit
├── prompts/
│   └── html_css_js.txt     # System prompt logic
├── .env                    # Environment vars (e.g., API key)
└── README.md               # You're reading this
```

---

### ⚙️ Setup Instructions

#### 1. Clone & Install Requirements

```bash
git clone https://github.com/your-repo/AI-AGENT-CODING.git
cd AI-AGENT-CODING
pip install openai streamlit python-dotenv
```

#### 2. Setup `.env`

Create a `.env` file with your API key:

```env
GEMINI_API_KEY=your_gemini_or_openai_key
```

> Uses Google's **Gemini 2.0** via compatible OpenAI client call.

---

### 💻 Running the Agent

#### Terminal Mode (no GUI):

```bash
python main.py
```

Enter your request like:

```bash
> Build me a blog website using HTML, CSS, and JS.
```

---

### 🌐 Web UI (Streamlit) – With Live Agent Thinking

```bash
streamlit run streamlit_app.py
```

#### Web Features:

* Input your request via text box
* Watch live agent steps (observe, plan, act)
* Visual card updates of each action
* Final summary of task completed

---

### 🛠 Example Prompts to Try

* `Build a todo app with create, edit, delete`
* `Create a responsive blog site`
* `Build a calculator UI in HTML/CSS/JS`
* `Make a GitHub profile finder (ask for API)`
* `Create stopwatch timer web app`
* `Weather app (asks for and imports API)`
* `Build a minimal ecommerce site layout`

---

### 🧪 Debugging Built-in

The agent can:

* Scan for missing/mismatched class or ID names
* Fix common syntax issues
* Ensure logical correctness in JS
* Suggest and repair DOM-event mismatches
* Re-run faulty commands automatically

You can extend more debugging strategies in the prompt file.

---

### 📦 Example Agent Output Format

```json
{
  "step": "action",
  "function": "run_command",
  "input": "cat > todo-app/index.html <<EOF\n ... \nEOF",
  "content": "Creating index.html with structure..."
}
```

---

### ✅ Requirements

* Python 3.8+
* Streamlit
* OpenAI Client
* dotenv

Install all with:

```bash
pip install -r requirements.txt
```

*(Or manually as shown earlier)*

---

### 🧠 Want to Extend?

You can plug in more tools like:

* `scan_html_structure`
* `auto_debug_script`
* `render_web_preview` (via iframe)
* `file_structure_visualizer` (for Streamlit)

Ask for help if you want to implement them.

---

### 🧾 License

MIT – free to use, extend, and remix.
