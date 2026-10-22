export async function ambilProyek() {
  const respons = await fetch(
    "https://raw.githubusercontent.com/MuhammadRayyaTriantama/pabw-MuhammadRayyaTriantama/refs/heads/main/worksheet-p10/data/proyek.json"
  )

  if (!respons.ok) {
    throw new Error("Status " + respons.status)
  }

  return await respons.json()
}