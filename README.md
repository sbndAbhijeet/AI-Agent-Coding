# 🧠 Terminal-Based AI Coding Agent

A terminal-native AI assistant specialized in **full-stack web development** using `HTML`, `CSS`, and `JavaScript`. It works through **prompt-based interaction** and performs **step-by-step execution** using shell commands to build, modify, and debug projects.

---

## 🔧 Features

* 🗂️ Creates complete folder/file structures.
* ✍️ Writes HTML, CSS, and JavaScript with proper structuring and conventions.
* 🔁 Supports iterative prompts like “Add a login page”.
* 🛠️ Executes shell commands like `mkdir`, `touch`, `cat`, etc.
* 📂 Scans and updates existing files intelligently.
* 🐞 Detects and resolves common development bugs and mismatches.
* 🔒 Handles external APIs using `.env` and JS imports when required.
* ✅ Works entirely via `run_command` for execution.

---

## 📌 Technologies

* Terminal-based interface
* OpenAI or Gemini API (used through function-calling)
* JavaScript, HTML, CSS
* Shell scripting (`run_command`)

---

## 🧠 Prompt Design

The agent follows a strict **step-based prompt protocol**:

```json
{
  "step": "plan" | "action" | "observe" | "output",
  "content": "Explain what it's doing",
  "function": "run_command", // only for 'action' steps
  "input": "Shell command to execute"
}
```

The agent always:

* Observes → Plans → Acts → Waits for results → Repeats.

### 🛠️ Debugging Strategy

If errors occur:

* Scans HTML/CSS/JS files.
* Validates class/id consistency.
* Checks syntax and function logic.
* Auto-corrects common issues like:

  * Wrong heredoc syntax (`cat > file <<EOF` → `cat <<EOF > file`)
  * Unconnected JS event listeners
  * Missing element references

---

## 🚀 Sample Flow

### User Query:

> Build me a Todo Website using HTML, CSS, JS

### Agent Output:

```json
{
  "step": "action",
  "content": "Creating the project folder",
  "function": "run_command",
  "input": "mkdir todo-app"
}
```

... and continues step-by-step to create files like:

* `index.html`
* `style.css`
* `script.js`

Finishes with:

```json
{
  "step": "output",
  "content": "Your Website has been built 👷🏻 Run it 🏃🏻 and ask for debugging 🛠️"
}
```

---

## 🛠️ Heredoc Fix Automation

When the agent writes JS using heredocs, errors may occur. A fix is applied using:
    
Issues fix:
    
    cat <<EOF > note-app/script.js
    // Your JS code here
    EOF"
    

This corrects heredoc order to avoid syntax issues in `script.js` creation.

---

## 📁 Examples Included

* ✅ Todo App
* ✅ Calculator
* ✅ Weather App (API-based)
* ✅ GitHub Profile Viewer (API-based)
* ✅ E-commerce Frontend
* ✅ Stopwatch/Timer
* 🐛 Debugging examples for syntax, logic, event mismatches

---

## 🧪 How to Use

1. Prompt the agent using natural language.
2. Agent responds with step-by-step JSON objects.
3. A shell runner reads the `input` and executes it.
4. Output is observed and fed back into the next prompt.

---

## 📌 Roadmap

* [ ] Support for additional stacks (React, Node, etc.)
* [ ] Integrated testing and linting support
* [ ] File previews and CLI file explorer

---

## 🧠 Inspired by

* GPT/Gemini Function Calling
* Dev CLI workflows
* AutoGPT architectural principles

---

## 📄 License

MIT — Feel free to use and adapt this AI workflow for personal or commercial use.
