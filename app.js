const birthdayForm = document.querySelector("form#birthdayForm");
const resultBlock = document.querySelector("div.result");

function isValideBirthday(bithdayString, todayDate) {
  const tab = bithdayString.split("-");

  if (parseInt(tab[0]) < 1900 || parseInt(tab[0]) > todayDate.getFullYear()) {
    return false;
  }

  if (parseInt(tab[1]) <= 0 || parseInt(tab[1]) > 12) {
    return false;
  }

  if (parseInt(tab[2]) <= 0 || parseInt(tab[1]) > 31) {
    return false;
  }

  return true;
}

function getAgeParts(bithdayString, todayDate) {
  const birthdayDate = new Date(bithdayString);
  const dateInterval = todayDate.getTime() - birthdayDate.getTime();
  const intervalToNumberOfDay = dateInterval / (1000 * 60 * 60 * 24);

  const numberOfYear = Math.floor(intervalToNumberOfDay / 365);
  const numberOfMonth = Math.floor((intervalToNumberOfDay % 365) / 30);
  const numberOfDay = Math.floor((intervalToNumberOfDay % 365) % 30);

  const ageParts = {
    years: numberOfYear,
    months: numberOfMonth,
    days: numberOfDay,
  };

  return ageParts;
}

function displayAge(resultArea, { years, months, days }) {
  const yearsTag = document.createElement("span");
  yearsTag.textContent = `${years}`;

  const monthsTag = document.createElement("span");
  monthsTag.textContent = `${months}`;

  const daysTag = document.createElement("span");
  daysTag.textContent = `${days}`;

  const message = document.createElement("span");
  message.textContent =
    " Rappellez vous de definir des objectifs SMART pour 2024.";

  const resultTag = resultArea.querySelector("p");
  resultTag.textContent = "";
  resultTag.classList.remove("error");

  resultTag.appendChild(document.createTextNode("Vous avez "));
  resultTag.insertAdjacentElement("beforeEnd", yearsTag);
  resultTag.appendChild(document.createTextNode(" ans, "));
  resultTag.insertAdjacentElement("beforeEnd", monthsTag);
  resultTag.appendChild(document.createTextNode(" mois et "));
  resultTag.insertAdjacentElement("beforeEnd", daysTag);
  resultTag.appendChild(document.createTextNode(" jours."));
  resultTag.insertAdjacentElement("beforeEnd", message);
}

birthdayForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const { birthday } = e.target.elements;
  const today = new Date();

  if (isValideBirthday(birthday.value, today)) {
    const ageParts = getAgeParts(birthday.value, today);
    displayAge(resultBlock, ageParts);
  } else {
    const errorTag = document.querySelector(".result p");
    errorTag.classList.add("error");
    errorTag.textContent = "Informations incorrectes";
  }
});
