const myModal = new bootstrap.Modal("#transaction-modal");
const session = localStorage.getItem("session");
let logged = sessionStorage.getItem("logged");
let data = { transactions: [] };

checkLogged();

document.getElementById("btn-logout").addEventListener("click", logout);
document.getElementById("transaction-form").addEventListener("submit", adicionarLancamento);

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

  getTransactions();

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

  getTransactions();
};

function getTransactions() {
  const transactions = data.transactions;
  let transactionsHtml = ``;

  if(transactions.length) {
    transactions.forEach((item) => {
      let type = "Entrada";

      if(item.type === "2") {
        type = "Saída"
      }

      transactionsHtml += `
        <tr>
          <th scope="row">${item.date}</th>
          <td>${item.value.toFixed(2)}</td>
          <td>${type}</td>
          <td>${item.description}</td>
        </tr>
      `
    })
  }
  document.getElementById("transactions-list").innerHTML = transactionsHtml;
};


function logout() {
  sessionStorage.removeItem("logged")
  localStorage.removeItem("session")

  window.location.href = "index.html"
};