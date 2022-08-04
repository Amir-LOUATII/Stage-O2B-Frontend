import { atom } from "recoil";

//web 3 atoms
export const existingWalletState = atom({
  key: "existingWallet",
  default: false,
});
export const accountState = atom({ key: "account", default: null });
export const web3State = atom({
  key: "web3State",
  default: {
    provider: null,
    web3: null,
    isLoading: false,
  },
  dangerouslyAllowMutability: true,
});

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

//contracts
//platform token contract
export const platformTokenContractState = atom({
  key: "pltaformtokenContract",
  default: "",
  dangerouslyAllowMutability: true,
});
//whitelistContract
export const whitelistContractState = atom({
  key: "whitelistContract",
  default: "",
  dangerouslyAllowMutability: true,
});

//ido contract
export const idoContractState = atom({
  key: "idoContract",
  default: "",
  dangerouslyAllowMutability: true,
});
//single project atoms
export const whitelistState = atom({
  key: "whitelist",
  default: { isLoading: null, whitelist: [] },
});

export const projectState = atom({ key: "project", default: {} });
