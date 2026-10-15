(() => {
  const P = window.PROFILE, list = window.PROJECTS;
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  $("#role").textContent = P.role;
  $("#tagline").textContent = P.tagline;
  $("#github").href = P.github;
  $("#wa").href = $("#wa-float").href = P.whatsapp;
  $("#phone").textContent = P.phone;
  $(".brand").title = P.name;
  $("#year").textContent = new Date().getFullYear();

  const stack = [...new Set(list.flatMap((p) => p.stack))];
  $("#stats").innerHTML = [
    [list.length, "projetos"],
    [stack.length, "tecnologias"],
    [list.reduce((n, p) => n + p.features.length, 0), "funcionalidades"],
  ].map(([n, l]) => `<li><b>${n}</b><span>${l}</span></li>`).join("");
  $("#skills").innerHTML = stack.map((s) => `<li>${esc(s)}</li>`).join("");

  const win = (title, body, theme = "") =>
    `<figure class="shot mockshot"><div class="mock ${theme}"><div class="bar"><i></i><i></i><i></i></div><div class="body">${body}</div></div><figcaption>${esc(title)} · ilustração com dados fictícios</figcaption></figure>`;
  const table = (head, rows) =>
    `<table><tr>${head.map((h) => `<th>${h}</th>`).join("")}</tr>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</table>`;
  const kpis = (a) => `<div class="kpis">${a.map(([n, l]) => `<div><b>${n}</b>${l}</div>`).join("")}</div>`;
  const pill = (t, c) => `<span class="pill ${c}">${t}</span>`;
  const bars = (a) => a.map(([l, v]) => `<div class="bar-row"><span>${l}</span><div><i style="width:${v}%"></i></div><b>${v}</b></div>`).join("");

  const mocks = {
    olimpios: [
      win("Agendamento do cliente", `<b>Escolha o barbeiro e o horário</b>
        <div class="field">Barbeiro: <em>Qualquer disponível</em></div>
        <div class="field">Data: <em>sábado, 10/10</em></div>
        <div class="slots"><div>09:00</div><div class="on">10:00</div><div>11:00</div><div class="on">14:00</div><div>15:00</div><div>16:00</div></div>
        <div class="btn-fake">Confirmar agendamento</div><p class="note">Não trabalhamos aos domingos.</p>`, "dark"),
      win("Painel da barbearia · Agenda", table(["Horário", "Cliente", "Serviço", "Barbeiro", "Origem"], [
        ["09:00", "Cliente A", "Corte", "Barbeiro 1", pill("Cliente", "info")],
        ["10:00", "Cliente B", "Corte + barba", "Barbeiro 2", pill("Barbearia", "gold")],
        ["11:30", "Cliente C", "Barba", "Barbeiro 1", pill("Cliente", "info")],
        ["14:00", "Cliente D", "Corte", "Barbeiro 2", pill("Cliente", "info")]]), "dark"),
      win("Relatórios e dashboards", kpis([["142", "atendimentos no mês"], ["3", "barbeiros"], ["68%", "via cliente"]]) +
        bars([["Corte", 82], ["Barba", 54], ["Corte + barba", 67], ["Sobrancelha", 21]]), "dark"),
      win("Horários de atendimento", table(["Dia", "Início", "Fim", "Intervalo"], [
        ["Segunda", "09:00", "19:00", "30 min"], ["Terça", "09:00", "19:00", "30 min"], ["Sábado", "08:00", "17:00", "30 min"], ["Domingo", "—", "—", pill("Fechado", "warn")]]), "dark"),
    ],
    cnsi: [
      win("Painel de produção e estoque", kpis([["128", "peças em estoque"], ["14", "reservadas"], ["6", "pedidos abertos"]]) +
        table(["Peça", "Lote", "Peso", "Status"], [
          ["P-0231", "L-18", "12,4 kg", pill("Estoque", "ok")], ["P-0232", "L-18", "11,9 kg", pill("Reservada", "gold")], ["P-0233", "L-19", "13,1 kg", pill("Pedido", "info")]])),
      win("Lotes e pesagens", table(["Lote", "Peças", "Peso total", "Data"], [
        ["L-18", "24", "296,5 kg", "08/10"], ["L-19", "30", "381,2 kg", "09/10"], ["L-20", "18", "224,0 kg", "10/10"]]) +
        `<div class="field" style="margin-top:10px">Repesagem registrada: <em>P-0232 · 11,9 kg → 11,8 kg</em></div>`),
      win("Clientes e pedidos", table(["Pedido", "Cliente", "Itens", "Status"], [
        ["#1042", "Cliente A", "8", pill("Em separação", "gold")], ["#1043", "Cliente B", "12", pill("Finalizado", "ok")], ["#1044", "Cliente C", "5", pill("Cancelado", "warn")]]) +
        `<div class="btn-fake" style="margin-top:10px">Imprimir pedido</div>`),
      win("Etiquetas", `<div class="label"><b>PEÇA P-0233</b><span>Lote L-19 · 13,1 kg</span><div class="barcode"></div><small>Pedido #1042 · Cliente A</small></div>
        <div class="label"><b>PEÇA P-0234</b><span>Lote L-19 · 12,7 kg</span><div class="barcode"></div><small>Pedido #1042 · Cliente A</small></div>`),
    ],
    inv: [
      win("Itens em estoque", table(["Código", "Item", "Qtd", "Local"], [
        ["A-001", "Parafuso M8", "1.240", "Prateleira 2"], ["B-014", "Luva nitrílica", "86", "Armário 1"], ["C-203", "Disco de corte", pill("5 · baixo", "warn"), "Prateleira 4"]])),
      win("Entrada e baixa de estoque", `<b>Registrar movimentação</b>
        <div class="field">Item: <em>Disco de corte</em></div><div class="field">Tipo: <em>Baixa</em> · Quantidade: <em>2</em></div>
        <div class="btn-fake">Confirmar baixa</div><p class="note">Registrada no histórico com data e usuário.</p>`),
      win("Histórico de movimentações", table(["Item", "Tipo", "Qtd", "Usuário", "Data"], [
        ["Parafuso M8", pill("Entrada", "ok"), "200", "admin", "10/10"], ["Luva nitrílica", pill("Baixa", "gold"), "12", "user1", "10/10"], ["Disco de corte", pill("Baixa", "gold"), "5", "user1", "09/10"]]) +
        `<div class="exports"><span>Exportar PDF</span><span>Exportar Excel</span></div>`),
      win("Gerenciar usuários", table(["Usuário", "Perfil", "Ações"], [
        ["admin", pill("Admin", "info"), "Redefinir senha"], ["user1", pill("Usuário", "ok"), "Redefinir senha"], ["user2", pill("Usuário", "ok"), "Remover"]])),
    ],
  };

  const mediaHtml = (m) => {
    if (m.type === "video") return `<figure class="shot"><video controls preload="metadata" playsinline src="${esc(m.src)}"></video><figcaption>${esc(m.caption || "")}</figcaption></figure>`;
    if (m.type === "youtube") return `<figure class="shot"><iframe class="yt" loading="lazy" allowfullscreen src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(m.src)}" title="${esc(m.caption || "Vídeo")}"></iframe><figcaption>${esc(m.caption || "")}</figcaption></figure>`;
    return `<figure class="shot" data-zoom="${esc(m.src)}"><img loading="lazy" src="${esc(m.src)}" alt="${esc(m.caption || "")}"><figcaption>${esc(m.caption || "")}</figcaption></figure>`;
  };

  const gallery = (p) => {
    const vids = p.media.filter((m) => m.type !== "image");
    const imgs = p.media.filter((m) => m.type === "image");
    const m = mocks[p.mock] || [];
    const [first, ...rest] = imgs;
    return vids.map(mediaHtml).join("") + (first ? mediaHtml(first) : "") +
      (rest.length ? `<div class="thumbs">${rest.map(mediaHtml).join("")}</div>` : "") +
      (m.length ? `<div class="mocks">${m.join("")}</div>` : "");
  };

  const render = (cat) => {
    const items = list.filter((p) => cat === "Todos" || p.category === cat);
    $("#projects").innerHTML = items.map((p, i) => `
      <article class="project ${i % 2 ? "alt" : ""}" id="${esc(p.id)}">
        <div>
          <span class="kind">${esc(p.kind)}</span>
          <h3>${p.logo ? `<img src="${esc(p.logo)}" alt="">` : ""}${esc(p.title)}</h3>
          <p class="summary">${esc(p.summary)}</p>
          <h4>Benefícios</h4>
          <ul class="benefits">${p.benefits.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
          <h4>Funcionalidades</h4>
          <ul class="benefits plain">${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
          <div class="tags">${p.stack.map((s) => `<span>${esc(s)}</span>`).join("")}</div>
          ${p.link ? `<a class="btn primary" href="${esc(p.link.url)}" target="_blank" rel="noopener">${esc(p.link.label)}</a>` : ""}
        </div>
        <div class="gallery">${gallery(p)}</div>
      </article>`).join("");
  };

  const cats = ["Todos", ...new Set(list.map((p) => p.category))];
  const filters = $("#filters");
  filters.innerHTML = cats.map((c, i) => `<button class="chip" role="tab" aria-selected="${i === 0}">${esc(c)}</button>`).join("");
  filters.addEventListener("click", (e) => {
    const b = e.target.closest(".chip");
    if (!b) return;
    filters.querySelectorAll(".chip").forEach((x) => x.setAttribute("aria-selected", x === b));
    render(b.textContent);
  });
  render("Todos");

  const lb = $("#lightbox"), body = $("#lb-body");
  document.addEventListener("click", (e) => {
    const z = e.target.closest("[data-zoom]");
    if (z) { body.innerHTML = `<img alt="" src="${esc(z.dataset.zoom)}">`; lb.hidden = false; }
    else if (!lb.hidden && !e.target.closest("#lb-body img")) lb.hidden = true;
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") lb.hidden = true; });
})();
