document.addEventListener("DOMContentLoaded", () => {
  const CONFIG = {
    helpUrl: "https://soporte.qupos.com",
    supportChat: "https://soporte.qupos.com/chat",
    countries: {
      CR: { label: "Costa Rica", facebook: "https://facebook.com/quposcr", instagram: "https://instagram.com/quposcr", youtube: "https://youtube.com/quposcr" }
    }
  };

  const IMPLANTERS = [
    { value: "", label: "Seleccione un implantador" },
    { value: "Josue", label: "Josue" },
    { value: "Melvin", label: "Melvin" },
    { value: "Juan Carlos", label: "Juan Carlos" },
    { value: "Kenneth", label: "Kenneth" },
    { value: "Fabricio", label: "Fabricio" },
    { value: "Alfonso", label: "Alfonso" },
    { value: "Kendall", label: "Kendall" },
    { value: "Karina", label: "Karina" },
    { value: "Steven", label: "Steven" },
    { value: "Josue Cordero", label: "Josue Cordero" }
  ];

  const BRAND_THEMES = {
    lite: { primaryColor: "#7bb13c", lightColor: "#93c754", darkColor: "#618f2b", bgHighlight: "#f5f9f0", logo: "https://www.qupos.com/assets/qupos-logo-O7Yzz17d.png" },
    standard: { primaryColor: "#f27221", lightColor: "#fa8943", darkColor: "#d1560a", bgHighlight: "#fef6f1", logo: "https://www.qupos.com/assets/qupos-logo-O7Yzz17d.png" },
    erp: { primaryColor: "#009edb", lightColor: "#33b8eb", darkColor: "#007ab0", bgHighlight: "#f0f8fd", logo: "https://www.qupos.com/assets/qupos-logo-O7Yzz17d.png" }
  };

  const $ = id => document.getElementById(id);
  const val = id => {
    const el = $(id);
    return el ? el.value : "";
  };

  let activeTab = "onboarding";

  // === FUNCIONES UTILITARIAS ===
  const escapeHtml = str => String(str ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
  const formatList = txt => (txt || "").trim() ? escapeHtml(txt).replace(/\n/g, '<br>') : "Sin Pendientes";
  const formatDate = dateStr => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  // Resolve absolute or relative URL
  const resolveUrl = url => {
    if (!url) return "";
    url = url.trim();
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return "https://" + url;
  };

  function getBrandTheme() {
    const version = val("quposVersion").toLowerCase();
    if (version.includes("lite")) return BRAND_THEMES.lite;
    if (version.includes("erp")) return BRAND_THEMES.erp;
    return BRAND_THEMES.standard;
  }

  function createLink(url, imgUrl) {
    if (!url) return "";
    return `<a href="${resolveUrl(url)}" target="_blank" style="text-decoration:none; margin:0 6px; display:inline-block;"><img src="${imgUrl}" width="24" height="24" style="width:24px; height:24px; border:0; display:block;"></a>`;
  }

  function buildSocialRow(countryData) {
    return `<div style="text-align:center; padding:10px 0 0 0; display:inline-flex; align-items:center; justify-content:center;">
        ${createLink(countryData.facebook, "https://www.factun.com/images/fb.png")}
        ${createLink(countryData.instagram, "https://www.factun.com/images/ig.png")}
        ${createLink(countryData.youtube, "https://cdn-icons-png.flaticon.com/512/174/174883.png")}
      </div>`;
  }

  function buildEmailShell(config, bodyHtml, greeting = "") {
    const countryData = CONFIG.countries.CR;
    const greetingHtml = greeting ? `<p style="margin: 0 0 12px; font-family: Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #333333;">${greeting}</p>` : "";
    const theme = getBrandTheme();
    return `<!DOCTYPE html>
<html lang="es" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Qupos Coordinación</title>
  <style>
    @media print {
      @media print {
        margin: 12mm;
      }
      body {
        background-color: #ffffff !important;
        background: #ffffff !important;
        margin: 0 !important;
        padding: 0 !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      body > center > table {
        background-color: #ffffff !important;
        background: #ffffff !important;
        padding: 0 !important;
      }
      body > center > table > tbody > tr > td,
      body > center > table > tr > td {
        padding: 0 !important;
      }
      table[width="660"] {
        width: 100% !important;
        max-width: 660px !important;
        min-width: 0 !important;
        margin: 0 auto !important;
        box-shadow: none !important;
        border: none !important;
      }
      .no-print {
        display: none !important;
      }
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#f5f7fb; font-family: Arial, sans-serif; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; -webkit-print-color-adjust: exact; print-color-adjust: exact;">
  <center>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; border-spacing:0; width:100%; background-color:#f5f7fb; margin:0; padding:0;">
    <tr>
      <td align="center" valign="top" style="padding:40px 0; text-align:center;">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="660">
        <tr>
        <td align="center" valign="top" width="660">
        <![endif]-->
        <table role="presentation" width="660" align="center" cellpadding="0" cellspacing="0" border="0" style="width:660px; max-width:660px; min-width:660px; margin-left:auto; margin-right:auto; background-color:#ffffff; border-radius:10px; overflow:hidden; border-collapse:collapse; border-spacing:0; text-align:left;">
          <tr>
            <td align="center" width="660" style="width:660px; background-color:${theme.darkColor}; padding:30px; text-align:center; border-bottom:4px solid ${theme.lightColor};">
              <img src="${resolveUrl(theme.logo)}" alt="Qupos" width="90" height="90" style="width:90px; height:90px; border:0; display:inline-block;">
            </td>
          </tr>
          <tr>
            <td width="660" style="width:660px; padding:34px 28px; color:#333333; font-family:Arial,sans-serif; font-size:15px; line-height:1.6;">
              ${greetingHtml}${bodyHtml}
              <p class="no-print" style="margin:20px 0 8px; font-family:Arial,sans-serif; font-size:15px; color:#333333;">Centro de ayuda:</p>
              <table class="no-print" role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; border-spacing:0; margin-bottom:16px;">
                <tr>
                  <td align="center" style="border-radius:6px; background-color:${theme.lightColor};">
                    <a href="${resolveUrl(CONFIG.helpUrl)}" target="_blank" style="font-family:Arial,sans-serif; font-size:15px; font-weight:bold; color:#ffffff; text-decoration:none; padding:12px 22px; display:block; border-radius:6px;">Centro de ayuda</a>
                  </td>
                </tr>
              </table>
              <p class="no-print" style="margin:16px 0 8px; font-family:Arial,sans-serif; font-size:15px; color:#333333;">Chat de soporte:</p>
              <table class="no-print" role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; border-spacing:0; margin-bottom:16px;">
                <tr>
                  <td align="center" style="border-radius:6px; background-color:${theme.darkColor};">
                    <a href="${resolveUrl(CONFIG.supportChat)}" target="_blank" style="font-family:Arial,sans-serif; font-size:15px; font-weight:bold; color:#ffffff; text-decoration:none; padding:12px 22px; display:block; border-radius:6px;">Chat de Soporte</a>
                  </td>
                </tr>
              </table>
              <p style="margin:24px 0 0; font-family:Arial,sans-serif; font-size:15px; line-height:1.6; color:#333333;">Saludos,<br><strong>Equipo Implantaciones</strong></p>
            </td>
          </tr>
          <tr>
            <td width="660" style="width:660px; background-color:#f2f2f2; padding:24px 16px; text-align:center; font-family:Arial,sans-serif; font-size:12px; color:#666666;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; border-spacing:0;">
                <tr class="no-print">
                  <td align="center" style="font-weight:700; color:${theme.darkColor}; margin-bottom:6px; font-family:Arial,sans-serif; font-size:13px; padding-bottom:6px;">Síguenos en nuestras redes</td>
                </tr>
                <tr class="no-print">
                  <td align="center" style="padding:0;">${buildSocialRow(countryData)}</td>
                </tr>
                <tr>
                  <td align="center" style="padding-top:16px; font-family:Arial,sans-serif; font-size:12px; color:#666666;">Qupos · NCQ Technologies ${countryData.label}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
  </table>
  </center>
</body></html>`;
  }

  const renderers = {
    onboarding: () => {
      const data = {
        installDate: formatDate(val("installDate")),
        implanterNCQ: val("implanterNCQ"),
        clientName: val("clientName"),
        clientContact: val("clientContact"),
        prevSystem: val("prevSystem"),
        quposVersion: val("quposVersion"),
        licenseCount: val("licenseCount"),
        backupEmail: val("backupEmail"),
        clientPendings: val("clientPendings"),
        ncqPendings: val("ncqPendings")
      };
      const theme = getBrandTheme();
      const body = `
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #333333; border-collapse: collapse;">
          <tr><td style="padding: 4px 0;"><strong>Tema:</strong> Onboarding</td></tr>
          <tr><td style="padding: 4px 0;"><strong>Fecha de instalación:</strong> ${data.installDate}</td></tr>
          <tr><td style="padding: 4px 0;"><strong>Razón comercial:</strong> ${escapeHtml(data.clientName)}</td></tr>
          <tr><td style="padding: 4px 0;"><strong>Cliente a cargo:</strong> ${escapeHtml(data.clientContact)}</td></tr>
          <tr><td style="padding: 4px 0;"><strong>Versión Qupos:</strong> ${data.quposVersion}</td></tr>
          <tr><td style="padding: 4px 0;"><strong>Cantidad de Licencias:</strong> ${data.licenseCount}</td></tr>
          <tr><td style="padding: 4px 0;"><strong>Sistema anterior:</strong> ${escapeHtml(data.prevSystem)}</td></tr>
          <tr><td style="padding: 4px 0;"><strong>Correo Respaldos (Cloud):</strong> ${escapeHtml(data.backupEmail)}</td></tr>
          <tr><td style="padding: 4px 0;"><strong>Implantador NCQ:</strong> ${data.implanterNCQ}</td></tr>
        </table>
        
        <h3 style="color: ${theme.primaryColor}; font-family: Arial, sans-serif; font-size: 18px; margin: 24px 0 12px 0; border-bottom: 2px solid ${theme.primaryColor}; padding-bottom: 6px;">Pendientes cliente:</h3>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; background-color: ${theme.bgHighlight}; border-left: 4px solid ${theme.primaryColor}; margin: 10px 0 20px 0;">
          <tr><td style="padding: 12px 14px; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #333333;">${formatList(data.clientPendings)}</td></tr>
        </table>
        
        <h3 style="color: ${theme.primaryColor}; font-family: Arial, sans-serif; font-size: 18px; margin: 20px 0 12px 0; border-bottom: 2px solid ${theme.primaryColor}; padding-bottom: 6px;">Pendientes NCQ:</h3>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; background-color: ${theme.bgHighlight}; border-left: 4px solid ${theme.primaryColor}; margin: 10px 0 10px 0;">
          <tr><td style="padding: 12px 14px; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #333333;">${formatList(data.ncqPendings)}</td></tr>
        </table>`;
      return buildEmailShell(CONFIG, body);
    },
    planDeTrabajo: () => {
      const data = {
        installDate: formatDate(val("installDate")),
        implanterNCQ: val("implanterNCQ"),
        clientName: val("clientName"),
        clientContact: val("clientContact"),
        quposVersion: val("quposVersion"),
        planTrabajoDetalle: val("planTrabajoDetalle"),
        clientPendingsPlan: val("clientPendingsPlan"),
        ncqPendingsPlan: val("ncqPendingsPlan")
      };
      const theme = getBrandTheme();
      const body = `
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #333333; border-collapse: collapse;">
          <tr><td style="padding: 4px 0;"><strong>Tema:</strong> Plan de Trabajo</td></tr>
          <tr><td style="padding: 4px 0;"><strong>Fecha:</strong> ${data.installDate}</td></tr>
          <tr><td style="padding: 4px 0;"><strong>Razón comercial:</strong> ${escapeHtml(data.clientName)}</td></tr>
          <tr><td style="padding: 4px 0;"><strong>Cliente a cargo:</strong> ${escapeHtml(data.clientContact)}</td></tr>
          <tr><td style="padding: 4px 0;"><strong>Versión Qupos:</strong> ${data.quposVersion}</td></tr>
          <tr><td style="padding: 4px 0;"><strong>Implantador NCQ:</strong> ${data.implanterNCQ}</td></tr>
        </table>
        
        <h3 style="color: ${theme.primaryColor}; font-family: Arial, sans-serif; font-size: 18px; margin: 24px 0 12px 0; border-bottom: 2px solid ${theme.primaryColor}; padding-bottom: 6px;">Detalle del Plan de Trabajo:</h3>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; background-color: ${theme.bgHighlight}; border-left: 4px solid ${theme.primaryColor}; margin: 10px 0 20px 0;">
          <tr><td style="padding: 12px 14px; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #333333;">${formatList(data.planTrabajoDetalle)}</td></tr>
        </table>
        
        <h3 style="color: ${theme.primaryColor}; font-family: Arial, sans-serif; font-size: 18px; margin: 20px 0 12px 0; border-bottom: 2px solid ${theme.primaryColor}; padding-bottom: 6px;">Pendientes cliente:</h3>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; background-color: ${theme.bgHighlight}; border-left: 4px solid ${theme.primaryColor}; margin: 10px 0 20px 0;">
          <tr><td style="padding: 12px 14px; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #333333;">${formatList(data.clientPendingsPlan)}</td></tr>
        </table>
        
        <h3 style="color: ${theme.primaryColor}; font-family: Arial, sans-serif; font-size: 18px; margin: 20px 0 12px 0; border-bottom: 2px solid ${theme.primaryColor}; padding-bottom: 6px;">Pendientes NCQ:</h3>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; background-color: ${theme.bgHighlight}; border-left: 4px solid ${theme.primaryColor}; margin: 10px 0 10px 0;">
          <tr><td style="padding: 12px 14px; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #333333;">${formatList(data.ncqPendingsPlan)}</td></tr>
        </table>`;
      return buildEmailShell(CONFIG, body);
    }
  };

  function updateSubject() {
    const clientNameText = val("clientName").trim() || "Razón Comercial";
    let baseSubject = "";
    
    if (activeTab === "onboarding") {
      baseSubject = "Minuta Razón Comercial Onboarding";
    } else if (activeTab === "planDeTrabajo") {
      baseSubject = "Minuta Razón Comercial Plan de Trabajo";
    } else {
      baseSubject = `Minuta Razón Comercial ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`;
    }
    
    const finalSubject = baseSubject.replace("Razón Comercial", clientNameText);
    const subjectEl = $("subject");
    if (subjectEl) {
      subjectEl.textContent = finalSubject;
    }
    return finalSubject;
  }

  function render() {
    updateSubject();
    const html = renderers[activeTab]();
    const iframe = $("preview");
    if (iframe) {
      iframe.srcdoc = html;
    }
    return html;
  }

  function switchTab(tabId) {
    activeTab = tabId;
    document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t.dataset.tab === tabId));
    document.querySelectorAll(".form-section").forEach(s => s.classList.toggle("hidden", s.id !== `section${tabId.charAt(0).toUpperCase() + tabId.slice(1)}`));
    render();
    saveState();
  }

  // Populate NCQ Implanters dropdown lists dynamically
  function populateImplanters() {
    const select = $("implanterNCQ");
    if (select) {
      select.innerHTML = IMPLANTERS.map(imp => `<option value="${imp.value}">${imp.label}</option>`).join("");
    }
  }

  // Pre-populate input dates to today's date
  function initializeDates() {
    const today = new Date().toISOString().split("T")[0];
    const el = $("installDate");
    if (el && !el.value) {
      el.value = today;
    }
  }

  // === LOCAL STORAGE AUTO-SAVE ===
  function saveState() {
    const state = {
      activeTab: activeTab
    };

    document.querySelectorAll("input, select, textarea").forEach(el => {
      if (el.id) {
        if (el.type === "checkbox") {
          state[el.id] = el.checked;
        } else {
          state[el.id] = el.value;
        }
      }
    });

    localStorage.setItem("ncq_coordinacion_state", JSON.stringify(state));
  }

  function loadState() {
    try {
      const stateStr = localStorage.getItem("ncq_coordinacion_state");
      if (!stateStr) return;
      const state = JSON.parse(stateStr);

      if (state.activeTab) {
        activeTab = state.activeTab;
      }

      Object.keys(state).forEach(id => {
        if (id === "activeTab") return;
        const el = $(id);
        if (el) {
          if (el.type === "checkbox") {
            el.checked = state[id];
          } else {
            el.value = state[id];
          }
        }
      });
    } catch (e) {
      console.error("Error loading state:", e);
    }
  }

  // === BIND EVENT LISTENERS ===
  // Setup tabs
  document.querySelectorAll(".tab").forEach(tab => {
    tab.onclick = () => {
      switchTab(tab.dataset.tab);
    };
  });

  const versionSelect = $("quposVersion");
  if (versionSelect) {
    versionSelect.onchange = () => {
      render();
      saveState();
    };
  }

  document.querySelectorAll("input, select, textarea").forEach(el => {
    if (el.id !== "quposVersion") {
      el.oninput = () => {
        render();
        saveState();
      };
      el.onchange = () => {
        render();
        saveState();
      };
    }
  });

  // Copy Subject action
  const copySubjectBtn = $("btnCopySubject");
  if (copySubjectBtn) {
    copySubjectBtn.onclick = async () => {
      const text = updateSubject();
      try {
        await navigator.clipboard.writeText(text);
        copySubjectBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#2e7d32" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>`;
        setTimeout(() => {
          copySubjectBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>`;
        }, 1500);
      } catch (e) {
        console.error("Failed to copy subject:", e);
      }
    };
  }

  // Copy Email Body action
  const copyBtn = $("btnCopy");
  if (copyBtn) {
    copyBtn.onclick = async () => {
      const html = render();
      const text = $("preview").contentWindow.document.body.innerText;
      try {
        const clipboardItem = new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([text], { type: "text/plain" })
        });
        await navigator.clipboard.write([clipboardItem]);
        
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "¡Copiado!";
        copyBtn.style.backgroundColor = "#2e7d32";
        copyBtn.style.borderColor = "#2e7d32";
        setTimeout(() => {
          copyBtn.textContent = originalText;
          copyBtn.style.backgroundColor = "";
          copyBtn.style.borderColor = "";
        }, 2000);
      } catch (err) {
        console.error("Failed to copy content:", err);
      }
    };
  }

  // Print PDF action
  const pdfBtn = $("btnPDF");
  if (pdfBtn) {
    pdfBtn.onclick = () => {
      const previewFrame = $("preview");
      if (previewFrame) {
        previewFrame.contentWindow.print();
      }
    };
  }

  // === INITIALIZATION ===
  populateImplanters();
  initializeDates();
  loadState();
  switchTab(activeTab);
});
