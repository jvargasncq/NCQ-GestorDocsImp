(function () {
  "use strict";

  // === SELECCIÓN DE ELEMENTOS DOM (CACHE) ===
  const $ = id => document.getElementById(id);
  const val = (id, fallback = "") => $(id) ? $(id).value : fallback;

  // === CONSTANTES DE CONFIGURACIÓN ===
  const COUNTRY_DEFAULTS = {
    CR: {
      helpUrl: "https://www.factun.com/cr/ayuda",
      supportPhone: "+506 8825 5725"
    },
    RD: {
      helpUrl: "https://www.factun.com/rd/ayuda",
      supportPhone: "+1 (849) 517-0243"
    }
  };

  const SOCIAL = {
    CR: {
      label: "Costa Rica",
      facebook: "https://www.facebook.com/factunCostaRica",
      instagram: "https://www.instagram.com/factuncostarica/"
    },
    RD: {
      label: "República Dominicana",
      facebook: "https://www.facebook.com/factunrd/",
      instagram: "https://www.instagram.com/factunrd/"
    }
  };

  const TOPIC_MODULES = {
    "Factun": [
      "Mantenimientos",
      "Ventas",
      "Recepción",
      "Reportes",
      "Administrativo"
    ],
    "Factun Pro": [
      "Mantenimientos",
      "Ventas",
      "Recepción",
      "Reportes",
      "Administrativo",
      "Cuentas por Cobrar",
      "Inventario"
    ],
    "Factun + QB": [
      "Integración",
      "Mantenimientos",
      "Recepción"
    ]
  };

  const FACTUN_TOPIC_DETAILS = {
    "Mantenimientos": [
      "Proceso de creación de clientes y productos.",
      "Procesos de creación y asignación de marcas y grupos de productos.",
      "Actualización de tipo de cambio."
    ],
    "Ventas": [
      "Generación de facturas y tiquetes electrónicos.",
      "Proceso de creación de notas de débito y crédito."
    ],
    "Recepción": [
      "Proceso de recepción de documentos a través del buzón.",
      "Mantenimiento de proveedores y generación de facturas de compras."
    ],
    "Reportes": [
      "Generación y análisis de reportes de ventas, compras y control general."
    ],
    "Administrativo": [
      "Confirmación de credenciales de acceso.",
      "Gestión de cuenta y perfiles de facturación.",
      "Proceso de agregar usuarios adicionales."
    ],
    "Cuentas por Cobrar": [
      "Gestión y revisión de cobros a clientes.",
      "Control de saldos, estados de cuenta y facturas vencidas."
    ],
    "Inventario": [
      "Consulta de existencias actuales e historial de existencias.",
      "Administración y gestión de bodegas.",
      "Procesos de movimientos de inventario y toma física de mercadería."
    ],
    "Integración": [
      "Sincronización de clientes, artículos y proveedores.",
      "Visualización del estado de los documentos desde Factun."
    ],
    "QuickBooks_Mantenimientos": [
      "Creación de clientes y productos desde QuickBooks.",
      "Asignación de códigos CABYS desde Factun.",
      "Configuración de exoneraciones desde Factun."
    ],
    "QuickBooks_Recepción": [
      "Recepción de documentos y envío a QuickBooks mediante el buzón.",
      "Mantenimiento de proveedores y generación de facturas de compra."
    ]
  };

  let activeTemplate = "welcome"; // welcome | post | sac (Mensajes)

  // === FUNCIONES UTILITARIAS ===
  const escapeHtml = str => String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  function buildGreeting(name) {
    const n = (name || "").trim();
    if (!n) return "Hola, un gusto saludarte.";
    return `Hola, ${escapeHtml(n)}. Un gusto saludarte.`;
  }

  function welcomeMainCopy() {
    return "Te confirmamos que tu cuenta de facturación electrónica en Factun ya está activa y configurada. A continuación, te compartimos los detalles de acceso para ingresar a la plataforma:";
  }

  function updateSubject() {
    let finalSubject = "";
    if (activeTemplate === "welcome") {
      finalSubject = "Bienvenido a Factun";
    } else if (activeTemplate === "post") {
      const commercialName = val("clientName");
      if (commercialName.trim()) {
        finalSubject = `Minuta ${commercialName} Capacitación Factun`;
      } else {
        finalSubject = "Minuta de capacitación · Factun";
      }
    } else if (activeTemplate === "sac") {
      finalSubject = "Mensajes · Factun";
    }

    $("subject").value = finalSubject;
    $("subjectLabel").textContent = finalSubject;
  }

  function passCopy() {
    return "La contraseña te llegará a este mismo correo.";
  }

  function signatureLine1() { return "Saludos,"; }
  function signatureLine2() { return "Equipo Factun"; }

  const formatList = txt => (txt || "").trim() ? escapeHtml(txt).replace(/\n/g, '<br>') : "Sin Pendientes";

  function formatDate(dateStr) {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  }

  function calculateDuration(start, end) {
    if (!start || !end) return "";
    const [startH, startM] = start.split(":").map(Number);
    const [endH, endM] = end.split(":").map(Number);
    let diffMinutes = (endH * 60 + endM) - (startH * 60 + startM);
    if (diffMinutes < 0) diffMinutes += 24 * 60;
    const hours = Math.floor(diffMinutes / 60);
    const mins = diffMinutes % 60;
    if (hours > 0) {
      return `${hours} ${hours === 1 ? 'hora' : 'horas'}${mins > 0 ? ` y ${mins} ${mins === 1 ? 'minuto' : 'minutos'}` : ''}`;
    }
    return `${mins} ${mins === 1 ? 'minuto' : 'minutos'}`;
  }

  function formatInductionDateOnly(dateValue) {
    if (!dateValue) return "";

    const [y, m, d] = dateValue.split("-").map(n => parseInt(n, 10));
    const date = new Date(y, (m - 1), d);

    const dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

    const diaSemana = dias[date.getDay()];
    const dia = date.getDate();
    const mes = meses[date.getMonth()];

    return `${diaSemana} ${dia} de ${mes}`;
  }

  function formatInductionTimeOnly(timeValue) {
    if (!timeValue) return "";
    let [hh, mm] = timeValue.split(":");
    let h = parseInt(hh, 10);
    const ampm = h >= 12 ? "pm" : "am";
    if (h > 12) h -= 12;
    if (h === 0) h = 12;
    return `${h}:${mm} ${ampm}`;
  }

  function buildSocialRow(countryInfo) {
    const fb = countryInfo.facebook;
    const ig = countryInfo.instagram;

    return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:10px auto 0; border-collapse:collapse;">
      <tr>
        <td style="padding-right:10px;" align="center" valign="middle">
          <a href="${fb}" target="_blank" rel="noopener noreferrer"
             aria-label="Facebook"
             style="display:inline-block; width:40px; height:40px; border-radius:999px; background:rgba(23,13,102,.08); text-decoration:none;">
            <img
              src="https://www.factun.com/images/fb.png"
              alt="Facebook"
              width="18"
              height="18"
              style="display:block; margin:11px auto; width:18px; height:18px; border:0; outline:none; text-decoration:none; vertical-align:middle;">
          </a>
        </td>

        <td align="center" valign="middle">
          <a href="${ig}" target="_blank" rel="noopener noreferrer"
             aria-label="Instagram"
             style="display:inline-block; width:40px; height:40px; border-radius:999px; background:rgba(23,13,102,.08); text-decoration:none;">
            <img
              src="https://www.factun.com/images/ig.png"
              alt="Instagram"
              width="18"
              height="18"
              style="display:block; margin:11px auto; width:18px; height:18px; border:0; outline:none; text-decoration:none; vertical-align:middle;">
          </a>
        </td>
      </tr>
    </table>
    `;
  }

  function buildInductionSection(dateText, timeText, teamsUrlRaw) {
    const dateVal = escapeHtml((dateText || "").trim());
    const timeVal = escapeHtml((timeText || "").trim());
    const teamsUrl = (teamsUrlRaw || "").trim();

    const dateLine = dateVal
      ? `<p style="margin:10px 0 0; font-family:Arial,sans-serif; font-size:14.5px; color:#333333;"><strong>Fecha:</strong> ${dateVal}</p>`
      : `<p style="margin:10px 0 0; color:#6b7280; font-size:13.5px; font-style:italic; font-family:Arial,sans-serif;">(Pendiente: selecciona fecha de la inducción.)</p>`;

    const timeLine = timeVal
      ? `<p style="margin:6px 0 0; font-family:Arial,sans-serif; font-size:14.5px; color:#333333;"><strong>Hora:</strong> ${timeVal}</p>`
      : `<p style="margin:6px 0 0; color:#6b7280; font-size:13.5px; font-style:italic; font-family:Arial,sans-serif;">(Pendiente: selecciona hora de la inducción.)</p>`;

    const teamsBtn = `
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:16px auto 0; border-collapse:collapse;">
        <tr>
          <td align="center" style="border-radius:4px; background-color:#6264A7;">
            <a href="${escapeHtml(teamsUrl || "#")}" target="_blank" rel="noopener noreferrer"
               style="background:#6264A7; color:#ffffff; padding:8px 18px; text-decoration:none; border-radius:4px; font-weight:700; display:inline-block; font-family:Arial,sans-serif; font-size:13.5px;">
              Unirme a la Inducción
            </a>
          </td>
        </tr>
      </table>
    `;

    return `
      <h3 style="color: #170d66; font-family: Arial, sans-serif; font-size: 16px; margin: 24px 0 10px 0; border-bottom: 2px solid #00a8ff; padding-bottom: 6px; font-weight: bold;">Inducción programada</h3>
      
      <p style="margin:0 0 10px; font-family:Arial,sans-serif; font-size:14.5px; color:#333333; line-height:1.6;">
        En esta sesión te guiamos por lo esencial para que empieces a facturar con seguridad y sin complicaciones.
      </p>
      ${dateLine}
      ${timeLine}
      ${teamsBtn}
    `;
  }

  function getCommonData() {
    const country = val("country");
    const defaults = COUNTRY_DEFAULTS[country] || COUNTRY_DEFAULTS.CR;
    const cleanPhone = defaults.supportPhone.replace(/[^0-9]/g, "");
    const supportChat = `https://api.whatsapp.com/send/?phone=${cleanPhone}&text=Hola,%20solicito%20soporte%20con%20mi%20cuenta%20de%20Factun&type=phone_number&app_absent=0`;

    return {
      country,
      subject: val("subject"),
      clientName: val("clientName"),
      clientContact: val("clientContact"),
      userEmail: val("userEmail"),
      loginUrl: "https://erp.factun.com/Acceso/Login",
      helpUrl: defaults.helpUrl,
      supportChat
    };
  }

  function getWelcomeData() {
    const hasInduction = $("hasInduction") && $("hasInduction").checked;
    const dateVal = val("inductionDate");
    const timeVal = `${val("inductionHour")}:${val("inductionMin")}`;
    const inductionDateText = formatInductionDateOnly(dateVal);
    const inductionTimeText = formatInductionTimeOnly(timeVal);
    return {
      hasInduction,
      inductionDateText,
      inductionTimeText,
      teamsUrl: val("teamsUrl")
    };
  }

  function getPostData() {
    const checkedModules = Array.from(document.querySelectorAll(".topic-module-cb:checked")).map(cb => cb.dataset.label);
    
    const checkedWork = [];
    if ($("checkWorkRecepcion") && $("checkWorkRecepcion").checked) {
      checkedWork.push("Se configuró el reenvío automático desde el correo de recepción de facturas hacia el sistema Factun.");
    }
    if ($("checkWorkQuickBooks") && $("checkWorkQuickBooks").checked) {
      checkedWork.push("Se realizó la configuración de QuickBooks y la integración con Factun.");
    }
    if ($("checkWorkImpresora") && $("checkWorkImpresora").checked) {
      checkedWork.push("Se realizó la instalación del utilitario de impresión.");
    }
    if ($("checkWorkMigracion") && $("checkWorkMigracion").checked) {
      const migClientes = $("checkWorkMigracionClientes") && $("checkWorkMigracionClientes").checked;
      const migProductos = $("checkWorkMigracionProductos") && $("checkWorkMigracionProductos").checked;
      if (migClientes && migProductos) {
        checkedWork.push("Se realizó la migración de información de Clientes y Productos.");
      } else if (migClientes) {
        checkedWork.push("Se realizó la migración de información de Clientes.");
      } else if (migProductos) {
        checkedWork.push("Se realizó la migración de información de Productos.");
      } else {
        checkedWork.push("Se realizó la migración de datos.");
      }
    }
    if ($("checkWorkRutas") && $("checkWorkRutas").checked) {
      checkedWork.push("Se asistió en la instalación de la aplicación Factun y se explicó el proceso para realizar la impresión desde el dispositivo móvil.");
    }

    return {
      postTopic: val("postTopic"),
      checkedModules,
      checkedWork,
      postDate: val("postDate"),
      startTime: `${val("startTimeHourPost")}:${val("startTimeMinPost")}`,
      endTime: `${val("endTimeHourPost")}:${val("endTimeMinPost")}`,
      postAssistants: val("postAssistants"),
      clientPendingsPost: val("clientPendingsPost"),
      ncqPendingsPost: val("ncqPendingsPost"),
      videoUrl: val("videoUrl")
    };
  }

  function buildBaseEmailShell({ headerTitle, greeting, bodyHtml, helpUrl, supportChat, socialRow, countryLabel }) {
    const sign1 = escapeHtml(signatureLine1());
    const sign2 = escapeHtml(signatureLine2());

    const greetingBlock = greeting
      ? `<p style="margin:0 0 16px;">${greeting}</p>`
      : '';

    return `<!DOCTYPE html>
<html lang="es" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(headerTitle)}</title>
<style>
    @media print {
      @page {
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
<body style="margin:0; padding:0; background:#f5f7fb; font-family: Arial, Helvetica, sans-serif; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; -webkit-print-color-adjust: exact; print-color-adjust: exact;">
  <center>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; border-spacing:0; width:100%; background-color:#f5f7fb; margin:0; padding:0;">
      <tr>
        <td align="center" valign="top" style="padding:40px 0; text-align:center;">
          <div align="center" style="text-align:center; width:100%; margin:0 auto;">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="660">
            <tr>
            <td align="center" valign="top" width="660">
            <![endif]-->
            <table role="presentation" width="660" align="center" cellpadding="0" cellspacing="0" border="0" style="width:660px; max-width:660px; min-width:660px; margin:0 auto; display:table; background-color:#ffffff; border-radius:10px; overflow:hidden; border-collapse:collapse; border-spacing:0; text-align:left;">
              <tr>
                <td style="background:#170d66; padding:20px 24px; text-align:center; border-bottom:4px solid #00a8ff;">
                  <img
                    src="https://www.factun.com/assets/logo-factun-blanco-DB0yF7As.png"
                    alt="Factun"
                    width="200"
                    style="width:200px; height:auto; display:block; margin:auto; border:0;">
                </td>
              </tr>

              <tr>
                <td style="padding:34px 28px; color:#333333; font-size:15px; line-height:1.6; font-family:Arial,sans-serif;">
                  ${greetingBlock}

                  ${bodyHtml}

                  <p class="no-print" style="margin:20px 0 8px; font-family:Arial,sans-serif; font-size:15px; color:#333333;">Centro de ayuda:</p>
                  <table class="no-print" role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; border-spacing:0; margin-bottom:16px;">
                    <tr>
                      <td align="center" style="border-radius:6px; background-color:#00a8ff;">
                        <a href="${helpUrl}" target="_blank" rel="noopener noreferrer"
                          style="font-family:Arial,sans-serif; font-size:15px; font-weight:bold; color:#ffffff; text-decoration:none; padding:12px 22px; display:block; border-radius:6px;">
                          Centro de ayuda
                        </a>
                      </td>
                    </tr>
                  </table>

                  <p class="no-print" style="margin:16px 0 8px; font-family:Arial,sans-serif; font-size:15px; color:#333333;">Chat de soporte:</p>
                  <table class="no-print" role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; border-spacing:0; margin-bottom:16px;">
                    <tr>
                      <td align="center" style="border-radius:6px; background-color:#170d66;">
                        <a href="${supportChat}" target="_blank" rel="noopener noreferrer"
                          style="font-family:Arial,sans-serif; font-size:15px; font-weight:bold; color:#ffffff; text-decoration:none; padding:12px 22px; display:block; border-radius:6px;">
                          Chat de Soporte
                        </a>
                      </td>
                    </tr>
                  </table>

                  <p style="margin:24px 0 0; font-family:Arial,sans-serif; font-size:15px; line-height:1.6; color:#333333;">${sign1}<br><strong>${sign2}</strong></p>
                </td>
              </tr>

              <tr>
                <td style="background:#f2f2f2; padding:20px 16px; text-align:center; font-size:12px; color:#666666; font-family:Arial,sans-serif;">
                  <div class="no-print" style="font-weight:700; color:#170d66; margin-bottom:6px;">Síguenos en nuestras redes</div>
                  <div class="no-print">${socialRow}</div>
                  <div style="margin-top:12px;">Factun · Facturación electrónica para empresas en ${escapeHtml(countryLabel)}</div>
                </td>
              </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
          </div>
        </td>
      </tr>
    </table>
  </center>
</body>
</html>`;
  }

  function buildWelcomeEmail(common, w) {
    const greeting = buildGreeting(common.clientContact);
    const mainText = escapeHtml(welcomeMainCopy());

    const userEmail = escapeHtml(common.userEmail || "");
    const passNote = escapeHtml(passCopy());

    const countryInfo = SOCIAL[common.country] || SOCIAL.CR;
    const socialRow = buildSocialRow(countryInfo);

    const credentialsBlock = `
      <p style="margin:0 0 16px;">${mainText}</p>

      <h3 style="color: #170d66; font-family: Arial, sans-serif; font-size: 16px; margin: 24px 0 10px 0; border-bottom: 2px solid #00a8ff; padding-bottom: 6px; font-weight: bold;">Credenciales de acceso</h3>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f2f8ff; border-left:4px solid #00a8ff; margin:10px 0 20px; border-collapse:collapse;">
        <tr>
          <td style="padding:18px 20px; font-size:14.5px; font-family:Arial,sans-serif; color:#333333; line-height:1.7;">
            <div style="margin-bottom: 8px;"><strong>Usuario:</strong> <span style="font-weight:bold; color:#170d66;">${userEmail || "(correo de acceso)"}</span></div>
            <div style="margin-bottom: 16px;"><strong>Contraseña:</strong> <span style="color:#555555; font-style:italic;">${passNote}</span></div>
            
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 0 auto; border-collapse:collapse;">
              <tr>
                <td align="center" style="border-radius:4px; background-color:#00a8ff;">
                  <a href="${escapeHtml(common.loginUrl)}" target="_blank" rel="noopener noreferrer"
                    style="background:#00a8ff; color:#ffffff; padding:8px 18px; text-decoration:none; border-radius:4px; font-weight:700; display:inline-block; font-family:Arial,sans-serif; font-size:13.5px;">
                    Iniciar sesión
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    `;

    const conditionalBlock = w.hasInduction
      ? buildInductionSection(w.inductionDateText, w.inductionTimeText, w.teamsUrl)
      : "";

    const bodyHtml = credentialsBlock + conditionalBlock;

    return buildBaseEmailShell({
      headerTitle: "Bienvenido a Factun",
      greeting,
      bodyHtml,
      helpUrl: escapeHtml(common.helpUrl),
      supportChat: escapeHtml(common.supportChat),
      socialRow,
      countryLabel: countryInfo.label
    });
  }

  function buildPostEmail(common, p) {
    const topicText = p.postTopic;

    const duration = calculateDuration(p.startTime, p.endTime);
    const timeDetails = p.startTime && p.endTime
      ? `<tr><td style="padding: 4px 0; font-family:Arial,sans-serif; font-size:14.5px; color:#333333;"><strong>Hora:</strong> de ${p.startTime} a ${p.endTime} (${duration ? `Duración: ${duration}` : ''})</td></tr>`
      : '';

    const assistantsList = p.postAssistants.split("\n").map(l => l.trim()).filter(l => l);
    const assistantsHtml = `
      <tr>
        <td style="padding: 8px 0 4px 0; font-family:Arial,sans-serif; font-size:14.5px; color:#333333;">
          <strong>Asistentes:</strong>
          ${assistantsList.length > 0
            ? `<ul style="margin: 6px 0 0 0; padding-left: 20px; font-family:Arial,sans-serif; font-size:14.5px; line-height: 1.6; color:#333333;">
                 ${assistantsList.map(a => `<li style="margin-bottom: 4px;">${escapeHtml(a)}</li>`).join("")}
               </ul>`
            : `<span style="color:#777777; font-style:italic;"> Sin asistentes</span>`
          }
        </td>
      </tr>
    `;

    const videoBlock = p.videoUrl
      ? `
        <h3 style="color: #170d66; font-family: Arial, sans-serif; font-size: 16px; margin: 24px 0 10px 0; border-bottom: 2px solid #00a8ff; padding-bottom: 6px; font-weight: bold;">Material de Apoyo</h3>
        <table class="no-print" role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 16px auto; border-collapse: collapse;">
          <tr>
            <td align="center" style="border-radius: 4px; background-color: #00a8ff;">
              <a href="${escapeHtml(p.videoUrl)}" target="_blank" rel="noopener noreferrer" style="font-family: Arial, sans-serif; font-size: 13.5px; font-weight: bold; color: #ffffff; text-decoration: none; padding: 8px 18px; display: block; border-radius: 4px;">Ver capacitación</a>
            </td>
          </tr>
        </table>
      `
      : '';

    const workDoneHtml = p.checkedWork && p.checkedWork.length > 0
      ? `
        <h3 style="color: #170d66; font-family: Arial, sans-serif; font-size: 16px; margin: 24px 0 10px 0; border-bottom: 2px solid #00a8ff; padding-bottom: 6px; font-weight: bold;">Trabajo Realizado</h3>
        <ul style="margin: 0 0 14px 0; padding-left: 20px; font-family: Arial, sans-serif; font-size: 14.5px; line-height: 1.6; color: #333333;">
          ${p.checkedWork.map(w => `<li style="margin-bottom: 4px;">${escapeHtml(w)}</li>`).join("")}
        </ul>
      `
      : '';

    const modulesHtml = p.checkedModules.length > 0
      ? `
        <h3 style="color: #170d66; font-family: Arial, sans-serif; font-size: 16px; margin: 24px 0 10px 0; border-bottom: 2px solid #00a8ff; padding-bottom: 6px; font-weight: bold;">Módulos impartidos</h3>
        ${p.checkedModules.map(m => {
          const key = (p.postTopic === "Factun + QB" && (m === "Mantenimientos" || m === "Recepción")) ? `QuickBooks_${m}` : m;
          const points = FACTUN_TOPIC_DETAILS[key] || [];
          return `
            <p style="margin: 12px 0 6px 0; font-family: Arial, sans-serif; font-size: 15px; color: #333333;"><strong>${escapeHtml(m)}</strong></p>
            <ul style="margin: 0 0 14px 0; padding-left: 20px; font-family: Arial, sans-serif; font-size: 14.5px; line-height: 1.6; color: #333333;">
              ${points.map(pt => `<li style="margin-bottom: 4px;">${escapeHtml(pt)}</li>`).join("")}
            </ul>
          `;
        }).join("")}
      `
      : '';

    const bodyHtml = `
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 14.5px; line-height: 1.6; color: #333333; border-collapse: collapse;">
        <tr><td style="padding: 4px 0; font-family:Arial,sans-serif; font-size:14.5px; color:#333333;"><strong>Fecha:</strong> ${formatDate(p.postDate)}</td></tr>
        ${timeDetails}
        <tr><td style="padding: 4px 0; font-family:Arial,sans-serif; font-size:14.5px; color:#333333;"><strong>Razón Social:</strong> ${escapeHtml(common.clientName || "(no indicado)")}</td></tr>
        ${assistantsHtml}
      </table>

      ${modulesHtml}
      ${workDoneHtml}
      ${videoBlock}

      <h3 style="color: #170d66; font-family: Arial, sans-serif; font-size: 16px; margin: 24px 0 10px 0; border-bottom: 2px solid #00a8ff; padding-bottom: 6px; font-weight: bold;">Pendientes cliente</h3>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f2f8ff; border-left:4px solid #00a8ff; margin:10px 0 20px; border-collapse:collapse;">
        <tr>
          <td style="padding:12px 14px; font-family:Arial,sans-serif; font-size:14px; color:#333333; line-height:1.6;">
            ${formatList(p.clientPendingsPost)}
          </td>
        </tr>
      </table>

      <h3 style="color: #170d66; font-family: Arial, sans-serif; font-size: 16px; margin: 20px 0 10px 0; border-bottom: 2px solid #00a8ff; padding-bottom: 6px; font-weight: bold;">Pendientes NCQ</h3>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f2f8ff; border-left:4px solid #00a8ff; margin:10px 0 10px; border-collapse:collapse;">
        <tr>
          <td style="padding:12px 14px; font-family:Arial,sans-serif; font-size:14px; color:#333333; line-height:1.6;">
            ${formatList(p.ncqPendingsPost)}
          </td>
        </tr>
      </table>
    `;

    const countryInfo = SOCIAL[common.country] || SOCIAL.CR;
    const socialRow = buildSocialRow(countryInfo);

    return buildBaseEmailShell({
      headerTitle: "Minuta de capacitación · Factun",
      greeting: "",
      bodyHtml,
      helpUrl: escapeHtml(common.helpUrl),
      supportChat: escapeHtml(common.supportChat),
      socialRow,
      countryLabel: countryInfo.label
    });
  }

  function getSacRawTextMessage() {
    const type = val("sacMsgType");
    let text = "";

    if (type === "teams_sac") {
      const client = val("sacClientName").trim() || "[Razón Social]";
      
      const workList = ["Cuenta y perfil de facturación"];
      if ($("sacSwitchInduccion") && $("sacSwitchInduccion").checked) {
        workList.push("Inducción de uso del sistema");
      }
      if ($("sacSwitchGrabacion") && $("sacSwitchGrabacion").checked) {
        workList.push("Grabación de la sesión");
      }
      if ($("sacSwitchRecepcion") && $("sacSwitchRecepcion").checked) {
        workList.push("Configuración de Recepción de documentos");
      }
      if ($("sacSwitchMigracion") && $("sacSwitchMigracion").checked) {
        workList.push("Migración de datos");
      }
      if ($("sacSwitchQuickbooks") && $("sacSwitchQuickbooks").checked) {
        workList.push("Configuración de QuickBooks");
      }
      if ($("sacSwitchImpresora") && $("sacSwitchImpresora").checked) {
        workList.push("Configuración de impresora PDV");
      }
      if ($("sacSwitchAppFactun") && $("sacSwitchAppFactun").checked) {
        workList.push("Configuración de aplicación Factun");
      }

      const work = workList.map(item => `✅ ${item}`).join("\n");

      text = `📢 *Notificación de Implantación Finalizada*\n\nEstimado equipo, les informo que se ha dado por concluido el proceso de implantación para el cliente *${client}*.\n\n*Trabajo realizado:*\n${work}`;

    } else if (type === "wa_saludo") {
      const contact = val("sacClientContact").trim() || "[Nombre del Cliente]";
      const company = val("sacClientCompany").trim() || "[Empresa]";
      const hasInd = $("sacHasInduction") && $("sacHasInduction").checked;

      const inductionText = hasInd
        ? "Para iniciar de la mejor manera, nos gustaría coordinar su sesión de inducción. Quedo a su disposición para agendar el espacio en el horario que le sea más conveniente."
        : "Cualquier consulta o duda en el uso de la plataforma, recuerde que estamos a su disposición a través de nuestros canales de soporte.";

      text = `Hola, *${contact}*. Un gusto saludarle de parte del equipo de Factun. 😊\n\nLe informo que la cuenta de facturación electrónica para *${company}* ya se encuentra creada y activa.\n\n${inductionText}`;

    } else if (type === "wa_despedida") {
      const contact = val("sacClientContactDespedida").trim() || "[Nombre del Cliente]";

      text = `Hola, *${contact}*. Espero que se encuentre muy bien.\n\nLe comparto que ya hemos enviado a su correo electrónico la minuta de la capacitación y el enlace a la grabación de la sesión para que pueda consultarla cuando lo necesite.\n\nRecuerde que el equipo de soporte sigue a su entera disposición para resolver cualquier consulta. ¡Ha sido un gusto acompañarle en este proceso! 🤝`;
    }

    return text;
  }

  function buildSacMessage() {
    const text = getSacRawTextMessage();
    const formattedHtml = escapeHtml(text)
      .replace(/\n/g, "<br>")
      .replace(/\*([^*]+)\*/g, "<strong>$1</strong>");

    const type = val("sacMsgType");
    const isWhatsApp = type.startsWith("wa_");
    const bubbleBg = isWhatsApp ? "#d9fdd3" : "#ffffff";
    const bubbleBorder = isWhatsApp ? "none" : "1px solid #e0e0e0";
    const containerBg = isWhatsApp ? "#efeae2" : "#f3f2f1";
    const bubbleHeader = isWhatsApp 
      ? `<div style="font-size:12px; color:#128c7e; font-weight:bold; margin-bottom:4px; font-family:Arial,sans-serif;">WhatsApp</div>`
      : `<div style="font-size:12px; color:#6264a7; font-weight:bold; margin-bottom:4px; font-family:Arial,sans-serif;">Microsoft Teams</div>`;

    return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<style>
  body {
    margin: 0;
    padding: 20px;
    background-color: ${containerBg};
    font-family: Arial, Helvetica, sans-serif;
  }
  .bubble {
    max-width: 550px;
    margin: 20px auto;
    background: ${bubbleBg};
    border: ${bubbleBorder};
    padding: 14px 16px;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    font-size: 14.5px;
    line-height: 1.5;
    color: #333333;
    word-break: break-word;
  }
  .copy-notice {
    text-align: center;
    font-size: 12px;
    color: #666666;
    margin-top: 15px;
    font-style: italic;
    font-family: Arial, Helvetica, sans-serif;
  }
</style>
</head>
<body>
  <div class="bubble">
    ${bubbleHeader}
    <div>${formattedHtml}</div>
  </div>
  <div class="copy-notice">Al presionar "Copiar Mensaje" se copiará el texto plano con formato listo para pegar.</div>
</body>
</html>`;
  }

  function render() {
    const common = getCommonData();
    let html = "";
    if (activeTemplate === "welcome") {
      html = buildWelcomeEmail(common, getWelcomeData());
    } else if (activeTemplate === "post") {
      html = buildPostEmail(common, getPostData());
    } else if (activeTemplate === "sac") {
      html = buildSacMessage();
    }

    $("preview").srcdoc = html;
    return html;
  }

  function syncInductionFields() {
    const has = $("hasInduction") && $("hasInduction").checked;
    const indFields = $("inductionFields");
    if (indFields) {
      indFields.classList.toggle("hidden", !has);
    }
  }

  function syncMigracionFields() {
    const has = $("checkWorkMigracion") && $("checkWorkMigracion").checked;
    const migSub = $("divWorkMigracionSub");
    if (migSub) {
      migSub.classList.toggle("hidden", !has);
    }
  }

  function syncSacFields() {
    const type = val("sacMsgType");
    const divTeams = $("divSacTeamsFields");
    const divSaludo = $("divSacSaludoFields");
    const divDespedida = $("divSacDespedidaFields");

    if (divTeams) divTeams.classList.toggle("hidden", type !== "teams_sac");
    if (divSaludo) divSaludo.classList.toggle("hidden", type !== "wa_saludo");
    if (divDespedida) divDespedida.classList.toggle("hidden", type !== "wa_despedida");
  }

  function updateCapacitacionUI() {
    const container = $("capacitacionCheckboxes");
    if (!container) return;
    container.innerHTML = "";

    const activeTopic = val("postTopic");
    const items = TOPIC_MODULES[activeTopic] || [];

    items.forEach((item) => {
      const lbl = document.createElement("label");
      lbl.style = "display:flex; align-items:center; gap:8px; cursor:pointer; font-size:14px;";
      lbl.innerHTML = `
        <input type="checkbox" class="topic-module-cb" data-label="${item}" checked style="margin:0;">
        <span>${item}</span>
      `;
      lbl.querySelector("input").onchange = scheduleRender;
      container.appendChild(lbl);
    });

    updateDownloadBtnVisibility();
  }

  function updateDownloadBtnVisibility() {
    const btnDownload = $("btnDownloadGuide");
    if (!btnDownload) return;
    
    const activeTopic = val("postTopic");
    const isQBTopic = activeTopic === "Factun + QB";
    const isPostTab = activeTemplate === "post";
    
    btnDownload.classList.toggle("hidden", !(isPostTab && isQBTopic));
  }

  // --- COUNTRY SELECTION VIA FLAGS SWITCH ---
  function selectCountry(c) {
    const countryInput = $("country");
    if (countryInput) countryInput.value = c;

    const btnCR = $("btnCountryCR");
    const btnRD = $("btnCountryRD");

    if (btnCR) btnCR.classList.toggle("active", c === "CR");
    if (btnRD) btnRD.classList.toggle("active", c === "RD");

    applyCountryDefaults();
  }

  function applyCountryDefaults() {
    scheduleRender();
  }

  function setActiveTab(which) {
    activeTemplate = which;

    $("tabWelcome").classList.toggle("active", which === "welcome");
    $("tabPost").classList.toggle("active", which === "post");
    $("tabSac").classList.toggle("active", which === "sac");

    $("sectionWelcome").classList.toggle("hidden", which !== "welcome");
    $("sectionPost").classList.toggle("hidden", which !== "post");
    $("sectionSac").classList.toggle("hidden", which !== "sac");

    // Hide welcome fields when in Minuta (post) or Mensajes tab
    const welcomeCommon = $("welcomeCommonFields");
    if (welcomeCommon) {
      welcomeCommon.classList.toggle("hidden", which !== "welcome");
    }

    // Hide subject field group when in Mensajes tab
    const subjectGroup = $("divSubjectFieldGroup");
    if (subjectGroup) {
      subjectGroup.classList.toggle("hidden", which === "sac");
    }

    if (which === "post") {
      updateCapacitacionUI();
    }

    // Toggle copy button label and PDF export button
    const copyBtn = $("btnCopy");
    if (copyBtn) {
      copyBtn.textContent = which === "sac" ? "Copiar Mensaje" : "Copiar Correo";
    }
    const pdfBtn = $("btnPDF");
    if (pdfBtn) {
      pdfBtn.classList.toggle("hidden", which === "sac");
    }

    updateSubject();
    updateDownloadBtnVisibility();
    scheduleRender();
  }

  function initializeDates() {
    const today = new Date().toISOString().split("T")[0];
    const el = $("inductionDate");
    if (el && !el.value) {
      el.value = today;
    }
    const postDateEl = $("postDate");
    if (postDateEl && !postDateEl.value) {
      postDateEl.value = today;
    }
    const hourEl = $("inductionHour");
    if (hourEl && !hourEl.value) {
      hourEl.value = "09";
    }
    const minEl = $("inductionMin");
    if (minEl && !minEl.value) {
      minEl.value = "00";
    }
    const startTimeHourPost = $("startTimeHourPost");
    if (startTimeHourPost && !startTimeHourPost.value) {
      startTimeHourPost.value = "09";
    }
    const startTimeMinPost = $("startTimeMinPost");
    if (startTimeMinPost && !startTimeMinPost.value) {
      startTimeMinPost.value = "00";
    }
    const endTimeHourPost = $("endTimeHourPost");
    if (endTimeHourPost && !endTimeHourPost.value) {
      endTimeHourPost.value = "11";
    }
    const endTimeMinPost = $("endTimeMinPost");
    if (endTimeMinPost && !endTimeMinPost.value) {
      endTimeMinPost.value = "00";
    }
  }

  // --- COPY LOGIC ---
  function showCopySuccess(btn) {
    const isIconBtn = btn.classList.contains("icon-btn");
    const originalContent = btn.innerHTML;

    if (isIconBtn) {
      btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#00a8ff" stroke-width="3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      `;
      btn.style.color = "#00a8ff";
      setTimeout(() => {
        btn.innerHTML = originalContent;
        btn.style.color = "";
      }, 2000);
    } else {
      const originalText = btn.textContent;
      btn.textContent = "¡Copiado! 📋";
      const origBg = btn.style.backgroundColor;
      btn.style.backgroundColor = "#00a8ff";
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.backgroundColor = origBg;
      }, 2000);
    }
  }

  // --- LISTENERS ---
  $("tabWelcome").addEventListener("click", () => setActiveTab("welcome"));
  $("tabPost").addEventListener("click", () => setActiveTab("post"));
  $("tabSac").addEventListener("click", () => setActiveTab("sac"));

  $("btnCountryCR").addEventListener("click", () => selectCountry("CR"));
  $("btnCountryRD").addEventListener("click", () => selectCountry("RD"));

  $("hasInduction").addEventListener("change", () => { syncInductionFields(); scheduleRender(); });
  $("checkWorkMigracion").addEventListener("change", () => { syncMigracionFields(); scheduleRender(); });
  $("postTopic").addEventListener("change", () => { updateCapacitacionUI(); scheduleRender(); });
  $("sacMsgType").addEventListener("change", () => { syncSacFields(); scheduleRender(); });

  // Copy Subject action
  const copySubjectBtn = $("btnCopySubject");
  if (copySubjectBtn) {
    copySubjectBtn.onclick = async () => {
      const subjectText = $("subject").value;
      try {
        await navigator.clipboard.writeText(subjectText);
        showCopySuccess(copySubjectBtn);
      } catch (err) {
        console.error("Failed to copy subject", err);
      }
    };
  }

  // Copy Email Body / Message action
  const copyBtn = $("btnCopy");
  if (copyBtn) {
    copyBtn.onclick = async () => {
      if (activeTemplate === "sac") {
        const rawText = getSacRawTextMessage();
        try {
          await navigator.clipboard.writeText(rawText);
          showCopySuccess(copyBtn);
        } catch (err) {
          console.error("Failed to copy plain text:", err);
          // Fallback
          const el = document.createElement("textarea");
          el.value = rawText;
          document.body.appendChild(el);
          el.select();
          document.execCommand("copy");
          document.body.removeChild(el);
          showCopySuccess(copyBtn);
        }
      } else {
        const html = render();
        const text = $("preview").contentWindow.document.body.innerText;
        try {
          const clipboardItem = new ClipboardItem({
            "text/html": new Blob([html], { type: "text/html" }),
            "text/plain": new Blob([text], { type: "text/plain" })
          });
          await navigator.clipboard.write([clipboardItem]);
          showCopySuccess(copyBtn);
        } catch (err) {
          console.error("Failed to copy content:", err);
        }
      }
    };
  }

  // Export as PDF
  const pdfBtn = $("btnPDF");
  if (pdfBtn) {
    pdfBtn.onclick = () => {
      const iframe = $("preview");
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      }
    };
  }

  // Download Guide
  const downloadBtn = $("btnDownloadGuide");
  if (downloadBtn) {
    downloadBtn.onclick = () => {
      const link = document.createElement("a");
      link.href = "assets/Guia_Induccion_Factun_Quickbooks_CR.pdf";
      link.download = "Guia_Induccion_Factun_Quickbooks_CR.pdf";
      link.click();
    };
  }

  // Debounce
  let renderTimer = null;
  function scheduleRender() {
    clearTimeout(renderTimer);
    renderTimer = setTimeout(render, 200);
  }

  // Watch inputs
  const inputsToWatch = [
    "clientName", "clientContact", "userEmail",
    "hasInduction", "inductionDate", "inductionHour", "inductionMin", "teamsUrl",
    "postTopic", "postDate", "startTimeHourPost", "startTimeMinPost",
    "endTimeHourPost", "endTimeMinPost", "postAssistants", "clientPendingsPost",
    "ncqPendingsPost", "videoUrl",
    "checkWorkRecepcion", "checkWorkQuickBooks", "checkWorkImpresora",
    "checkWorkMigracion", "checkWorkMigracionClientes", "checkWorkMigracionProductos", "checkWorkRutas",
    "sacMsgType", "sacClientName", "sacSwitchInduccion", "sacSwitchGrabacion", "sacSwitchRecepcion", "sacSwitchMigracion", "sacSwitchQuickbooks", "sacSwitchImpresora", "sacSwitchAppFactun",
    "sacClientContact", "sacClientCompany", "sacHasInduction", "sacClientContactDespedida"
  ];

  inputsToWatch.forEach(id => {
    const el = $(id);
    if (!el) return;
    el.addEventListener("input", () => {
      if (id === "clientName") {
        updateSubject();
      }
      scheduleRender();
    });
    el.addEventListener("change", () => {
      if (id === "clientName") {
        updateSubject();
      }
      scheduleRender();
    });
  });

  // Init
  syncInductionFields();
  syncMigracionFields();
  syncSacFields();
  updateCapacitacionUI();
  selectCountry("CR"); // Force CR as default and load defaults
  initializeDates();
  updateSubject();
  render();

})();
