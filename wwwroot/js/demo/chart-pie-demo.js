// Configura la fuente y color por defecto para los gráficos, imitando el estilo predeterminado de Bootstrap
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Obtiene el contexto del canvas con id "myPieChart"
var ctx = document.getElementById("myPieChart");

// Crea un gráfico tipo doughnut (rosquilla)
var myPieChart = new Chart(ctx, {
    type: 'doughnut', // Tipo de gráfico
    data: {
        labels: ["Direct", "Referral", "Social"], // Etiquetas para cada porción del gráfico
        datasets: [{
            data: [55, 30, 15], // Porcentaje de cada categoría
            backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'], // Colores de fondo por defecto
            hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'], // Colores al pasar el mouse
            hoverBorderColor: "rgba(234, 236, 244, 1)", // Borde al hacer hover
        }],
    },
    options: {
        maintainAspectRatio: false, // Permite que el gráfico se ajuste al contenedor
        tooltips: {
            backgroundColor: "rgb(255,255,255)", // Fondo blanco para el tooltip
            bodyFontColor: "#858796", // Color del texto
            borderColor: '#dddfeb', // Color del borde del tooltip
            borderWidth: 1, // Grosor del borde
            xPadding: 15, // Espaciado horizontal interno
            yPadding: 15, // Espaciado vertical interno
            displayColors: false, // No muestra los colores del dataset dentro del tooltip
            caretPadding: 10, // Espaciado entre el puntero del tooltip y el contenido
        },
        legend: {
            display: false // Oculta la leyenda
        },
        cutoutPercentage: 80, // Porcentaje de recorte del centro del doughnut (tamaño del agujero)
    },
});
