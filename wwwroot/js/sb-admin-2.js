(function ($) {
    "use strict"; // Se activa el modo estricto para evitar errores comunes en JavaScript

    // Cuando se hace clic en los botones del menú lateral (tanto arriba como al costado),
    // se alterna la visibilidad del menú (se abre o se cierra)
    $("#sidebarToggle, #sidebarToggleTop").on('click', function (e) {
        $("body").toggleClass("sidebar-toggled");
        $(".sidebar").toggleClass("toggled");

        // Si el menú está colapsado, se asegura de cerrar todos los submenús
        if ($(".sidebar").hasClass("toggled")) {
            $('.sidebar .collapse').collapse('hide');
        };
    });

    // Cada vez que se redimensiona la ventana del navegador:
    $(window).resize(function () {
        // Si el ancho es menor a 768px, se cierran todos los submenús del sidebar
        if ($(window).width() < 768) {
            $('.sidebar .collapse').collapse('hide');
        };

        // Si el ancho es menor a 480px y el sidebar aún no está colapsado, se colapsa automáticamente
        if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
            $("body").addClass("sidebar-toggled");
            $(".sidebar").addClass("toggled");
            $('.sidebar .collapse').collapse('hide');
        };
    });

    // En pantallas grandes, evita que el contenido se desplace al hacer scroll sobre la barra lateral
    $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function (e) {
        if ($(window).width() > 768) {
            var e0 = e.originalEvent,
                delta = e0.wheelDelta || -e0.detail;

            // Ajusta manualmente el scroll para que no afecte al contenido principal
            this.scrollTop += (delta < 0 ? 1 : -1) * 30;
            e.preventDefault(); // Previene el comportamiento por defecto del scroll
        }
    });

    // Mostrar o esconder el botón de "volver arriba" dependiendo de cuánto se haya hecho scroll
    $(document).on('scroll', function () {
        var scrollDistance = $(this).scrollTop();

        if (scrollDistance > 100) {
            $('.scroll-to-top').fadeIn(); // Aparece el botón
        } else {
            $('.scroll-to-top').fadeOut(); // Desaparece el botón
        }
    });

    // Cuando se hace clic en el botón de "volver arriba", se realiza un desplazamiento suave hasta arriba
    $(document).on('click', 'a.scroll-to-top', function (e) {
        var $anchor = $(this);

        // Realiza un scroll animado hacia la parte superior de la página
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top)
        }, 1000, 'easeInOutExpo');

        e.preventDefault(); // Evita que se ejecute el comportamiento normal del enlace
    });

})(jQuery); // Fin del uso de jQuery y del modo estricto

