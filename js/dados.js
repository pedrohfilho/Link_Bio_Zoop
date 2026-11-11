// Conteúdo da página. Tudo o que aparece vem daqui; para trocar um texto, uma foto ou um link, basta mudar este arquivo.
// Mais adiante, estes mesmos dados podem vir de uma API ou de um banco (ver README): o visual não muda.
//
// Regras:
//  - Campo vazio ("") significa "ainda não definido": o bloco aparece, mas sem link ou sem imagem.
//  - Links precisam começar com https:// (outros endereços são ignorados por segurança).
//  - Fotos: caminho dentro de assets/ (ex.: "assets/equipe/ana.webp") ou endereço https://.
//  - Vídeo: pode ser o código do YouTube (11 caracteres) ou o endereço completo. Use vídeo "não listado".
//  - Na frase, o que estiver entre asteriscos fica em verde. "\n" quebra a linha.
window.DADOS_LINK = {
  // Bolhas de sabão com bichinhos de verdade que sobem pela tela de tempos em tempos.
  //  ativo: false -> desliga.  intervalo: segundos entre uma rodada e outra.  duracao: segundos que a bolha fica
  //  na tela antes de estourar.  primeiraApos: segundos até a primeira rodada.
  //  animais: nomes dos vídeos em assets/animais/ (sem o .mp4). Para ter mais variedade, é só incluir mais nomes.
  bolhas: {
    ativo: true,
    intervalo: 12,
    duracao: 6,
    primeiraApos: 2,
    // Sons (só tocam quando a pessoa toca numa bolha; nunca sozinhos; há um botão no fim da página para desligar). volume de 0 a 1. Cada bichinho aponta para um
    // arquivo de assets/sons/ (sem o .mp3); "blub" é o som de água gerado pelo navegador. Quem não está na lista só faz "plop".
    sons: {
      volume: 0.6,
      bichos: {
        cachorro: "cachorro",
        gato: "gato", "gato-siames": "gato", "gato-bebendo": "gato",
        pony: "cavalo",
        periquito: "passarinho", "periquito-comendo": "passarinho", calopsita: "passarinho",
        porquinho: "porquinho",
        "peixinho-dourado": "blub"
      }
    },
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

    { tipo: "formulario", titulo: "Formulário 1", url: "https://forms.gle/3onWYUZP8z7eRXWV7" },

    { tipo: "video", titulo: "Vídeo", youtube: "g06VRhkBpvs" },

    { tipo: "formulario", titulo: "Formulário 2", url: "" },
    { tipo: "formulario", titulo: "Formulário 3", url: "" },
    { tipo: "formulario", titulo: "Formulário 4", url: "" },

    {
      tipo: "equipe",
      titulo: "Equipe",
      // Cada pessoa: nome, função, foto e o LinkedIn (o clique na foto leva para lá).
      membros: [
        { nome: "Cauã Oliveira", funcao: "", foto: "", linkedin: "" },
        { nome: "Kauê Barreto", funcao: "", foto: "assets/equipe/kaue-barreto.webp", linkedin: "https://www.linkedin.com/in/kauesabarreto/" },
        { nome: "Lucas Fiss", funcao: "", foto: "", linkedin: "" },
        { nome: "Murilo Aquino", funcao: "", foto: "assets/equipe/murilo-aquino.webp", linkedin: "https://www.linkedin.com/in/aquinozz/" },
        { nome: "Pedro Henrique", funcao: "", foto: "assets/equipe/pedro-henrique.webp", linkedin: "https://www.linkedin.com/in/pedro-henrique-211b70346/" }
      ]
    },

    {
      tipo: "premiacoes",
      titulo: "Premiações e competições",
      // Cada item: { ano: "2026", nome: "Nome da competição", resultado: "1º lugar", conquista: true, url: "" }
      // conquista: true destaca o item em verde; false mostra como competição em andamento.
      // Lista vazia mostra três linhas de espaço reservado.
      itens: []
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
