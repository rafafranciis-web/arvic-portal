(function () {
  "use strict";

  // ---------- Utils ----------
  const qs = (s, p = document) => p.querySelector(s);
  const qsa = (s, p = document) => Array.from(p.querySelectorAll(s));
  const getParam = (k) => new URLSearchParams(window.location.search).get(k);
  const esc = (s) =>
    String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const fmt = {
    num: (v) => new Intl.NumberFormat("pt-BR").format(Number(v) || 0),
    money: (v) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 2,
      }).format(Number(v) || 0),
    moneyShort: (v) => {
      const n = Number(v) || 0;
      if (n >= 1000) return "R$ " + (n / 1000).toFixed(1).replace(".", ",") + "k";
      return fmt.money(n);
    },
    date: (iso) => {
      if (!iso) return "";
      try {
        return new Date(iso).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "short",
        });
      } catch (e) {
        return iso;
      }
    },
    dateTime: (iso) => {
      if (!iso) return "";
      try {
        return new Date(iso).toLocaleString("pt-BR", {
          day: "2-digit",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        });
      } catch (e) {
        return iso;
      }
    },
    mes: (yyyymm) => {
      const [y, m] = (yyyymm || "").split("-");
      const nomes = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ];
      if (!y || !m) return yyyymm;
      return `${nomes[Number(m) - 1]} · ${y}`;
    },
    mesCurto: (yyyymm) => {
      const [y, m] = (yyyymm || "").split("-");
      const nomes = [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ];
      if (!y || !m) return yyyymm;
      return `${nomes[Number(m) - 1]}/${y.slice(2)}`;
    },
  };

  const driveThumb = (id) =>
    id ? `https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w640` : "";
  const driveOpen = (id) =>
    id ? `https://drive.google.com/file/d/${encodeURIComponent(id)}/view` : "#";

  const wa = (numero, texto) =>
    `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

  // ---------- Auth gate ----------
  const slug = (getParam("c") || "").trim().toLowerCase();
  const client = (window.ARVIC_CLIENTS || {})[slug];
  const hasSession = !!localStorage.getItem("arvic_session_" + slug);

  if (!client || !hasSession) {
    qs("#authGate").classList.remove("hidden");
    return;
  }
  qs("#app").classList.remove("hidden");

  const CFG = window.ARVIC_CONFIG || {};
  const SERVICES = window.ARVIC_SERVICES || [];
  const svcById = (id) => SERVICES.find((s) => s.id === id);

  // ---------- Bootstrap ----------
  const firstName = client.nomeCurto || client.nome.split(" ")[0];
  qs("#clientFirstName").textContent = firstName;
  qs("#clientNameSidebar").textContent = client.nome;
  qs("#clientSpecialty").textContent = client.especialidade || "";
  qs("#clientAvatar").textContent = (client.nome || "?")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  qs("#todayLabel").textContent = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });
  document.title = `${client.nome} — Portal Arvic Group`;

  // ==========================================================
  //  VISÃO GERAL
  // ==========================================================
  function renderKPIs() {
    const grid = qs("#kpiGrid");
    const kpis = client.kpis || [];
    grid.innerHTML = kpis
      .map((kpi, i) => {
        const value =
          kpi.formato === "moeda"
            ? fmt.money(kpi.valor)
            : kpi.formato === "texto"
            ? esc(kpi.valor || "—")
            : fmt.num(kpi.valor);
        const delta = Number(kpi.delta) || 0;
        const deltaBlock =
          kpi.formato === "texto"
            ? `<div class="mt-1 text-xs text-slate-500">${esc(kpi.fonte || "")}</div>`
            : `
              <div class="mt-1 text-xs ${
                delta > 0
                  ? "delta-up"
                  : delta < 0
                  ? "delta-down"
                  : "delta-neutral"
              } font-medium">
                ${delta > 0 ? "+" : ""}${delta.toFixed(1)}% ${
                delta === 0 ? "" : "vs. mês anterior"
              }
              </div>
            `;
        return `
          <div class="kpi-card bg-white/[0.02] border border-white/10 rounded-2xl p-5" data-aos="fade-up" data-aos-delay="${
            i * 60
          }">
            <div class="text-[11px] uppercase tracking-[0.18em] text-slate-400">${esc(
              kpi.label
            )}</div>
            <div class="mt-2 font-display font-extrabold text-2xl md:text-3xl">${value}</div>
            ${deltaBlock}
          </div>`;
      })
      .join("");
  }

  function renderActiveServices() {
    const ul = qs("#activeServicesList");
    const active = (client.services || []).map(svcById).filter(Boolean);
    if (!active.length) {
      ul.innerHTML = `<li class="text-sm text-slate-400 italic">Soluções aparecem aqui assim que forem cadastradas.</li>`;
      return;
    }
    ul.innerHTML = active
      .slice(0, 6)
      .map(
        (s) => `
        <li class="flex items-start gap-2 text-sm">
          <span class="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500 shrink-0"></span>
          <div>
            <div class="font-medium">${esc(s.titulo)}</div>
            <div class="text-xs text-slate-400">${esc(s.categoria)}</div>
          </div>
        </li>`
      )
      .join("");
    if (active.length > 6) {
      ul.innerHTML += `<li class="text-xs text-slate-400 pl-4 pt-1">+ ${
        active.length - 6
      } outras soluções ativas</li>`;
    }
  }

  function renderOverviewAprovacoes() {
    const box = qs("#overviewAprovacoes");
    const items = (client.aprovacoesPendentes || []).filter((a) => !a.aprovadoEm);
    if (!items.length) {
      box.innerHTML = `<div class="text-sm text-slate-400 italic">Nada pendente agora.</div>`;
      return;
    }
    box.innerHTML = items
      .slice(0, 4)
      .map(
        (a) => `
        <div class="flex items-center justify-between gap-3 py-2 border-b border-white/5 last:border-0">
          <div class="min-w-0">
            <div class="text-sm font-medium truncate">${esc(a.titulo)}</div>
            <div class="text-xs text-slate-400">Enviado ${fmt.date(a.enviadoEm)}</div>
          </div>
          <span class="chip chip-em-revisao">Aguardando</span>
        </div>`
      )
      .join("");
    // Badge na sidebar
    const badge = qs("#pendingBadge");
    if (items.length > 0) {
      badge.classList.remove("hidden");
      badge.textContent = items.length;
    }
  }

  function renderOverviewAgenda() {
    const ul = qs("#overviewAgenda");
    const items = (client.agenda || [])
      .slice()
      .sort((a, b) => new Date(a.data) - new Date(b.data));
    if (!items.length) {
      ul.innerHTML = `<li class="text-sm text-slate-400 italic">Nada marcado ainda. Fale com a gente se quiser agendar.</li>`;
      return;
    }
    ul.innerHTML = items
      .slice(0, 3)
      .map(
        (a) => `
        <li class="flex items-center gap-3 text-sm">
          <div class="h-2 w-2 rounded-full bg-brand-500 shrink-0"></div>
          <div class="min-w-0 flex-1">
            <div class="truncate">${esc(a.titulo)}</div>
            <div class="text-xs text-slate-400">${fmt.dateTime(a.data)}</div>
          </div>
        </li>`
      )
      .join("");
  }

  // ==========================================================
  //  JORNADA INSTAGRAM
  // ==========================================================
  function renderJornada() {
    const j = client.jornadaInstagram || { historico: [], marcos: [], metaSeguidores: 0 };
    const hist = (j.historico || []).slice();
    const ultimo = hist[hist.length - 1];
    const primeiro = hist[0];
    const atual = ultimo ? Number(ultimo.seguidores) : Number(client.kpis?.find((k) => k.id === "seguidores")?.valor) || 0;

    qs("#igSeguidores").textContent = fmt.num(atual);
    if (ultimo && hist.length >= 2) {
      const prev = Number(hist[hist.length - 2].seguidores);
      const diff = atual - prev;
      const pct = prev ? ((diff / prev) * 100).toFixed(1) : "0.0";
      qs("#igDelta").innerHTML = `<span class="${
        diff > 0 ? "delta-up" : diff < 0 ? "delta-down" : "delta-neutral"
      }">${diff > 0 ? "+" : ""}${fmt.num(diff)} (${pct}%)</span> vs. mês anterior`;
    } else {
      qs("#igDelta").textContent = "Primeiro mês de parceria";
    }

    const meta = Number(j.metaSeguidores) || 0;
    qs("#igMeta").textContent = meta ? fmt.num(meta) : "—";
    if (meta) {
      const pct = Math.min(100, Math.round((atual / meta) * 100));
      qs("#igProgresso").textContent = `${pct}% do caminho percorrido`;
      qs("#igBarra").style.width = pct + "%";
    } else {
      qs("#igProgresso").textContent = "Defina uma meta com a Arvic";
    }

    if (primeiro) {
      const ganho = atual - Number(primeiro.seguidores);
      qs("#igGanho").innerHTML = `<span class="${ganho >= 0 ? "text-brand-500" : "delta-down"}">${
        ganho >= 0 ? "+" : ""
      }${fmt.num(ganho)}</span>`;
      qs("#igPeriodo").textContent = `Desde ${fmt.mes(primeiro.mes)}`;
    } else {
      qs("#igGanho").textContent = "—";
      qs("#igPeriodo").textContent = "Aguardando primeiro fechamento mensal";
    }

    // Gráfico
    renderJornadaChart(hist);

    // Marcos
    renderMarcos(j.marcos || []);
  }

  let jornadaChart;
  function renderJornadaChart(hist) {
    const canvas = qs("#jornadaChart");
    const empty = qs("#jornadaEmpty");
    if (!hist.length) {
      canvas.parentElement.classList.add("hidden");
      empty.classList.remove("hidden");
      return;
    }
    canvas.parentElement.classList.remove("hidden");
    empty.classList.add("hidden");

    if (jornadaChart) jornadaChart.destroy();
    const labels = hist.map((h) => fmt.mesCurto(h.mes));
    const ctx = canvas.getContext("2d");
    const g1 = ctx.createLinearGradient(0, 0, 0, 300);
    g1.addColorStop(0, "rgba(63,160,149,0.35)");
    g1.addColorStop(1, "rgba(63,160,149,0)");

    jornadaChart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Seguidores",
            data: hist.map((h) => Number(h.seguidores) || 0),
            borderColor: "#3FA095",
            backgroundColor: g1,
            tension: 0.4,
            borderWidth: 2.5,
            fill: true,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: "#3FA095",
            pointBorderColor: "#0b0f1a",
            pointBorderWidth: 2,
          },
          {
            label: "Alcance",
            data: hist.map((h) => Number(h.alcance) || 0),
            borderColor: "#F29442",
            backgroundColor: "rgba(242,148,66,0.08)",
            tension: 0.4,
            borderWidth: 2,
            fill: false,
            pointRadius: 3,
            pointHoverRadius: 5,
            pointBackgroundColor: "#F29442",
            hidden: hist.every((h) => !h.alcance),
          },
          {
            label: "Interações",
            data: hist.map((h) => Number(h.interacoes) || 0),
            borderColor: "#94a3b8",
            backgroundColor: "rgba(148,163,184,0.08)",
            tension: 0.4,
            borderWidth: 2,
            borderDash: [4, 4],
            fill: false,
            pointRadius: 3,
            hidden: hist.every((h) => !h.interacoes),
          },
        ],
      },
      options: chartOptions(),
    });
  }

  function renderMarcos(marcos) {
    const list = qs("#marcosList");
    const empty = qs("#marcosEmpty");
    if (!marcos.length) {
      list.classList.add("hidden");
      empty.classList.remove("hidden");
      return;
    }
    list.classList.remove("hidden");
    empty.classList.add("hidden");
    const sorted = marcos
      .slice()
      .sort((a, b) => new Date(b.data) - new Date(a.data));
    list.innerHTML = sorted
      .map(
        (m) => `
        <li class="pl-6 relative">
          <div class="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-brand-500 ring-4 ring-ink-900"></div>
          <div class="text-xs text-slate-400">${fmt.date(m.data)}</div>
          <div class="font-display font-bold mt-0.5">${esc(m.titulo)}</div>
          ${m.descricao ? `<div class="text-sm text-slate-300 mt-1">${esc(m.descricao)}</div>` : ""}
        </li>`
      )
      .join("");
  }

  // Overview chart (mesmo chart de Instagram, resumido)
  let overviewChart;
  function renderOverviewChart() {
    const hist = (client.jornadaInstagram?.historico || []);
    const canvas = qs("#overviewChart");
    const empty = qs("#overviewChartEmpty");
    if (!hist.length) {
      canvas.parentElement.querySelector("canvas").classList.add("hidden");
      empty.classList.remove("hidden");
      return;
    }
    canvas.classList.remove("hidden");
    empty.classList.add("hidden");
    if (overviewChart) overviewChart.destroy();
    const ctx = canvas.getContext("2d");
    const g1 = ctx.createLinearGradient(0, 0, 0, 250);
    g1.addColorStop(0, "rgba(63,160,149,0.35)");
    g1.addColorStop(1, "rgba(63,160,149,0)");
    overviewChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: hist.map((h) => fmt.mesCurto(h.mes)),
        datasets: [
          {
            label: "Seguidores",
            data: hist.map((h) => Number(h.seguidores) || 0),
            borderColor: "#3FA095",
            backgroundColor: g1,
            tension: 0.4,
            borderWidth: 2.5,
            fill: true,
            pointRadius: 3,
            pointHoverRadius: 5,
            pointBackgroundColor: "#3FA095",
          },
        ],
      },
      options: chartOptions({ showLegend: false }),
    });
  }

  function chartOptions({ showLegend = true } = {}) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 900, easing: "easeOutQuart" },
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: {
          display: showLegend,
          labels: { color: "#cbd5e1", usePointStyle: true, boxWidth: 8, padding: 14 },
        },
        tooltip: {
          backgroundColor: "#0b0f1a",
          borderColor: "rgba(255,255,255,0.1)",
          borderWidth: 1,
          titleColor: "#fff",
          bodyColor: "#cbd5e1",
          padding: 12,
          cornerRadius: 8,
        },
      },
      scales: {
        x: { grid: { color: "rgba(255,255,255,0.04)" }, ticks: { color: "#94a3b8" } },
        y: {
          grid: { color: "rgba(255,255,255,0.04)" },
          ticks: {
            color: "#94a3b8",
            callback: (v) => fmt.num(v),
          },
        },
      },
    };
  }

  // ==========================================================
  //  BIBLIOTECA (por mês)
  // ==========================================================
  let currentMonth = null;

  function allMonths() {
    return Object.keys(client.biblioteca || {}).sort();
  }

  function renderMonthsNav() {
    const nav = qs("#monthsNav");
    const months = allMonths();
    if (!months.length) {
      nav.innerHTML = "";
      return;
    }
    if (!currentMonth) currentMonth = months[months.length - 1];
    nav.innerHTML = months
      .map((m) => {
        const active = m === currentMonth;
        return `
          <button data-month="${esc(m)}" class="shrink-0 px-3.5 py-2 rounded-lg text-sm font-medium transition ${
          active
            ? "bg-brand-500/15 text-brand-500 border border-brand-500/30"
            : "bg-white/[0.02] border border-white/10 text-slate-300 hover:bg-white/[0.04]"
        }">${fmt.mesCurto(m)}</button>`;
      })
      .join("");
    qsa("[data-month]", nav).forEach((b) =>
      b.addEventListener("click", () => {
        currentMonth = b.dataset.month;
        renderMonthsNav();
        renderBiblioteca();
      })
    );
  }

  function renderBiblioteca() {
    const host = qs("#biblioContent");
    const empty = qs("#biblioEmpty");
    if (!currentMonth) {
      host.innerHTML = "";
      empty.classList.remove("hidden");
      return;
    }
    const data = (client.biblioteca || {})[currentMonth] || {
      videos: [],
      roteiros: [],
      artes: [],
    };
    const hasAny =
      (data.videos || []).length +
        (data.roteiros || []).length +
        (data.artes || []).length >
      0;
    if (!hasAny) {
      host.innerHTML = "";
      empty.classList.remove("hidden");
      return;
    }
    empty.classList.add("hidden");

    const vids = (data.videos || [])
      .map(
        (v) => `
        <div class="video-card group bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden hover:border-brand-500/40 transition" data-type="videos" x-show="filter === 'todos' || filter === 'videos'">
          <a href="${driveOpen(v.driveId)}" target="_blank" rel="noopener" class="block aspect-video bg-black/40 relative overflow-hidden">
            ${
              v.driveId
                ? `<img src="${driveThumb(v.driveId)}" alt="${esc(
                    v.titulo
                  )}" class="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500" loading="lazy" />`
                : `<div class="flex items-center justify-center h-full text-slate-500 text-sm">Sem prévia</div>`
            }
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition"></div>
            <div class="absolute bottom-3 left-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
              <div class="h-8 w-8 rounded-full bg-white/90 flex items-center justify-center">
                <svg class="h-4 w-4 text-ink-900" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <span class="text-xs text-white font-medium">Abrir no Drive</span>
            </div>
          </a>
          <div class="p-4">
            <div class="flex items-start justify-between gap-3 mb-1">
              <div class="font-display font-bold text-sm leading-tight">${esc(v.titulo)}</div>
              ${v.plataforma ? `<span class="chip chip-concluido text-[10px]">${esc(v.plataforma)}</span>` : ""}
            </div>
            <div class="text-xs text-slate-400">${
              v.postadoEm ? "Publicado " + fmt.date(v.postadoEm) : esc(v.status || "")
            }${v.duracao ? " · " + esc(v.duracao) : ""}</div>
          </div>
        </div>`
      )
      .join("");

    const rots = (data.roteiros || [])
      .map(
        (r) => `
        <a href="${esc(r.driveLink || "#")}" ${
          r.driveLink ? 'target="_blank" rel="noopener"' : ""
        } class="block bg-white/[0.02] border border-white/10 rounded-2xl p-5 hover:border-brand-500/40 transition" data-type="roteiros" x-show="filter === 'todos' || filter === 'roteiros'">
          <div class="flex items-start gap-3">
            <div class="h-9 w-9 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-500 shrink-0">
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h6"/></svg>
            </div>
            <div class="flex-1 min-w-0">
              <div class="font-display font-bold text-sm mb-0.5">${esc(r.titulo)}</div>
              <div class="text-xs text-slate-400">${
                r.status ? esc(r.status) : "Roteiro"
              }${r.criadoEm ? " · " + fmt.date(r.criadoEm) : ""}</div>
            </div>
          </div>
        </a>`
      )
      .join("");

    const arts = (data.artes || [])
      .map(
        (a) => `
        <a href="${esc(a.driveLink || "#")}" ${
          a.driveLink ? 'target="_blank" rel="noopener"' : ""
        } class="block bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden hover:border-brand-500/40 transition" data-type="artes" x-show="filter === 'todos' || filter === 'artes'">
          ${
            a.thumbId
              ? `<div class="aspect-square bg-black/30"><img src="${driveThumb(
                  a.thumbId
                )}" class="w-full h-full object-cover" loading="lazy" /></div>`
              : `<div class="aspect-square bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center">
                  <svg class="h-10 w-10 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/></svg>
                </div>`
          }
          <div class="p-3">
            <div class="text-sm font-medium truncate">${esc(a.titulo)}</div>
            <div class="text-xs text-slate-400">${
              a.tipo ? esc(a.tipo) : "Arte"
            }${a.postadoEm ? " · " + fmt.date(a.postadoEm) : ""}</div>
          </div>
        </a>`
      )
      .join("");

    host.innerHTML = `
      ${
        vids
          ? `<div class="mb-8">
          <div class="text-[11px] uppercase tracking-[0.2em] text-slate-400 mb-3">Vídeos</div>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">${vids}</div>
        </div>`
          : ""
      }
      ${
        rots
          ? `<div class="mb-8">
          <div class="text-[11px] uppercase tracking-[0.2em] text-slate-400 mb-3">Roteiros</div>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">${rots}</div>
        </div>`
          : ""
      }
      ${
        arts
          ? `<div class="mb-8">
          <div class="text-[11px] uppercase tracking-[0.2em] text-slate-400 mb-3">Artes e carrosséis</div>
          <div class="grid sm:grid-cols-3 lg:grid-cols-4 gap-3">${arts}</div>
        </div>`
          : ""
      }
    `;
  }

  // ==========================================================
  //  APROVAÇÕES
  // ==========================================================
  function renderAprovacoes() {
    const grid = qs("#aprovacoesGrid");
    const empty = qs("#aprovacoesEmpty");
    const pend = (client.aprovacoesPendentes || []).filter((a) => !a.aprovadoEm);
    if (!pend.length) {
      grid.innerHTML = "";
      empty.classList.remove("hidden");
      return;
    }
    empty.classList.add("hidden");
    grid.innerHTML = pend
      .map((a) => {
        const msg = `Olá, time Arvic!\n\nAprovo o vídeo "${a.titulo}" para publicação.\n\n— ${client.nomeCurto || client.nome}`;
        const waLink = wa(CFG.whatsapp, msg);
        return `
        <div class="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden" data-aprov-id="${esc(
          a.id
        )}">
          <a href="${driveOpen(a.driveId)}" target="_blank" rel="noopener" class="block aspect-video bg-black/40 relative group">
            ${
              a.driveId
                ? `<img src="${driveThumb(a.driveId)}" alt="${esc(
                    a.titulo
                  )}" class="w-full h-full object-cover" loading="lazy" />`
                : `<div class="flex items-center justify-center h-full text-slate-500 text-sm">Sem prévia</div>`
            }
            <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <div class="h-12 w-12 rounded-full bg-white/95 flex items-center justify-center">
                <svg class="h-5 w-5 text-ink-900" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </div>
          </a>
          <div class="p-5">
            <div class="flex items-start justify-between gap-2 mb-1">
              <div class="font-display font-bold text-sm leading-tight">${esc(a.titulo)}</div>
              <span class="chip chip-em-revisao text-[10px]">Aguardando</span>
            </div>
            ${a.descricao ? `<div class="text-xs text-slate-400 mb-3">${esc(a.descricao)}</div>` : ""}
            <div class="text-xs text-slate-500 mb-4">Enviado ${fmt.date(a.enviadoEm)}${a.duracao ? " · " + esc(a.duracao) : ""}</div>
            <div class="flex gap-2">
              <a href="${driveOpen(a.driveId)}" target="_blank" rel="noopener"
                class="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-center text-xs font-medium py-2 rounded-lg transition">
                Ver no Drive
              </a>
              <a href="${waLink}" target="_blank" rel="noopener" data-approve="${esc(a.id)}"
                class="flex-1 bg-brand-500 hover:bg-brand-600 text-ink-900 font-semibold text-center text-xs py-2 rounded-lg transition">
                Aprovar
              </a>
            </div>
          </div>
        </div>`;
      })
      .join("");

    qsa("[data-approve]", grid).forEach((el) => {
      el.addEventListener("click", () => {
        const id = el.dataset.approve;
        const key = `approved_${slug}_${id}`;
        localStorage.setItem(key, new Date().toISOString());
        setTimeout(() => {
          const card = el.closest("[data-aprov-id]");
          if (card) {
            card.style.opacity = "0.5";
            const chip = qs(".chip-em-revisao", card);
            if (chip) {
              chip.className = "chip chip-ativo text-[10px]";
              chip.textContent = "Aprovação enviada";
            }
            el.textContent = "Enviado ✓";
            el.classList.remove("bg-brand-500", "hover:bg-brand-600");
            el.classList.add("bg-white/10", "pointer-events-none");
          }
        }, 100);
      });
    });
  }

  // ==========================================================
  //  AGENDA
  // ==========================================================
  function renderAgenda() {
    const main = qs("#agendaList");
    const empty = qs("#agendaEmpty");
    const items = (client.agenda || [])
      .slice()
      .sort((a, b) => new Date(a.data) - new Date(b.data));
    if (!items.length) {
      main.innerHTML = "";
      empty.classList.remove("hidden");
      return;
    }
    empty.classList.add("hidden");
    main.innerHTML = items
      .map((a) => {
        const d = new Date(a.data);
        const mesNome = d
          .toLocaleDateString("pt-BR", { month: "short" })
          .replace(".", "");
        return `
        <div class="flex items-start gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.02]">
          <div class="flex flex-col items-center justify-center h-14 w-14 rounded-lg bg-brand-500/10 border border-brand-500/30 text-brand-500 shrink-0">
            <div class="text-[10px] uppercase tracking-wider">${mesNome}</div>
            <div class="font-display font-extrabold text-lg leading-none">${d.getDate()}</div>
          </div>
          <div class="flex-1 min-w-0">
            <div class="font-semibold">${esc(a.titulo)}</div>
            <div class="text-xs text-slate-400">${fmt.dateTime(a.data)}${
          a.local ? " · " + esc(a.local) : ""
        }</div>
            ${a.obs ? `<div class="text-sm text-slate-300 mt-1">${esc(a.obs)}</div>` : ""}
          </div>
          ${
            a.link
              ? `<a href="${esc(a.link)}" target="_blank" rel="noopener" class="text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-md px-2.5 py-1.5 shrink-0">Abrir</a>`
              : ""
          }
        </div>`;
      })
      .join("");
  }

  // ==========================================================
  //  MENSAGENS (WhatsApp)
  // ==========================================================
  const mensagensTemplates = [
    {
      titulo: "Dar feedback sobre algo",
      descricao: "Uma entrega saiu boa, ruim, diferente do que esperava — conta pra gente.",
      icon: "💬",
      msg: () =>
        `Oi, time Arvic! Queria dar um feedback sobre uma entrega.\n\n— ${client.nomeCurto || client.nome}`,
    },
    {
      titulo: "Pedir ajuste em uma entrega",
      descricao: "Aquele vídeo precisa de um corte, aquela arte pede outro tom.",
      icon: "✏️",
      msg: () =>
        `Oi, time Arvic! Preciso ajustar algo em uma entrega:\n\n(descreva aqui)\n\n— ${client.nomeCurto || client.nome}`,
    },
    {
      titulo: "Tirar uma dúvida",
      descricao: "Algo não ficou claro sobre campanha, conteúdo, estratégia.",
      icon: "❓",
      msg: () =>
        `Oi, time Arvic! Tenho uma dúvida:\n\n(digite aqui)\n\n— ${client.nomeCurto || client.nome}`,
    },
    {
      titulo: "Agendar uma conversa",
      descricao: "Quer marcar uma reunião extra, gravação ou alinhamento.",
      icon: "📅",
      msg: () =>
        `Oi, time Arvic! Queria agendar uma conversa.\n\nDia/horário de preferência: \n\n— ${client.nomeCurto || client.nome}`,
    },
    {
      titulo: "Tenho uma ideia pra compartilhar",
      descricao: "Viu uma referência, um formato, um concorrente — manda pra gente.",
      icon: "💡",
      msg: () =>
        `Oi, time Arvic! Quero compartilhar uma ideia:\n\n(digite aqui)\n\n— ${client.nomeCurto || client.nome}`,
    },
    {
      titulo: "Preciso falar urgente",
      descricao: "Fora da rotina. A gente tenta responder rápido.",
      icon: "🚨",
      msg: () =>
        `Oi, time Arvic! Preciso falar com urgência:\n\n(digite aqui)\n\n— ${client.nomeCurto || client.nome}`,
    },
  ];

  function renderMensagens() {
    const grid = qs("#mensagensGrid");
    grid.innerHTML = mensagensTemplates
      .map(
        (m, i) => `
        <a href="${wa(CFG.whatsapp, m.msg())}" target="_blank" rel="noopener"
          class="block bg-white/[0.02] border border-white/10 rounded-2xl p-5 hover:border-brand-500/40 hover:bg-white/[0.04] transition" data-aos="fade-up" data-aos-delay="${
            i * 60
          }">
          <div class="flex items-start gap-4">
            <div class="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-xl shrink-0">${m.icon}</div>
            <div class="flex-1 min-w-0">
              <div class="font-display font-bold mb-1">${esc(m.titulo)}</div>
              <div class="text-sm text-slate-400">${esc(m.descricao)}</div>
            </div>
            <svg class="h-4 w-4 text-slate-500 shrink-0 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14m-7-7l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
        </a>`
      )
      .join("");
    qs("#whatsappDisplay").textContent = CFG.whatsappDisplay || "";
  }

  // ==========================================================
  //  CATÁLOGO DE SOLUÇÕES
  // ==========================================================
  function renderCatalogo() {
    const grid = qs("#catalogGrid");
    const activeSet = new Set(client.services || []);
    const cats = ["Conteúdo", "Design", "Copy", "Mídia Paga", "Tecnologia", "Consultoria"];
    const sorted = SERVICES.slice().sort(
      (a, b) =>
        cats.indexOf(a.categoria) - cats.indexOf(b.categoria) ||
        a.titulo.localeCompare(b.titulo)
    );
    grid.innerHTML = sorted
      .map((s, i) => {
        const ativo = activeSet.has(s.id);
        const showExpr = ativo
          ? "filter === 'todas' || filter === 'ativas'"
          : "filter === 'todas' || filter === 'disponíveis'";
        const msg = `Oi, time Arvic! Tenho interesse em saber mais sobre "${s.titulo}" pra minha operação.\n\n— ${client.nomeCurto || client.nome}`;
        const waLink = wa(CFG.whatsapp, msg);
        return `
          <div class="svc-card ${
            ativo ? "" : "svc-locked"
          } bg-white/[0.02] border ${
          ativo ? "border-brand-500/40" : "border-white/10"
        } rounded-2xl p-5 flex flex-col" data-aos="fade-up" data-aos-delay="${
          (i % 6) * 50
        }" x-show="${showExpr}">
            <div class="flex items-center justify-between mb-3">
              <div class="text-[10px] uppercase tracking-[0.2em] text-slate-400">${esc(s.categoria)}</div>
              ${
                ativo
                  ? `<span class="chip chip-ativo">Contratado</span>`
                  : `<span class="chip chip-concluido">Disponível</span>`
              }
            </div>
            <div class="font-display font-bold text-base mb-2">${esc(s.titulo)}</div>
            <p class="text-sm text-slate-400 leading-relaxed flex-1">${esc(s.descricao)}</p>
            ${
              !ativo
                ? `<a href="${waLink}" target="_blank" rel="noopener"
                  class="mt-4 inline-flex items-center gap-1.5 text-xs text-brand-500 hover:text-brand-600 font-semibold">
                    Conversar sobre essa solução
                    <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14m-7-7l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </a>`
                : ""
            }
          </div>`;
      })
      .join("");
  }

  // ==========================================================
  //  NAVEGAÇÃO
  // ==========================================================
  const LABELS = {
    overview: "Visão Geral",
    jornada: "Jornada Instagram",
    biblioteca: "Biblioteca",
    aprovacoes: "Aprovações",
    agenda: "Agenda",
    mensagens: "Fale com a Arvic",
    solucoes: "Soluções Arvic",
    sobre: "Sobre a Arvic",
  };

  function showView(name) {
    qsa("section[data-view]").forEach((s) => {
      s.classList.toggle("hidden", s.dataset.view !== name);
    });
    qsa(".side-link").forEach((l) => {
      l.classList.toggle("active", l.dataset.section === name);
    });
    qs("#sectionLabel").textContent = LABELS[name] || "";
    qs("#pageTitle").innerHTML =
      name === "overview"
        ? `Olá, <span>${esc(firstName)}</span>`
        : LABELS[name] || "";
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (window.AOS) AOS.refresh();
  }

  qsa(".side-link").forEach((el) =>
    el.addEventListener("click", () => showView(el.dataset.section))
  );
  qsa("[data-goto]").forEach((el) =>
    el.addEventListener("click", (e) => {
      e.preventDefault();
      showView(el.dataset.goto);
    })
  );
  qs("#logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("arvic_session_" + slug);
    window.location.href = "index.html";
  });

  // ==========================================================
  //  Render inicial
  // ==========================================================
  renderKPIs();
  renderActiveServices();
  renderOverviewAprovacoes();
  renderOverviewAgenda();
  renderOverviewChart();
  renderJornada();
  renderMonthsNav();
  renderBiblioteca();
  renderAprovacoes();
  renderAgenda();
  renderMensagens();
  renderCatalogo();
})();
