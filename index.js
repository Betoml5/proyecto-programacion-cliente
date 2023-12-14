import { EQUIPOS_LIGAMX } from "./db.js";
const URL =
  "https://newsapi.org/v2/top-headlines?country=mx&category=sports&apiKey=bb73485e020041b7aee3e2be317f13e7";

const BEAPI_URL =
  "https://apiclient.besoccerapps.com/scripts/api/api.php?key=8688aa381310bb017be76e16762a4019";

const $container = document.querySelector(".container");
const $containerNews = document.querySelector(".container__news-items");
const $containerTeams = document.querySelector(".container__news-teams");

const viewTeamDetails = (id) => {
  sessionStorage.setItem("team", JSON.stringify(EQUIPOS_LIGAMX[id - 1]));
  window.location.href = "detalles-equipo.html";
};

const renderTeams = () => {
  EQUIPOS_LIGAMX.map((team) => {
    const $div = document.createElement("div");
    $div.classList.add("container__news-team");
    const $button = document.createElement("button");
    const $a = document.createElement("a");
    $a.href = "javascript:";
    $a.onclick = () => viewTeamDetails(team.id);
    $a.textContent = team.nombre;
    $button.appendChild($a);
    $div.appendChild($button);
    $containerTeams.appendChild($div);
  });
};

const render = async () => {
  const data = await getData(URL);
  const news = renderNews(data);
  $containerNews.innerHTML = news.join("");
};

const getData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const renderNews = (data) => {
  return data.articles.map((article) => {
    return `
        <div class="container__news-item">
        ${
          article.urlToImage
            ? `<img src="${article.urlToImage}" alt="${article.title}">`
            : `

            `
        }
        <h2 class="container__news-item-headline">${article.title}</h2>
        <p>${article.description || ""}</p>
        <a href="${article.url}" target="_blank">Leer más</a>
        </div>
        `;
  });
};

render();
renderTeams();
