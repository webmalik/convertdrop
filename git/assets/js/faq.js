$(document).ready(function() {
    $('.accordion-header').click(function() {
      // Скрываем все открытые панели
      $('.accordion-content').slideUp();
      $('.accordion-header').removeClass('active');
  
      // Проверяем, является ли текущая панель открытой
      if ($(this).next('.accordion-content').is(':hidden')) {
        // Открываем текущую панель с плавной анимацией
        $(this).next('.accordion-content').slideDown();
        $(this).addClass('active');
      }
    });
  });