# Backend API Proxy - TJPR

Backend proxy server para o Sistema de Análise de Recursos Jurídicos do TJPR.

## Funcionalidade

Este servidor Node.js atua como proxy entre o frontend e a API do Google Gemini, mantendo a chave da API segura no servidor.

## Instalação

```bash
cd backend
npm install
```

## Configuração

A chave da API já está configurada no arquivo `.env`:
```
GEMINI_API_KEY=AIzaSyAGNtX2EDuYw93bgRt4VdIOgeGmD7tahgU
PORT=3000
```

## Executar

```bash
npm start
```

Ou para desenvolvimento com auto-reload:
```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

## Endpoints

### GET /health
Health check do servidor
```bash
curl http://localhost:3000/health
```

### POST /api/gemini
Endpoint para processar prompts via Gemini API

**Request:**
```json
{
  "prompt": "seu prompt aqui"
}
```

**Response:**
```json
{
  "result": "resposta do Gemini"
}
```

## Segurança

- ✅ API key armazenada em variável de ambiente
- ✅ CORS habilitado para permitir frontend
- ✅ Validação de entrada
- ✅ Tratamento de erros
- ✅ .gitignore protege .env
