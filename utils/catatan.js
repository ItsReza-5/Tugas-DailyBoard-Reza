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