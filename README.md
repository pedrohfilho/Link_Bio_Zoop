# Link na bio do Zoop

## Por que foi criado

O Zoop é um projeto de TCC com a ambição de virar startup, e o grupo está sendo aceito em programas de aceleração. Quem chega pelo Instagram precisa, em uma única tela, entender o projeto, ver o vídeo, responder aos formulários, conhecer a equipe e ver as conquistas. O Instagram só aceita um link na bio, então este site reúne tudo em um só endereço, rápido e bonito no celular.

## Como usar

1. **Preencher o conteúdo:** edite só o arquivo `js/dados.js` (textos, links, fotos da equipe, LinkedIn de cada pessoa, vídeo do YouTube, premiações). Campo vazio (`""`) significa "ainda não definido": o bloco aparece, mas sem link ou sem imagem.
2. **Ver no computador:** na pasta do projeto, rode `npx serve .` e abra o endereço mostrado.
3. **Publicar:** suba a pasta para o GitHub e importe o repositório na Vercel (framework **Other**, sem comando de build). O `vercel.json` já traz os cabeçalhos de segurança.
4. **Colocar no Instagram:** use o endereço publicado no link da bio.

Logo abaixo da logo fica o botão de destaque **Acessar o Zoop**, que leva ao sistema para quem quiser conhecer e avaliar o projeto. O endereço é o campo `url` do bloco `acesso` em `js/dados.js`.

Cada bloco tem um brilho próprio ao passar o mouse ou tocar: lima nos formulários, vermelho no vídeo, azul do LinkedIn na equipe (o clique leva ao LinkedIn da pessoa), dourado nas premiações, as cores do Instagram e o verde do WhatsApp na comunidade.

## Arquitetura

Site estático em HTML, CSS e JavaScript puros, sem build e sem dependências. O conteúdo fica separado da aparência:

```
link_bioZoop/
├── index.html        Estrutura da página e os ícones
├── css/estilos.css   Aparência: cores, brilhos e responsividade
├── js/dados.js       Conteúdo: tudo o que aparece vem daqui
├── js/app.js         Monta a página a partir dos dados
├── assets/           Logo, ícone e fotos da equipe
└── vercel.json       Segurança e cache
```

- **Dados separados do visual:** `dados.js` define `window.DADOS_LINK`. Mais adiante, os mesmos dados podem vir de uma API ou de um banco: basta entregar o mesmo formato a `app.js`, sem mexer no visual.
- **Segurança:** todo texto entra como texto puro, e só endereços `http` e `https` viram link, então um dado errado nunca vira código. Links externos abrem com `noopener`. A política de conteúdo do `vercel.json` só permite o próprio site, as fontes do Google e o player do YouTube.
- **Leveza:** o vídeo só carrega quando a pessoa toca, e as imagens são pequenas (a logo tem 85 KB).
- **Responsivo:** uma coluna central, de celulares estreitos a monitores ultrawide. A equipe fica sempre em uma fileira, e Instagram e comunidade ficam lado a lado.

## Resumo

Uma página só, em verde, com a logo, o botão para acessar o sistema, quatro formulários, o vídeo, a equipe com link para o LinkedIn, as premiações, a frase "Conectando quem ama, com quem cuida" e os contatos. Estática, leve e pensada primeiro para o celular. Para atualizar, edita-se um único arquivo (`js/dados.js`).
