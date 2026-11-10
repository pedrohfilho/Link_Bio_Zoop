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

  // Botão de destaque: o acesso ao sistema do Zoop.
  function acesso(b) {
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

      if (nome) {
        var legenda = criar("span", "membro__legenda");
        legenda.appendChild(criar("strong", null, nome));
        if (funcao) legenda.appendChild(criar("small", null, funcao));
        a.appendChild(legenda);
      }
      li.appendChild(a);
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

  function slogan(b) {
    var p = criar("p", "slogan");
    String(b.texto || "").split("\n").forEach(function (linha, i) {
      if (i) p.appendChild(document.createElement("br"));
      linha.split("*").forEach(function (parte, j) {
        if (!parte) return;
        if (j % 2 === 1) p.appendChild(criar("em", null, parte));
        else p.appendChild(document.createTextNode(parte));
      });
    });
    return p;
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
    pilha.appendChild(item(montar(bloco), Math.min(i, 3) * 0.04));
  });

  // ---------- Entrada suave ao rolar ----------
  var reduzir = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var itens = pilha.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || reduzir) return;

  document.documentElement.classList.add("js");
  var funcionou = false;
  var observador = new IntersectionObserver(function (entradas) {
    funcionou = true;
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visivel");
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -4% 0px" });
  itens.forEach(function (e) { observador.observe(e); });

  // Se o navegador não avisar nada (alguns navegadores embutidos), mostra tudo em vez de deixar a página vazia.
  window.setTimeout(function () {
    if (!funcionou) itens.forEach(function (e) { e.classList.add("visivel"); });
  }, 2500);
})();
