// Establece la fuente y el color por defecto para los gráficos de Chart.js, simulando el estilo de Bootstrap
Chart.defaults.global.defaultFontFamily = 'Nunito',
    '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Función personalizada para darle formato a los números (como agregar comas o decimales)
// Por ejemplo, convierte 1234.5 en "1,234.50"
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

    // Redondea el número y lo separa en parte entera y decimal
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');

    // Añade separadores de miles
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }

    // Añade ceros si los decimales no son suficientes
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }

    return s.join(dec);
}

// ==== GRÁFICO DE LÍNEA (ÁREA) ====

// Busca el canvas con id "myAreaChart" para dibujar el gráfico ahí
var ctx = document.getElementById("myAreaChart");

// Crea un nuevo gráfico de tipo 'line' (línea)
var myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
        // Etiquetas en el eje X (meses)
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],

        // Dataset que contiene los valores a mostrar
        datasets: [{
            label: "Earnings", // Título de la línea
            lineTension: 0.3, // Suavizado de la curva
            backgroundColor: "rgba(78, 115, 223, 0.05)", // Color de fondo debajo de la línea
            borderColor: "rgba(78, 115, 223, 1)", // Color de la línea
            pointRadius: 3, // Tamaño de cada punto
            pointBackgroundColor: "rgba(78, 115, 223, 1)", // Color de fondo de los puntos
            pointBorderColor: "rgba(78, 115, 223, 1)", // Borde de los puntos
            pointHoverRadius: 3, // Tamaño cuando el mouse pasa sobre un punto
            pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
            pointHoverBorderColor: "rgba(78, 115, 223, 1)",
            pointHitRadius: 10, // Área activa del punto para clics o hovers
            pointBorderWidth: 2, // Grosor del borde del punto
            // Valores a mostrar mes por mes
            data: [0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 20000, 30000, 25000, 40000],
        }],
    },
    options: {
        maintainAspectRatio: false, // Permite que el gráfico se ajuste al tamaño del contenedor
        layout: {
            padding: { // Márgenes internos del gráfico
                left: 10,
                right: 25,
                top: 25,
                bottom: 0
            }
        },
        scales: {
            // Configuración del eje X
            xAxes: [{
                time: {
                    unit: 'date' // Muestra las etiquetas como fechas (en este caso, meses)
                },
                gridLines: {
                    display: false, // No muestra líneas verticales
                    drawBorder: false
                },
                ticks: {
                    maxTicksLimit: 7 // Máximo de etiquetas visibles en X
                }
            }],
            // Configuración del eje Y
            yAxes: [{
                ticks: {
                    maxTicksLimit: 5, // Máximo de etiquetas visibles en Y
                    padding: 10, // Espacio entre los números y el gráfico
                    // Agrega el signo $ a cada número
                    callback: function (value, index, values) {
                        return '$' + number_format(value);
                    }
                },
                gridLines: {
                    color: "rgb(234, 236, 244)", // Color de las líneas horizontales
                    zeroLineColor: "rgb(234, 236, 244)",
                    drawBorder: false,
                    borderDash: [2], // Estilo punteado
                    zeroLineBorderDash: [2]
                }
            }],
        },
        legend: {
            display: false // Oculta la leyenda (el recuadro con el nombre del dataset)
        },
        tooltips: {
            backgroundColor: "rgb(255,255,255)", // Fondo blanco
            bodyFontColor: "#858796", // Color del texto
            titleMarginBottom: 10,
            titleFontColor: '#6e707e',
            titleFontSize: 14,
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false, // No muestra el cuadrado de color del dataset
            intersect: false, // Muestra tooltip aunque no se pase exactamente por un punto
            mode: 'index',
            caretPadding: 10,
            // Personaliza lo que se muestra dentro del tooltip
            callbacks: {
                label: function (tooltipItem, chart) {
                    var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                    return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
                }
            }
        }
    }
});
