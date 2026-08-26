// Fase 4: API Async
async function ambilKutipan(elemenTarget) {
  try {
    const res = await fetch("https://dummyjson.com/quotes/random");
    if (!res.ok) throw new Error("Gagal mengambil kutipan");

    const data = await res.json();
    elemenTarget.textContent = `"${data.quote}" — ${data.author}`;
  } catch (error) {
    console.error("Detail data Error:", error.message);
    elemenTarget.textContent = "Gagal memuat kutipan. Coba lagi.";
  }
}

async function ambilCuaca(kota, elemenTarget) {
  const apiKey = "18903514fb960080634adfa5cacdc75e";
  elemenTarget.textContent = "Memuat data cuaca...";

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${kota}&appid=${apiKey}&units=metric&lang=id`
    );

    if (!res.ok) {
      if (res.status === 404) throw new Error("Kota tidak ditemukan");
      if (res.status === 401) throw new Error("API Key tidak valid");
      throw new Error("Gagal mengambil data cuaca");
    }

    const data = await res.json();

    const namaKota = data.name;
    const suhu = Math.round(data.main.temp);
    const deskripsi = data.weather[0].description;

    elemenTarget.innerHTML = `<p><strong>${namaKota}</strong>: ${suhu}°C, ${deskripsi}</p>`;
  } catch (error) {
    console.error("Detail Error Cuaca:", error);
    elemenTarget.textContent = error.message;
  }
}

async function muatSemuaWidget() {
  await Promise.all([
    ambilKutipan(kutipanHarian),
    ambilCuaca(inputKota.value.trim(), infoCuaca),
  ]);
}

// Fase 5: Drag and Drop & Dark Mode
function aktifkanDragDrop() {
  const items = document.querySelectorAll(".tugas-item");

  items.forEach((item) => {
    item.setAttribute("draggable", true);

    item.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", item.dataset.id);
    });
  });

  const list = document.getElementById("daftar-tugas");
  if (!list) return;

  list.addEventListener("dragover", (e) => e.preventDefault());

  list.addEventListener("drop", (e) => {
    e.preventDefault();
    const idSumber = e.dataTransfer.getData("text/plain");
    const liTarget = e.target.closest(".tugas-item");
    if (!liTarget || liTarget.dataset.id === idSumber) return;

    const idTujuan = liTarget.dataset.id;
    const iSumber = daftarTugas.findIndex((t) => String(t.id) === idSumber);
    const iTujuan = daftarTugas.findIndex((t) => String(t.id) === idTujuan);
    if (iSumber === -1 || iTujuan === -1) return;

    const [item] = daftarTugas.splice(iSumber, 1);
    daftarTugas.splice(iTujuan, 0, item);

    simpanKeStorage();
    renderTugas();
  });
}

// Dark Mode
const toggleTema = document.createElement("button");
toggleTema.id = "toggle-tema";
toggleTema.textContent = "Mode Gelap";
document.querySelector(".header").appendChild(toggleTema);

toggleTema.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const aktif = document.body.classList.contains("dark-mode");
  localStorage.setItem("tema", aktif ? "gelap" : "terang");
  toggleTema.textContent = aktif ? "Mode Terang" : "Mode Gelap";
});

function terapkanTemaTersimpan() {
  if (localStorage.getItem("tema") === "gelap") {
    document.body.classList.add("dark-mode");
    toggleTema.textContent = "Mode Terang";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  muatDariStorage();
  muatCatatanDariStorage();
  terapkanTemaTersimpan();
  renderTugas(filterAktif);
  renderCatatan();
  muatSemuaWidget();
});