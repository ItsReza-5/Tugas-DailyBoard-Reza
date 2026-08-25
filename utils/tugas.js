// --- SEKSI TUGAS ---

const tugasSection = document.createElement("section");
tugasSection.id = "tugas";

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