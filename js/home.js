const myModal = new bootstrap.Modal("#transaction-modal");
const session = localStorage.getItem("session");
let logged = sessionStorage.getItem("logged");
let data = { transactions: [] };

checkLogged();

document.getElementById("btn-logout").addEventListener("click", logout);
document.getElementById("transaction-form").addEventListener("submit", adicionarLancamento);
document.getElementById("transaction-btn").addEventListener("click", function(){window.location.href = "transactions.html"});

function adicionarLancamento(event) {
  event.preventDefault();

  const value = parseFloat(document.getElementById("value-input").value);
  const description = document.getElementById("description-input").value;
  const date = document.getElementById("date-input").value;
  const type = document.querySelector('input[name="type-input"]:checked').value;

  data.transactions.unshift({
    value: value,
    type: type,
    description: description,
    date: date
  });

  saveData(data);
  event.target.reset();
  myModal.hide();

  displayEntradas();
  displaySaidas();
  displayTotal();

  alert("Lançamento adicionado com sucesso. 💸");

};

function saveData(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
};

function checkLogged() {
  const activeSession = session || logged;

  if (!activeSession) return (window.location.href = "index.html");

  const dataUser = localStorage.getItem(session || logged);

  if (dataUser) {
    data = JSON.parse(dataUser);
  }

  displayEntradas();
  displaySaidas();
  displayTotal();
};

function displayEntradas() {
  const transactions = data.transactions;

  const entradas = transactions.filter((item) => item.type === "1");

  if(entradas.length) {
    let entradasHtml = ``;
    let limit = 0;
  

    if(entradas.length > 3) {
      limit = 3;
    } else {
      limit = entradas.length;
    };

    for (let index = 0; index < limit; index++) {
      entradasHtml += `
        <div class="row mb-4">
          <div class="col-12">
            <h3 class="fs-2 text-success">R$ ${entradas[index].value.toFixed(2)}</h3>
            <div class="container p-0">
              <div class="row">
                <div class="col-md-8">
                  <p>${entradas[index].description}</p>
                </div>
                <div class="col-md-3 d-flex justify-content-end">
                  ${entradas[index].date}
                </div>
              </div>
            </div>
          </div>
        </div>
      `
    };

    document.getElementById("entradasLista").innerHTML = entradasHtml;
  };
};

function displaySaidas() {
  const transactions = data.transactions;

  const saidas = transactions.filter((item) => item.type === "2");

  if(saidas.length) {
    let saidasHtml = ``;
    let limit = 0;
  

    if(saidas.length > 3) {
      limit = 3;
    } else {
      limit = saidas.length;
    };

    for (let index = 0; index < limit; index++) {
      saidasHtml += `
        <div class="row mb-4">
          <div class="col-12">
            <h3 class="fs-2 text-danger">R$ ${saidas[index].value.toFixed(2)}</h3>
            <div class="container p-0">
              <div class="row">
                <div class="col-md-8">
                  <p>${saidas[index].description}</p>
                </div>
                <div class="col-md-3 d-flex justify-content-end">
                  ${saidas[index].date}
                </div>
              </div>
            </div>
          </div>
        </div>
      `
    };

    document.getElementById("saidasLista").innerHTML = saidasHtml;
  };
};

function displayTotal() {
  const transactions = data.transactions;
  let total = 0;

  transactions.forEach((item) => {
    if(item.type ==="1") {
      total += item.value;
    } else {
      total -= item.value;
    };
  });

  const saldo = document.getElementById("total");
  saldo.innerHTML = `R$ ${total.toFixed(2)}`;

  if (total >= 0) {
    saldo.classList.add("text-success");
  } else {
    saldo.classList.add("text-danger");
  }
};

function logout() {
  sessionStorage.removeItem("logged")
  localStorage.removeItem("session")

  window.location.href = "index.html"
};