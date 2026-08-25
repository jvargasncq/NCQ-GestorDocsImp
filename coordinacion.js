document.addEventListener("DOMContentLoaded", () => {
  const CONFIG = {
    helpUrl: "https://soporte.qupos.com",
    supportChat: "https://soporte.qupos.com/chat",
    countries: {
      CR: { label: "Costa Rica", facebook: "https://facebook.com/quposcr", instagram: "https://instagram.com/quposcr", youtube: "https://youtube.com/quposcr" }
    }
  };

  const IMPLANTERS = [
    { value: "", label: "Seleccione un coordinador" },
    { value: "Yeimy Gamboa", label: "Yeimy" },
    { value: "Marielena Alvarez", label: "Marielena" },
    { value: "Adriana Picado", label: "Adriana" }
  ];

  const BRAND_THEMES = {
    lite: {
      logo: "https://nlxfcqyqzaigdohkvpmf.supabase.co/storage/v1/object/public/avatars/Logos%20adicionales/lite.png",
      darkColor: "#008800",
      primaryColor: "#00AA00",
      lightColor: "#4CAF50",
      bgHighlight: "#f6fff5"
    },
    estandar: {
      logo: "https://www.qupos.com/assets/qupos-logo-O7Yzz17d.png",
      darkColor: "#F25D21",
      primaryColor: "#F27221",
      lightColor: "#F8A227",
      bgHighlight: "#fff8f1"
    },
    erp: {
      logo: "https://nlxfcqyqzaigdohkvpmf.supabase.co/storage/v1/object/public/avatars/Logos%20adicionales/erp.png",
      darkColor: "#005ec4",
      primaryColor: "#0081FC",
      lightColor: "#5cb8ff",
      bgHighlight: "#f2f8ff"
    }
  };

  const ONBOARDING_TEMPLATES = {
    v1: {
      label: "Versión 1 — Plan de Trabajo Estándar",
      subject: "Plan de Trabajo / Razón Comercial",
      content: `Buenos días [Nombre],
<br><br>
Es un gusto iniciar este proceso de implementación con ustedes. Conforme a lo conversado, adjuntamos el plan de trabajo en formato PDF, el cual detalla las sesiones, fechas y tiempos estimados para el desarrollo de la implementación del sistema Qupos.
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
  <li>El acompañamiento en el uso oficial del sistema y la configuración de facturación electrónica requieren coordinación previa con el coordinador asignado. Esta fecha se confirmará según el avance del proceso, por lo que el cumplimiento de las sesiones programadas es clave para no afectar esta etapa.</li>
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
  <li>El acompañamiento en el uso oficial del sistema y la configuración de facturación electrónica requieren coordinación previa con el coordinador asignado. Esta fecha se confirmará según el avance del proceso, por lo que el cumplimiento de las sesiones programadas es clave para no afectar esta etapa.</li>
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
    return BRAND_THEMES.estandar;
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
          <table role="presentation" width="660" align="center" cellpadding="0" cellspacing="0" border="0" style="width:660px; max-width:660px; min-width:660px; margin:0 auto; display:table; background-color:#ffffff; border-radius:10px; overflow:hidden; border-collapse:collapse; border-spacing:0; text-align:left;">
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
      
      if (templateKey === "v6" || templateKey === "v7") {
        const surveyLink = val("surveyLink").trim() || "https://encuesta.qupos.com";
        emailContent = emailContent.replaceAll("https://encuesta.qupos.com", escapeHtml(resolveUrl(surveyLink)));
      }
      
      return buildEmailShell(CONFIG, emailContent);
    },
    planDeTrabajo: () => {
      const theme = getBrandTheme();
      const clientName = val("clientName").trim() || "Cliente";
      const clientContact = val("clientContact").trim() || "Contacto";
      const installDate = formatDate(val("installDate"));
      const implanter = val("implanterNCQ") || "Por definir";
      const version = val("quposVersion") || "Estandar";

      const sessionCards = document.querySelectorAll(".session-row-card");
      const sessions = Array.from(sessionCards).map(card => {
        const dateVal = card.querySelector(".session-date").value;
        const timeVal = card.querySelector(".session-time").value;
        return {
          date: (dateVal && dateVal !== "Por definir") ? formatDate(dateVal) : "Por definir",
          time: timeVal || "Por definir",
          duration: card.querySelector(".session-duration").value,
          modality: card.querySelector(".session-modality").value,
          module: card.querySelector(".session-module").value,
          topic: card.querySelector(".session-topic").value
        };
      });

      return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Plan de Trabajo</title>
  <style>
    body {
      margin: 0;
      padding: 24px;
      font-family: Arial, sans-serif;
      color: #333333;
      background-color: #ffffff;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .header-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    .header-title {
      font-size: 24px;
      font-weight: bold;
      color: ${theme.primaryColor};
    }
    .header-doc {
      font-size: 16px;
      font-weight: bold;
      color: #666666;
      text-align: right;
    }
    .line-separator {
      height: 3px;
      background-color: ${theme.primaryColor};
      margin: 8px 0 20px 0;
    }
    .info-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
      font-size: 14px;
      line-height: 1.6;
    }
    .info-table td {
      padding: 4px 0;
      vertical-align: top;
    }
    .content-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
      line-height: 1.5;
      text-align: left;
    }
    .content-table th {
      background-color: ${theme.primaryColor};
      color: #ffffff;
      font-weight: bold;
      padding: 10px 8px;
      border: 1px solid ${theme.primaryColor};
    }
    .content-table td {
      padding: 10px 8px;
      border: 1px solid #dddddd;
      vertical-align: top;
    }
    .row-even {
      background-color: #ffffff;
    }
    .row-odd {
      background-color: #f9f9f9;
    }
    .footer-note {
      margin-top: 30px;
      font-size: 12px;
      line-height: 1.6;
      color: #777777;
      text-align: center;
      font-style: italic;
    }
    @media print {
      body {
        padding: 0;
      }
      .no-print {
        display: none !important;
      }
    }
  </style>
</head>
<body>
  <table class="header-table">
    <tr>
      <td class="header-title">NCQ Technologies</td>
      <td class="header-doc">PROPUESTA PLAN DE TRABAJO</td>
    </tr>
  </table>
  <div class="line-separator"></div>
  
  <table class="info-table">
    <tr>
      <td width="55%"><strong>Razón Comercial:</strong> ${escapeHtml(clientName)}</td>
      <td width="45%"><strong>Fecha de emisión:</strong> ${installDate || "Por definir"}</td>
    </tr>
    <tr>
      <td><strong>Licencia Qupos:</strong> ${escapeHtml(version)}</td>
      <td><strong>Coordinador NCQ:</strong> ${escapeHtml(implanter)}</td>
    </tr>
  </table>

  <table class="content-table">
    <thead>
      <tr>
        <th width="12%">Fecha</th>
        <th width="18%">Hora</th>
        <th width="15%">Módulo</th>
        <th width="35%">Tema de Capacitación</th>
        <th width="10%">Duración</th>
        <th width="10%">Modalidad</th>
      </tr>
    </thead>
    <tbody>
      ${sessions.length === 0 ? `
        <tr>
          <td colspan="6" style="text-align:center; padding: 20px; color:#999999;">No hay sesiones agregadas al plan de trabajo. Haga clic en "Cargar Plantilla" o "+ Agregar Fila" en el panel izquierdo.</td>
        </tr>
      ` : sessions.map((s, idx) => `
        <tr class="${idx % 2 === 0 ? 'row-even' : 'row-odd'}">
          <td>${escapeHtml(s.date)}</td>
          <td>${escapeHtml(s.time)}</td>
          <td><strong>${escapeHtml(s.module)}</strong></td>
          <td style="white-space: pre-line;">${escapeHtml(s.topic)}</td>
          <td style="text-align:center;">${escapeHtml(s.duration)}</td>
          <td style="text-align:center;">${escapeHtml(s.modality)}</td>
        </tr>
      `).join("")}
    </tbody>
  </table>
  
  <p class="footer-note">
    * Este plan de trabajo constituye una propuesta inicial de agenda. Las fechas y horas de las sesiones quedan sujetas a confirmación previa con el cliente.
  </p>
</body>
</html>`;
    }
  };

  function updateSubject() {
    const clientNameText = val("clientName").trim() || "Razón Comercial";
    const clientSocialText = val("clientSocialName").trim() || clientNameText;
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
    
    const replacementText = activeTab === "onboarding" ? clientSocialText : clientNameText;
    const finalSubject = baseSubject.replace("Razón Comercial", replacementText);
    const subjectEl = $("subject");
    if (subjectEl) {
      subjectEl.textContent = finalSubject;
    }
    return finalSubject;
  }

  function render() {
    updateSubject();

    const isOnboarding = activeTab === "onboarding";
    
    // Toggle global inputs visibility based on active tab
    const rowDateImplanter = $("rowDateImplanter");
    if (rowDateImplanter) {
      rowDateImplanter.classList.toggle("hidden", isOnboarding);
    }

    const divName = $("divClientName");
    if (divName) {
      divName.classList.toggle("hidden", isOnboarding);
    }
    const divSocialName = $("divClientSocialName");
    if (divSocialName) {
      divSocialName.classList.toggle("hidden", !isOnboarding);
    }
    const divContact = $("divClientContact");
    if (divContact) {
      divContact.classList.toggle("hidden", !isOnboarding);
    }

    // Toggle onboarding template alerts
    const alertBox = $("onboardingAlert");
    if (alertBox) {
      if (isOnboarding) {
        const templateKey = val("onboardingTemplate") || "v1";
        if (templateKey === "v1" || templateKey === "v2") {
          alertBox.textContent = "⚠️ Recordatorio: Debe adjuntar el Plan de Trabajo en formato PDF antes de enviar el correo.";
          alertBox.classList.remove("hidden");
        } else if (templateKey === "v5") {
          alertBox.textContent = "⚠️ Recordatorio: Debe adjuntar los Archivos de Migración antes de enviar el correo.";
          alertBox.classList.remove("hidden");
        } else {
          alertBox.classList.add("hidden");
        }
      } else {
        alertBox.classList.add("hidden");
      }
    }

    // Toggle onboarding template survey link field
    const divSurveyLink = $("divSurveyLink");
    if (divSurveyLink) {
      if (isOnboarding) {
        const templateKey = val("onboardingTemplate") || "v1";
        const isSurveyTemplate = templateKey === "v6" || templateKey === "v7";
        divSurveyLink.classList.toggle("hidden", !isSurveyTemplate);
      } else {
        divSurveyLink.classList.add("hidden");
      }
    }

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
    
    const copyBtn = $("btnCopy");
    if (copyBtn) {
      copyBtn.textContent = tabId === "planDeTrabajo" ? "Copiar Tabla" : "Copiar Correo";
    }
    
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

  function getDefaultSessions(version) {
    const isLite = version === "Lite";
    const sessions = [
      {
        date: "Por definir",
        time: "Por definir",
        module: "Instalación",
        topic: "Instalación del sistema en Servidor y terminales.\nConfiguraciones generales (impresoras, datos de compañía, cajones de dinero, lectores, etc.).\nCarga inicial de catálogos y migración de base de datos.",
        duration: "3 horas",
        modality: "Virtual"
      },
      {
        date: "Por definir",
        time: "Por definir",
        module: "Generalidades",
        topic: "Introducción al sistema, explicación de la interfaz.\nCreación de usuarios, grupos de permisos y cajeros.",
        duration: "2 horas",
        modality: "Virtual"
      },
      {
        date: "Por definir",
        time: "Por definir",
        module: "Compras",
        topic: "Creación de Proveedores.\nRegistro de Compras manual y por medio de XML (Factura Electrónica).",
        duration: "2 horas",
        modality: "Virtual"
      },
      {
        date: "Por definir",
        time: "Por definir",
        module: "Inventarios",
        topic: isLite 
          ? "Creación de Artículos, Familias y Marcas.\nMovimientos de Inventario (Entradas y Salidas).\nToma física de mercadería y control de existencias."
          : "Creación de Artículos, Familias y Marcas.\nMovimientos de Inventario (Entradas y Salidas).\nToma física de mercadería.\nMovimientos de Cuentas por Pagar (CxP) y Trámites de pago.",
        duration: "3 horas",
        modality: "Virtual"
      },
      {
        date: "Por definir",
        time: "Por definir",
        module: "Facturación",
        topic: "Apertura de caja.\nProceso de facturación (Preventas, Proformas y Factura Directa).\nDevoluciones y Notas de Crédito.\nControl de cajas, retiros de dinero y cierres de caja.",
        duration: "3 horas",
        modality: "Virtual"
      }
    ];

    if (!isLite) {
      sessions.push({
        date: "Por definir",
        time: "Por definir",
        module: "Cuentas por Cobrar",
        topic: "Creación de Clientes y políticas de crédito.\nFacturación a crédito, cobros de recibos, abonos y cancelaciones.",
        duration: "2 horas",
        modality: "Virtual"
      });
    }

    sessions.push({
      date: "Por definir",
      time: "Por definir",
      module: "Acompañamiento",
      topic: "Acompañamiento en sitio/remoto para el uso oficial del sistema en el arranque de la operación.",
      duration: "3 horas",
      modality: "Virtual"
    });

    sessions.push({
      date: "Por definir",
      time: "Por definir",
      module: "Reportería",
      topic: "Revisión de reportes de ventas, compras, inventario, movimientos de caja e informe D-104.",
      duration: "1 hora",
      modality: "Virtual"
    });

    return sessions;
  }

  const getTopicSummary = (topic) => {
    let t = (topic || "").trim() || "Sin tema";
    t = t.split("\n")[0];
    if (t.length > 50) {
      t = t.substring(0, 47) + "...";
    }
    return t;
  };

  const parseToInputDate = (dateStr) => {
    if (!dateStr || dateStr === "Por definir") return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
      const [day, month, year] = dateStr.split("/");
      return `${year}-${month}-${day}`;
    }
    return "";
  };

  const parseToInputTime = (timeStr) => {
    if (!timeStr || timeStr === "Por definir") return "";
    if (/^\d{2}:\d{2}$/.test(timeStr)) return timeStr;
    return "";
  };

  const getFormattedDateText = (dateStr) => {
    if (!dateStr || dateStr === "Por definir") return "Por definir";
    if (dateStr.includes("-")) return formatDate(dateStr);
    return dateStr;
  };

  function addSessionRow(s = {}, startExpanded = false) {
    const container = $("sessionRowsContainer");
    if (!container) return;

    const row = document.createElement("div");
    row.className = "session-row-card" + (startExpanded ? "" : " collapsed");
    row.style.cssText = "background: rgba(255,255,255,0.45); border: 1px solid rgba(0,0,0,0.08); border-radius: 12px; padding: 12px; margin-bottom: 12px; position: relative; transition: all 0.2s ease;";

    const displayStyle = startExpanded ? "block" : "none";
    const rotateStyle = startExpanded ? "rotate(0deg)" : "rotate(-90deg)";

    row.innerHTML = `
      <div class="session-card-header" style="display: flex; align-items: center; justify-content: space-between; cursor: pointer; user-select: none;">
        <div style="display: flex; align-items: center; gap: 8px; min-width: 0; flex: 1;">
          <span class="chevron-icon" style="font-size: 10px; transition: transform 0.2s ease; color: var(--muted); transform: ${rotateStyle}; display: inline-block;">▼</span>
          <span class="session-summary-text" style="font-weight: 600; font-size: 13px; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            <strong>${escapeHtml(s.module || "Nueva Sesión")}</strong> - ${escapeHtml(getTopicSummary(s.topic))} (${escapeHtml(getFormattedDateText(s.date))})
          </span>
        </div>
        <button type="button" class="btn-delete-row" title="Eliminar Sesión" style="background: none; border: none; color: #ff5252; cursor: pointer; padding: 4px; display: flex; align-items: center; justify-content: center; transition: transform 0.2s ease, color 0.2s ease;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      <div class="session-card-body" style="display: ${displayStyle}; margin-top: 12px; border-top: 1px solid rgba(0,0,0,0.06); padding-top: 12px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px;">
          <div class="field-group" style="margin:0;">
            <label style="font-size:11.5px; margin-bottom:2px; color: var(--muted); font-weight:600;">Fecha</label>
            <input type="date" class="session-date" value="${parseToInputDate(s.date)}">
          </div>
          <div class="field-group" style="margin:0;">
            <label style="font-size:11.5px; margin-bottom:2px; color: var(--muted); font-weight:600;">Hora</label>
            <input type="time" class="session-time" value="${parseToInputTime(s.time)}">
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px;">
          <div class="field-group" style="margin:0;">
            <label style="font-size:11.5px; margin-bottom:2px; color: var(--muted); font-weight:600;">Duración</label>
            <input type="text" class="session-duration" placeholder="Ej: 3 horas" value="${escapeHtml(s.duration || "")}">
          </div>
          <div class="field-group" style="margin:0;">
            <label style="font-size:11.5px; margin-bottom:2px; color: var(--muted); font-weight:600;">Modalidad</label>
            <select class="session-modality">
              <option value="Virtual" ${s.modality === "Virtual" ? "selected" : ""}>Virtual</option>
              <option value="Presencial" ${s.modality === "Presencial" ? "selected" : ""}>Presencial</option>
              <option value="Por definir" ${s.modality === "Por definir" ? "selected" : ""}>Por definir</option>
            </select>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 8px;">
          <div class="field-group" style="margin:0;">
            <label style="font-size:11.5px; margin-bottom:2px; color: var(--muted); font-weight:600;">Módulo</label>
            <input type="text" class="session-module" placeholder="Ej: Facturación" value="${escapeHtml(s.module || "")}">
          </div>
          <div class="field-group" style="margin:0;">
            <label style="font-size:11.5px; margin-bottom:2px; color: var(--muted); font-weight:600;">Tema de Capacitación</label>
            <textarea class="session-topic" placeholder="Ej: Introducción al sistema..." rows="2" style="height:auto; min-height:40px;">${escapeHtml(s.topic || "")}</textarea>
          </div>
        </div>
      </div>
    `;

    row.querySelectorAll("input, select, textarea").forEach(el => {
      el.oninput = () => {
        render();
        saveState();
      };
      el.onchange = () => {
        render();
        saveState();
      };
    });

    row.querySelector(".btn-delete-row").onclick = () => {
      row.remove();
      render();
      saveState();
    };

    // Toggle collapse/expand on header click
    const header = row.querySelector(".session-card-header");
    const body = row.querySelector(".session-card-body");
    const chevron = row.querySelector(".chevron-icon");
    const deleteBtn = row.querySelector(".btn-delete-row");

    header.onclick = (e) => {
      if (deleteBtn.contains(e.target)) return;

      const isCollapsed = row.classList.contains("collapsed");
      if (isCollapsed) {
        row.classList.remove("collapsed");
        body.style.display = "block";
        chevron.style.transform = "rotate(0deg)";
      } else {
        row.classList.add("collapsed");
        body.style.display = "none";
        chevron.style.transform = "rotate(-90deg)";
      }
    };

    // Real-time summary text updates as inputs change
    const moduleInput = row.querySelector(".session-module");
    const topicInput = row.querySelector(".session-topic");
    const dateInput = row.querySelector(".session-date");
    const summaryText = row.querySelector(".session-summary-text");

    const updateSummary = () => {
      const modVal = moduleInput.value.trim() || "Nueva Sesión";
      const topVal = topicInput.value.trim();
      const dateVal = getFormattedDateText(dateInput.value);
      summaryText.innerHTML = `<strong>${escapeHtml(modVal)}</strong> - ${escapeHtml(getTopicSummary(topVal))} (${escapeHtml(dateVal)})`;
    };

    moduleInput.addEventListener("input", updateSummary);
    topicInput.addEventListener("input", updateSummary);
    dateInput.addEventListener("input", updateSummary);
    container.appendChild(row);
  }

  function loadDefaultPlan() {
    const container = $("sessionRowsContainer");
    if (!container) return;
    container.innerHTML = "";
    
    const version = val("quposVersion") || "Estandar";
    const defaultSessions = getDefaultSessions(version);
    defaultSessions.forEach(s => addSessionRow(s));
    render();
  }

  // === LOCAL STORAGE AUTO-SAVE ===
  function saveState() {
    // Persistence disabled per user request
  }

  function loadState() {
    try {
      localStorage.removeItem("ncq_coordinacion_state");
      loadDefaultPlan();
      switchTab("onboarding");
    } catch (e) {
      console.error("Error during loadState reset:", e);
      loadDefaultPlan();
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
      let success = false;
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(text);
          success = true;
        }
      } catch (e) {
        console.error("navigator.clipboard.writeText failed, trying fallback", e);
      }

      if (!success) {
        try {
          const el = document.createElement("textarea");
          el.value = text;
          document.body.appendChild(el);
          el.select();
          success = document.execCommand("copy");
          document.body.removeChild(el);
        } catch (execErr) {
          console.error("execCommand fallback failed", execErr);
        }
      }

      if (success) {
        copySubjectBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#2e7d32" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>`;
        setTimeout(() => {
          copySubjectBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>`;
        }, 1500);
      } else {
        alert("No se pudo copiar el asunto.");
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

  // Plan de Trabajo builder actions
  const btnAddSession = $("btnAddSession");
  if (btnAddSession) {
    btnAddSession.onclick = () => {
      addSessionRow({
        date: "Por definir",
        time: "Por definir",
        duration: "2 horas",
        modality: "Virtual",
        module: "",
        topic: ""
      }, true);
      render();
      saveState();
    };
  }

  // === INITIALIZATION ===
  populateImplanters();
  populateOnboardingTemplates();
  initializeDates();
  loadState();
  switchTab(activeTab);
});
