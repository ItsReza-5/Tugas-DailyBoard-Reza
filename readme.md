# DailyBoard 📌

DailyBoard adalah aplikasi dasbor harian (daily dashboard) berbasis web interaktif yang dirancang untuk membantu meningkatkan produktivitas harian pengguna. Aplikasi ini menggabungkan manajemen tugas, pencatatan cepat, pemantauan cuaca real-time, dan kutipan motivasi harian dalam satu antarmuka yang bersih dan responsif

---

## 🚀 Fitur Utama

- 📝 **Manajemen Tugas (To-Do List)**
  - Menambahkan, mengedit, dan menghapus tugas harian.
  - Menandai status tugas (selesai / belum selesai).
  - Filter tugas berdasarkan status (*Semua*, *Selesai*, *Belum Selesai*).
  - Pencarian tugas secara real-time.
  - Dukungan **Drag & Drop**

- ✍️ **Catatan Cepat**
  - Membuat dan menyimpan catatan singkat.
  - Mengedit dan menghapus catatan yang ada.
  - Mencatat tanggal pembuatan catatan secara otomatis.

- 🌤️ **Widget Cuaca Real-Time**
  - Integrasi API OpenWeatherMap untuk menampilkan informasi cuaca terkini (suhu & kondisi).
  - Pencarian cuaca berdasarkan nama kota (Default: Jakarta).

- 💡 **Kutipan Inspiratif Harian**
  - Mengambil kutipan secara acak dari DummyJSON API
  - Fitur perbarui (*refresh*) untuk memuat kutipan baru kapan saja

- 🌙 **Mode Gelap & Terang (Dark Mode)**
  - Sakelar tema visual yang nyaman di mata
  - Preferensi tema disimpan secara otomatis

- 💾 **Persistensi Data (LocalStorage)**
  - Seluruh data tugas, catatan, dan tema tersimpan secara lokal di peramban (browser) pengguna, sehingga data tidak hilang saat halaman dimuat ulang

## 🛠️ Teknologi yang Digunakan

- **HTML** - Struktur aplikakasi
- **CSS** - Desain UI 
- **JavaScript**
- **Web APIs:**
  - [OpenWeatherMap API]
  - [DummyJSON Quotes API]
  - Browser LocalStorage API 



## 📂 Struktur Berkas

```text
├── index.html     # Berkas utama HTML dan pemuatan skrip
├── style.css      # Desain antarmuka, tata letak Grid/Flexbox & variabel tema
├── tugas.js       # Logika fitur manajemen tugas (To-Do List, Filter, Pencarian)
├── catatan.js     # Logika fitur catatan cepat (CRUD Catatan)
├── api.js         # Pengambilan data API (Cuaca & Kutipan), Drag & Drop, & Mode Gelap
└── storage.js     # Pembentukan DOM awal, layout section, & inisialisasi awal
