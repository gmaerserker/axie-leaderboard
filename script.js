const leaderboard = document.getElementById("leaderboard");
const pagination = document.getElementById("pagination");

const perPage = 50;
let currentPage = 1;
let players = [];

// Simulación de datos
for (let i = 1; i <= 2010; i++) {
  players.push({
    rank: i,
    name: `Jugador ${i}`,
    axies: [
      `https://axiecdn.axieinfinity.com/axies/123456/axie/axie-full-transparent.png`,
      `https://axiecdn.axieinfinity.com/axies/234567/axie/axie-full-transparent.png`,
      `https://axiecdn.axieinfinity.com/axies/345678/axie/axie-full-transparent.png`
    ],
    lastUpdate: `${Math.floor(Math.random() * 60)} min`,
  });
}

function renderPlayerRow(p) {
  const row = document.createElement("div");
  row.className = "player-row";
  row.innerHTML = `
    <span>#${p.rank}</span>
    <span>${p.name}</span>
    <div class="team">
      ${p.axies.map(src => `<img src="${src}" alt="Axie" />`).join("")}
    </div>
    <span>${p.lastUpdate}</span>
  `;
  leaderboard.appendChild(row);
}

function renderPage(page) {
  // Limpiar leaderboard excepto el encabezado
  leaderboard.innerHTML = `
    <div class="table-header">
      <span>RANGO</span>
      <span>JUGADOR</span>
      <span>ÚLTIMO EQUIPO CLASIFICADO</span>
      <span>ÚLTIMA CLASIFICACIÓN HACE</span>
    </div>
  `;
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const visiblePlayers = players.slice(start, end);
  visiblePlayers.forEach(renderPlayerRow);
  renderPagination(page);
}

function renderPagination(activePage) {
  pagination.innerHTML = "";
  const totalPages = Math.ceil(players.length / perPage);
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = i === activePage ? "active" : "";
    btn.onclick = () => {
      currentPage = i;
      renderPage(i);
    };
    pagination.appendChild(btn);
  }
}

renderPage(currentPage);
