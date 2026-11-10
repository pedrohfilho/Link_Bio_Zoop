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
  blocos: [
    // Botão de destaque logo abaixo da logo: leva a quem toca para o sistema do Zoop, para conhecer e avaliar.
    { tipo: "acesso", titulo: "Acessar o Zoop", url: "" },

    { tipo: "formulario", titulo: "Formulário 1", url: "" },

    { tipo: "video", titulo: "Vídeo", youtube: "" },

    { tipo: "formulario", titulo: "Formulário 2", url: "" },
    { tipo: "formulario", titulo: "Formulário 3", url: "" },
    { tipo: "formulario", titulo: "Formulário 4", url: "" },

    {
      tipo: "equipe",
      titulo: "Equipe",
      // Cada pessoa: nome, função, foto e o LinkedIn (o clique na foto leva para lá).
      membros: [
        { nome: "", funcao: "", foto: "", linkedin: "" },
        { nome: "", funcao: "", foto: "", linkedin: "" },
        { nome: "", funcao: "", foto: "", linkedin: "" },
        { nome: "", funcao: "", foto: "", linkedin: "" },
        { nome: "", funcao: "", foto: "", linkedin: "" }
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
