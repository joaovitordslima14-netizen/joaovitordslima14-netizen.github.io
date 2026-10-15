(() => {
  const P = window.PROFILE, list = window.PROJECTS;
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  $("#role").textContent = P.role;
  $("#tagline").textContent = P.tagline;
  $("#github").href = P.github;
  $("#year").textContent = new Date().getFullYear();

  const stack = [...new Set(list.flatMap((p) => p.stack))];
  $("#stats").innerHTML = [
    [list.length, "projetos"],
    [stack.length, "tecnologias"],
    [list.reduce((n, p) => n + p.features.length, 0), "funcionalidades"],
  ].map(([n, l]) => `<li><b>${n}</b><span>${l}</span></li>`).join("");
  $("#skills").innerHTML = stack.map((s) => `<li>${esc(s)}</li>`).join("");

  const mocks = {
    olimpios: `<div class="mock dark"><div class="bar"><i></i><i></i><i></i></div><div class="body">
      <b>Agenda · Segunda a sábado</b>
      <div class="slots"><div>09:00</div><div class="on">10:00</div><div>11:00</div><div class="on">14:00</div><div>15:00</div><div>16:00</div></div>
      <table style="margin-top:12px"><tr><th>Horário</th><th>Cliente</th><th>Serviço</th></tr>
      <tr><td>10:00</td><td>Cliente A</td><td>Corte + barba</td></tr><tr><td>14:00</td><td>Cliente B</td><td>Corte</td></tr></table>
      <p class="note">Ilustração da interface com dados fictícios.</p></div></div>`,
    cnsi: `<div class="mock"><div class="bar"><i></i><i></i><i></i></div><div class="body">
      <div class="kpis"><div><b>128</b>peças em estoque</div><div><b>14</b>reservadas</div><div><b>6</b>pedidos abertos</div></div>
      <table><tr><th>Peça</th><th>Lote</th><th>Peso</th><th>Status</th></tr>
      <tr><td>P-0231</td><td>L-18</td><td>12,4 kg</td><td><span class="pill ok">Estoque</span></td></tr>
      <tr><td>P-0232</td><td>L-18</td><td>11,9 kg</td><td><span class="pill warn">Reservada</span></td></tr>
      <tr><td>P-0233</td><td>L-19</td><td>13,1 kg</td><td><span class="pill info">Pedido</span></td></tr></table>
      <p class="note">Ilustração da interface com dados fictícios.</p></div></div>`,
    inv: `<div class="mock"><div class="bar"><i></i><i></i><i></i></div><div class="body">
      <b>SystemINV · Histórico</b>
      <table style="margin-top:8px"><tr><th>Item</th><th>Tipo</th><th>Qtd</th><th>Usuário</th></tr>
      <tr><td>Parafuso M8</td><td><span class="pill ok">Entrada</span></td><td>200</td><td>admin</td></tr>
      <tr><td>Luva nitrílica</td><td><span class="pill warn">Baixa</span></td><td>12</td><td>user1</td></tr>
      <tr><td>Disco de corte</td><td><span class="pill warn">Baixa</span></td><td>5</td><td>user1</td></tr></table>
      <p class="note">Ilustração da interface com dados fictícios.</p></div></div>`,
  };

  const mediaHtml = (m) => {
    if (m.type === "video") return `<figure class="shot"><video controls preload="metadata" playsinline src="${esc(m.src)}"></video><figcaption>${esc(m.caption || "")}</figcaption></figure>`;
    if (m.type === "youtube") return `<figure class="shot"><iframe class="yt" loading="lazy" allowfullscreen src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(m.src)}" title="${esc(m.caption || "Vídeo")}"></iframe><figcaption>${esc(m.caption || "")}</figcaption></figure>`;
    return `<figure class="shot" data-zoom="${esc(m.src)}"><img loading="lazy" src="${esc(m.src)}" alt="${esc(m.caption || "")}"><figcaption>${esc(m.caption || "")}</figcaption></figure>`;
  };

  const gallery = (p) => {
    const vids = p.media.filter((m) => m.type !== "image");
    const imgs = p.media.filter((m) => m.type === "image");
    if (!p.media.length) return mocks[p.mock] || "";
    const [first, ...rest] = imgs;
    return vids.map(mediaHtml).join("") + (first ? mediaHtml(first) : "") +
      (rest.length ? `<div class="thumbs">${rest.map(mediaHtml).join("")}</div>` : "");
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
          <details><summary>Funcionalidades</summary><ul>${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul></details>
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
