const wadah = document.querySelector("#daftar");

function buatKartu(proyek) {
  const li = document.createElement("li");
  li.className = "kartu";
  li.textContent = proyek.judul;
  return li;
}

function render(data) {
  wadah.textContent = "";

  data.forEach((proyek) => {
    wadah.append(buatKartu(proyek));
  });
}

render(daftarProyek);