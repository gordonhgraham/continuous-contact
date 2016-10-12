$(document).ready(function() {
  $('.modal-trigger').leanModal();

  $(`tr`).click((event) => {
    $.ajax()
      .done(() => {
        window.location.href = '/contact';
      });
  });
  $('.button-collapse').sideNav();
  $('.parallax').parallax();
});
