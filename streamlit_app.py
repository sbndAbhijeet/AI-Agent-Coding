import streamlit as st
import os, json
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Streamlit UI
st.set_page_config(page_title="AI Coding Agent", layout="centered")
st.title("🧠 AI Full-Stack Coding Agent (Terminal Edition)")
st.subheader("👉For now the model is trained to make only HTML-CSS-JS project")



query = st.text_input("💬 Enter your project request:", placeholder="e.g., Build a blog website using HTML/CSS/JS")

# Display area for live model thinking
thinking_card = st.empty()

# Start button
if st.button("Run AI Agent 🚀") and query:
    # Load the system prompt
    with open("prompts/html_css_js.txt", "r") as f:
        SYSTEM_PROMPT = f.read()

    client = OpenAI(
        api_key=os.getenv("GEMINI_API_KEY"),
        base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
    )

    messages = [{'role': 'system', 'content': SYSTEM_PROMPT}]
    messages.append({'role': 'user', 'content': query})

    available_tools = {
        "run_command": lambda cmd: os.system(cmd)
    }

    while True:
        try:
            res = client.chat.completions.create(
                model='gemini-2.0-flash',
                response_format={'type': 'json_object'},
                messages=messages,
            )

            response_content = res.choices[0].message.content
            messages.append({'role': 'assistant', 'content': response_content})

            try:
                json_res = json.loads(response_content)
            except json.JSONDecodeError as e:
                thinking_card.error(f"❌ JSON Error: {e}")
                break

            step = json_res.get('step')
            content = json_res.get('content', '')

            if step in ['observe', 'plan', 'action']:
                thinking_card.info(f"**{step.upper()}**: {content}")
                if step == 'action':
                    tool_name = json_res.get('function', '')
                    tool_input = json_res.get('input', '')
                    thinking_card.info(f"🔧 Calling `{tool_name}`...\n\n```bash\n{tool_input}\n```")

                    if tool_name in available_tools:
                        output = available_tools[tool_name](tool_input)
                        messages.append({
                            'role': 'user',
                            'content': json.dumps({'step': 'observe', 'output': output})
                        })
                    continue

            elif step == 'output':
                thinking_card.success(f"✅ {content}")
                break

        except Exception as e:
            thinking_card.error(f"🔥 Error: {e}")
            break
