// Conteúdo da página. Tudo o que aparece vem daqui; para trocar um texto, uma foto ou um link, basta mudar este arquivo.
// Mais adiante, estes mesmos dados podem vir de uma API ou de um banco (ver README): o visual não muda.
//
// Regras:
//  - Campo vazio ("") significa "ainda não definido": o bloco aparece, mas sem link ou sem imagem.
//  - ativo: false em qualquer bloco o esconde da página (os dados ficam aqui, prontos para ligar depois).
//  - Links precisam começar com https:// (outros endereços são ignorados por segurança).
//  - Fotos: caminho dentro de assets/ (ex.: "assets/equipe/ana.webp") ou endereço https://.
//  - Vídeo: pode ser o código do YouTube (11 caracteres) ou o endereço completo. Use vídeo "não listado".
//  - Na frase, o que estiver entre asteriscos fica em verde. "\n" quebra a linha.
window.DADOS_LINK = {
  // Bolhas de sabão com bichinhos de verdade que sobem pela tela de tempos em tempos.
  //  ativo: false -> desliga.  intervalo: segundos entre uma rodada e outra.  duracao: segundos que a bolha fica
  //  na tela antes de estourar.  primeiraApos: segundos até a primeira rodada.
  //  animais: nomes dos vídeos em assets/animais/ (sem o .mp4). Para ter mais variedade, é só incluir mais nomes.
  //  As bolhas são só um efeito: aparecem, sobem e estouram sozinhas.
  bolhas: {
    ativo: true,
    intervalo: 12,
    duracao: 6,
    primeiraApos: 2,
    animais: [
      "cachorro", "calopsita", "coelho", "coruja", "gato", "gato-bebendo", "gato-siames", "hamster", "jiboia", "patinhos", "peixinho-dourado", "periquito", "periquito-comendo", "pinguim", "pony", "porquinho"
    ]
  },

  blocos: [
    // Frase logo abaixo da logo, explicando o que é o projeto. Vazia, não aparece (e não deixa espaço em branco).
    // Pode ter qualquer tamanho. O que estiver entre asteriscos fica em verde; "\n" quebra a linha.
    { tipo: "descricao", texto: "" },

    // Botão de destaque para o sistema do Zoop, pronto para quando o sistema estiver no ar.
    // ativo: false  -> o botão NÃO aparece na página.
    // Para ligar: troque ativo para true e preencha a url.
    { tipo: "acesso", titulo: "Acessar o Zoop", url: "", ativo: false },

    { tipo: "formulario", titulo: "Pesquisa para Desenvolvimento do Zoop", url: "https://forms.gle/3onWYUZP8z7eRXWV7" },

    { tipo: "video", titulo: "Vídeo", youtube: "g06VRhkBpvs" },

    // Pesquisa de experiência (vem depois do vídeo).
    { tipo: "formulario", titulo: "Pesquisa de Experiência do Zoop", url: "https://script.google.com/macros/s/AKfycbyhVckXxVGmSp6WOy4keGZ6aOukYdNLKmrvDew5lZvWaODxECqk2juvgp4wFbP36Dg/exec" },

    // Pesquisas para prestadores: prontas para ligar, mas INATIVAS (não aparecem na página).
    // Para ligar: troque ativo para true e preencha a url.
    { tipo: "formulario", titulo: "Pesquisa para Prestadores de Serviços Pet", url: "", ativo: false },
    { tipo: "formulario", titulo: "Pesquisa para Autônomos de Serviços Pet", url: "", ativo: false },

    {
      tipo: "equipe",
      titulo: "Equipe",
      // Cada pessoa: nome, função, foto e o LinkedIn (o clique na foto leva para lá).
      membros: [
        { nome: "Cauã Oliveira", funcao: "", foto: "assets/equipe/caua-oliveira.webp", linkedin: "https://www.linkedin.com/in/cau%C3%A3-oliveira-barbosa-329a02320/" },
        { nome: "Kauê Barreto", funcao: "", foto: "assets/equipe/kaue-barreto.webp", linkedin: "https://www.linkedin.com/in/kauesabarreto/" },
        { nome: "Lucas Fiss", funcao: "", foto: "assets/equipe/lucas-fiss.webp", linkedin: "https://www.linkedin.com/in/lucas-de-santana-fiss-30797442b/" },
        { nome: "Murilo Aquino", funcao: "", foto: "assets/equipe/murilo-aquino.webp", linkedin: "https://www.linkedin.com/in/aquinozz/" },
        { nome: "Pedro Henrique", funcao: "", foto: "assets/equipe/pedro-henrique.webp", linkedin: "https://www.linkedin.com/in/pedro-henrique-211b70346/" }
      ]
    },

    {
      tipo: "premiacoes",
      titulo: "Competições e premiações",
      // Cada item: { ano: "2026", nome: "Nome da competição", resultado: "1º lugar", conquista: true, url: "", fotos: [...] }
      // conquista: true destaca o item em verde; false mostra como competição em andamento.
      // fotos (opcional): { arquivo: "nome", alt: "descrição" }. O arquivo grande é assets/premios/nome.webp e a miniatura
      // assets/premios/nome-mini.webp. Tocar na miniatura amplia a foto.
      // Lista vazia mostra três linhas de espaço reservado.
      itens: [
        { ano: "2026", nome: "Integra Regional 2026", resultado: "Participando", conquista: false, url: "" },
        { ano: "2026", nome: "Programa Aluno Empreendedor", resultado: "Participando", conquista: false, url: "" },
        {
          ano: "2026", nome: "Batalha de Pitch", resultado: "Premiação · 1º lugar", conquista: true, url: "",
          fotos: [
            { arquivo: "batalha-pitch-trofeu", alt: "Troféu e medalha de 1º lugar da Batalha de Pitch do SENAI CIMATEC 2026, Prêmio Inovação" },
            { arquivo: "batalha-pitch-evento", alt: "Equipe e organização reunidas no evento da Batalha de Pitch do SENAI, em frente ao telão" }
          ]
        }
      ]
    },

    { tipo: "slogan", texto: "Conectando quem *ama,*\ncom quem *cuida.*" },

    {
      tipo: "social",
      itens: [
        { rotulo: "Instagram", rede: "instagram", url: "" },
        { rotulo: "Comunidade", rede: "comunidade", url: "" }
      ]
    }
  ]
};
