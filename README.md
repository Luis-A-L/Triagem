# Sistema de Análise de Recursos TJPR

Sistema web para análise automatizada de Recursos Especiais e Recursos Extraordinários do TJPR, processando documentos em 3 etapas sequenciais e gerando minutas de admissibilidade.

## 🚀 Tecnologias

- **Frontend**: HTML + React (via CDN)
- **Backend**: Node.js + Express
- **IA**: Google Gemini API
- **Extração**: PDF.js + Mammoth.js
- **Estilo**: Tailwind CSS

## 📁 Estrutura do Projeto

```
Assessor/
├── sistema_juridico.html    # Frontend (interface web)
└── backend/
    ├── server.js            # Servidor Node.js
    ├── package.json         # Dependências
    ├── .env.example         # Template de variáveis de ambiente
    └── README.md            # Documentação do backend
```

## ⚙️ Configuração

### 1. Clone o repositório

```bash
git clone <seu-repositorio>
cd Assessor
```

### 2. Configure o Backend

```bash
cd backend
npm install
```

### 3. Configure as Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione sua chave da API Gemini:

```env
GEMINI_API_KEY=sua_chave_aqui
PORT=3000
```

**Como obter a chave da API:**
1. Acesse: https://aistudio.google.com/app/apikey
2. Faça login com sua conta Google
3. Clique em "Create API Key"
4. Copie a chave gerada

## 🏃 Como Executar

### 1. Inicie o Backend

```bash
cd backend
npm start
```

Você verá:
```
🚀 API Proxy server running on http://localhost:3000
📡 Health check: http://localhost:3000/health
```

### 2. Abra o Frontend

Abra o arquivo `sistema_juridico.html` no navegador:
- Clique duas vezes no arquivo, ou
- Arraste para o navegador, ou
- Use: `file:///caminho/para/sistema_juridico.html`

## 📖 Como Usar

1. **Upload dos Documentos**
   - Arraste ou selecione a petição do recurso (PDF/DOCX)
   - Arraste ou selecione o acórdão/decisão (PDF/DOCX)

2. **Execute as Etapas**
   - Clique em "▶ Executar Etapa 1" (análise da petição)
   - Clique em "▶ Executar Etapa 2" (análise do acórdão)
   - Clique em "▶ Executar Etapa 3" (geração da minuta)

3. **Use os Resultados**
   - Clique em "📋 Copiar" para copiar
   - Clique em "💾 Baixar" para baixar como TXT

## 🔒 Segurança

- ✅ API key armazenada no backend (não exposta ao frontend)
- ✅ Documentos processados localmente no navegador
- ✅ Nenhum dado armazenado permanentemente
- ✅ Arquivo `.env` protegido pelo `.gitignore`

## 🐛 Solução de Problemas

### Erro: "Erro ao processar requisição"

**Causa:** Backend não está rodando

**Solução:**
```bash
cd backend
npm start
```

### Erro: "API key not configured on server"

**Causa:** Arquivo `.env` não configurado

**Solução:**
1. Copie `.env.example` para `.env`
2. Adicione sua chave da API Gemini

### Erro: CORS ou Network Error

**Causa:** Backend em porta diferente ou não iniciado

**Solução:** Verifique se o backend está em `http://localhost:3000`

## 📦 Deploy em Produção

### Opção 1: Servidor VPS (Recomendado)

1. Instale Node.js no servidor
2. Clone o repositório
3. Configure `.env` com a chave da API
4. Instale PM2: `npm install -g pm2`
5. Inicie: `pm2 start backend/server.js --name tjpr-api`
6. Configure nginx como proxy reverso

### Opção 2: Plataformas Cloud

**Render.com:**
1. Conecte seu repositório
2. Configure variável de ambiente `GEMINI_API_KEY`
3. Deploy automático

**Railway.app:**
1. Conecte seu repositório
2. Configure variável de ambiente `GEMINI_API_KEY`
3. Deploy automático

**Heroku:**
```bash
heroku create tjpr-backend
heroku config:set GEMINI_API_KEY=sua_chave
git push heroku main
```

### Atualizar URL do Backend

Após deploy, edite `sistema_juridico.html` linha 61:

```javascript
// Desenvolvimento
const BACKEND_API_URL = 'http://localhost:3000/api/gemini';

// Produção
const BACKEND_API_URL = 'https://seu-backend.com/api/gemini';
```

## 📝 Licença

Este projeto foi desenvolvido para o TJPR.

## 🤝 Contribuindo

Para contribuir:
1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit: `git commit -m 'Adiciona nova funcionalidade'`
4. Push: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

## 📧 Suporte

Para reportar problemas ou sugerir melhorias, abra uma issue no repositório.
