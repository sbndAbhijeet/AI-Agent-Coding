from openai import OpenAI
import os, json, time, requests
from dotenv import load_dotenv

load_dotenv()



def run_command(cmd: str):
   res = os.system(cmd)
   return res

available_tools = {
    "run_command": run_command
}
client = OpenAI(
    api_key = os.getenv('GEMINI_API_KEY'),
    base_url= "https://generativelanguage.googleapis.com/v1beta/openai/"
)


with open('prompts/html_css_js.txt', 'r') as f:
   SYSTEM_PROMPT = f.read()

messages = [
  {'role': 'system', 'content': SYSTEM_PROMPT}
]

while True:
    query = input('> ')
    messages.append({'role': 'user', 'content': query})

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
                print("⚠️ Failed to parse JSON response:", e)
                print("Raw Response: ", response_content)
                break

            step = json_res.get('step')
            content = json_res.get('content', '')

            if step == 'plan':
                print(f"       ✍🏻: {content}\n")
                continue
            elif step == 'observe':
                print(f"       🧐: {content}\n")
                continue
            elif step == 'action':
                print(f"       🧑‍🏭: {content}\n")
                tool_name = json_res.get('function', '')
                tool_input = json_res.get('input', '')

                print(f"🛠️... Calling tool: {tool_name} with input {tool_input}")

                if available_tools.get(tool_name) != False:
                    output = available_tools[tool_name](tool_input)
                    content = json.dumps({'step': 'observe', 'output': output})
                    messages.append({'role': 'user', 
                    'content': content})
                    continue
            elif step == 'output':
                print(f"🤖: {content}\n\n")
                break
            

        except Exception as e:
            print("🔥 Error during completion request:", e)
            break