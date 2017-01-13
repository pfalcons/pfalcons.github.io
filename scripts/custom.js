$("#contact-form").validate({
  submitHandler: function(form) {
    $.ajax({
      url: "//formspree.io/contact@whitsitt.org",
      method: "POST",
      data: {
        _replyto: $(form).find("input[name='_replyto']").val(),
        message: $(form).find("textarea[name='message']").val()
      },
      dataType: "json",
      success: function() {
        $("#submit-success").fadeIn();
      },
      error: function() {
        $("#submit-errors").fadeIn();
      }
    });
  }
});
