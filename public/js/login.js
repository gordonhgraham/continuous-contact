$(document).ready(function() {
  'use strict';

  $('.modal1');

  $('#login').click((event) => {
    console.log("THIS IS THE LOGIN CLICK");
    event.preventDefault();

    const email = $('#login_email').val().trim();
    const password = $('#login_password').val().trim();

    console.log("1-email " + email);
    console.log("2-password" + password);

    if (!email) {
      return Materialize.toast('Email must not be blank', 3000);
    }

    if (!password) {
      return Materialize.toast('Password must not be blank', 3000);
    }

    const options = {
      contentType: 'application/json',
      data: JSON.stringify({ email, password }),
      dataType: 'json',
      type: 'POST',
      url: `/user/login`
    };

    $.ajax(options)
      .done(() => {
        window.location.href = 'user';
      })
      .fail(($xhr) => {
        Materialize.toast($xhr.responseText, 3000);
      });
  });
})
// ();
