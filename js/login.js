$('document').ready(function () {
  var storedToken = localStorage.getItem('token');
  // if(storedToken){}
  $('#login').validate({
    rules: {
      user_email: {
        required: true,
        email: true,
      },
    },
    messages: {
      user_email: 'please enter email',
    },
    submitHandler: loginForm,
  });

  // $('#login').submit(loginForm);
  function loginForm() {
    var data = {"email": $("#email").val(), "password": $("#password").val()}
    $.ajax({
      url: "./php/login.php",
      type: "post",
      data: data,
      success: function (response) {
        response = JSON.parse(response);
        console.log(response);
        if (response["status"] == 200) {
          var token=response["token"];
          localStorage.setItem('token',token);
          window.location.replace("./profile.html");
          $("#login")[0].reset();
        }
        else{
          alert("Invalid credentials");
          
        }
      }
      

    })
  }

  return false;
});
