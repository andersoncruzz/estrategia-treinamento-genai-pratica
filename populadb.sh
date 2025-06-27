#!/bin/bash

API_URL="http://localhost:8080/api/contacts"

for i in $(seq 1 20); do
  curl -X POST "$API_URL" \
    -H "Content-Type: application/json" \
    -d '{
      "name": "Contato Exemplo '"$i"'",
      "phone": "(11) 90000-00'"$(printf "%02d" $i)"'",
      "email": "contato'"$i"'@exemplo.com",
      "notes": "Contato gerado automaticamente pelo script"
    }'
  echo # Nova linha para separar as respostas
done
