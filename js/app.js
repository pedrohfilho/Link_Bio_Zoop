// Monta a página do link na bio a partir de window.DADOS_LINK (js/dados.js).
// Todo texto entra por textContent e todo endereço passa por validação, então nenhum dado vira código.
(function () {
  "use strict";

  var dados = window.DADOS_LINK || { blocos: [] };
  var pilha = document.getElementById("pilha");
  if (!pilha) return;

  var NS_SVG = "http://www.w3.org/2000/svg";

  // ---------- Utilidades ----------
  function criar(tag, classe, texto) {
    var e = document.createElement(tag);
    if (classe) e.className = classe;
    if (texto) e.textContent = texto;
    return e;
  }

  function icone(id, classe) {
    var svg = document.createElementNS(NS_SVG, "svg");
    svg.setAttribute("aria-hidden", "true");
    if (classe) svg.setAttribute("class", classe);
    var uso = document.createElementNS(NS_SVG, "use");
    uso.setAttribute("href", "#" + id);
    svg.appendChild(uso);
    return svg;
  }

  // Só aceita endereços completos http e https.
  function urlSegura(valor) {
    if (!valor || typeof valor !== "string") return null;
    try {
      var u = new URL(valor.trim());
      return u.protocol === "https:" || u.protocol === "http:" ? u.href : null;
    } catch (erro) {
      return null;
    }
  }

  // Foto: caminho do próprio site (assets/...) ou endereço https.
  function urlFoto(valor) {
    if (!valor || typeof valor !== "string") return null;
    var v = valor.trim();
    if (/^assets\/[\w\-./]+$/.test(v) && v.indexOf("..") === -1) return v;
    return urlSegura(v);
  }

  // Aceita o código do YouTube ou o endereço do vídeo.
  function idYoutube(valor) {
    if (!valor || typeof valor !== "string") return null;
    var v = valor.trim();
    if (/^[\w-]{11}$/.test(v)) return v;
    try {
      var u = new URL(v);
      var host = u.hostname.replace(/^www\./, "");
      var id = null;
      if (host === "youtu.be") id = u.pathname.slice(1);
      else if (host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
        id = u.searchParams.get("v") || (u.pathname.match(/^\/(?:embed|shorts)\/([\w-]{11})/) || [])[1];
      }
      return id && /^[\w-]{11}$/.test(id) ? id : null;
    } catch (erro) {
      return null;
    }
  }

  // Com link vira âncora que abre em outra aba; sem link, um bloco sem ação (o brilho funciona igual).
  function alvo(url, classe, rotulo) {
    var seguro = urlSegura(url);
    if (!seguro) return criar("div", classe);
    var a = criar("a", classe);
    a.href = seguro;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    if (rotulo) a.setAttribute("aria-label", rotulo);
    return a;
  }

  function item(filho, atraso) {
    var li = criar("li", "reveal");
    if (atraso) li.style.setProperty("--atraso", atraso + "s");
    li.appendChild(filho);
    return li;
  }

  // ---------- Blocos ----------
  function formulario(b) {
    var cartao = alvo(b.url, "cartao brilho brilho--lima");
    var ic = criar("span", "cartao__icone");
    ic.appendChild(icone("formulario"));
    cartao.appendChild(ic);
    cartao.appendChild(criar("span", "cartao__titulo", b.titulo || "Formulário"));
    cartao.appendChild(icone("seta", "cartao__seta"));
    return cartao;
  }

  // Texto com *destaque* em verde e quebras de linha com \n (usado na descrição e na frase do projeto).
  function textoRico(elemento, texto) {
    String(texto || "").split("\n").forEach(function (linha, i) {
      if (i) elemento.appendChild(document.createElement("br"));
      linha.split("*").forEach(function (parte, j) {
        if (!parte) return;
        if (j % 2 === 1) elemento.appendChild(criar("em", null, parte));
        else elemento.appendChild(document.createTextNode(parte));
      });
    });
    return elemento;
  }

  // Frase sob a logo, explicando o projeto. Sem texto, não aparece e não deixa espaço.
  function descricao(b) {
    if (!String(b.texto || "").trim()) return null;
    return textoRico(criar("p", "descricao"), b.texto);
  }

  // Botão de destaque: o acesso ao sistema do Zoop. Só aparece com ativo: true e um endereço válido; senão, nada.
  function acesso(b) {
    if (b.ativo !== true || !urlSegura(b.url)) return null;
    var cartao = alvo(b.url, "cartao cartao--acesso brilho brilho--acesso");
    var ic = criar("span", "cartao__icone");
    ic.appendChild(icone("pata"));
    cartao.appendChild(ic);
    cartao.appendChild(criar("span", "cartao__titulo", b.titulo || "Acessar o Zoop"));
    cartao.appendChild(icone("abrir", "cartao__seta"));
    return cartao;
  }

  function video(b) {
    var painel = criar("section", "painel brilho brilho--vermelho");
    var titulo = b.titulo || "Vídeo";
    painel.setAttribute("aria-label", titulo);
    painel.appendChild(criar("h2", "painel__titulo", titulo));

    var quadro = criar("div", "video");
    var id = idYoutube(b.youtube);
    var play = criar("span", "video__play");
    play.appendChild(icone("play"));

    if (id) {
      // O player só carrega quando a pessoa toca: a página abre leve e sem rastreio antes da hora.
      var abrir = criar("button", "video__abrir");
      abrir.type = "button";
      abrir.setAttribute("aria-label", "Reproduzir o vídeo");
      abrir.style.backgroundImage = 'url("https://i.ytimg.com/vi/' + id + '/hqdefault.jpg")';
      abrir.appendChild(play);
      abrir.addEventListener("click", function () {
        var player = criar("iframe", "video__player");
        player.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0&playsinline=1";
        player.title = titulo;
        player.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
        player.allowFullscreen = true;
        player.referrerPolicy = "strict-origin-when-cross-origin";
        quadro.replaceChildren(player);
      });
      quadro.appendChild(abrir);
    } else {
      var vazio = criar("div", "video__vazio");
      vazio.setAttribute("role", "img");
      vazio.setAttribute("aria-label", "Espaço do vídeo");
      vazio.appendChild(play);
      quadro.appendChild(vazio);
    }
    painel.appendChild(quadro);
    return painel;
  }

  function equipe(b) {
    var painel = criar("section", "painel");
    var titulo = b.titulo || "Equipe";
    painel.setAttribute("aria-label", titulo);
    painel.appendChild(criar("span", "rotulo", titulo));

    var lista = criar("ul", "equipe");
    (b.membros || []).forEach(function (m) {
      var li = criar("li", "membro");
      var nome = (m.nome || "").trim();
      var funcao = (m.funcao || "").trim();
      var rotulo = nome
        ? nome + (funcao ? ", " + funcao : "") + (urlSegura(m.linkedin) ? ". Abrir o LinkedIn" : "")
        : "Integrante da equipe";
      var a = alvo(m.linkedin, "membro__alvo brilho brilho--linkedin", rotulo);
      if (!urlSegura(m.linkedin)) a.setAttribute("aria-label", rotulo);

      var foto = criar("span", "membro__foto");
      var fonte = urlFoto(m.foto);
      if (fonte) {
        var img = document.createElement("img");
        img.src = fonte;
        img.alt = "";
        img.width = 160;
        img.height = 160;
        img.loading = "lazy";
        img.decoding = "async";
        foto.appendChild(img);
      } else {
        foto.appendChild(icone("pessoa"));
      }
      a.appendChild(foto);

      // Ao passar o mouse (ou focar), um balão mostra nome e função; ele só existe quando há função para mostrar.
      if (nome && funcao) {
        var legenda = criar("span", "membro__legenda");
        legenda.appendChild(criar("strong", null, nome));
        legenda.appendChild(criar("small", null, funcao));
        a.appendChild(legenda);
      }
      li.appendChild(a);
      // O nome fica sempre visível embaixo da foto (fora do link, para o anel de brilho continuar redondo).
      if (nome) {
        var visivel = criar("span", "membro__nome", nome);
        visivel.setAttribute("aria-hidden", "true");
        li.appendChild(visivel);
      }
      lista.appendChild(li);
    });
    painel.appendChild(lista);
    return painel;
  }

  function premiacoes(b) {
    var painel = criar("section", "painel");
    var titulo = b.titulo || "Premiações e competições";
    painel.setAttribute("aria-label", titulo);
    painel.appendChild(criar("span", "rotulo", titulo));

    var lista = criar("ul", "premios");
    var itens = b.itens || [];
    if (!itens.length) {
      // Sem dados ainda: três linhas de espaço reservado, só com barras.
      [["estrela", true], ["bandeira", false], ["bandeira", false]].forEach(function (p, i) {
        var li = criar("li");
        var linha = criar("div", "premio premio--vazio brilho brilho--ouro" + (i === 0 ? " premio--conquista" : ""));
        linha.setAttribute("aria-hidden", "true");
        var ic = criar("span", "premio__icone");
        ic.appendChild(icone(p[0]));
        linha.appendChild(ic);
        linha.appendChild(criar("span", "barra"));
        linha.appendChild(criar("span", "barra barra--fina"));
        li.appendChild(linha);
        lista.appendChild(li);
      });
    } else {
      itens.forEach(function (p) {
        var li = criar("li");
        var linha = alvo(p.url, "premio brilho brilho--ouro" + (p.conquista ? " premio--conquista" : ""));
        var ic = criar("span", "premio__icone");
        ic.appendChild(icone(p.conquista ? "estrela" : "bandeira"));
        linha.appendChild(ic);
        linha.appendChild(criar("span", "premio__nome", p.nome || ""));
        var detalhe = [p.ano, p.resultado].filter(Boolean).join(" · ");
        linha.appendChild(criar("span", "premio__detalhe", detalhe));
        li.appendChild(linha);
        lista.appendChild(li);
      });
    }
    painel.appendChild(lista);
    return painel;
  }

  // ---------- Animais de verdade (vídeos curtos em assets/animais/), usados nas bolhas ----------
  var reduzir = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var conexao = navigator.connection || {};
  var economizar = conexao.saveData === true;

  // O nome do vídeo só pode ter letras minúsculas, números e hífen: nada de caminhos vindos dos dados.
  function arquivoAnimal(nome) {
    return typeof nome === "string" && /^[a-z0-9-]{1,40}$/.test(nome) ? "assets/animais/" + nome + ".mp4" : null;
  }

  // Cria o <video> de um animal: mudo, em laço, sem controles. Só começa a rodar quando o script chamar.
  function videoAnimal(nome) {
    var arquivo = arquivoAnimal(nome);
    if (!arquivo) return null;
    var v = document.createElement("video");
    v.muted = true; v.defaultMuted = true; v.loop = true; v.playsInline = true;
    v.setAttribute("muted", ""); v.setAttribute("playsinline", ""); v.setAttribute("aria-hidden", "true");
    v.setAttribute("disablepictureinpicture", ""); v.setAttribute("disableremoteplayback", "");
    v.tabIndex = -1;
    v.preload = "auto";
    v.src = arquivo;
    return v;
  }

  function tocar(v) {
    if (reduzir) return;
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
  }

  // A frase do projeto: só o texto, que balança de leve, com bastante espaço acima e abaixo.
  function slogan(b) {
    var bloco = criar("div", "frase");
    bloco.appendChild(textoRico(criar("p", "slogan"), b.texto));
    return bloco;
  }

  var REDES = {
    instagram: { classe: "brilho--instagram", icone: "instagram" },
    comunidade: { classe: "brilho--whatsapp", icone: "pata" }
  };

  function social(b) {
    var grade = criar("div", "social");
    (b.itens || []).forEach(function (s) {
      var rede = REDES[s.rede] || { classe: "brilho--lima", icone: "pata" };
      var cartao = alvo(s.url, "cartao cartao--social brilho " + rede.classe);
      var ic = criar("span", "cartao__icone");
      ic.appendChild(icone(rede.icone));
      cartao.appendChild(ic);
      cartao.appendChild(criar("span", "cartao__titulo", s.rotulo || ""));
      cartao.appendChild(icone("seta", "cartao__seta"));
      grade.appendChild(cartao);
    });
    return grade;
  }

  var MONTADORES = {
    descricao: descricao,
    acesso: acesso,
    formulario: formulario,
    video: video,
    equipe: equipe,
    premiacoes: premiacoes,
    slogan: slogan,
    social: social
  };

  (dados.blocos || []).forEach(function (bloco, i) {
    var montar = MONTADORES[bloco.tipo];
    if (!montar) return;
    var montado = montar(bloco);
    if (!montado) return; // bloco sem conteúdo (ex.: descrição vazia): não aparece
    pilha.appendChild(item(montado, Math.min(i, 3) * 0.04));
  });

  // ---------- Bolhas de sabão com animais ----------
  // De tempos em tempos sobem poucas bolhas, cada uma com um bichinho de verdade dentro. Ficam o tempo configurado e
  // estouram. O vídeo só é pedido quando a bolha nasce e é descartado quando ela estoura, então a página fica leve.
  function bolhas(cfg) {
    if (!cfg || cfg.ativo === false || reduzir || economizar) return;
    var nomes = (Array.isArray(cfg.animais) ? cfg.animais : []).filter(function (n) { return arquivoAnimal(n); });
    if (!nomes.length) return;
    var num = function (v, padrao, min, max) { return typeof v === "number" && v >= min && v <= max ? v : padrao; };
    var intervalo = num(cfg.intervalo, 40, 8, 600) * 1000;
    var duracao = num(cfg.duracao, 10, 4, 30) * 1000;
    var primeira = num(cfg.primeiraApos, 6, 1, 120) * 1000;

    var camada = criar("div", "bolhas");
    camada.setAttribute("aria-hidden", "true");
    document.body.appendChild(camada);
    var ultimos = [];

    function sortear() {
      var livres = nomes.filter(function (n) { return ultimos.indexOf(n) === -1; });
      var lista = livres.length ? livres : nomes;
      var nome = lista[Math.floor(Math.random() * lista.length)];
      ultimos.push(nome);
      if (ultimos.length > Math.min(nomes.length - 1, 5)) ultimos.shift();
      return nome;
    }

    function estourar(bolha, v) {
      bolha.classList.add("bolha--estoura");
      for (var i = 0; i < 9; i++) {
        var gota = criar("i", "gota");
        gota.style.setProperty("--ang", (i * 40 + Math.random() * 20) + "deg");
        gota.style.setProperty("--dist", (0.55 + Math.random() * 0.35).toFixed(2));
        bolha.appendChild(gota);
      }
      window.setTimeout(function () {
        v.pause(); v.removeAttribute("src"); v.load();
        if (bolha.parentNode) bolha.parentNode.removeChild(bolha);
      }, 700);
    }

    // As bolhas ficam ao redor da coluna de conteúdo, nunca por cima dela. Em telas largas usam as laterais livres; em
    // telas estreitas (celular), que quase não têm lateral, encostam na borda da tela, só um pouco para dentro.
    var embaralhar = function (l) { for (var i = l.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = l[i]; l[i] = l[j]; l[j] = t; } return l; };

    function nascer(indice, total, lado, alturaFinal) {
      var v = videoAnimal(sortear());
      if (!v) return;
      var largura = window.innerWidth || 360;
      var coluna = pilha.getBoundingClientRect();
      var livre = Math.max(0, lado === "esq" ? coluna.left : largura - coluna.right); // espaço livre no lado escolhido
      if (livre < 30) return; // tela estreita demais (dobrável fechado): sem faixa livre, sem bolhas
      var tam, x, bal;
      if (livre >= 76) {
        // Lateral larga o bastante: a bolha cabe inteira, sem encostar na coluna.
        tam = Math.round(Math.min(76, livre - 20) * (0.8 + Math.random() * 0.2));
        tam = Math.max(48, tam);
        var folga = Math.max(0, livre - tam - 20);
        var ini = lado === "esq" ? 10 : coluna.right + 10;
        x = ini + Math.random() * folga;
        bal = Math.min(12, folga / 2);
      } else {
        // Celular: a faixa livre é estreita. A bolha é pequena e encosta na borda da tela (só 20% fica para fora), de modo
        // que cabe inteira na faixa, sem cobrir o conteúdo.
        tam = Math.round(Math.max(34, Math.min(62, livre / 0.8 - 6)) * (0.85 + Math.random() * 0.15));
        x = lado === "esq" ? -tam * 0.2 : largura - tam * 0.8;
        bal = 2;
      }
      var bolha = criar("div", "bolha");
      bolha.style.setProperty("--tam", tam + "px");
      bolha.style.setProperty("--x", Math.round(x) + "px");
      bolha.style.setProperty("--sobe", (duracao / 1000).toFixed(1) + "s");
      bolha.style.setProperty("--alto", alturaFinal.toFixed(0) + "vh");
      bolha.style.setProperty("--bal", bal.toFixed(0) + "px");
      bolha.style.setProperty("--fase", (-Math.random() * 3).toFixed(1) + "s");
      var disco = criar("span", "bolha__disco");
      disco.appendChild(v);
      bolha.appendChild(disco);

      var emTela = false;
      v.addEventListener("loadeddata", function () {
        if (emTela) return;
        emTela = true;
        camada.appendChild(bolha);
        tocar(v);
        window.setTimeout(function () { estourar(bolha, v); }, duracao);
      });
      // Se o vídeo não chegar, a bolha simplesmente não aparece.
      v.addEventListener("error", function () { v.removeAttribute("src"); });
    }

    // Cada rodada espalha as bolhas ao longo do intervalo (uma de cada vez, em momentos diferentes), em vez de soltar todas
    // juntas: a tela fica sempre com algumas bolhas, sem ficar carregada.
    function onda(inicial) {
      if (document.hidden) return; // aba em segundo plano: pula esta rodada
      var estreita = (window.innerWidth || 360) < 600;
      var total = estreita ? 4 : 5;
      var alturas = embaralhar([14, 28, 42, 56, 68].slice(0, total)); // alturas finais diferentes
      var primeiro = Math.random() < 0.5 ? 0 : 1;                      // lados alternados
      // A primeira rodada sai rápido (quem acabou de chegar vê logo os bichinhos); as seguintes se espalham pelo intervalo.
      var passo = inicial ? 1100 : intervalo / total;
      for (var i = 0; i < total; i++) (function (n) {
        var lado = (n + primeiro) % 2 === 0 ? "esq" : "dir";
        var quando = n * passo * (0.85 + Math.random() * 0.3);
        window.setTimeout(function () { if (!document.hidden) nascer(n, total, lado, alturas[n] + Math.random() * 4); }, quando);
      })(i);
    }

    window.setTimeout(function () { onda(true); window.setInterval(onda, intervalo); }, primeira);
  }
  bolhas(dados.bolhas);

  // ---------- Entrada suave ao rolar ----------
  var itens = pilha.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || reduzir) return;

  document.documentElement.classList.add("js");
  var funcionou = false;
  // A entrada anima toda vez que o bloco aparece na tela, também ao subir de volta. Aparece com 10% à vista e só
  // some quando sai por inteiro, para não piscar na borda da tela.
  var observador = new IntersectionObserver(function (entradas) {
    funcionou = true;
    entradas.forEach(function (entrada) {
      if (entrada.intersectionRatio >= 0.1) entrada.target.classList.add("visivel");
      else if (!entrada.isIntersecting) entrada.target.classList.remove("visivel");
    });
  }, { threshold: [0, 0.1], rootMargin: "0px 0px -24px 0px" });
  itens.forEach(function (e) { observador.observe(e); });

  // Se o navegador não avisar nada (alguns navegadores embutidos), mostra tudo em vez de deixar a página vazia.
  window.setTimeout(function () {
    if (!funcionou) itens.forEach(function (e) { e.classList.add("visivel"); });
  }, 2500);
})();
