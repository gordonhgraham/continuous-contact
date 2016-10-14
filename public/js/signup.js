(function() {
  'use strict';

  $('.modal2');

  // eslint-disable-next-line max-statements
  $('#signup').click((event) => {
    event.preventDefault();

    const first_name = $('#first_name').val().trim();
    const last_name = $('#last_name').val().trim();
    const email = $('#email').val().trim();
    const password = $('#password').val().trim();

    if (!first_name) {
      return Materialize.toast('First name must not be blank', 3000);
    }

    if (!last_name) {
      return Materialize.toast('Last name must not be blank', 3000);
    }

    if (!email) {
      return Materialize.toast('Email must not be blank', 3000);
    }

    if (email.indexOf('@') < 0) {
      return Materialize.toast('Email must be valid', 3000);
    }

    if (!password || password.length < 8) {
      return Materialize.toast(
        'Password must be at least 8 characters long',
        3000
      );
    }

    const options = {
      contentType: 'application/json',
      data: JSON.stringify({ firstName, lastName, email, password }),
      dataType: 'json',
      type: 'POST',
      url: '/user'
    };

    $.ajax(options)
      .done(() => {
        window.location.href = 'user';
      })
      .fail(($xhr) => {
        Materialize.toast($xhr.responseText, 3000);
      });
  });
})();
