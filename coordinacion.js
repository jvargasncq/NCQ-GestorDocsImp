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

  const ONBOARDING_TEMPLATES = {
    v1: {
      label: "Versión 1 — Plan de Trabajo Estándar",
      subject: "Plan de Trabajo / Razón Comercial",
      content: `Buenos días [Nombre],
<br><br>
Es un gusto iniciar este proceso de implementación con ustedes. Conforme a lo conversado, adjuntamos el plan de trabajo en formato PDF, el cual detalla las sesiones, fechas y tiempos estimados para el desarrollo de la implementación del sistema Qupos.
<br><br>
<strong>(ADJUNTAR PLAN DE TRABAJO – PDF)</strong>
<br><br>
<strong>Para iniciar con la instalación:</strong>
<ul>
  <li>Se requiere acceso remoto por medio de AnyDesk. Si no lo tienen instalado, pueden descargarlo aquí: <a href="https://anydesk.com/es" target="_blank">https://anydesk.com/es</a></li>
</ul>
<strong>Sobre el desarrollo de las sesiones:</strong>
<ul>
  <li>Todas las capacitaciones serán remotas, vía Teams, y quedarán grabadas para consulta posterior de su equipo.</li>
  <li>Compartiremos el documento de canales de comunicación y la boleta correspondiente a cada sesión. Es fundamental contar con su colaboración para la firma oportuna de estos documentos, ya que constituyen el respaldo formal del avance del proceso.</li>
</ul>
<strong>Uso de los espacios agendados:</strong>
<ul>
  <li>Cada espacio se agenda de forma exclusiva para su equipo; les solicitamos amablemente conectarse a tiempo.</li>
  <li>Ante una demora superior a 20 minutos, será necesario reprogramar según disponibilidad de agenda, lo cual podría afectar las fechas previstas en el plan inicial.</li>
</ul>
<strong>Sobre los tiempos y siguientes etapas:</strong>
<ul>
  <li>Las horas del plan son un estimado inicial; si se requiere tiempo adicional conforme avancen las capacitaciones, lo revisaremos en conjunto.</li>
  <li>El acompañamiento en el uso oficial del sistema y la configuración de facturación electrónica requieren coordinación previa con el implantador asignado. Esta fecha se confirmará según el avance del proceso, por lo que el cumplimiento de las sesiones programadas es clave para no afectar esta etapa.</li>
</ul>
Quedamos atentos a cualquier consulta y con el compromiso de acompañarlos en cada etapa de esta implementación.
<br><br>
Saludos cordiales,`
    },
    v2: {
      label: "Versión 2 — Con pendiente de base de datos (Facturación e Inventarios)",
      subject: "Plan de Trabajo / Razón Comercial",
      content: `Buenos días [Nombre],
<br><br>
Es un gusto iniciar este proceso de implementación con ustedes. Conforme a lo conversado, adjuntamos el plan de trabajo en formato PDF, el cual detalla las sesiones, fechas y tiempos estimados para el desarrollo de la implementación del sistema Qupos.
<br><br>
<strong>(ADJUNTAR PLAN DE TRABAJO – PDF)</strong>
<br><br>
<strong>Para iniciar con la instalación:</strong>
<ul>
  <li>Se requiere acceso remoto por medio de AnyDesk. Si no lo tienen instalado, pueden descargarlo aquí: <a href="https://anydesk.com/es" target="_blank">https://anydesk.com/es</a></li>
</ul>
<strong>Sobre el desarrollo de las sesiones:</strong>
<ul>
  <li>Todas las capacitaciones serán remotas, vía Teams, y quedarán grabadas para consulta posterior de su equipo.</li>
  <li>Compartiremos el documento de canales de comunicación y la boleta correspondiente a cada sesión. Es fundamental contar con su colaboración para la firma oportuna de estos documentos, ya que constituyen el respaldo formal del avance del proceso.</li>
  <li>Queda pendiente los demás temas de capacitación (Facturación e Inventarios), lo cual con mucho gusto será coordinado una vez hayan alimentado la base de datos con todos los artículos y precios. Les solicitamos avisarnos al menos cuando tengan un 80% de avance en este proceso.</li>
</ul>
<strong>Uso de los espacios agendados:</strong>
<ul>
  <li>Cada espacio se agenda de forma exclusiva para su equipo; les solicitamos amablemente conectarse a tiempo.</li>
  <li>Ante una demora superior a 20 minutos, será necesario reprogramar según disponibilidad de agenda, lo cual podría afectar las fechas previstas en el plan inicial.</li>
</ul>
<strong>Sobre los tiempos y siguientes etapas:</strong>
<ul>
  <li>Las horas del plan son un estimado inicial; si se requiere tiempo adicional conforme avancen las capacitaciones, lo revisaremos en conjunto.</li>
  <li>El acompañamiento en el uso oficial del sistema y la configuración de facturación electrónica requieren coordinación previa con el implantador asignado. Esta fecha se confirmará según el avance del proceso, por lo que el cumplimiento de las sesiones programadas es clave para no afectar esta etapa.</li>
</ul>
Quedamos atentos a cualquier consulta y con el compromiso de acompañarlos en cada etapa de esta implementación.
<br><br>
Saludos cordiales,`
    },
    v3: {
      label: "Versión 3 — Solicitar Datos de Facturación Electrónica (Conservando consecutivos)",
      subject: "Datos de Facturación Electrónica / Razón Comercial",
      content: `Buenas tardes [Nombre],
<br><br>
Con el fin de continuar con la configuración de Facturación Electrónica en Qupos, les solicitamos amablemente hacernos llegar la siguiente información:
<br><br>
<strong>Datos de configuración:</strong>
<ul>
  <li>Llave criptográfica</li>
  <li>Pin</li>
  <li>Usuario y contraseña de producción</li>
</ul>
<strong>Sobre los consecutivos:</strong>
<br>
Adicionalmente, es necesario que nos confirmen si desean conservar sus consecutivos actuales o iniciar desde 0 en Qupos, ya que esto define cómo se configura el sistema antes de su puesta en marcha.
<br><br>
Si desean conservar los consecutivos, les solicitamos enviarnos el último consecutivo utilizado, un día antes del arranque oficial con Qupos, de los siguientes documentos:
<ul>
  <li>Factura Electrónica</li>
  <li>Tiquete Electrónico</li>
  <li>Nota de Crédito</li>
  <li>Nota de Débito</li>
  <li>Recepción de Documentos Electrónicos</li>
  <li>Compra Electrónica</li>
</ul>
Si desean iniciar desde 0, únicamente necesitamos que nos indiquen la sucursal y/o terminal que debe configurarse en el consecutivo de factura electrónica en Qupos.
<br><br>
Esta información puede ser consultada y validada con su contador, en caso de ser necesario.
<br><br>
Quedamos atentos a esta información para continuar con esta etapa de la implementación. Cualquier consulta, con gusto la resolvemos.
<br><br>
Saludos cordiales,`
    },
    v4: {
      label: "Versión 4 — Solicitar Datos de Facturación Electrónica (Sin conservar consecutivos)",
      subject: "Datos de Facturación Electrónica / Razón Comercial",
      content: `Buenas tardes [Nombre],
<br><br>
Con el fin de continuar con la configuración de Facturación Electrónica en Qupos, les solicitamos amablemente hacernos llegar la siguiente información:
<br><br>
<strong>Datos de configuración:</strong>
<ul>
  <li>Llave criptográfica</li>
  <li>Pin</li>
  <li>Usuario y contraseña de producción</li>
</ul>
<strong>Sobre sucursal y/o terminal:</strong>
<br>
Adicionalmente, es necesario que nos indiquen qué sucursal y/o terminal debe configurarse en el consecutivo de factura electrónica en Qupos. Este dato es especialmente importante si anteriormente han generado factura electrónica con otro sistema, o si actualmente facturan bajo otra actividad económica con la Razón Social <strong>[Razón Comercial del Cliente]</strong>, ya que esto puede afectar la numeración correcta del consecutivo.
<br><br>
Les solicitamos confirmarnos este dato con antelación al arranque oficial con Qupos, para asegurar que la configuración quede lista sin contratiempos.
<br><br>
Esta información puede ser consultada y validada con su contador, en caso de ser necesario.
<br><br>
Quedamos atentos a esta información para continuar con esta etapa de la implementación. Cualquier consulta, con gusto la resolvemos.
<br><br>
Saludos cordiales,`
    },
    v5: {
      label: "Versión 5 — Solicitar Archivos para Migración de Datos",
      subject: "Archivos para Migración / Razón Comercial",
      content: `Buenas tardes [Nombre],
<br><br>
Es un gusto saludarles. Conforme a lo conversado vía telefónica, adjuntamos los archivos necesarios para realizar la migración de sus datos al sistema Qupos:
<br><br>
<strong>(ADJUNTAR ARCHIVOS DE MIGRACIÓN)</strong>
<br><br>
<strong>Archivos incluidos:</strong>
<ul>
  <li>Artículos (incluye el campo para agregar los códigos CABYS)</li>
  <li>Clientes</li>
  <li>Proveedores</li>
  <li>Cuentas por Pagar (pago de facturas a proveedores)</li>
  <li>Cuentas por Cobrar (abonos y cancelación de cuentas de clientes a crédito)</li>
</ul>
<strong>Cómo completar los archivos:</strong>
<ul>
  <li>Cada archivo incluye ejemplos de referencia, los cuales pueden eliminar una vez que cuenten con la información completa.</li>
  <li>Únicamente es necesario completar los campos señalados en color amarillo, ya que son los datos que requerimos para la carga inicial al sistema.</li>
  <li>Si en este momento no cuentan con toda la información, no hay ningún inconveniente. Los datos faltantes se podrán agregar una vez instalado el sistema, y con gusto les explicaremos ese proceso en su momento.</li>
</ul>
<strong>Punto importante — formato del archivo:</strong>
<br>
Les solicitamos amablemente no agregar ni eliminar columnas o filas, y conservar el archivo en su formato original. Esto es indispensable para que la información pueda cargarse correctamente al sistema; cualquier modificación en la estructura puede generar errores durante la migración.
<br><br>
Favor devolvernos los archivos completados 2 a 3 días hábiles antes del proceso de migración e instalación, para poder revisarlos con tiempo y continuar dentro de los tiempos previstos en el plan de trabajo.
<br><br>
Quedamos atentos a la entrega de estos archivos y con el compromiso de acompañarlos en cada paso de este proceso.
<br><br>
Saludos cordiales,`
    },
    v6: {
      label: "Versión 6 — Finalizar Proceso de Implementación",
      subject: "Implementación Finalizada / Razón Comercial",
      content: `Buenas tardes [Nombre],
<br><br>
Conforme a lo conversado vía telefónica, y dado que su equipo se encuentra trabajando adecuadamente con el sistema y sin consultas pendientes por el momento, damos por finalizado el proceso de implementación el día de hoy.
<br><br>
Ha sido un gusto acompañarlos durante esta etapa, y quedamos con la confianza de que su equipo cuenta con las herramientas necesarias para el día a día de su operación con Qupos.
<br><br>
<strong>Canales de soporte disponibles:</strong>
<br>
A partir de este momento, cualquier consulta técnica puede ser atendida directamente por nuestro equipo de soporte, a través de los siguientes canales:
<ul>
  <li><strong>Call Center:</strong> teléfono 2460-3851 y Chat en el sitio (<a href="https://www.qupos.com" target="_blank">www.qupos.com</a>)</li>
  <li>Lunes a viernes: 8:00 a.m. a 5:00 p.m.</li>
  <li>Sábados: 8:00 a.m. a 2:00 p.m.</li>
  <li><strong>Teléfono de emergencias (fuera de horario de oficina):</strong> 8719-6003</li>
  <li>Lunes a viernes: 6:00 a.m. a 8:00 a.m. y 5:00 p.m. a 10:00 p.m.</li>
  <li>Sábados: 6:00 a.m. a 8:00 a.m. y 2:00 p.m. a 10:00 p.m.</li>
  <li>Domingos: 6:00 a.m. a 10:00 p.m.</li>
</ul>
<strong>Recursos adicionales:</strong>
<ul>
  <li><strong>Base de Conocimientos:</strong> <a href="https://ayuda.qupos.com" target="_blank">ayuda.qupos.com</a></li>
  <li><strong>Canal de YouTube:</strong> <a href="https://youtube.com/@qupos_cr" target="_blank">youtube.com/@qupos_cr</a></li>
</ul>
<strong>Encuesta de satisfacción:</strong>
<br>
Como parte del cierre de este proceso, les solicitamos amablemente su colaboración completando la siguiente encuesta de satisfacción. Su opinión es muy valiosa para nosotros, ya que nos permite conocer su experiencia durante la implementación y seguir mejorando nuestro servicio.
<br><br>
<a href="https://encuesta.qupos.com" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #f27221; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold;">Completar Encuesta de Satisfacción</a>
<br><br>
Agradecemos su confianza durante todo este proceso. Cualquier consulta, con mucho gusto.
<br><br>
Saludos cordiales,`
    },
    v7: {
      label: "Versión 7 — Plan de Capacitaciones Finalizado",
      subject: "Capacitaciones Finalizadas / Razón Comercial",
      content: `Buenas tardes [Nombre],
<br><br>
Conforme a lo conversado vía telefónica, y dado que no quedan temas pendientes ni dudas por el momento, damos por finalizado el plan de capacitaciones acordado el día de hoy.
<br><br>
Ha sido un gusto acompañarlos durante esta etapa de aprendizaje del sistema.
<br><br>
<strong>Canales de soporte disponibles:</strong>
<br>
Les recordamos que cuentan con los siguientes canales para cualquier consulta técnica o funcional:
<ul>
  <li><strong>Call Center:</strong> teléfono 2460-3851 y Chat en el sitio (<a href="https://www.qupos.com" target="_blank">www.qupos.com</a>)</li>
  <li>Lunes a viernes: 8:00 a.m. a 5:00 p.m.</li>
  <li>Sábados: 8:00 a.m. a 2:00 p.m.</li>
  <li><strong>Teléfono de emergencias (fuera de horario de oficina):</strong> 8719-6003</li>
  <li>Lunes a viernes: 6:00 a.m. a 8:00 a.m. y 5:00 p.m. a 10:00 p.m.</li>
  <li>Sábados: 6:00 a.m. a 8:00 a.m. y 2:00 p.m. a 10:00 p.m.</li>
  <li>Domingos: 6:00 a.m. a 10:00 p.m.</li>
</ul>
<strong>Recursos adicionales:</strong>
<ul>
  <li><strong>Base de Conocimientos:</strong> <a href="https://ayuda.qupos.com" target="_blank">ayuda.qupos.com</a></li>
  <li><strong>Canal de YouTube:</strong> <a href="https://youtube.com/@qupos_cr" target="_blank">youtube.com/@qupos_cr</a></li>
</ul>
<strong>Encuesta de satisfacción:</strong>
<br>
Como parte del cierre de esta etapa, les solicitamos amablemente su colaboración completando la siguiente encuesta de satisfacción. Su opinión es muy valiosa para nosotros, ya que nos permite conocer su experiencia durante las capacitaciones y seguir mejorando nuestro servicio.
<br><br>
<a href="https://encuesta.qupos.com" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #f27221; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold;">Completar Encuesta de Satisfacción</a>
<br><br>
Agradecemos su confianza durante este proceso de capacitación. Cualquier consulta, con mucho gusto.
<br><br>
Saludos cordiales,`
    }
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
        <div align="center" style="text-align:center; width:100%; margin:0 auto;">
          <!--[if (gte mso 9)|(IE)]>
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="660">
          <tr>
          <td align="center" valign="top" width="660">
          <![endif]-->
          <table role="presentation" width="660" align="center" cellpadding="0" cellspacing="0" border="0" style="width:660px; max-width:660px; min-width:660px; margin:0 auto; display:inline-table; background-color:#ffffff; border-radius:10px; overflow:hidden; border-collapse:collapse; border-spacing:0; text-align:left;">
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
        </div>
      </td>
    </tr>
  </table>
  </center>
</body></html>`;
  }

  const renderers = {
    onboarding: () => {
      const templateKey = val("onboardingTemplate") || "v1";
      const tpl = ONBOARDING_TEMPLATES[templateKey] || ONBOARDING_TEMPLATES.v1;
      
      const clientName = val("clientName").trim() || "Cliente";
      const clientContact = val("clientContact").trim() || "Cliente";
      
      let emailContent = tpl.content;
      emailContent = emailContent.replaceAll("[Nombre]", escapeHtml(clientContact));
      emailContent = emailContent.replaceAll("[Razón Comercial del Cliente]", escapeHtml(clientName));
      emailContent = emailContent.replaceAll("[Razón Social del cliente]", escapeHtml(clientName));
      
      return buildEmailShell(CONFIG, emailContent);
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
      const templateKey = val("onboardingTemplate") || "v1";
      const tpl = ONBOARDING_TEMPLATES[templateKey] || ONBOARDING_TEMPLATES.v1;
      baseSubject = tpl.subject;
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

  // Populate Onboarding Templates dropdown list dynamically
  function populateOnboardingTemplates() {
    const select = $("onboardingTemplate");
    if (select) {
      select.innerHTML = Object.keys(ONBOARDING_TEMPLATES)
        .map(key => `<option value="${key}">${ONBOARDING_TEMPLATES[key].label}</option>`)
        .join("");
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
  populateOnboardingTemplates();
  initializeDates();
  loadState();
  switchTab(activeTab);
});
