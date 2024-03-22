$(document).ready(function() {
 
    jQuery.validator.addMethod (
        'passwordCheck',
        function (value, element) {
          return (
            this.optional (element) ||
            /^(?=.*[0-9])(?=.*[a-z])(?!.* ).{8,16}$/i.test (value)
          );
        },
        'Letters and numbers only please'
      );
    
      $ ('#signup').validate ({
        rules: {
          user_name: {
            required: true,
            minlength: 3,
          },
          password: {
            required: true,
            minlength: 8,
            maxlength: 15,
            passwordCheck: true,
          },
          password_confirm: {
            required: true,
            equalTo: '#password',
          },
          user_email: {
            required: true,
            email: true,
          },
        },
        messages: {
          user_name: {
            required: 'please enter valid name',
            minlength: 'need more',
          },
          password: {
            required: 'please provide a password',
            minlength: 'password at least have 8 characters',
            passwordCheck: 'Should contain number and alphabets',
          },
          user_email: 'please enter a valid email address',
          password_confirm: {
            required: 'please retype your password',
            equalTo: "password doesn't match !",
          },
        },
        submitHandler: submitForm,
      });
    function submitForm(){
        $.ajax({
                url:"./php/register.php",
                type:"post",
                data:$("#signup").serialize(),
                success:function(response){
                  if (response["status"] == 200){
                    localStorage.setItem("id",response["userid"])
                    alert("Registered Successfully")
                    $("#signup")[0].reset();}
                    else{
                      alert("Registeration failed")
                    }}
        })
    }
});