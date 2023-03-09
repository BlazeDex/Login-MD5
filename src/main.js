let user = document.forms['form']['user'];
let password = document.forms['form']['password'];

let wrongUser = document.getElementById('wrong_user');
let wrongPassword = document.getElementById('wrong_pass');

function validated() {
    if(user.value.length < 1) {
        wrongUser.style.display = "block";
        user.focus();
        return false;
    } if(password.value.length < 1) {
        wrongPassword.style.display = "block";
        password.focus();
        return false;
    }

}