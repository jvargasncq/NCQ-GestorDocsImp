(function () {
  "use strict";

  // === SELECCIÓN DE ELEMENTOS DOM (CACHE) ===
  const $ = id => document.getElementById(id);
  const val = (id, fallback = "") => $(id) ? $(id).value : fallback;

  // === CONSTANTES DE CONFIGURACIÓN ===
  const CONFIG = {
    helpUrl: "https://ayuda.qupos.com/",
    supportChat: "https://wvw.qupos.com/chat#hs-chat-open",
    countries: {
      CR: {
        label: "Costa Rica",
        supportPhone: "+506 8825 5725",
        facebook: "https://www.facebook.com/qupos",
        instagram: "https://www.instagram.com/qupos_ncq/",
        youtube: "https://www.youtube.com/@qupos_cr"
      },
      RD: {
        label: "República Dominicana",
        supportPhone: "+1 (849) 517-0243",
        facebook: "https://www.facebook.com/qupos",
        instagram: "https://www.instagram.com/qupos_ncq/",
        youtube: "https://www.youtube.com/@qupos_cr"
      }
    }
  };

  const IMPLANTERS = [
    { value: "Daniel Jimenez", label: "Daniel" },
    { value: "Luis Ortega", label: "Luis" },
    { value: "Josue Vargas", label: "Josue" },
    { value: "Andrés Espinoza", label: "Andrés" },
    { value: "Diego Umaña", label: "Diego" },
    { value: "Elena Chaves", label: "Elena" },
    { value: "Douglas Esteller", label: "Douglas" },
    { value: "Pablo Quirós", label: "Pablo" },
    { value: "Jose Morera", label: "Jose" }
  ];

  const REPORTERIA_COMMON_TOPICS = [
    "Pantalla de consultas de ventas",
    "Pantalla de consultas de compras",
    "Pantalla de consultas de inventarios",
    "Pantalla de D104 / Detalle D104",
    "Recepción de documentos electrónicos",
    "Filtros, agrupar datos, tablas dinámicas",
    "Exportar datos"
  ];

  const CAPACITACION_TOPICS = {
    "Compras": ["Usuarios / Grupos / Cajeros", "Proveedores", "Registro de compras manual", "Registro de compras Factura Digital XML", "Notas de crédito compras", "Análisis"],
    "Inventarios - CxP": ["Artículos", "Familias", "Marcas", "Recetas", "Artículos relacionados", "Impresión de etiquetas", "Movimientos de inventario", "Toma física", "Existencias e Historial de Existencias", "Movimientos de CxP", "Trámites de pago"],
    "Facturación - CxC": ["Preventas", "Proformas", "Facturación", "Control de cajas", "Clientes", "Abonos", "Estados de cuenta", "Pantalla de consultas de CxC"],
    "Ofertas - Promociones": ["Órdenes de compra", "Promociones", "Ofertas"],
    "CxP": ["Movimientos de CxP", "Trámites de pago"],
    "Rutas": ["Proceso de Rutas"],
    "Liquidaciones": ["Liquidaciones (uso administrativo)", "Liquidaciones en Dispositivo móvil (vendedor/repartidor)"],
    "Handheld": ["Inventarios", "Compras"],
    "Reportería (Lite/Estándar)": [...REPORTERIA_COMMON_TOPICS],
    "Reportería (Rutas)": ["Pantalla de consultas de ventas", "Pantalla de consultas de compras", "Pantalla de consultas de inventarios", "Pantalla de D104 / Detalle D104", "Recepción de documentos electrónicos", "Pantalla de consultas de Rutas", "Filtros, agrupar datos, tablas dinámicas", "Exportar datos"]
  };

  const CAPACITACION_DETAILS = {
    // Compras
    "Usuarios / Grupos / Cajeros": ["Se explica la pantalla de mantenimiento de usuarios y cajeros, así como la asignación de permisos."],
    "Proveedores": ["Se explica la pantalla de creación y mantenimiento de proveedores."],
    "Registro de compras manual": ["Se explica el proceso de registro de compras de forma manual."],
    "Registro de compras Factura Digital XML": ["Se explica el proceso de carga de archivos XML al sistema y el proceso para crear un registro de compras.", "Creación y vinculación de código - artículo - proveedor desde factura digital.", "Asignación de códigos CABYS desde factura digital."],
    "Notas de crédito compras": ["Registro de notas de crédito desde el registro de compras y desde la pantalla de Notas de crédito"],
    "Análisis": ["Creación de familias y marcas desde registro de compras manual", "Revisión de líneas, costos, impuestos, descuentos, utilidades, precios.", "Revisión de totales.", "Envío de precios a romana e impresión de etiquetas desde Registro de compras.", "Aplicación de inventarios.", "Aplicación de precios.", "Finalización de la compra.", "Envío de la compra a CxP."],

    // Inventarios
    "Artículos": ["Se explica de forma detallada la pantalla de mantenimiento de Artículos."],
    "Familias": ["Se explica de forma detallada la pantalla de clasificación de inventarios.", "Se menciona el uso de pantallas de mantenimiento adicionales: departamentos, subcategorías y categorías."],
    "Marcas": ["Se explica de forma detallada la pantalla de mantenimiento de marcas."],
    "Recetas": ["Se explica el uso de recetas."],
    "Artículos relacionados": ["Se explica el uso de artículos relacionados."],
    "Impresión de etiquetas": ["Se explica el proceso de impresión de etiquetas."],
    "Movimientos de inventario": ["Se explica de forma detallada el proceso de movimientos de inventario. (Entradas y Salidas)", "Transferencia entre bodegas."],
    "Toma física": ["Se explica de forma detallada el proceso de toma física: revisión y correcciones de inventarios.", "Buenas prácticas en toma física."],
    "Existencias e Historial de Existencias": ["Se explica el uso de la pantalla de consultas de inventarios."],

    // Facturación - CxC
    "Preventas": ["Se explica el proceso de creación de preventas y envío de preventas a caja.", "Descuentos manuales", "Preventa con cliente o sin cliente registrado"],
    "Proformas": ["Se explica el proceso de creación y aprobación de proformas.", "Descuentos manuales", "Proforma con cliente o sin cliente registrado"],
    "Facturación": ["Apertura de caja", "Búsqueda de artículos", "Borrar líneas", "Cambio de precios (Cambio de precio general o aplica solo para la factura)", "Descuentos", "Apertura de clientes", "Facturación de documentos: Preventas, Proformas.", "Respaldo de líneas", "Botonera: Grupos Touchscreen", "Uso de categorías de precios", "Bonificaciones", "Anulaciones y Notas de crédito por devolución.", "Retiros y Reintegros", "Apartados", "Código de actividad comercial", "Cierre de caja (de cajero)"],
    "Control de cajas": ["Análisis y revisión de control de cajas", "Buenas prácticas"],
    "Clientes": ["Configuración, activación de créditos, formas de pago, tope de crédito"],
    "Abonos": ["Aplicación de abonos totales y parciales.", "Reimpresión y anulaciones de abonos"],
    "Estados de cuenta": ["Se explica el proceso de creación de estados de cuenta."],
    "Pantalla de consultas de CxC": ["Movimientos que afectan la cuenta por cobrar del cliente."],

    // Ofertas - Promociones
    "Ofertas": ["Ofertas de tipo descuento.", "Ofertas de tipo bonificación.", "Creación de ofertas en bloque.", "Escalas de descuento en ofertas.", "Validación de inventario en ofertas.", "Notificación de inventario en ofertas."],
    "Promociones": ["Se explica el uso de promociones Qupos.", "Tipos de conteo.", "Impresión de cupones.", "Visualización de promociones en facturación."],
    "Órdenes de compra": ["Configuración de mínimos y máximos en los artículos (Bodegas).", "Uso de órdenes de compra con mínimos y máximos.", "Uso de órdenes de compra de forma manual.", "Crear registro de compra a partir de una orden de compra.", "Análisis de la orden de compra.", "Notas de crédito desde órdenes de compra.", "Revisión de versus en orden de compra."],

    // CxP
    "Movimientos de CxP": ["Se explica de forma detallada la pantalla de movimientos CxP.", "Notas de crédito financieras.", "División de pagos", "Notas de débito.", "Notificaciones de CxP."],
    "Trámites de pago": ["Creación de trámites de pago.", "Documentos de pago.", "Aprobación y cancelación de trámites de pago."],

    // Rutas
    "Proceso de Rutas": ["Configuración de recursos.", "Carga de existencias a la bodega:", "\u00A0\u00A0\u00A01. Transferencia de inventario de la bodega principal a la bodega de la ruta.", "Creación de Rutas (Procesos PC):", "\u00A0\u00A0\u00A01. Crear la ruta al vendedor.", "\u00A0\u00A0\u00A02. Carga automática de artículos a la ruta.", "\u00A0\u00A0\u00A03. Carga de cliente a la ruta generada.", "Envío de rutas a la nube.", "Descarga y uso de la ruta (Dispositivo móvil).", "Creación de facturas (Venta directa) o pedidos.", "Agregar artículos a las facturas/pedidos.", "Descuentos en rutas.", "Cambio de precios en rutas.", "Actualización de datos enviados a la nube de una ruta en proceso.", "Descarga (actualización de datos).", "Envío de datos.", "Análisis de proceso uso del integrador de rutas.", "Análisis del proceso de la factura/pedido que viene de rutas:", "\u00A0\u00A0\u00A01. Se realiza la factura/pedido desde rutas.", "\u00A0\u00A0\u00A02. Se envía factura/pedido a la nube.", "\u00A0\u00A0\u00A03. El integrador de rutas lo descarga y procesa a la base de datos."],

    // Liquidaciones
    "Liquidaciones (uso administrativo)": ["Se explica la creación de Liquidaciones de Cobro y Reparto.", "Asociar liquidaciones con las Rutas.", "Facturas de Cobro.", "Facturas de Reparto.", "Configuración de clientes para utilizar Reparto.", "Hoja de Liquidación de Cobro y Reparto.", "Documentos de pago en Liquidaciones.", "Abonos en Liquidaciones.", "Documentos Adicionales.", "Documentos de mensajería.", "Trámites de cobro.", "Ingresos anticipados.", "Estados de la Liquidación: Despachar, Preliquidar y Finalizar.", "Análisis de la liquidación: Diferencias faltantes o sobrantes."],
    "Liquidaciones en Dispositivo móvil (vendedor/repartidor)": ["Crear abonos a las cuentas por cobrar.", "Documento de pago en la liquidación."],

    // Handheld
    "Inventarios": ["Imprimir etiquetas.", "Cambiar precios.", "Creación y aplicación de tomas físicas desde Handheld.", "Creación y aplicación de ajustes de inventario desde Handheld."],
    "Compras": ["Creación de registro de compra desde Handheld y finalización en PC.", "Creación y aplicación de notas de crédito compras desde Handheld."],

    // Reportería
    "Pantalla de consultas de ventas": ["Ventas por facturas.", "Detalle de ventas.", "Resumen General.", "Artículos sin ventas.", "Utilidad.", "Cobertura de clientes.", "Cobertura de cliente por familia (recurso).", "Cobertura de cliente por familia (zona).", "Informe de recuperación.", "Reporte 80/20.", "Consulta Gerencial."],
    "Pantalla de consultas de compras": ["Compras por facturas.", "Detalle de compras."],
    "Pantalla de consultas de inventarios": ["Detalle movimiento de inventario.", "Existencias e Historial de existencias."],
    "Pantalla de D104 / Detalle D104": ["(Ventas, Compras)."],
    "Recepción de documentos electrónicos": ["Uso de consulta desde Qupos o Utilitario Cabys."],
    "Filtros, agrupar datos, tablas dinámicas": [],
    "Exportar datos": [],
    "Pantalla de consultas de Rutas": ["Efectividad de clientes.", "Mercadería sin facturar.", "Tiempos de ventas."]
  };

  let activeTab = "instalacion";

  // === FUNCIONES UTILITARIAS ===
  const escapeHtml = str => String(str ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
  const formatList = txt => (txt || "").trim() ? escapeHtml(txt).replace(/\n/g, '<br>') : "Sin Pendientes";
  const formatBulletPoints = (txt, emptyText = "Ninguno") => {
    const lines = (txt || "").split("\n").map(l => l.trim()).filter(l => l);
    if (lines.length === 0) {
      return `<p style="margin: 0; font-family: Arial, sans-serif; font-size: 15px; color: #777777; font-style: italic;">${emptyText}</p>`;
    }
    return `<ul style="margin: 0; padding-left: 20px; font-family: Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #333333;">
      ${lines.map(l => `<li style="margin-bottom: 4px;">${escapeHtml(l)}</li>`).join("")}
    </ul>`;
  };
  const formatDate = dateStr => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  // Resolve absolute or relative URL
  const resolveUrl = url => {
    if (!url) return "";
    url = url.trim();
    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("mailto:") || url.startsWith("tel:")) {
      return url;
    }
    return `http://172.30.9.24/qupos/${url}`;
  };

  // === GENERACIÓN DE PLANTILLAS ===
  const getBrandTheme = () => {
    const version = val("quposVersion");

    const themes = {
      Lite: {
        logo: "https://nlxfcqyqzaigdohkvpmf.supabase.co/storage/v1/object/public/avatars/Logos%20adicionales/lite.png",
        darkColor: "#008800",
        primaryColor: "#00AA00",
        lightColor: "#4CAF50",
        bgHighlight: "#f6fff5"
      },
      Estandar: {
        logo: "https://www.qupos.com/assets/qupos-logo-O7Yzz17d.png",
        darkColor: "#F25D21",
        primaryColor: "#F27221",
        lightColor: "#F8A227",
        bgHighlight: "#fff8f1"
      },
      ERP: {
        logo: "https://nlxfcqyqzaigdohkvpmf.supabase.co/storage/v1/object/public/avatars/Logos%20adicionales/erp.png",
        darkColor: "#005ec4",
        primaryColor: "#0081FC",
        lightColor: "#5cb8ff",
        bgHighlight: "#f2f8ff"
      }
    };

    return themes[version] || themes.Estandar;
  };

  function buildSocialRow(countryData) {
    const createLink = (url, img) => `
      <td align="center" valign="middle" style="width: 40px; height: 40px; padding: 0 10px 0 0;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; border-spacing:0; width:40px; height:40px;">
          <tr>
            <td align="center" valign="middle" style="width: 40px; height: 40px; border-radius: 20px; background-color: #f1f0f7; text-align: center; padding: 0;">
              <a href="${resolveUrl(url)}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; display: block; width: 40px; height: 40px; line-height: 40px;">
                <img src="${resolveUrl(img)}" width="22" height="22" style="border: 0; vertical-align: middle; display: inline-block;">
              </a>
            </td>
          </tr>
        </table>
      </td>`;
    return `
      <table role="presentation" align="center" cellpadding="0" cellspacing="0" border="0" style="margin:10px auto 0; border-collapse:collapse; border-spacing:0;">
        <tr>
          ${createLink(countryData.facebook, "https://www.factun.com/images/fb.png")}
          ${createLink(countryData.instagram, "https://www.factun.com/images/ig.png")}
          ${createLink(countryData.youtube, "https://cdn-icons-png.flaticon.com/512/174/174883.png")}
        </tr>
      </table>`;
  }

  function buildSocialRowDiv(countryData) {
    const createLink = (url, img) => `
      <div style="display: inline-block; width: 40px; height: 40px; border-radius: 20px; background-color: #f1f0f7; text-align: center; margin: 0 5px; vertical-align: middle;">
        <a href="${resolveUrl(url)}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; display: block; width: 40px; height: 40px; line-height: 40px;">
          <img src="${resolveUrl(img)}" width="22" height="22" style="border: 0; vertical-align: middle; display: inline-block; margin-top: 9px;">
        </a>
      </div>`;
    return `
      <div style="margin: 10px auto 0; text-align: center;">
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
  <title>Qupos Minuta</title>
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
      /* Strip grey background and outer padding from page layout */
      body > center > table {
        background-color: #ffffff !important;
        background: #ffffff !important;
        padding: 0 !important;
      }
      body > center > table > tbody > tr > td,
      body > center > table > tr > td {
        padding: 0 !important;
      }
      /* Format the email card to center nicely on standard printable area */
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
    instalacion: () => {
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
      const checkQupos = $("checkInstalacionQupos") && $("checkInstalacionQupos").checked;
      const checkPinpads = $("checkInstalacionPinPads") && $("checkInstalacionPinPads").checked;
      
      let temaText = "Instalación y configuración";
      if (checkPinpads && !checkQupos) {
        temaText = "Instalación de PinPads";
      } else if (!checkPinpads && checkQupos) {
        temaText = "Instalación y configuración de Qupos";
      } else if (checkPinpads && checkQupos) {
        temaText = "Instalación de Qupos y PinPads";
      }

      const quposHtml = checkQupos ? `
          <li style="margin-bottom: 6px;">Instalación de Qupos Server + Cliente</li>
          <li style="margin-bottom: 6px;">Base de datos migrada desde: <strong>${escapeHtml(data.prevSystem)}</strong></li>
          <li style="margin-bottom: 6px;">Versión 3.7.56 | Licencias: <strong>${data.licenseCount}</strong> (${data.quposVersion})</li>
          <li style="margin-bottom: 6px;">Respaldos Cloud: <span style="color: #00a8ff;">${escapeHtml(data.backupEmail)}</span></li>
      ` : "";

      const pinpadsHtml = checkPinpads ? `
          <li style="margin-bottom: 6px;">Se configuran <strong>${val("pinpadCount", "1")}</strong> PinPads en la versión de integración 3.11.3.7.</li>
          <li style="margin-bottom: 6px;">Se establecen <strong>${val("terminalCount", "1")}</strong> terminales BAC Contado.</li>
          <li style="margin-bottom: 6px;">Se realizan las pruebas con facturas en terminales de contado (Adjunto).</li>
          <li style="margin-bottom: 6px;">Se explica cómo realizar cobros con la integración, pagos multitarjeta y pagos mixtos.</li>
          <li style="margin-bottom: 6px;">Se explica cómo realizar anulaciones de pagos y cierre PinPad.</li>
      ` : "";

      const body = `
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #333333; border-collapse: collapse;">
          <tr><td style="padding: 4px 0;"><strong>Tema:</strong> ${temaText}</td></tr>
          <tr><td style="padding: 4px 0;"><strong>Fecha:</strong> ${data.installDate}</td></tr>
          <tr><td style="padding: 4px 0;"><strong>Razón comercial:</strong> ${escapeHtml(data.clientName)}</td></tr>
          <tr><td style="padding: 4px 0;"><strong>Cliente a cargo:</strong> ${escapeHtml(data.clientContact)}</td></tr>
          <tr><td style="padding: 4px 0;"><strong>Implantador NCQ:</strong> ${data.implanterNCQ}</td></tr>
        </table>
        <h3 style="color: ${theme.primaryColor}; font-family: Arial, sans-serif; font-size: 18px; margin: 24px 0 12px 0; border-bottom: 2px solid ${theme.primaryColor}; padding-bottom: 6px;">Trabajo realizado:</h3>
        <ul style="margin: 0 0 20px 0; padding-left: 20px; font-family: Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #333333;">
          ${quposHtml}
          ${pinpadsHtml}
          ${(!checkQupos && !checkPinpads) ? '<li style="margin-bottom: 6px;">Ningún componente seleccionado</li>' : ''}
        </ul>
        <h3 style="color: ${theme.primaryColor}; font-family: Arial, sans-serif; font-size: 18px; margin: 20px 0 12px 0;">Pendientes cliente:</h3>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; background-color: ${theme.bgHighlight}; border-left: 4px solid ${theme.primaryColor}; margin: 10px 0 20px 0;">
          <tr><td style="padding: 12px 14px; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #333333;">${formatList(data.clientPendings)}</td></tr>
        </table>
        <h3 style="color: ${theme.primaryColor}; font-family: Arial, sans-serif; font-size: 18px; margin: 20px 0 12px 0;">Pendientes NCQ:</h3>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; background-color: ${theme.bgHighlight}; border-left: 4px solid ${theme.primaryColor}; margin: 10px 0 10px 0;">
          <tr><td style="padding: 12px 14px; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #333333;">${formatList(data.ncqPendings)}</td></tr>
        </table>`;
      return buildEmailShell(CONFIG, body);
    },
    migracion: () => {
      const check = id => $(id).checked;
      const data = {
        installDate: formatDate(val("installDate")),
        implanterNCQ: val("implanterNCQ"),
        clientName: val("clientName"),
        clientContact: val("clientContact"),
        prevSystem: val("prevSystemMigracion"),
        ncqPendings: val("ncqPendingsMigracion"),
        items: [
          { label: "Artículos", active: check("checkMigracionArticulos"), points: ["Código Artículo", "Descripciones", "Precios: Costo, Utilidad, Precio, Precio IVA", "Tarifa de Impuestos", "Familias", "Marcas", "Código CABYS", "Existencias"] },
          { label: "Clientes", active: check("checkMigracionClientes"), points: ["Información del cliente", "Razón Comercial", "Cédula", "Tipo de Cédula", "Dirección", "Teléfono", "Correo Electrónico", "Tipo de Cliente", "Crédito activo (crédito, limite crédito, días de crédito)"] },
          { label: "Proveedores", active: check("checkMigracionProveedores"), points: ["Información del Proveedor", "Razón Comercial", "Cédula", "Tipo de Cédula", "Dirección", "Teléfono", "Correo Electrónico"] },
          { label: "CxC", active: check("checkMigracionCuentasPorCobrar"), points: [`Facturas con saldos pendientes en cuentas por cobrar a fecha de corte: ${formatDate(val("dateMigracionCxC"))}`] },
          { label: "CxP", active: check("checkMigracionCuentasPorPagar"), points: [`Facturas con saldos pendientes en cuentas por pagar a fecha de corte: ${formatDate(val("dateMigracionCxP"))}`] }
        ]
      };
      $("divDateCxC").classList.toggle("hidden", !check("checkMigracionCuentasPorCobrar"));
      $("divDateCxP").classList.toggle("hidden", !check("checkMigracionCuentasPorPagar"));
      const theme = getBrandTheme();
      const workHtml = data.items.filter(i => i.active).map(i => `
        <p style="margin: 16px 0 6px 0; font-family: Arial, sans-serif; font-size: 15px; color: #333333;"><strong>${i.label}</strong></p>
        <ul style="margin: 0 0 16px 0; padding-left: 20px; font-family: Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #333333;">
          ${i.points.map(p => `<li style="margin-bottom: 4px;">${p}</li>`).join("")}
        </ul>`).join("");
      const body = `
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #333333; border-collapse: collapse;">
          <tr><td style="padding: 4px 0;"><strong>Tema:</strong> Migración de Datos</td></tr>
          <tr><td style="padding: 4px 0;"><strong>Fecha:</strong> ${data.installDate}</td></tr>
          <tr><td style="padding: 4px 0;"><strong>Razón comercial:</strong> ${escapeHtml(data.clientName)}</td></tr>
          <tr><td style="padding: 4px 0;"><strong>Cliente a cargo:</strong> ${escapeHtml(data.clientContact)}</td></tr>
          <tr><td style="padding: 4px 0;"><strong>Implantador NCQ:</strong> ${data.implanterNCQ}</td></tr>
        </table>
        <h3 style="color: ${theme.primaryColor}; font-family: Arial, sans-serif; font-size: 18px; margin: 24px 0 12px 0; border-bottom: 2px solid ${theme.primaryColor}; padding-bottom: 6px;">Trabajo realizado:</h3>
        <p style="margin: 0 0 16px 0; font-family: Arial, sans-serif; font-size: 15px; color: #333333;">Migración desde: <strong>${escapeHtml(data.prevSystem)}</strong></p>
        ${workHtml}
        <h3 style="color: ${theme.primaryColor}; font-family: Arial, sans-serif; font-size: 18px; margin: 20px 0 12px 0;">Pendientes NCQ:</h3>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; background-color: ${theme.bgHighlight}; border-left: 4px solid ${theme.primaryColor}; margin: 10px 0 10px 0;">
          <tr><td style="padding: 12px 14px; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #333333;">${formatList(data.ncqPendings)}</td></tr>
        </table>`;
      return buildEmailShell(CONFIG, body);
    },
    capacitacion: () => {
      const assistants = val("clientContactCapacitacion").split("\n").map(l => l.trim()).filter(l => l);

      const isMulti = $("isMultiTopic").checked;
      const checkedCheckboxes = Array.from(document.querySelectorAll("#capacitacionCheckboxes input:checked"));
      const modulesByTopic = {};
      checkedCheckboxes.forEach(cb => {
        const topic = cb.dataset.topic;
        const label = cb.dataset.label;
        if (!modulesByTopic[topic]) {
          modulesByTopic[topic] = [];
        }
        modulesByTopic[topic].push(label);
      });

      const version = val("quposVersion");

      let topicText = "";
      if (isMulti) {
        const selectedTopics = Array.from(document.querySelectorAll(".multi-topic-cb:checked")).map(cb => {
          const t = cb.dataset.topic;
          return getTopicLabel(t);
        });
        topicText = "Capacitación Multi-tema (" + selectedTopics.join(", ") + ")";
      } else {
        topicText = "Capacitación de " + getTopicLabel(val("capacitacionTopic"));
      }

      const startTime = `${val("startTimeHourCapacitacion")}:${val("startTimeMinCapacitacion")}`;
      const endTime = `${val("endTimeHourCapacitacion")}:${val("endTimeMinCapacitacion")}`;
      const calculateDuration = (start, end) => {
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
      };
      const duration = calculateDuration(startTime, endTime);
      const timeDetails = startTime && endTime ? `<tr><td style="padding: 4px 0;"><strong>Horario:</strong> de ${startTime} a ${endTime} (${duration ? `Duración: ${duration}` : ''})</td></tr>` : '';

      const theme = getBrandTheme();

      let modulesHtml = "";
      Object.keys(modulesByTopic).forEach(topic => {
        if (isMulti) {
          const label = getTopicLabel(topic);
          modulesHtml += `<p style="margin: 18px 0 6px 0; font-family: Arial, sans-serif; font-size: 15px; color: ${theme.darkColor}; border-bottom: 1px dashed ${theme.darkColor}; padding-bottom: 2px;"><strong>Tema: ${escapeHtml(label)}</strong></p>`;
        }
        const topicModules = modulesByTopic[topic] || [];
        modulesHtml += topicModules.map(m => {
          let points = CAPACITACION_DETAILS[m] || [];
          if (m === "Análisis" && version === "Lite") {
            points = points.filter(p => p !== "Envío de la compra a CxP.");
          }
          if (m === "Pantalla de consultas ventas" && topic !== "Reporteria (Rutas)") {
            points = points.filter(p => p !== "Cobertura de clientes." && p !== "Cobertura de cliente por familia (recurso)." && p !== "Cobertura de cliente por familia (zona).");
          }
          return `
              <p style="margin: 12px 0 6px 0; font-family: Arial, sans-serif; font-size: 15px; color: #333333;"><strong>${escapeHtml(m)}</strong></p>
              <ul style="margin: 0 0 14px 0; padding-left: 20px; font-family: Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #333333;">
                ${points.map(p => {
                  let text = escapeHtml(p);
                  return `<li style="${p.startsWith("\u00A0") ? 'list-style-type:none; margin-bottom: 4px;' : 'margin-bottom: 4px;'}">${text}</li>`;
                }).join("")}
              </ul>`;
        }).join("");
      });

      const body = `
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #333333; border-collapse: collapse;">
          <tr><td style="padding: 4px 0;"><strong>Tema:</strong> ${escapeHtml(topicText)}</td></tr>
          <tr><td style="padding: 4px 0;"><strong>Fecha:</strong> ${formatDate(val("installDate"))}</td></tr>
          ${timeDetails}
          <tr><td style="padding: 4px 0;"><strong>Razón comercial:</strong> ${escapeHtml(val("clientName"))}</td></tr>
          <tr>
            <td style="padding: 8px 0 4px 0;">
              <strong>Asistentes:</strong>
              <ul style="margin: 6px 0 0 0; padding-left: 20px; font-family: Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #333333;">
                ${assistants.map(a => `<li style="margin-bottom: 4px;">${escapeHtml(a)}</li>`).join("")}
              </ul>
            </td>
          </tr>
          <tr><td style="padding: 4px 0;"><strong>Implantador NCQ:</strong> ${val("implanterNCQ")}</td></tr>
        </table>
        <h3 style="color: ${theme.primaryColor}; font-family: Arial, sans-serif; font-size: 18px; margin: 24px 0 12px 0; border-bottom: 2px solid ${theme.primaryColor}; padding-bottom: 6px;">Módulos impartidos:</h3>
        ${modulesHtml}
        ${val("capacitacionLink").trim() ? `
          <p class="no-print" style="margin: 20px 0 8px 0; font-family: Arial, sans-serif; font-size: 15px; color: #333333;">Grabación:</p>
          <table class="no-print" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; margin-bottom: 16px;">
            <tr>
              <td align="center" style="border-radius: 6px; background-color: ${theme.lightColor};">
                <a href="${resolveUrl(val("capacitacionLink"))}" target="_blank" style="font-family: Arial, sans-serif; font-size: 15px; font-weight: bold; color: #ffffff; text-decoration: none; padding: 12px 22px; display: block; border-radius: 6px;">Ver capacitación</a>
              </td>
            </tr>
          </table>` : ""}
        <h3 style="color: ${theme.primaryColor}; font-family: Arial, sans-serif; font-size: 18px; margin: 20px 0 12px 0;">Pendientes cliente:</h3>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; background-color: ${theme.bgHighlight}; border-left: 4px solid ${theme.primaryColor}; margin: 10px 0 20px 0;">
          <tr><td style="padding: 12px 14px; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #333333;">${formatList(val("clientPendingsCapacitacion"))}</td></tr>
        </table>
        <h3 style="color: ${theme.primaryColor}; font-family: Arial, sans-serif; font-size: 18px; margin: 20px 0 12px 0;">Pendientes NCQ:</h3>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; background-color: ${theme.bgHighlight}; border-left: 4px solid ${theme.primaryColor}; margin: 10px 0 10px 0;">
          <tr><td style="padding: 12px 14px; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #333333;">${formatList(val("ncqPendingsCapacitacion"))}</td></tr>
        </table>`;
      return buildEmailShell(CONFIG, body);
    },
    puestaEnMarcha: () => {
      const check = id => $(id) && $(id).checked;
      const data = {
        installDate: formatDate(val("installDate")),
        implanterNCQ: val("implanterNCQ"),
        clientName: val("clientName"),
        clientContact: val("clientContact"),
        quposVersion: val("quposVersion"),
        clientPendings: val("clientPendingsPuestaEnMarcha"),
        ncqPendings: val("ncqPendingsPuestaEnMarcha"),
        items: [
          {
            label: "Revisión de Respaldos",
            active: check("checkPEmRespaldos"),
            point: "Se confirma que los respaldos de seguridad se realicen de forma correcta tanto a nivel local como en la nube."
          },
          {
            label: "Activación de Facturación Electrónica",
            active: check("checkPEmFE"),
            point: check("checkPEmFEConfigurado")
              ? "Se verifica el correcto estado y funcionamiento de las credenciales de facturación electrónica configuradas previamente."
              : "Se configuran las credenciales de facturación electrónica y se realizan pruebas para verificar su correcto funcionamiento."
          },
          {
            label: "Activación de Recepción de documentos",
            active: check("checkPEmReenvioRec"),
            point: "Se configura el reenvío automático de documentos y se explica el funcionamiento de la pantalla de recepción de documentos."
          },
          {
            label: "Registro de compras desde Recepción",
            active: check("checkPEmRegistroCompras"),
            point: "Se explica de manera detallada el proceso de registro de compras a partir de los documentos aceptados en la pantalla de recepción de documentos."
          }
        ]
      };

      const additionalPoints = check("checkPEmConsultasAdicionales")
        ? val("pemConsultasAdicionales").split("\n").map(l => l.trim()).filter(l => l)
        : [];

      const theme = getBrandTheme();
      const activeItems = data.items.filter(i => i.active);
      let workHtml = "";
      if (activeItems.length > 0) {
        workHtml = `
          <ul style="margin: 0 0 16px 0; padding-left: 20px; font-family: Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #333333;">
            ${activeItems.map(i => `<li style="margin-bottom: 6px;"><strong>${i.label}:</strong> ${i.point}</li>`).join("")}
          </ul>`;
      }

      let additionalHtml = "";
      if (check("checkPEmConsultasAdicionales") && additionalPoints.length > 0) {
        additionalHtml = `
          <p style="margin: 16px 0 6px 0; font-family: Arial, sans-serif; font-size: 15px; color: #333333;"><strong>Se aclaran dudas de los siguientes temas:</strong></p>
          <ul style="margin: 0 0 16px 0; padding-left: 20px; font-family: Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #333333;">
            ${additionalPoints.map(p => `<li style="margin-bottom: 4px;">${escapeHtml(p)}</li>`).join("")}
          </ul>`;
      }

      const body = `
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #333333; border-collapse: collapse;">
          <tr><td style="padding: 4px 0;"><strong>Tema:</strong> Puesta en Marcha</td></tr>
          <tr><td style="padding: 4px 0;"><strong>Fecha:</strong> ${data.installDate}</td></tr>
          <tr><td style="padding: 4px 0;"><strong>Razón comercial:</strong> ${escapeHtml(data.clientName)}</td></tr>
          <tr><td style="padding: 4px 0;"><strong>Cliente a cargo:</strong> ${escapeHtml(data.clientContact)}</td></tr>
          <tr><td style="padding: 4px 0;"><strong>Versión Qupos:</strong> ${data.quposVersion}</td></tr>
          <tr><td style="padding: 4px 0;"><strong>Implantador NCQ:</strong> ${data.implanterNCQ}</td></tr>
        </table>
        <h3 style="color: ${theme.primaryColor}; font-family: Arial, sans-serif; font-size: 18px; margin: 24px 0 12px 0; border-bottom: 2px solid ${theme.primaryColor}; padding-bottom: 6px;">Trabajo realizado:</h3>
        <div style="margin: 10px 0 20px 0;">
          ${workHtml}
          ${additionalHtml}
          ${(!workHtml && !additionalHtml) ? '<p style="margin: 0; font-family: Arial, sans-serif; font-size: 15px; color: #777777; font-style: italic;">Sin temas aclarados</p>' : ''}
        </div>
        <h3 style="color: ${theme.primaryColor}; font-family: Arial, sans-serif; font-size: 18px; margin: 20px 0 12px 0;">Pendientes cliente:</h3>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; background-color: ${theme.bgHighlight}; border-left: 4px solid ${theme.primaryColor}; margin: 10px 0 20px 0;">
          <tr><td style="padding: 12px 14px; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #333333;">${formatList(data.clientPendings)}</td></tr>
        </table>
        <h3 style="color: ${theme.primaryColor}; font-family: Arial, sans-serif; font-size: 18px; margin: 20px 0 12px 0;">Pendientes NCQ:</h3>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; background-color: ${theme.bgHighlight}; border-left: 4px solid ${theme.primaryColor}; margin: 10px 0 10px 0;">
          <tr><td style="padding: 12px 14px; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #333333;">${formatList(data.ncqPendings)}</td></tr>
        </table>`;
      return buildEmailShell(CONFIG, body);
    }
  };

  function updateSubject() {
    const clientNameText = val("clientName").trim() || "Razón Comercial";
    let baseSubject = "";
    
    if (activeTab === "instalacion") {
      const checkQupos = $("checkInstalacionQupos") && $("checkInstalacionQupos").checked;
      const checkPinpads = $("checkInstalacionPinPads") && $("checkInstalacionPinPads").checked;
      
      let subType = "Instalación";
      if (checkPinpads && !checkQupos) {
        subType = "Instalación de PinPads";
      } else if (!checkPinpads && checkQupos) {
        subType = "Instalación de Qupos";
      } else if (checkPinpads && checkQupos) {
        subType = "Instalación de Qupos y PinPads";
      }
      baseSubject = `Minuta Razón Comercial ${subType}`;
    } else if (activeTab === "capacitacion") {
      const isMulti = $("isMultiTopic").checked;
      if (isMulti) {
        const selectedTopics = Array.from(document.querySelectorAll(".multi-topic-cb:checked")).map(cb => getTopicLabel(cb.dataset.topic));
        baseSubject = "Minuta Razón Comercial Capacitación Multi-tema" + (selectedTopics.length > 0 ? " (" + selectedTopics.join(", ") + ")" : "");
      } else {
        baseSubject = `Minuta Razón Comercial Capacitación de ${getTopicLabel(val("capacitacionTopic"))}`;
      }
    } else if (activeTab === "puestaEnMarcha") {
      baseSubject = "Minuta Razón Comercial Puesta en Marcha";
    } else {
      baseSubject = `Minuta Razón Comercial ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`;
    }
    
    const finalSubject = baseSubject.replace("Razón Comercial", clientNameText);
    const subjectEl = $("subject");
    if (subjectEl) {
      subjectEl.textContent = finalSubject;
    }
  }

  function render() {
    // Dynamic panel visibility sync based on switches
    const checkQupos = $("checkInstalacionQupos") && $("checkInstalacionQupos").checked;
    const checkPinpads = $("checkInstalacionPinPads") && $("checkInstalacionPinPads").checked;
    
    const quposDiv = $("divQuposFields");
    if (quposDiv) {
      quposDiv.classList.toggle("hidden", !checkQupos);
    }
    const pinpadsDiv = $("divPinPadsFields");
    if (pinpadsDiv) {
      pinpadsDiv.classList.toggle("hidden", !checkPinpads);
    }

    // Dynamic Migracion visibility sync
    const checkCxC = $("checkMigracionCuentasPorCobrar") && $("checkMigracionCuentasPorCobrar").checked;
    const divCxC = $("divDateCxC");
    if (divCxC) {
      divCxC.classList.toggle("hidden", !checkCxC);
    }
    const checkCxP = $("checkMigracionCuentasPorPagar") && $("checkMigracionCuentasPorPagar").checked;
    const divCxP = $("divDateCxP");
    if (divCxP) {
      divCxP.classList.toggle("hidden", !checkCxP);
    }

    // Dynamic Puesta en Marcha visibility sync
    const checkFE = $("checkPEmFE") && $("checkPEmFE").checked;
    const divFEConfigurado = $("divPEmFEConfigurado");
    if (divFEConfigurado) {
      divFEConfigurado.classList.toggle("hidden", !checkFE);
    }

    const checkConsultas = $("checkPEmConsultasAdicionales") && $("checkPEmConsultasAdicionales").checked;
    const divConsultas = $("divPEmConsultasAdicionales");
    if (divConsultas) {
      divConsultas.classList.toggle("hidden", !checkConsultas);
    }

    updateSubject();
    const html = renderers[activeTab]();
    const iframe = $("preview");
    if (iframe) {
      iframe.srcdoc = html;
    }
    return html;
  }

  function getTopicLabel(topic) {
    const version = val("quposVersion");
    if (version === "Lite" && topic === "Inventarios - CxP") {
      return "Inventarios";
    }
    return topic;
  }

  function getAllowedTopics() {
    const version = val("quposVersion");
    const allTopics = Object.keys(CAPACITACION_TOPICS);
    if (version === "Lite") {
      return ["Compras", "Inventarios - CxP", "Facturación - CxC", "Reportería (Lite/Estándar)"];
    }
    return allTopics;
  }

  function populateCapacitacionTopics() {
    const select = $("capacitacionTopic");
    if (!select) return;
    
    const currentVal = select.value;
    const allowed = getAllowedTopics();
    
    select.innerHTML = allowed.map(topic => `<option value="${topic}">${getTopicLabel(topic)}</option>`).join("");
    
    if (allowed.includes(currentVal)) {
      select.value = currentVal;
    } else if (allowed.length > 0) {
      select.value = allowed[0];
    }
  }

  function initMultiTopicUI() {
    const grid = document.querySelector("#multiTopicContainer > div");
    if (!grid) return;
    grid.innerHTML = "";
    
    const allowed = getAllowedTopics();
    allowed.forEach(topic => {
      const wrapper = document.createElement("div");
      wrapper.className = "switch-container";
      wrapper.innerHTML = `
        <label class="switch">
          <input type="checkbox" class="multi-topic-cb" data-topic="${topic}">
          <span class="slider"></span>
        </label>
        <span class="switch-text">${getTopicLabel(topic)}</span>
      `;
      wrapper.querySelector("input").onchange = () => {
        updateCapacitacionUI();
        saveState();
      };
      grid.appendChild(wrapper);
    });
  }

  function updateCapacitacionUI() {
    const isMulti = $("isMultiTopic").checked;
    
    // Dynamic single vs multi topic container visibility sync
    const singleContainer = $("singleTopicContainer");
    if (singleContainer) {
      singleContainer.classList.toggle("hidden", isMulti);
    }
    const multiContainer = $("multiTopicContainer");
    if (multiContainer) {
      multiContainer.classList.toggle("hidden", !isMulti);
    }

    const container = $("capacitacionCheckboxes");
    if (!container) return;
    container.innerHTML = "";

    let activeTopics = [];
    if (isMulti) {
      activeTopics = Array.from(document.querySelectorAll(".multi-topic-cb:checked")).map(cb => cb.dataset.topic);
    } else {
      activeTopics = [val("capacitacionTopic")];
    }

    const version = val("quposVersion");

    activeTopics.forEach(topic => {
      if (isMulti) {
        const header = document.createElement("div");
        header.style = "font-weight: 700; color: var(--qupos-dark); margin-top: 10px; margin-bottom: 6px; font-size: 13px; border-bottom: 1px dashed var(--border); padding-bottom: 2px;";
        header.textContent = getTopicLabel(topic);
        container.appendChild(header);
      }

      let items = CAPACITACION_TOPICS[topic] || [];
      if (version === "Lite" && topic === "Inventarios - CxP") {
        items = items.filter(item => item !== "Movimientos de CxP" && item !== "Trámites de pago");
      }

      items.forEach((item) => {
        const lbl = document.createElement("label");
        lbl.style = "display:flex; align-items:center; gap:8px; cursor:pointer; font-size:14px; margin-left: " + (isMulti ? "12px" : "0") + ";";
        lbl.innerHTML = `<input type="checkbox" checked data-topic="${topic}" data-label="${item}"> ${item}`;
        lbl.querySelector("input").onchange = () => {
          render();
          saveState();
        };
        container.appendChild(lbl);
      });
    });

    render();
  }

  function switchTab(tabId) {
    activeTab = tabId;
    document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t.dataset.tab === tabId));
    document.querySelectorAll("[id^='section']").forEach(s => s.classList.toggle("hidden", s.id !== `section${tabId.charAt(0).toUpperCase() + tabId.slice(1)}`));
    if (tabId === "capacitacion") {
      updateCapacitacionUI();
    } else {
      render();
    }
    saveState();
  }

  // Populate NCQ Implanters dropdown lists dynamically
  function populateImplanters() {
    const selects = ["implanterNCQ"];
    selects.forEach(id => {
      const select = $(id);
      if (select) {
        select.innerHTML = IMPLANTERS.map(imp => `<option value="${imp.value}">${imp.label}</option>`).join("");
      }
    });
  }

  // Pre-populate input dates to today's date
  function initializeDates() {
    const today = new Date().toISOString().split("T")[0];
    const dateIds = ["installDate", "dateMigracionCxC", "dateMigracionCxP"];
    dateIds.forEach(id => {
      const el = $(id);
      if (el && !el.value) {
        el.value = today;
      }
    });
  }

  // === LOCAL STORAGE AUTO-SAVE ===
  function saveState() {
    // Persistence disabled per user request
  }

  function loadState() {
    try {
      localStorage.removeItem("ncq_minutas_state");
      
      // Initialize dynamic components to default clean state
      populateCapacitacionTopics();
      initMultiTopicUI();
      updateCapacitacionUI();
      switchTab("instalacion");
    } catch (e) {
      console.error("Error during loadState reset", e);
    }
  }

  // === EVENTOS ===
  document.querySelectorAll(".tab").forEach(t => t.onclick = () => switchTab(t.dataset.tab));
  
  const capTopicSelect = $("capacitacionTopic");
  if (capTopicSelect) {
    capTopicSelect.onchange = () => {
      updateCapacitacionUI();
      saveState();
    };
  }

  const isMultiCheckbox = $("isMultiTopic");
  if (isMultiCheckbox) {
    isMultiCheckbox.onchange = () => {
      updateCapacitacionUI();
      saveState();
    };
  }

  const versionSelect = $("quposVersion");
  if (versionSelect) {
    versionSelect.onchange = () => {
      populateCapacitacionTopics();
      initMultiTopicUI();
      updateCapacitacionUI();
      render();
      saveState();
    };
  }

  document.querySelectorAll("input, select, textarea").forEach(el => {
    if (el.id !== "isMultiTopic" && el.id !== "capacitacionTopic" && el.id !== "quposVersion") {
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
      const subjectText = $("subject").textContent.trim();
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(subjectText);
          showCopySuccess(copySubjectBtn);
        } else {
          // Fallback
          const el = document.createElement("textarea");
          el.value = subjectText;
          document.body.appendChild(el);
          el.select();
          document.execCommand("copy");
          document.body.removeChild(el);
          showCopySuccess(copySubjectBtn);
        }
      } catch (err) {
        console.error("Failed to copy subject", err);
      }
    };
  }

  // Shared copy-to-clipboard helper
  async function copyHtmlToClipboard(htmlText, triggerBtn) {
    const tempDiv = document.createElement("div");
    tempDiv.style.position = "absolute";
    tempDiv.style.left = "-9999px";
    tempDiv.style.top = "-9999px";
    tempDiv.innerHTML = htmlText;
    document.body.appendChild(tempDiv);

    let success = false;
    try {
      if (navigator.clipboard && window.ClipboardItem) {
        const plainText = tempDiv.innerText || tempDiv.textContent || "";
        const blobHtml = new Blob([htmlText], { type: "text/html" });
        const blobText = new Blob([plainText], { type: "text/plain" });
        const data = [new ClipboardItem({
          "text/html": blobHtml,
          "text/plain": blobText
        })];
        await navigator.clipboard.write(data);
        success = true;
      }
    } catch (err) {
      console.error("navigator.clipboard.write failed, trying selection copy fallback", err);
    }

    if (!success) {
      const range = document.createRange();
      range.selectNodeContents(tempDiv);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);

      try {
        success = document.execCommand("copy");
      } catch (execErr) {
        console.error("execCommand copy failed", execErr);
      }
      selection.removeAllRanges();
    }

    document.body.removeChild(tempDiv);

    if (success) {
      showCopySuccess(triggerBtn);
    } else {
      alert("No se pudo copiar el correo de forma automática. Por favor, selecciona y copia directamente de la vista previa.");
    }
  }

  // Copy for Gmail / general use (centered 600px layout)
  const copyBtn = $("btnCopy");
  if (copyBtn) {
    copyBtn.onclick = async () => {
      let htmlText = render();
      const bodyMatch = htmlText.match(/<body[^>]*>([\s\S]*)<\/body>/i);
      if (bodyMatch) htmlText = bodyMatch[1].trim();
      await copyHtmlToClipboard(htmlText, copyBtn);
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

  function showCopySuccess(btn) {
    const isIconBtn = btn.classList.contains("icon-btn");
    const originalContent = btn.innerHTML;
    
    if (isIconBtn) {
      btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#4caf50" stroke-width="3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      `;
      btn.style.color = "#4caf50";
      setTimeout(() => {
        btn.innerHTML = originalContent;
        btn.style.color = "";
      }, 2000);
    } else {
      const originalText = btn.textContent;
      btn.textContent = "¡Copiado! 📋";
      btn.style.backgroundColor = "#4caf50";
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.backgroundColor = "";
      }, 2000);
    }
  }

  // === INIT ===
  populateImplanters();
  initializeDates();
  populateCapacitacionTopics();
  initMultiTopicUI();

  // Set default visibility of Qupos/PinPads containers before loading cache
  const quposDiv = $("divQuposFields");
  const quposCb = $("checkInstalacionQupos");
  if (quposDiv && quposCb) {
    quposDiv.classList.toggle("hidden", !quposCb.checked);
  }
  const pinpadsDiv = $("divPinPadsFields");
  const pinpadsCb = $("checkInstalacionPinPads");
  if (pinpadsDiv && pinpadsCb) {
    pinpadsDiv.classList.toggle("hidden", !pinpadsCb.checked);
  }

  const consultasDiv = $("divPEmConsultasAdicionales");
  const consultasCb = $("checkPEmConsultasAdicionales");
  if (consultasDiv && consultasCb) {
    consultasDiv.classList.toggle("hidden", !consultasCb.checked);
  }

  const feDiv = $("divPEmFEConfigurado");
  const feCb = $("checkPEmFE");
  if (feDiv && feCb) {
    feDiv.classList.toggle("hidden", !feCb.checked);
  }

  loadState();
  render();
})();
