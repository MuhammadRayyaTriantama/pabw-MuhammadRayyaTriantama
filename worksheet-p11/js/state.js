import { render } from "./dom.js";

export const state = {
  daftarProyek: [],
  kategoriAktif: "semua",
  favorit: []
};

export function isiProyek(daftar) {
  state.daftarProyek = daftar;
  render(state);
}