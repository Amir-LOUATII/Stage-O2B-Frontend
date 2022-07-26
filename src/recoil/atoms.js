import { atom } from "recoil";

//web 3 atoms
export const existingWalletState = atom({
  key: "existingWallet",
  default: false,
});
export const account = atom({ key: "account", default: null });
export const web3State = atom({ key: "web3State", default: false });

//all projects
export const projectsState = atom({ key: "projects", default: [] });
//upcomming projects
export const upcommingProjectsState = atom({
  key: "upcommingProjects",
  default: [],
});
//filtred projects
export const filteredProjectsState = atom({
  key: "filteredProjects",
  default: [],
});

//filter categories
export const filterCategoriesState = atom({
  key: "filterCategories",
  default: [],
});
//filter term
export const filterTermState = atom({ key: "filterTerm", default: "all" });
