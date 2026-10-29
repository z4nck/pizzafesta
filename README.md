# Pizzaria & Festa — versão Vercel

Esta versão é um site estático feito com HTML, CSS e JavaScript. Não precisa instalar Node.js, npm ou executar servidor local. O login com GitHub é realizado pelo Supabase Auth.

## 1. O que você precisa

- Uma conta no GitHub
- Uma conta na Vercel
- Uma conta gratuita no Supabase

## 2. Configurar o Supabase

1. Crie um projeto em https://supabase.com/.
2. No painel do projeto, abra **Project Settings > API**.
3. Copie o **Project URL** e a chave **anon/public**.
4. Abra o arquivo `config.js` e substitua os dois textos de exemplo:
   - `COLE_AQUI_A_URL_DO_SEU_PROJETO`
   - `COLE_AQUI_SUA_CHAVE_ANON_PUBLIC`

Use somente a chave `anon` ou `publishable` pública. Nunca coloque a chave `service_role` no navegador.

## 3. Ativar login pelo GitHub

### Criar OAuth App no GitHub

1. Acesse https://github.com/settings/developers.
2. Abra **OAuth Apps** e clique em **New OAuth App**.
3. Preencha o nome do aplicativo.
4. Em **Homepage URL**, coloque temporariamente a URL do projeto Supabase, que aparece em Project Settings > API.
5. Em **Authorization callback URL**, use:
   `https://SEU-PROJETO.supabase.co/auth/v1/callback`
   Troque `SEU-PROJETO` pelo identificador real do seu projeto.
6. Crie o aplicativo, copie o **Client ID** e gere um **Client Secret**.

### Ligar GitHub ao Supabase

1. No Supabase, entre em **Authentication > Providers > GitHub**.
2. Ative o provedor GitHub.
3. Cole o Client ID e o Client Secret do OAuth App.
4. Salve.

## 4. Configurar URLs autorizadas no Supabase

No Supabase, abra **Authentication > URL Configuration**.

- **Site URL:** coloque o endereço final do seu site na Vercel, por exemplo `https://seu-projeto.vercel.app`.
- **Redirect URLs:** adicione `https://seu-projeto.vercel.app/painel.html`.
- Durante testes, você pode adicionar também o endereço local que estiver usando.

Depois de publicar, confirme que a URL da Vercel está na lista de URLs permitidas.

## 5. Publicar na Vercel

1. Extraia o ZIP.
2. Envie os arquivos para um repositório GitHub.
3. Entre em https://vercel.com/ e escolha **Add New > Project**.
4. Importe o repositório.
5. Como é um site estático, não precisa de Build Command. Deixe o campo **Output Directory** como `.` ou em branco, conforme a tela da Vercel.
6. Clique em **Deploy**.

Sempre que você atualizar o repositório, a Vercel publicará a nova versão automaticamente.

## 6. Arquivos principais

- `index.html` — página inicial.
- `painel.html` — painel protegido.
- `style.css` — aparência e responsividade.
- `app.js` — início do login pelo GitHub.
- `painel.js` — valida sessão, mostra usuário e faz logout.
- `config.js` — URL e chave pública do Supabase.

## Importante

- Não é necessário Node.js no seu computador.
- Não existe cadastro de senha neste site: a autenticação é feita pela conta GitHub via Supabase.
- O painel verifica a sessão antes de exibir os dados do usuário.
- Para restringir o acesso apenas a membros autorizados da equipe, será necessário adicionar uma regra de autorização no Supabase e validar os usuários permitidos. O login por si só autentica uma conta GitHub, mas não significa que qualquer conta deva ter acesso administrativo.
