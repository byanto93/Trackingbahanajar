// LOGIN
const form = document.getElementById("loginForm");

if (form) {
    form.addEventListener("submit", function(e){
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const user = dataPengguna.find(u =>
            u.email === email && u.password === password
        );

        if(user){
            localStorage.setItem("namaUser", user.nama);
            window.location = "dashboard.html";
        } else {
            alert("Login gagal, Email atau Password yang anda masukkan salah!");
        }
    });
}

// LOGOUT
const logout = document.getElementById("logoutBtn");

if (logout) {
    logout.onclick = function(){
        localStorage.removeItem("namaUser");
        window.location = "index.html";
    }
}

// CARI
function cari(){
    const input = document.getElementById("do").value;
    const data = dataTracking[input];

    if(data){

        let perjalananHTML = "";

        data.perjalanan.forEach(item => {
            perjalananHTML += `
                <li>
                    <div class="timeline-dot"></div>
                    <span class="timeline-time">${item.waktu}</span>
                    <p class="timeline-text">${item.keterangan}</p>
                </li>
            `;
        });

        document.getElementById("hasil").innerHTML = `
            <div class="tracking-card">
                <h3>Detail Pengiriman</h3>

                <div class="tracking-info">
                    <p><b>Nomor DO:</b> ${data.nomorDO}</p>
                    <p><b>Nama:</b> ${data.nama}</p>
                    <p><b>Status:</b> <span class="status">${data.status}</span></p>
                    <p><b>Ekspedisi:</b> ${data.ekspedisi}</p>
                    <p><b>Tanggal:</b> ${data.tanggalKirim}</p>
                    <p><b>Total:</b> ${data.total}</p>
                </div>

                <h4>Riwayat Perjalanan</h4>
                <ul class="timeline">
                    ${perjalananHTML}
                </ul>
            </div>
        `;

    } else {
        document.getElementById("hasil").innerText = "Data tidak ditemukan";
    }
}
// GAMBAR STOK
const stokList = document.getElementById("stokList");

if (stokList) {
    dataBahanAjar.forEach(item => {

        let card = document.createElement("div");
        card.className = "stok-card";

        card.innerHTML = `
            <img src="${item.cover}" alt="${item.namaBarang}">
            <h4>${item.namaBarang}</h4>
            <p>Kode: ${item.kodeBarang}</p>
            <p>Lokasi: ${item.kodeLokasi}</p>
            <p class="stok">Stok: ${item.stok}</p>
            <p>Jenis: ${item.jenisBarang}</p>
            <p>Edisi: ${item.edisi}</p>
        `;

        stokList.appendChild(card);
    });
}
// LUPA PASSWORD
const lupa = document.getElementById("lupa");
if (lupa) {
    lupa.onclick = function(){
        alert("Silakan hubungi admin UT untuk reset password.");
    }
}

// DAFTAR
const daftar = document.getElementById("daftar");
if (daftar) {
    daftar.onclick = function(){
        alert("Silakan daftar melalui website resmi Universitas Terbuka.");
    }
}
// DASHBOARD SAPAAN SESUAI JAM
const greet = document.getElementById("greeting");

if (greet) {
    const nama = localStorage.getItem("namaUser");

    const jam = new Date().getHours();
    let sapaan = "";

    if (jam < 12) {
        sapaan = "Selamat Pagi";
    } else if (jam < 18) {
        sapaan = "Selamat Siang";
    } else {
        sapaan = "Selamat Malam";
    }

    greet.innerText = `${sapaan}, ${nama}`;
}

// TAMBAH DATA
function toggleForm(){
    const form = document.getElementById("formTambah");

    if (form.style.display === "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
}

function tambahData(){
    const kode = document.getElementById("kodeBaru").value;
    const nama = document.getElementById("namaBaru").value;
    const jenis = document.getElementById("jenisBaru").value;
    const edisi = document.getElementById("edisiBaru").value;
    const stok = document.getElementById("stokBaru").value;
    const lokasi = document.getElementById("lokasiBaru").value;
    const fileInput = document.getElementById("coverBaru");
    const file = fileInput.files[0];
    if (!file) {
    alert("Isi data yang lengkap dan pilih gambar cover!");
    return;
}
const coverURL = URL.createObjectURL(file);
    

    if(!kode || !nama || !jenis || !edisi || !stok || !lokasi || !file){
        alert("Semua data harus diisi!");
        return;
    }

    dataBahanAjar.push({
        kodeBarang: kode,
        namaBarang: nama,
        jenisBarang: jenis,
        edisi: edisi,
        stok: parseInt(stok),
        kodeLokasi: lokasi,
        cover: coverURL
    });

    alert("Data berhasil ditambahkan");
    renderStok();
    document.getElementById("kodeBaru").value = "";
    document.getElementById("namaBaru").value = "";
    document.getElementById("jenisBaru").value = "";
    document.getElementById("edisiBaru").value = "";
    document.getElementById("stokBaru").value = "";
    document.getElementById("lokasiBaru").value = "";
    document.getElementById("coverBaru").value = "";
}

function renderStok() {
    const stokList = document.getElementById("stokList");
    if (!stokList) return;

    stokList.innerHTML = "";

    dataBahanAjar.forEach(item => {
        let card = document.createElement("div");
        card.className = "stok-card";

        card.innerHTML = `
            <img src="${item.cover}" alt="${item.namaBarang}">
            <h4>${item.namaBarang}</h4>
            <p>Kode: ${item.kodeBarang}</p>
            <p>Jenis: ${item.jenisBarang}</p>
            <p>Edisi: ${item.edisi}</p>
            <p>Lokasi: ${item.kodeLokasi}</p>
            <p class="stok">Stok: ${item.stok}</p>
        `;

        stokList.appendChild(card);
    });
}

renderStok();
