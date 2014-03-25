function NetearDivsTopGeneral() {
    jQuery("#contenidoGraficaVentas").html('');
    jQuery("#contenidoGraficaVendedores").html('');
}
function toCurrency(cnt) {
    cnt = cnt.toString().replace(/\$|\,/g, '');
    if (isNaN(cnt))
        return 0;
    var sgn = (cnt === (cnt = Math.abs(cnt)));
    cnt = Math.floor(cnt * 100 + 0.5);
    cvs = cnt % 100;
    cnt = Math.floor(cnt / 100).toString();
    if (cvs < 10)
        cvs = '0' + cvs;
    for (var i = 0; i < Math.floor((cnt.length - (1 + i)) / 3); i++)
        cnt = cnt.substring(0, cnt.length - (4 * i + 3)) + ',' + cnt.substring(cnt.length - (4 * i + 3));
    return (((sgn) ? '' : '-') + cnt + '.' + cvs);
}
function graficarHistogramaVentas()
{
    var GRAFICA = 'historial_ventas';
    var posicion = 0;
    jQuery("canvas.peity").last().removeClass("barsVentas").removeClass("pointsVentas");
    jQuery("#histogramaVentas").css("background", "#78bde7");
    jQuery("#tortaVentas").css("background", "#2f2f2f");
    jQuery("#puntosVentas").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.bar = {colours: ["#4d89f9"], delimiter: ",", height: "100%", max: null, min: 0, spacing: 1, width: "100%"};
    var puntos = traerTop10Clientes();
    if (puntos) {
        var barras = "";
        for (var i = 0; i <= puntos.size; i++) {
            barras = barras + "," + puntos[i]['y'];
        }
        if (barras === '') {
            $("#contenidoGraficaVentas").html("<div style='background: white; margin-left: 25px; margin-right:25px; border:1px solid #CCC; color:red;'><h4 style='text-align:center; color:red;'>No hay datos para realizar la graficación...</h4></div>");
        } else {
            jQuery("#contenidoGraficaVentas").html('');
            jQuery("#contenidoGraficaVentas").html('<div id="barVentas" style="display:none;"></div><div id="pieVentas" style="display:none;"></div><div id="lineVentas" style="display:none;"></div>');
            jQuery("#barVentas").text(barras.substr(1));
            jQuery("#barVentas").peity("bar");
            jQuery("#contenidoGraficaVentas").append($("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioHistogramaVentas) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioHistogramaVentas = false;
            }
        }
    }
}
function graficarTortaVentas()
{
    var GRAFICA = 'torta_ventas';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histVentas").removeClass("pointsVentas");
    jQuery("#histogramaVentas").css("background", "#2f2f2f");
    jQuery("#tortaVentas").css("background", "#78bde7");
    jQuery("#puntosVentas").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.pie = {colours: ["#ff9900", "#fff4dd", "#ffd592"], delimiter: null, diameter: "100%", height: null, width: null};
    var puntos = traerTop10Clientes();
    if (puntos) {
        var barras = "";
        for (var i = 0; i <= puntos.size; i++) {
            barras = barras + "," + puntos[i]['y'];
        }
        jQuery("#contenidoGraficaVentas").html('');
        jQuery("#contenidoGraficaVentas").html('<div id="barVentas" style="display:none;"></div><div id="pieVentas" style="display:none;"></div><div id="lineVentas" style="display:none;"></div>');

        jQuery("#pieVentas").text(barras.substr(1));
        jQuery("#pieVentas").peity("pie");
        jQuery("#contenidoGraficaVentas").append($("canvas.peity"));
        for (var i = 0; i < $("canvas.peity").length; i++) {
            if ($("canvas.peity")[i].id === GRAFICA) {
                posicion = i;
            }
        }
        if (inicioTortaVentas) {
            $current = $("canvas.peity:nth-last-child(" + posicion + ")");
            inicioTortaVentas = false;
        }

    }
}
function graficarLineaVentas()
{
    var GRAFICA = 'linea_ventas';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histVentas").removeClass("barsVentas");
    jQuery("#histogramaVentas").css("background", "#2f2f2f");
    jQuery("#tortaVentas").css("background", "#2f2f2f");
    jQuery("#puntosVentas").css("background", "#78bde7");
    jQuery.fn.peity.defaults.line = {colour: "#c6d9fd", strokeColour: "#4d89f9", strokeWidth: 1, delimiter: ",", height: "100%", max: null, min: 0, width: "100%"};
    var puntos = traerTop10Clientes();
    if (puntos) {
        var barras = "";
        for (var i = 0; i <= puntos.size; i++) {
            barras = barras + "," + puntos[i]['y'];
        }
        jQuery("#contenidoGraficaVentas").html('');
        jQuery("#contenidoGraficaVentas").html('<div id="barVentas" style="display:none;"></div><div id="pieVentas" style="display:none;"></div><div id="lineVentas" style="display:none;"></div>');


        jQuery("#lineVentas").text(barras.substr(1));
        jQuery("#lineVentas").peity("line");
        jQuery("#contenidoGraficaVentas").append(jQuery("canvas.peity"));
        for (var i = 0; i < $("canvas.peity").length; i++) {
            if ($("canvas.peity")[i].id === GRAFICA) {
                posicion = i;
            }
        }
        if (inicioLineaVentas) {
            $current = $("canvas.peity:nth-last-child(" + posicion + ")");
            inicioLineaVentas = false;
        }

    }
}
function graficarHistogramaVendedores()
{
    var GRAFICA = 'histograma_vendedores';
    var posicion = 0;
    jQuery("canvas.peity").last().removeClass("barsVendedores").removeClass("pointsVendedores");
    jQuery("#histogramaVendedores").css("background", "#78bde7");
    jQuery("#tortaVendedores").css("background", "#2f2f2f");
    jQuery("#puntosVendedores").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.bar = {colours: ["#4d89f9"], delimiter: ",", height: "100%", max: null, min: 0, spacing: 1, width: "100%"};
    var puntos = traerTop10Vendedores();
    if (puntos) {
        var barras = "";
        for (var i = 0; i <= puntos.size; i++) {
            barras = barras + "," + puntos[i]['y'];
        }
        jQuery("#contenidoGraficaVendedores").html('');
        jQuery("#contenidoGraficaVendedores").html('<div id="barVendedores" style="display:none;"></div><div id="pieVendedores" style="display:none;"></div><div id="lineVendedores" style="display:none;"></div>');
        jQuery("#barVendedores").text(barras.substr(1));
        jQuery("#barVendedores").peity("bar");
        jQuery("#contenidoGraficaVendedores").append($("canvas.peity"));
        for (var i = 0; i < $("canvas.peity").length; i++) {
            if ($("canvas.peity")[i].id === GRAFICA) {
                posicion = i;
            }
        }
        if (inicioHistogramaVentas) {
            $current = $("canvas.peity:nth-last-child(" + posicion + ")");
            inicioHistogramaVentas = false;
        }
    }
}
function graficarTortaVendedores()
{
    var GRAFICA = 'torta_vendedores';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histVendedores").removeClass("pointsVendedores");
    jQuery("#histogramaVendedores").css("background", "#2f2f2f");
    jQuery("#tortaVendedores").css("background", "#78bde7");
    jQuery("#puntosVendedores").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.pie = {colours: ["#ff9900", "#fff4dd", "#ffd592"], delimiter: null, diameter: "100%", height: null, width: null};
    var puntos = traerTop10Vendedores();
    if (puntos) {
        var barras = "";
        for (var i = 0; i <= puntos.size; i++) {
            barras = barras + "," + puntos[i]['y'];
        }
        jQuery("#contenidoGraficaVendedores").html('');
        jQuery("#contenidoGraficaVendedores").html('<div id="barVendedores" style="display:none;"></div><div id="pieVendedores" style="display:none;"></div><div id="lineVendedores" style="display:none;"></div>');
        jQuery("#pieVendedores").text(barras.substr(1));
        jQuery("#pieVendedores").peity("pie");
        jQuery("#contenidoGraficaVendedores").append($("canvas.peity"));

        for (var i = 0; i < $("canvas.peity").length; i++) {
            if ($("canvas.peity")[i].id === GRAFICA) {
                posicion = i;
            }
        }
        if (inicioTortaVendedores) {
            $current = $("canvas.peity:nth-last-child(" + posicion + ")");
            inicioTortaVendedores = false;
        }

    }
}
function graficarLineaVendedores()
{
    var GRAFICA = 'linea_vendedores';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histVendedores").removeClass("barsVendedores");
    jQuery("#histogramaVendedores").css("background", "#2f2f2f");
    jQuery("#tortaVendedores").css("background", "#2f2f2f");
    jQuery("#puntosVendedores").css("background", "#78bde7");
    jQuery.fn.peity.defaults.line = {colour: "#c6d9fd", strokeColour: "#4d89f9", strokeWidth: 1, delimiter: ",", height: "100%", max: null, min: 0, width: "100%"};
    var puntos = traerTop10Vendedores();
    if (puntos) {
        var barras = "";
        for (var i = 0; i <= puntos.size; i++) {
            barras = barras + "," + puntos[i]['y'];
        }
        jQuery("#contenidoGraficaVendedores").html('');
        jQuery("#contenidoGraficaVendedores").html('<div id="barVendedores" style="display:none;"></div><div id="pieVendedores" style="display:none;"></div><div id="lineVendedores" style="display:none;"></div>');

        jQuery("#lineVendedores").text(barras.substr(1));
        jQuery("#lineVendedores").peity("line");
        jQuery("#contenidoGraficaVendedores").append($("canvas.peity"));
        for (var i = 0; i < $("canvas.peity").length; i++) {
            if ($("canvas.peity")[i].id === GRAFICA) {
                posicion = i;
            }
        }
        if (inicioLineaVendedores) {
            $current = $("canvas.peity:nth-last-child(" + posicion + ")");
            inicioLineaVendedores = false;
        }
    }
}
function graficarHistogramaProductos()
{
    var GRAFICA = 'histograma_productos';
    var posicion = 0;
    jQuery("canvas.peity").last().removeClass("barsProductos").removeClass("pointsProductos");
    jQuery("#histogramaProductos").css("background", "#78bde7");
    jQuery("#tortaProductos").css("background", "#2f2f2f");
    jQuery("#puntosProductos").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.bar = {colours: ["#4d89f9"], delimiter: ",", height: "100%", max: null, min: 0, spacing: 1, width: "100%"};
    var puntos = traerTop10Vendedores();
    if (puntos) {
        var barras = "";
        for (var i = 0; i <= puntos.size; i++) {
            barras = barras + "," + puntos[i]['y'];
        }
        jQuery("#contenidoGraficaProductos").html('');
        jQuery("#contenidoGraficaProductos").html('<div id="barProductos" style="display:none;"></div><div id="pieProductos" style="display:none;"></div><div id="lineVendedores" style="display:none;"></div>');
        jQuery("#barProductos").text(barras.substr(1));
        jQuery("#barProductos").peity("bar");
        jQuery("#contenidoGraficaProductos").append($("canvas.peity"));
        for (var i = 0; i < $("canvas.peity").length; i++) {
            if ($("canvas.peity")[i].id === GRAFICA) {
                posicion = i;
            }
        }
        if (inicioHistogramaProductos) {
            $current = $("canvas.peity:nth-last-child(" + posicion + ")");
            inicioHistogramaProductos = false;
        }
    }
}
function graficarTortaProductos()
{
    var GRAFICA = 'torta_productos';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histVendedores").removeClass("pointsProductos");
    jQuery("#histogramaProductos").css("background", "#2f2f2f");
    jQuery("#tortaProductos").css("background", "#78bde7");
    jQuery("#puntosProductos").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.pie = {colours: ["#ff9900", "#fff4dd", "#ffd592"], delimiter: null, diameter: "100%", height: null, width: null};
    var puntos = traerTop10Vendedores();
    if (puntos) {
        var barras = "";
        for (var i = 0; i <= puntos.size; i++) {
            barras = barras + "," + puntos[i]['y'];
        }
        jQuery("#contenidoGraficaProductos").html('');
        jQuery("#contenidoGraficaProductos").html('<div id="barProductos" style="display:none;"></div><div id="pieProductos" style="display:none;"></div><div id="lineProductos" style="display:none;"></div>');
        jQuery("#pieProductos").text(barras.substr(1));
        jQuery("#pieProductos").peity("pie");
        jQuery("#contenidoGraficaProductos").append($("canvas.peity"));

        for (var i = 0; i < $("canvas.peity").length; i++) {
            if ($("canvas.peity")[i].id === GRAFICA) {
                posicion = i;
            }
        }
        if (inicioTortaProductos) {
            $current = $("canvas.peity:nth-last-child(" + posicion + ")");
            inicioTortaProductos = false;
        }

    }
}
function graficarLineaProductos()
{
    var GRAFICA = 'linea_productos';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histProductos").removeClass("barsProductos");
    jQuery("#histogramaProductos").css("background", "#2f2f2f");
    jQuery("#tortaProductos").css("background", "#2f2f2f");
    jQuery("#puntosProductos").css("background", "#78bde7");
    jQuery.fn.peity.defaults.line = {colour: "#c6d9fd", strokeColour: "#4d89f9", strokeWidth: 1, delimiter: ",", height: "100%", max: null, min: 0, width: "100%"};
    var puntos = traerTop10Productos();
    if (puntos) {
        var barras = "";
        for (var i = 0; i <= puntos.size; i++) {
            barras = barras + "," + puntos[i]['y'];
        }
        jQuery("#contenidoGraficaProductos").html('');
        jQuery("#contenidoGraficaProductos").html('<div id="barVendedores" style="display:none;"></div><div id="pieVendedores" style="display:none;"></div><div id="lineVendedores" style="display:none;"></div>');

        jQuery("#lineProductos").text(barras.substr(1));
        jQuery("#lineProductos").peity("line");
        jQuery("#contenidoGraficaProductos").append($("canvas.peity"));
        for (var i = 0; i < $("canvas.peity").length; i++) {
            if ($("canvas.peity")[i].id === GRAFICA) {
                posicion = i;
            }
        }
        if (inicioLineaProductos) {
            $current = $("canvas.peity:nth-last-child(" + posicion + ")");
            inicioLineaProductos = false;
        }
    }
}
function tabVentas1()
{
    jQuery("#navVentas").css("background", "#2f2f2f");
    jQuery("#ventas-tab-1").css("background", "#78bde7");
    jQuery("#ventas-tab-2").css("background", "#2f2f2f");
    jQuery("#ventas-tab-3").css("background", "#2f2f2f");
    jQuery("#contenido-tab-1").css({'display': 'block', 'margin-top': '30px', 'padding': '0 20px'});
    jQuery("#contenido-tab-2").css('display', 'none');
    jQuery("#contenido-tab-3").css('display', 'none');
}
function tabVentas2()
{
    jQuery("#ventas-tab-1").css("background", "#2f2f2f");
    jQuery("#ventas-tab-2").css("background", "#78bde7");
    jQuery("#ventas-tab-3").css("background", "#2f2f2f");
    jQuery("#navVentas").css("background", "#2f2f2f");
    jQuery("#contenido-tab-1").css('display', 'none');
    jQuery("#contenido-tab-2").css({'display': 'block', 'margin-top': '30px', 'padding': '0 20px'});
    jQuery("#contenido-tab-3").css('display', 'none');
}
function tabVentas3()
{
    jQuery("#ventas-tab-1").css("background", "#2f2f2f");
    jQuery("#ventas-tab-2").css("background", "#2f2f2f");
    jQuery("#ventas-tab-3").css("background", "#78bde7");
    jQuery("#navVentas").css("background", "#78bde7");
    jQuery("#contenido-tab-1").css('display', 'none');
    jQuery("#contenido-tab-2").css('display', 'none');
    jQuery("#contenido-tab-3").css({'display': 'block', 'margin-top': '30px', 'padding': '0 20px'});
}
function traerVentas2Prod()
{
    jQuery("#pointsVentas").css("display", "none");
    jQuery("#barsVentas").css("display", "none");
    jQuery("#barsVendedores").css("display", "none");
    jQuery("#pointsVendedores").css("display", "none");
    jQuery("#histVendedores").css("display", "none");
    jQuery("#histVentas").css("display", "block");
    var id_query = "busqueda_ventas";
    var sql = "select first 10 c_barra, sum(pr_venta*cn_venta) from mv_ventas v m where c_barra <> '0' group by c_barra order by sum(pr_venta*cn_venta) desc";
    xmlQueryDB(sql, id_query, 1, false, ruta);
    var ar_status = getStatusDB(id_query);
    var size = ar_status['numrows'] - 1;
    var ar_productos = [], ar_ventas = [];
    var puntos = {};
    for (var u = 0; u <= size; u++) {
        ar_productos[u] = xmlGetRow(id_query, u + 1, 0)['c_barra'];
        ar_ventas[u] = xmlGetRow(id_query, u + 1, 0)['sum'];
        puntos[u] = {x: ar_productos[u], y: ar_ventas[u]};
    }
    puntos.size = size;
    return puntos;
}
function traerTop10Clientes()
{
    jQuery("#pointsVentas").css("display", "none");
    jQuery("#barsVentas").css("display", "none");
    jQuery("#barsVendedores").css("display", "none");
    jQuery("#pointsVendedores").css("display", "none");
    jQuery("#histVendedores").css("display", "none");
    jQuery("#histVentas").css("display", "block");
    var id_query = "busqueda_top_clientes";
    var sql = "select first 10 c.nombres ||' '|| c.apellidos ||'('||round(cc_cliente,0)||')' cliente,sum(vr_subtotal) valor_venta from h_ventas a, m_clientes c where a.cc_cliente=c.cedula and f_factura='23/01/2014' group by 1 order by valor_venta desc";
    xmlQueryDB(sql, id_query, 1, false, ruta);
    var ar_status = getStatusDB(id_query);
    var size = ar_status['numrows'] - 1;
    var ar_cedulas = [], ar_ventas = [];
    var puntos = {};
    for (var u = 0; u <= size; u++) {
        ar_cedulas[u] = xmlGetRow(id_query, u + 1, 0)['cliente'];
        ar_ventas[u] = xmlGetRow(id_query, u + 1, 0)['valor_venta'];
        puntos[u] = {x: ar_cedulas[u], y: ar_ventas[u]};
    }
    puntos.size = size;
    return puntos;
}
pts = {};
function traerTop10Vendedores()
{
    var id_query = "busqueda_top_clientes";
    var sql = "select d_vendedor || '(' || hv.c_vendedor || ')' vendedor, sum(vr_subtotal) valor_venta from h_ventas hv, m_vendors v where hv.c_vendedor = v.c_vendedor and f_factura='23/01/2014' group by 1 order by valor_venta desc";
    xmlQueryDB(sql, id_query, 1, false, ruta);
    var ar_status = getStatusDB(id_query);
    var size = ar_status['numrows'] - 1;
    var ar_cedulas = [], ar_ventas = [];
    pts = {};
    var puntos = {};
    for (var u = 0; u <= size; u++) {
        ar_cedulas[u] = xmlGetRow(id_query, u + 1, 0)['vendedor'];
        ar_ventas[u] = xmlGetRow(id_query, u + 1, 0)['valor_venta'];
        puntos[u] = {x: ar_cedulas[u], y: ar_ventas[u]};
    }
    puntos.size = size;
    return puntos;
}
function llenarTablaVentasXCliente()
{
    var datos = traerTop10Clientes();
    var size = datos.size;
    var filas = [];

    for (var i = 0; i < size; i++) {
        document.getElementById("tab-ventasxclientes-1").innerHTML = "";
    }
    document.getElementById("tab-ventasxclientes-1").innerHTML = "<thead style='background: #d0e841'>" + "<tr>" + "<th>Cédula</th>" + "<th>Total comprado</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    for (var i = 0; i <= size; i++) {
        filas[i] = document.createElement("tr");
        filas[i].setAttribute("id", "tr_" + i);
        filas[i].setAttribute("style", "text-align:center");
        filas[i].innerHTML = "<td>" + datos[i]['x'] + "</td>" + '<td align="right">' + "$ " + toCurrency(datos[i]['y']) + "</td>";
        document.getElementById("tab-ventasxclientes-1").appendChild(filas[i]);
    }
    if (size === -1) {
        document.getElementById("tab-ventasxclientes-1").innerHTML = "<thead style='background: white; color:red;'>" + "<tr>" + "<th style='padding:15px'>La búsqueda no arroja datos</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    }
}
function llenarTablaVentasXVendedor()
{
    var datos = traerTop10Vendedores();
    var size = datos.size;
    var filas = [];
    for (var i = 0; i < size; i++) {
        document.getElementById("tab-ventasxvendedores-1").innerHTML = "";
    }
    document.getElementById("tab-ventasxvendedores-1").innerHTML = "<thead style='background: #d0e841'>" + "<tr>" + "<th>Cédula</th>" + "<th>Total comprado</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    for (var i = 0; i <= size; i++) {
        filas[i] = document.createElement("tr");
        filas[i].setAttribute("id", "tr_" + i);
        filas[i].setAttribute("style", "text-align:center");
        filas[i].innerHTML = "<td>" + datos[i]['x'] + "</td>" + '<td align="right">' + "$ " + toCurrency(datos[i]['y']) + "</td>";
        document.getElementById("tab-ventasxvendedores-1").appendChild(filas[i]);
    }
    if (size === -1) {
        document.getElementById("tab-ventasxclientes-1").innerHTML = "<thead style='background: white; color:red;'>" + "<tr>" + "<th style='padding:15px'>La búsqueda no arroja datos</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    }
}
function llenarTablaProductos()
{
    var datos = traerVentas2Prod();
    var size = datos.size;
    var filas = [];
    for (var i = 0; i < size; i++) {
        document.getElementById("top-productos").innerHTML = "";
    }
    document.getElementById("top-productos").innerHTML = "<thead style='background: #d0e841'>" + "<tr>" + "<th>Producto</th>" + "<th>Número de Ventas</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    for (var i = 0; i < size; i++) {
        filas[i] = document.createElement("tr");
        filas[i].setAttribute("id", "tr_" + i);
        filas[i].setAttribute("style", "text-align:center");
        filas[i].innerHTML = "<td>" + datos[i]['x'] + "</td>" + '<td>' + datos[i]['y'] + "</td>";
        document.getElementById("top-productos").appendChild(filas[i]);
    }
}