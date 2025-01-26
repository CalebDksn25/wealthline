import boto3
import json
from PyPDF2 import PdfReader  # Added import

session = boto3.Session()
bedrock_runtime = session.client('bedrock-runtime', region_name='us-west-2')

investment_strategy = "Aggresive Investing"  # Replace with the value received from the front-end

bank = "bankstatement.pdf"

# Read and extract text from the PDF
reader = PdfReader(bank)
text = ""
for page in reader.pages:
    text += page.extract_text()

# Modify the prompt to include the extracted text
prompt = f"""
I want to use the strategy {investment_strategy}. Based on my bank statement:
{text}

Please provide:
1) How much money I should save monthly (numerical)
2) A Wealth Health score (0–100), considering spending habits and savings
3) Investment adivce

Format your response strictly as valid JSON, e.g.:

{{
  "monthly_savings": 1234,
  "wealth_health": 99,
  "investment_advice": "Invest in diversified ETFs."
}}

Do not include any extra text.
"""

kwargs = {
  "modelId": "anthropic.claude-3-5-sonnet-20241022-v2:0",
  "contentType": "application/json",
  "accept": "application/json",
  "body": json.dumps({
    "anthropic_version": "bedrock-2023-05-31",
    "max_tokens": 200,
    "temperature": 0.3,         # Lower temperature to reduce "creative" formatting
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

body = json.loads(response['body'].read())

print(body)