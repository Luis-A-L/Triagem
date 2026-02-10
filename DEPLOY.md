# Passos para Deploy

## ✅ Checklist Antes de Fazer Push

- [ ] Arquivo `.env` NÃO está commitado (verificar .gitignore)
- [ ] Arquivo `.env.example` está presente
- [ ] README.md está atualizado
- [ ] Dependências instaladas (`npm install` funciona)
- [ ] Backend testado localmente

## 📤 Fazer Push para o Git

```bash
cd c:\Users\Teste\Documents\Projetos\Assessor

# Inicializar Git (se ainda não foi feito)
git init

# Adicionar arquivos
git add .

# Commit
git commit -m "Sistema de Análise de Recursos TJPR - v1.0"

# Adicionar remote (substitua pela URL do seu repositório)
git remote add origin https://github.com/seu-usuario/seu-repo.git

# Push
git push -u origin main
```

## 🚀 Configurar no Servidor/Cloud

### Após clonar no servidor:

```bash
# 1. Clonar repositório
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo

# 2. Instalar dependências
cd backend
npm install

# 3. Criar arquivo .env
cp .env.example .env
nano .env  # ou vim .env

# 4. Adicionar sua chave da API Gemini
GEMINI_API_KEY=sua_chave_aqui
PORT=3000

# 5. Iniciar servidor
npm start

# Ou com PM2 (recomendado para produção):
npm install -g pm2
pm2 start server.js --name tjpr-api
pm2 save
pm2 startup
```

## 🌐 Configurar para Produção

### Opção 1: Render.com (Mais Fácil)

1. Acesse https://render.com
2. Conecte seu repositório GitHub
3. Crie um "Web Service"
4. Configure:
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
   - **Environment Variables:** 
     - `GEMINI_API_KEY` = sua chave
     - `PORT` = 3000
5. Deploy!

Após deploy, você receberá uma URL tipo: `https://tjpr-api.onrender.com`

### Opção 2: Railway.app

1. Acesse https://railway.app
2. Conecte seu repositório GitHub
3. Configure variável de ambiente `GEMINI_API_KEY`
4. Deploy automático!

### Opção 3: VPS (DigitalOcean, AWS, etc.)

```bash
# No servidor
sudo apt update
sudo apt install nodejs npm nginx

# Clonar e configurar (passos acima)

# Configurar nginx como proxy
sudo nano /etc/nginx/sites-available/tjpr

# Adicionar:
server {
    listen 80;
    server_name seu-dominio.com;

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Ativar
sudo ln -s /etc/nginx/sites-available/tjpr /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 🔄 Atualizar URL no Frontend

Após deploy, edite `sistema_juridico.html` (linha 61):

```javascript
// ANTES (desenvolvimento)
const BACKEND_API_URL = 'http://localhost:3000/api/gemini';

// DEPOIS (produção - substitua pela sua URL)
const BACKEND_API_URL = 'https://seu-backend.onrender.com/api/gemini';
// ou
const BACKEND_API_URL = 'https://seu-dominio.com/api/gemini';
```

Commit e push novamente:
```bash
git add sistema_juridico.html
git commit -m "Atualiza URL do backend para produção"
git push
```

## ✅ Verificar se Funcionou

1. Acesse a URL do backend + `/health`:
   ```
   https://seu-backend.com/health
   ```
   
   Deve retornar:
   ```json
   {"status":"ok","message":"API Proxy is running"}
   ```

2. Abra o `sistema_juridico.html` e teste o upload + processamento

## 🔐 Segurança em Produção

- ✅ Nunca commite o arquivo `.env`
- ✅ Use HTTPS em produção
- ✅ Configure CORS adequadamente se necessário
- ✅ Monitore uso da API Gemini (quotas)
- ✅ Configure rate limiting se necessário

## 📊 Monitoramento (Opcional)

Com PM2:
```bash
pm2 logs tjpr-api        # Ver logs
pm2 monit                # Monitor em tempo real
pm2 restart tjpr-api     # Reiniciar
pm2 stop tjpr-api        # Parar
```
