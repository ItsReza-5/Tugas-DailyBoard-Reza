console.log("DailyBoard siap dijalankan!");

const app = document.getElementById("app");

// Fase 1
// Membuat elemen judul
const judul = document.createElement("h2");
judul.textContent = "Selamat Datang di DailyBoard!";
app.appendChild(judul);
judul.style.color = "#2563eb";

// Membuat 4 Section (Tugas, Catatan, Cuaca, Kutipan Hari Ini)


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

