// Configura la fuente y color por defecto para todos los gráficos de Chart.js, simulando el estilo de Bootstrap
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Función para formatear números con separadores de miles y decimales personalizados
function number_format(number, decimals, dec_point, thousands_sep) {
    number = (number + '').replace(',', '').replace(' ', '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };

    // Redondea y separa parte entera y decimal
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');

    // Añade separador de miles
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }

    // Añade ceros si faltan decimales
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }

    return s.join(dec);
}

// Obtiene el contexto del canvas con id "myBarChart"
var ctx = document.getElementById("myBarChart");

// Crea un nuevo gráfico de barras
var myBarChart = new Chart(ctx, {
    type: 'bar', // Tipo de gráfico: barra
    data: {
        labels: ["January", "February", "March", "April", "May", "June"], // Etiquetas del eje X
        datasets: [{
            label: "Revenue", // Etiqueta de la serie de datos
            backgroundColor: "#4e73df", // Color de fondo de las barras
            hoverBackgroundColor: "#2e59d9", // Color al pasar el mouse
            borderColor: "#4e73df", // Color del borde
            data: [4215, 5312, 6251, 7841, 9821, 14984], // Datos de ingresos
        }],
    },
    options: {
        maintainAspectRatio: false, // Permite que el gráfico se adapte al contenedor
        layout: {
            padding: {
                left: 10,
                right: 25,
                top: 25,
                bottom: 0
            }
        },
        scales: {
            xAxes: [{
                time: {
                    unit: 'month' // Unidad de tiempo para las etiquetas (mes)
                },
                gridLines: {
                    display: false, // Oculta las líneas de cuadrícula
                    drawBorder: false // No dibuja el borde del eje
                },
                ticks: {
                    maxTicksLimit: 6 // Máximo de etiquetas visibles en el eje X
                },
                maxBarThickness: 25, // Grosor máximo de las barras
            }],
            yAxes: [{
                ticks: {
                    min: 0, // Valor mínimo del eje Y
                    max: 15000, // Valor máximo del eje Y
                    maxTicksLimit: 5, // Número máximo de etiquetas en Y
                    padding: 10, // Espacio interior
                    // Formatea los valores con símbolo de dólar
                    callback: function (value, index, values) {
                        return '$' + number_format(value);
                    }
                },
                gridLines: {
                    color: "rgb(234, 236, 244)", // Color de las líneas de cuadrícula
                    zeroLineColor: "rgb(234, 236, 244)", // Color de la línea del valor 0
                    drawBorder: false, // No dibuja el borde del eje
                    borderDash: [2], // Estilo punteado
                    zeroLineBorderDash: [2] // Línea 0 punteada
                }
            }],
        },
        legend: {
            display: false // Oculta la leyenda del gráfico
        },
        tooltips: {
            titleMarginBottom: 10,
            titleFontColor: '#6e707e',
            titleFontSize: 14,
            backgroundColor: "rgb(255,255,255)", // Fondo blanco para tooltip
            bodyFontColor: "#858796",
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false, // No muestra colores de muestra
            caretPadding: 10,
            // Personaliza el texto que aparece en el tooltip
            callbacks: {
                label: function (tooltipItem, chart) {
                    var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                    return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
                }
            }
        },
    }
});
