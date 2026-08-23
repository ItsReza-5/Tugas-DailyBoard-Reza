console.log("DailyBoard siap dijalankan!");

const app = document.getElementById("app");

// Fase 1
// Membuat elemen judul
const judul = document.createElement("h2");
judul.textContent = "Selamat Datang di DailyBoard!";
app.appendChild(judul);
judul.style.color = "#2563eb";

// Membuat 4 Section (Tugas, Catatan, Cuaca, Kutipan Hari Ini)
const tugasSection = document.createElement("section");
tugasSection.id = "tugas";

const catatanSection = document.createElement("section");
catatanSection.id = "catatan";

const cuacaSection = document.createElement("section");
cuacaSection.id = "cuaca";

// Section khusus Kutipan Hari Ini
const kutipanSection = document.createElement("section");
kutipanSection.id = "kutipan";

const titleKutipan = document.createElement("h3");
titleKutipan.textContent = "Kutipan Hari Ini";

const kutipanHarian = document.createElement("p");
kutipanHarian.id = "kutipan-harian";
kutipanHarian.textContent = "Memuat kutipan...";

// Tombol refresh kutipan
const btnRefreshKutipan = document.createElement("button");
btnRefreshKutipan.textContent = "Refresh Kutipan";

kutipanSection.append(titleKutipan, kutipanHarian, btnRefreshKutipan);

btnRefreshKutipan.addEventListener("click", () => {
  kutipanHarian.textContent = "Memuat kutipan...";
  ambilKutipan(kutipanHarian);
});

// Section Cuaca
const titleCuaca = document.createElement("h3");
titleCuaca.textContent = "Cuaca Hari Ini";

const inputKota = document.createElement("input");
inputKota.type = "text";
inputKota.id = "input-kota";
inputKota.placeholder = "Nama kota...";
inputKota.value = "Jakarta";  

const btnCekCuaca = document.createElement("button");
btnCekCuaca.textContent = "Cek Cuaca";

const infoCuaca = document.createElement("div");
infoCuaca.id = "info-cuaca";

cuacaSection.append(titleCuaca, inputKota, btnCekCuaca, infoCuaca);

btnCekCuaca.addEventListener("click", () => {
  if (!validInput(inputKota.value)) return;
  ambilCuaca(inputKota.value.trim(), infoCuaca);
});

// Menambahkan semua section ke app
app.append(tugasSection, catatanSection, cuacaSection, kutipanSection);

// --- SEKSI TUGAS ---
const titleTugas = document.createElement("h3");
titleTugas.textContent = "Tugas Mingguan";

const inputTugas = document.createElement("input");
inputTugas.type = "text";
inputTugas.placeholder = "Tambahkan tugas...";

const btnTambah = document.createElement("button");
btnTambah.textContent = "Tambah tugas";

tugasSection.append(titleTugas, inputTugas, btnTambah);

btnTambah.addEventListener("click", () => {
  if (!validInput(inputTugas.value)) return;
  tambahTugas(inputTugas.value.trim());
  inputTugas.value = "";
});

inputTugas.addEventListener("keydown", (e) => {
  if (e.key === "Enter") btnTambah.click();
});

let daftarTugas = [
  { id: 1, nama: "Belajar JavaScript", selesai: false },
  { id: 2, nama: "Olahraga Pagi", selesai: false },
];

const daftar_tugas = document.createElement("ul");
daftar_tugas.id = "daftar-tugas";

const inputCari = document.createElement("input");
inputCari.type = "text";
inputCari.id = "cari-tugas";
inputCari.placeholder = "Cari tugas...";

const filterContainer = document.createElement("div");
filterContainer.id = "filter-container";

const btnSemua = document.createElement("button");
btnSemua.textContent = "Semua";

const btnSelesai = document.createElement("button");
btnSelesai.textContent = "Selesai";

const btnBelum = document.createElement("button");
btnBelum.textContent = "Belum Selesai";

filterContainer.append(btnSemua, btnSelesai, btnBelum);
tugasSection.append(inputCari, filterContainer, daftar_tugas);

let filterAktif = "semua";
let kataKunciPencarian = "";

function simpanKeStorage() {
  localStorage.setItem("daftarTugas", JSON.stringify(daftarTugas));
}

function muatDariStorage() {
  const data = localStorage.getItem("daftarTugas");
  daftarTugas = data ? JSON.parse(data) : [];
}

function validInput(nilai) {
  if (nilai.trim() === "") {
    alert("Tolong masukkan Input!");
    return false;
  }
  if (nilai.length > 100) {
    alert("Maksimal input hanya 100 karakter!");
    return false;
  }
  return true;
}

function editTugas(id, namaBaru) {
  daftarTugas = daftarTugas.map((t) =>
    t.id === id ? { ...t, nama: namaBaru } : t
  );
  simpanKeStorage();
  renderTugas(filterAktif);
}

function tambahTugas(nama) {
  daftarTugas.push({ id: Date.now(), nama, selesai: false });
  simpanKeStorage();
  renderTugas(filterAktif);
}

function hapusTugas(id) {
  daftarTugas = daftarTugas.filter((t) => t.id !== id);
  simpanKeStorage();
  renderTugas(filterAktif);
}

function toggleSelesai(id) {
  daftarTugas = daftarTugas.map((t) =>
    t.id === id ? { ...t, selesai: !t.selesai } : t
  );
  simpanKeStorage();
  renderTugas(filterAktif);
}

function renderTugas(filter = filterAktif) {
  filterAktif = filter;
  const list = document.getElementById("daftar-tugas");
  if (!list) return;

  list.innerHTML = "";

  const tugasTersaring = daftarTugas.filter((t) => {
    if (filter === "selesai" && !t.selesai) return false;
    if (filter === "belum" && t.selesai) return false;
    if (kataKunciPencarian && !t.nama.toLowerCase().includes(kataKunciPencarian)) {
      return false;
    }
    return true;
  });

  if (tugasTersaring.length === 0) {
    list.innerHTML = `<li class="empty-state">Tidak ada tugas.</li>`;
    return;
  }

  tugasTersaring.forEach((tugas) => {
    const li = document.createElement("li");
    li.className = "tugas-item";
    li.dataset.id = tugas.id;

    const spanTeks = document.createElement("span");
    spanTeks.textContent = tugas.nama + " ";
    spanTeks.style.textDecoration = tugas.selesai ? "line-through" : "none";
    spanTeks.style.cursor = "pointer";

    spanTeks.addEventListener("click", () => toggleSelesai(tugas.id));

    const tombolEdit = document.createElement("button");
    tombolEdit.textContent = "Edit";
    tombolEdit.style.marginRight = "4px";
    tombolEdit.addEventListener("click", (e) => {
      e.stopPropagation();
      const namaBaru = prompt("Edit tugas:", tugas.nama);
      if (namaBaru !== null && validInput(namaBaru)) {
        editTugas(tugas.id, namaBaru.trim());
      }
    });

    const tombolHapus = document.createElement("button");
    tombolHapus.textContent = "Hapus";
    tombolHapus.addEventListener("click", (e) => {
      e.stopPropagation();
      hapusTugas(tugas.id);
    });

    li.appendChild(spanTeks);
    li.appendChild(tombolEdit);
    li.appendChild(tombolHapus);
    list.appendChild(li);
  });

  aktifkanDragDrop();
}

btnSemua.addEventListener("click", () => renderTugas("semua"));
btnSelesai.addEventListener("click", () => renderTugas("selesai"));
btnBelum.addEventListener("click", () => renderTugas("belum"));

inputCari.addEventListener("input", (e) => {
  kataKunciPencarian = e.target.value.toLowerCase();
  renderTugas();
});

// --- SEKSI CATATAN (NOTES) ---
// Disamakan strukturnya seperti Seksi Tugas
let daftarCatatan = [];

const titleCatatan = document.createElement("h3");
titleCatatan.textContent = "Catatan Cepat";

const formCatatan = document.createElement("form");
formCatatan.id = "form-catatan";

const inputCatatan = document.createElement("textarea");
inputCatatan.id = "input-catatan";
inputCatatan.placeholder = "Tulis catatan...";

const btnSimpanCatatan = document.createElement("button");
btnSimpanCatatan.type = "submit";
btnSimpanCatatan.textContent = "Simpan Catatan";

formCatatan.append(inputCatatan, btnSimpanCatatan);

const daftarCatatanContainer = document.createElement("div");
daftarCatatanContainer.id = "daftar-catatan";

catatanSection.append(titleCatatan, formCatatan, daftarCatatanContainer);

// pendukung catatan melalui function
function simpanCatatanKeStorage() {
  localStorage.setItem("daftarCatatan", JSON.stringify(daftarCatatan));
}

function muatCatatanDariStorage() {
  const data = localStorage.getItem("daftarCatatan");
  daftarCatatan = data ? JSON.parse(data) : [];
}

function tambahCatatan(isi) {
  daftarCatatan.push({
    id: Date.now(),
    isi,
    tanggal: new Date().toLocaleDateString("id-ID"),
  });
  simpanCatatanKeStorage();
  renderCatatan();
}

function editCatatan(id, isiBaru) {
  daftarCatatan = daftarCatatan.map((c) =>
    c.id === id ? { ...c, isi: isiBaru } : c
  );
  simpanCatatanKeStorage();
  renderCatatan();
}

function hapusCatatan(id) {
  daftarCatatan = daftarCatatan.filter((c) => c.id !== id);
  simpanCatatanKeStorage();
  renderCatatan();
}

function renderCatatan() {
  const container = document.getElementById("daftar-catatan");
  if (!container) return;

  container.innerHTML = "";

  if (daftarCatatan.length === 0) {
    container.innerHTML = `<div class="empty-state">Belum ada catatan.</div>`;
    return;
  }

  daftarCatatan.forEach((catatan) => {
    const div = document.createElement("div");
    div.className = "catatan-item";

    const pTeks = document.createElement("p");
    pTeks.textContent = catatan.isi;

    const smallTanggal = document.createElement("small");
    smallTanggal.textContent = catatan.tanggal;

    // Tombol Edit Catatan
    const btnEditCatatan = document.createElement("button");
    btnEditCatatan.textContent = "Edit";
    btnEditCatatan.style.marginRight = "4px";
    btnEditCatatan.addEventListener("click", () => {
      const isiBaru = prompt("Edit catatan:", catatan.isi);
      if (isiBaru !== null && validInput(isiBaru)) {
        editCatatan(catatan.id, isiBaru.trim());
      }
    });

    // Tombol Hapus Catatan
    const btnHapusCatatan = document.createElement("button");
    btnHapusCatatan.textContent = "Hapus";
    btnHapusCatatan.addEventListener("click", () => {
      hapusCatatan(catatan.id);
    });

    // Kontainer aksi tombol
    const divAksi = document.createElement("div");
    divAksi.append(btnEditCatatan, btnHapusCatatan);

    div.append(pTeks, smallTanggal, divAksi);
    container.appendChild(div);
  });
}

formCatatan.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validInput(inputCatatan.value)) return;
  tambahCatatan(inputCatatan.value.trim());
  inputCatatan.value = "";
});

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