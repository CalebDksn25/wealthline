import boto3
import json
from PyPDF2 import PdfReader
import requests

def send_to_wealth_calculator(data):
    function_url = "https://2736slpk4j.execute-api.us-west-2.amazonaws.com/WealthScoreCalculator"

    # Send the data to the Wealth Calculator Lambda function
    response = requests.post(function_url, json=data)
    if response.status_code == 200:
        print("Data successfully sent to Wealth Calculator")
        print("Response: ", response.json())
        return response.json()
    else:
        print("Error:", response.status_code, response.text)
        return None

# Initialize Bedrock client
session = boto3.Session()
bedrock_runtime = session.client('bedrock-runtime', region_name='us-west-2')

# Define investment strategy and bank statement
investment_strategy = "Aggressive Investing"
bank = "bankstatement2.pdf"

# Read and extract text from the PDF
reader = PdfReader(bank)
text = ""
for page in reader.pages:
    text += page.extract_text()

# Construct the prompt
prompt = f"""
I want to use the strategy {investment_strategy}. Based on my bank statement:
{text}

Please provide:
1) A unique user ID (alphanumeric) as a string
2) A timestamp (ISO 8601 format) as a string
3) How much money I should save monthly (numerical)
4) A Wealth Health score (0–100), considering spending habits and savings
5) Investment advice

Format your response strictly as valid JSON, e.g.:

{{
  "user_id": "user123",
  "timestamp": "2025-01-25T18:00:00Z",
  "monthly_savings": 1234,
  "wealth_health": 99,
  "investment_advice": "Invest in diversified ETFs."
}}

Do not include any extra text.
"""

# Bedrock request parameters
kwargs = {
    "modelId": "anthropic.claude-3-5-sonnet-20241022-v2:0",
    "contentType": "application/json",
    "accept": "application/json",
    "body": json.dumps({
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": 200,
        "temperature": 0.3,
        "top_p": 0.95,
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": prompt
                    }
                ]
            }
        ]
    })
}

response = bedrock_runtime.invoke_model(**kwargs)

# Parse the Bedrock response
response_body = json.loads(response['body'].read())

# Extract the JSON from the response content
llm_output = response_body['content'][0]['text']
llm_data = json.loads(llm_output)

print("LLM Output:", llm_data)

# Send extracted data to the Wealth Calculator
send_to_wealth_calculator(llm_data)