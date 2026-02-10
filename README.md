# Sistema de Análise de Recursos Jurídicos - TJPR

Sistema automatizado para análise de Recurso Especial e Recurso Extraordinário usando IA (Google Gemini).

## 🚀 Funcionalidades

- ✅ Upload de documentos PDF e DOCX
- ✅ Análise em 3 etapas automatizadas
- ✅ Extração de dados do recurso
- ✅ Análise do acórdão
- ✅ Geração de minuta final
- ✅ Botão para remover documentos
- ✅ Interface moderna e responsiva

## 📋 Pré-requisitos

- Node.js 16+ instalado
- API Key do Google Gemini ([criar aqui](https://aistudio.google.com/app/apikey))

## ⚙️ Instalação

### 1. Clone o repositório
```bash
git clone https://github.com/Luis-A-L/Triagem.git
cd Triagem
```

### 2. Configure o backend
```bash
cd backend
npm install
```

### 3. Configure a API Key
```bash
# Crie o arquivo .env
cp .env.example .env

# Edite o arquivo .env e adicione sua chave:
GEMINI_API_KEY=sua_chave_aqui
PORT=3000
```

### 4. Inicie o servidor
```bash
npm start
```

O backend estará rodando em `http://localhost:3000`

### 5. Abra o frontend
Abra o arquivo `sistema_juridico.html` no navegador.

## 🌐 Deploy em Produção

### Opção 1: Render.com (Recomendado - Grátis)

1. Acesse [Render.com](https://render.com)
2. Conecte seu repositório GitHub
3. Crie um novo "Web Service"
4. Configurações:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Adicione a variável de ambiente:
   - `GEMINI_API_KEY`: sua chave da API
6. Deploy automático!

### Opção 2: Railway.app

1. Acesse [Railway.app](https://railway.app)
2. Conecte o GitHub
3. Selecione o repositório
4. Adicione `GEMINI_API_KEY` nas variáveis
5. Deploy automático!

### Atualizar URL do Backend no Frontend

Após o deploy, edite `sistema_juridico.html`:

```javascript
// Linha 60 - substituir localhost pela URL do deploy
const BACKEND_API_URL = 'https://seu-app.onrender.com/api/gemini';
```

## 📊 Limites da API

### Tier Gratuito
- 15 requisições/minuto
- 1,500 requisições/dia
- Suficiente para 20-30 usuários simultâneos

### Tier Pago
- ~$0.002 por análise
- Limites muito maiores
- Ativar em: https://console.cloud.google.com/billing

## 🔧 Tecnologias

- **Frontend:** HTML, React (via CDN), TailwindCSS
- **Backend:** Node.js, Express
- **IA:** Google Gemini 2.5 Flash
- **Processamento:** PDF.js, Mammoth.js

## 📝 Como Usar

1. Abra o sistema no navegador
2. Faça upload da **Petição do Recurso** (PDF ou DOCX)
3. Faça upload do **Acórdão/Decisão** (PDF ou DOCX)
4. Execute as 3 etapas em sequência:
   - **Etapa 1:** Análise da Petição
   - **Etapa 2:** Análise do Acórdão
   - **Etapa 3:** Geração da Minuta Final
5. Copie ou baixe os resultados

## 🛡️ Segurança

- ✅ API Key protegida no backend
- ✅ `.env` não versionado no Git
- ✅ CORS configurado
- ✅ Processamento seguro de documentos

## 📄 Licença

Este projeto é de uso interno do TJPR.

## 👥 Suporte

Para dúvidas ou problemas, entre em contato com a equipe de desenvolvimento.
