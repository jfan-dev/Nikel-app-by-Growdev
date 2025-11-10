const myModal = new bootstrap.Modal("#register-modal");

const session = localStorage.getItem("session");
let logged = sessionStorage.getItem("logged");

checkLogged();

document.getElementById("create-form").addEventListener("submit", criarConta);
document.getElementById("login-form").addEventListener("submit", logarConta);

document.querySelectorAll('[data-toggle-for]').forEach(toggle => {
  const input = document.getElementById(toggle.dataset.toggleFor);

  toggle.addEventListener('click', () => {
    const isPassword = input.getAttribute('type') === 'password';
    input.setAttribute('type', isPassword ? 'text' : 'password');

    toggle.classList.toggle('bi-eye', !isPassword);
    toggle.classList.toggle('bi-eye-slash', isPassword);
    toggle.style.color = isPassword ? '#0d6efd' : '#6c757d';
  });
});

function criarConta(event) {
  event.preventDefault();

  const email = document.getElementById("create-email-input").value;
  const password = document.getElementById("password-create-input").value;

  function validarEmail(email) {
    const padraoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return padraoEmail.test(email);
  };

  function validarSenha(password) {
    const padraoSenha = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return padraoSenha.test(password);
  };

  if (validarEmail(email) && validarSenha(password)){
    alert("✅ Conta criada com sucesso");
    
    saveAccount({
      login: email,
      password: password,
      transactions: []
    });

    myModal.hide();
    return
  }; 
    
  alert("❌ E-mail e/ou senha não seguem os padrões.");
};

function logarConta(event) {
  event.preventDefault();
  
  const email = document.getElementById("email-input").value;
  const password = document.getElementById("password-input").value;
  const checkSession = document.getElementById("session-check").checked;

  const account = getAccount(email);

  if (!account || account.password !== password) {
    return alert("❌ Verifique se o e-mail e a senha estão corretos.");
  };

  saveSession(email, checkSession);

  window.location.href = "home.html";
};

function checkLogged() {
  const activeSession = session || logged;

  if (activeSession) {
    saveSession(activeSession, !!session);
    window.location.href = "home.html";
  }
};

function getAccount(key) {
  const account = localStorage.getItem(key);

  return account ? JSON.parse(account) : "";
};

function saveAccount(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
};

function saveSession(data, checkSession) {
  checkSession ? localStorage.setItem("session", data) : sessionStorage.setItem("logged", data);
};


