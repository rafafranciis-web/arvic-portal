(function () {
  "use strict";

  // ---------- Utils ----------
  const qs = (s, p = document) => p.querySelector(s);
  const qsa = (s, p = document) => Array.from(p.querySelectorAll(s));
  const getParam = (k) => new URLSearchParams(window.location.search).get(k);
  const fmt = {
    num: (v) => new Intl.NumberFormat("pt-BR").format(v),
    money: (v) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(v),
    date: (iso) => {
      try {
        const d = new Date(iso);
        return d.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "short",
        });
      } catch (e) {
        return iso;
      }
    },
    dateTime: (iso) => {
      try {
        const d = new Date(iso);
        return d.toLocaleString("pt-BR", {
          day: "2-digit",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        });
      } catch (e) {
        return iso;
      }
    },
  };

  // ---------- Auth gate ----------
  const slug = (getParam("c") || "").trim().toLowerCase();
  const client = (window.ARVIC_CLIENTS || {})[slug];
  const hasSession = !!localStorage.getItem("arvic_session_" + slug);

  if (!client || !hasSession) {
    qs("#authGate").classList.remove("hidden");
    return;
  }
  qs("#app").classList.remove("hidden");

  // ---------- Bootstrap UI ----------
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

  // ---------- KPIs ----------
  function renderKPIs() {
    const grid = qs("#kpiGrid");
    const order = ["seguidores", "leads", "cpl", "investimento"];
    const isMoney = (k) => k === "cpl" || k === "investimento";
    grid.innerHTML = order
      .map((k) => {
        const kpi = client.kpis?.[k];
        if (!kpi) return "";
        const delta = Number(kpi.delta) || 0;
        const deltaClass =
          delta > 0 ? "delta-up" : delta < 0 ? "delta-down" : "delta-neutral";
        const deltaSign = delta > 0 ? "+" : "";
        const value = Number(kpi.value) || 0;
        const display = isMoney(k) ? fmt.money(value) : fmt.num(value);
        return `
          <div class="kpi-card bg-white/[0.02] border border-white/10 rounded-2xl p-5">
            <div class="text-[11px] uppercase tracking-[0.18em] text-slate-400">${kpi.label}</div>
            <div class="mt-2 font-display font-extrabold text-2xl md:text-3xl">${display}</div>
            <div class="mt-1 text-xs ${deltaClass} font-medium">
              ${deltaSign}${delta.toFixed(1)}% vs. mês anterior
            </div>
          </div>`;
      })
      .join("");
  }

  // ---------- Serviços ativos ----------
  function serviceById(id) {
    return (window.ARVIC_SERVICES || []).find((s) => s.id === id);
  }
  function renderActiveServices() {
    const ul = qs("#activeServicesList");
    const active = (client.services || [])
      .map(serviceById)
      .filter(Boolean);
    if (!active.length) {
      ul.innerHTML = `<li class="text-sm text-slate-400 italic">Nenhuma solução ativa cadastrada.</li>`;
      return;
    }
    ul.innerHTML = active
      .map(
        (s) => `
        <li class="flex items-start gap-2 text-sm">
          <span class="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500 shrink-0"></span>
          <div>
            <div class="font-medium">${s.titulo}</div>
            <div class="text-xs text-slate-400">${s.categoria}</div>
          </div>
        </li>`
      )
      .join("");
  }

  // ---------- Entregas ----------
  const STATUS_LABEL = {
    ativo: "Em produção",
    planejado: "Planejado",
    "em-revisao": "Em revisão",
    concluido: "Concluído",
    pendente: "Pendente",
  };
  function renderEntregas() {
    const list = client.entregas || [];
    const mainList = qs("#entregasList");
    const overviewList = qs("#overviewEntregas");

    if (!list.length) {
      mainList.innerHTML = "";
      qs("#entregasEmpty").classList.remove("hidden");
      overviewList.innerHTML = `<li class="text-sm text-slate-400 italic">Nada pendente agora.</li>`;
      return;
    }
    qs("#entregasEmpty").classList.add("hidden");

    const row = (e) => `
      <div class="flex items-center justify-between gap-4 py-3 border-b border-white/5 last:border-0">
        <div class="min-w-0">
          <div class="font-medium truncate">${e.titulo}</div>
          <div class="text-xs text-slate-400">${e.categoria || ""}${
      e.prazo ? " · prazo " + fmt.date(e.prazo) : ""
    }</div>
        </div>
        <span class="chip chip-${e.status}">${STATUS_LABEL[e.status] || e.status}</span>
      </div>`;

    mainList.innerHTML = list.map(row).join("");
    overviewList.innerHTML = list
      .slice(0, 5)
      .map(
        (e) => `
        <li class="flex items-center justify-between gap-3 text-sm">
          <div class="min-w-0">
            <div class="truncate">${e.titulo}</div>
            <div class="text-xs text-slate-400">${
              e.prazo ? fmt.date(e.prazo) : ""
            }</div>
          </div>
          <span class="chip chip-${e.status}">${STATUS_LABEL[e.status] || e.status}</span>
        </li>`
      )
      .join("");
  }

  // ---------- Agenda ----------
  function renderAgenda() {
    const items = (client.agenda || []).slice().sort((a, b) => {
      return new Date(a.data) - new Date(b.data);
    });
    const main = qs("#agendaList");
    const over = qs("#overviewAgenda");

    if (!items.length) {
      main.innerHTML = "";
      qs("#agendaEmpty").classList.remove("hidden");
      over.innerHTML = `<li class="text-sm text-slate-400 italic">Nenhum encontro agendado.</li>`;
      return;
    }
    qs("#agendaEmpty").classList.add("hidden");

    main.innerHTML = items
      .map(
        (a) => `
        <div class="flex items-start gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.02]">
          <div class="flex flex-col items-center justify-center h-14 w-14 rounded-lg bg-brand-500/10 border border-brand-500/30 text-brand-500 shrink-0">
            <div class="text-[10px] uppercase tracking-wider">${new Date(
              a.data
            )
              .toLocaleDateString("pt-BR", { month: "short" })
              .replace(".", "")}</div>
            <div class="font-display font-extrabold text-lg leading-none">${new Date(
              a.data
            ).getDate()}</div>
          </div>
          <div class="flex-1 min-w-0">
            <div class="font-semibold">${a.titulo}</div>
            <div class="text-xs text-slate-400">${fmt.dateTime(a.data)}${
          a.local ? " · " + a.local : ""
        }</div>
          </div>
          ${
            a.link
              ? `<a href="${a.link}" target="_blank" rel="noopener" class="text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-md px-2.5 py-1.5">Abrir</a>`
              : ""
          }
        </div>`
      )
      .join("");

    over.innerHTML = items
      .slice(0, 3)
      .map(
        (a) => `
        <li class="flex items-center gap-3 text-sm">
          <div class="h-2 w-2 rounded-full bg-brand-500 shrink-0"></div>
          <div class="min-w-0 flex-1">
            <div class="truncate">${a.titulo}</div>
            <div class="text-xs text-slate-400">${fmt.dateTime(a.data)}</div>
          </div>
        </li>`
      )
      .join("");
  }

  // ---------- Drive ----------
  function renderDrive() {
    const frame = qs("#driveFrame");
    const wrap = qs("#driveFrameWrap");
    const pending = qs("#drivePending");
    const openLink = qs("#driveOpenLink");

    if (client.driveEmbed) {
      frame.src = client.driveEmbed;
      wrap.classList.remove("hidden");
      pending.classList.add("hidden");
    } else {
      wrap.classList.add("hidden");
      pending.classList.remove("hidden");
    }
    if (client.driveLink) {
      openLink.href = client.driveLink;
      openLink.classList.remove("hidden");
    }
  }

  // ---------- Catálogo ----------
  function renderCatalogo() {
    const grid = qs("#catalogGrid");
    const activeSet = new Set(client.services || []);
    const cats = [
      "Conteúdo",
      "Design",
      "Mídia Paga",
      "Tecnologia",
      "Consultoria",
    ];
    const services = window.ARVIC_SERVICES || [];
    const sorted = services
      .slice()
      .sort(
        (a, b) =>
          cats.indexOf(a.categoria) - cats.indexOf(b.categoria) ||
          a.titulo.localeCompare(b.titulo)
      );

    grid.innerHTML = sorted
      .map((s) => {
        const ativo = activeSet.has(s.id);
        return `
          <div class="svc-card ${
            ativo ? "" : "svc-locked"
          } bg-white/[0.02] border ${
          ativo ? "border-brand-500/40" : "border-white/10"
        } rounded-2xl p-5 relative">
            <div class="flex items-center justify-between mb-2">
              <div class="text-[10px] uppercase tracking-[0.2em] text-slate-400">${s.categoria}</div>
              ${
                ativo
                  ? `<span class="chip chip-ativo">Contratado</span>`
                  : `<span class="chip chip-concluido">Disponível</span>`
              }
            </div>
            <div class="font-display font-bold text-base">${s.titulo}</div>
            <p class="text-sm text-slate-400 mt-1.5 leading-relaxed">${s.descricao}</p>
            ${
              !ativo
                ? `<a href="mailto:contato@arvicgroup.com?subject=Quero saber mais: ${encodeURIComponent(
                    s.titulo
                  )}&body=Oi Arvic! Tenho interesse em ampliar meu pacote com: ${encodeURIComponent(
                    s.titulo
                  )}." class="mt-4 inline-flex text-xs text-brand-500 hover:text-brand-600 font-semibold">Quero saber mais →</a>`
                : ""
            }
          </div>`;
      })
      .join("");
  }

  // ---------- Charts ----------
  let overviewChart, detailChart;
  function buildChartConfig() {
    const perf = client.performance || { labels: [], series: [] };
    return {
      type: "line",
      data: {
        labels: perf.labels,
        datasets: (perf.series || []).map((s) => ({
          label: s.name,
          data: s.values,
          borderColor: s.color || "#3FA095",
          backgroundColor: (s.color || "#3FA095") + "22",
          tension: 0.35,
          borderWidth: 2,
          fill: true,
          pointRadius: 3,
          pointHoverRadius: 5,
          pointBackgroundColor: s.color || "#3FA095",
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: "#cbd5e1", usePointStyle: true, boxWidth: 8 },
          },
          tooltip: {
            backgroundColor: "#0b0f1a",
            borderColor: "rgba(255,255,255,0.1)",
            borderWidth: 1,
            titleColor: "#fff",
            bodyColor: "#cbd5e1",
            padding: 10,
          },
        },
        scales: {
          x: {
            grid: { color: "rgba(255,255,255,0.04)" },
            ticks: { color: "#94a3b8" },
          },
          y: {
            grid: { color: "rgba(255,255,255,0.04)" },
            ticks: { color: "#94a3b8" },
          },
        },
      },
    };
  }
  function renderCharts() {
    const ctx1 = qs("#overviewChart").getContext("2d");
    const ctx2 = qs("#detailChart").getContext("2d");
    if (overviewChart) overviewChart.destroy();
    if (detailChart) detailChart.destroy();
    overviewChart = new Chart(ctx1, buildChartConfig());
    detailChart = new Chart(ctx2, buildChartConfig());
  }

  // ---------- Navegação ----------
  function showView(name) {
    qsa("section[data-view]").forEach((s) => {
      s.classList.toggle("hidden", s.dataset.view !== name);
    });
    qsa(".side-link").forEach((l) => {
      l.classList.toggle("active", l.dataset.section === name);
    });
    const labels = {
      overview: "Visão Geral",
      entregas: "Entregas",
      performance: "Performance",
      materiais: "Materiais",
      agenda: "Agenda",
      catalogo: "Soluções Arvic",
    };
    qs("#sectionLabel").textContent = labels[name] || "";
    if (name === "overview") {
      qs("#pageTitle").innerHTML = `Olá, <span>${firstName}</span> 👋`;
    } else {
      qs("#pageTitle").textContent = labels[name] || "";
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  // ---------- Render inicial ----------
  renderKPIs();
  renderActiveServices();
  renderEntregas();
  renderAgenda();
  renderDrive();
  renderCatalogo();
  renderCharts();
})();
