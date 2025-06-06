from openai import OpenAI
import os, json
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    api_key=os.getenv('GEMINI_API_KEY'),
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

with open('prompts/html_css_js.txt', 'r') as f:
    SYSTEM_PROMPT = f.read()

available_tools = {
    "run_command": lambda cmd: os.system(cmd)
}

def agent_respond(user_query, messages):
    """
    Pass user_query and current messages list.
    Returns (response_content_str, updated_messages_list).
    """
    messages.append({'role': 'user', 'content': user_query})

    while True:
        try:
            res = client.chat.completions.create(
                model='gemini-2.5-flash-preview-05-20',
                response_format={'type': 'json_object'},
                messages=messages,
            )

            response_content = res.choices[0].message.content
            messages.append({'role': 'assistant', 'content': response_content})

            try:
                json_res = json.loads(response_content)
            except json.JSONDecodeError as e:
                # Return raw response and messages if JSON parse fails
                return (f"⚠️ Failed to parse JSON: {e}\nRaw Response:\n{response_content}", messages)

            step = json_res.get('step')
            content = json_res.get('content', '')

            if step == 'plan':
                # Just continue to next iteration to get next message
                continue
            elif step == 'observe':
                continue
            elif step == 'action':
                tool_name = json_res.get('function', '')
                tool_input = json_res.get('input', '')

                if tool_name in available_tools:
                    output = available_tools[tool_name](tool_input)
                    content = json.dumps({'step': 'observe', 'output': output})
                    messages.append({'role': 'user', 'content': content})
                    continue
                else:
                    return (f"⚠️ Tool {tool_name} not available.", messages)
            elif step == 'output':
                return (content, messages)

        except Exception as e:
            return (f"🔥 Error during completion request: {e}", messages)


if __name__ == "__main__":
    # If you want to test directly in terminal
    messages = [{'role': 'system', 'content': SYSTEM_PROMPT}]

    while True:
        user_query = input("> ")
        response, messages = agent_respond(user_query, messages)
        print(response)
