const rifles = [
  { name: "M500PP", img: "data/models/weapons/m500_ui.dds" },
  {
    name: "M1014",
    img: "data/models/weapons/m1014_ui.dds",
    unit: [
      { name: "Assault" },
      { name: "Support" },
      { name: "Marksman" },
      { name: "Medic" },
      { name: "Grenadier" },
    ],
  },
  {
    name: "MP5A",
    img: "data/models/weapons/mp5a3_ui.dds",
    unit: [{ name: "Assault" }, { name: "Medic" }],
  },
  {
    name: "MP5SD",
    img: "data/models/weapons/mp5sd3_ui.dds",
    unit: { name: "Assault" },
  },
  {
    name: "M16A4",
    img: "data/models/weapons/m16a4_ui.dds",
    unit: [{ name: "Assault" }, { name: "Medic" }],
  },
  {
    name: "M4 Carbine",
    img: "data/models/weapons/m4_ui.dds",
    unit: [{ name: "Assault" }, { name: "Medic" }],
  },
  {
    name: "MK 18",
    img: "data/models/weapons/mk18_ui.dds",
    unit: [{ name: "Assault" }, { name: "Medic" }],
  },
  {
    name: "M4/M203",
    img: "data/models/weapons/m4_m203_ui.dds",
    unit: { name: "Grenadier" },
  },
  {
    name: "MK18/M203",
    img: "data/models/weapons/mk18_m203_ui.dds",
    unit: { name: "Grenadier" },
  },
  {
    name: "M16A4/M203",
    img: "data/models/weapons/m16a4_m203_ui.dds",
    unit: { name: "Grenadier" },
  },
  {
    name: "M249SPW",
    img: "data/models/weapons/m249_spw_ui.dds",
    unit: { name: "Support" },
  },
  {
    name: "M240L",
    img: "data/models/weapons/m240l_ui.dds",
    unit: { name: "Support" },
  },
  {
    name: "MK48",
    img: "data/models/weapons/mk48_lmg_ui.dds",
    unit: { name: "Support" },
  },
  {
    name: "MG338",
    img: "data/models/weapons/mg338_ui.dds",
    unit: { name: "Support" },
  },
  {
    name: "M16A4Marksman",
    img: "data/models/weapons/m16a4_marksman_ui.dds",
    unit: { name: "Marksman" },
  },
  {
    name: "MK17LB",
    img: "data/models/weapons/mk17_lb_ui.dds",
    unit: { name: "Marksman" },
  },
  {
    name: "M14EBR",
    img: "data/models/weapons/m14_ebr_ui.dds",
    unit: { name: "Marksman" },
  },
  {
    name: "MK20SSR",
    img: "data/models/weapons/mk20_ssr_ui.dds",
    unit: { name: "Marksman" },
  },
  {
    name: "M110A1",
    img: "data/models/weapons/m110a1_ui.dds",
    unit: { name: "Marksman" },
  },
  {
    name: "MK17STD",
    img: "data/models/weapons/mk17_std_ui.dds",
    unit: [{ name: "Assault" }, { name: "Medic" }],
  },
  {
    name: "MK17CQC",
    img: "data/models/weapons/mk17_cqb_ui.dds",
    unit: [{ name: "Assault" }, { name: "Medic" }],
  },
  {
    name: "Breacher Shotgun",
    img: "data/models/equipment/breacher_shotgun_ui.dds",
    unit: [
      { name: "Assault" },
      { name: "Support" },
      { name: "Marksman" },
      { name: "Medic" },
      { name: "Grenadier" },
      { name: "BlackOps" },
    ],
  },
  { name: "SniperRifle" },
];

const cia = [
  {
    name: "PM63 CIA",
    img: "data/models/weapons/pm63_ui.dds",
    unit: { name: "Undercover" },
  },
  {
    name: "Mini Uzi CIA",
    img: "data/models/weapons/mini_uzi_ui.dds",
    unit: { name: "Undercover" },
  },
  {
    name: "MP5K CIA BOps",
    img: "data/models/weapons/mp5k_ui.dds",
    unit: { name: "Undercover" },
  },
  {
    name: "MP5KPDW CIA BOps",
    img: "data/models/weapons/mp5k_pdw_ui.dds",
    unit: { name: "BlackOps" },
  },
  {
    name: "MP5A CIA BOps",
    img: "data/models/weapons/mp5a3_ui.dds",
    unit: { name: "BlackOps" },
  },
  {
    name: "MP5SD CIA Bops",
    img: "data/models/weapons/mp5sd3_ui.dds",
    unit: { name: "BlackOps" },
  },
  {
    name: "MP7 CIA BOps",
    img: "data/models/weapons/mp7_pdw_ui.dds",
    unit: { name: "BlackOps" },
  },
  {
    name: "AKS 74U CIA BOps",
    img: "data/models/weapons/aks74u_ui.dds",
    unit: [{ name: "Undercover" }, { name: "BlackOps" }],
  },
  {
    name: "MK 18 CIA BOps",
    img: "data/models/weapons/mk18_ui.dds",
    unit: { name: "BlackOps" },
  },
  {
    name: "AK 105 Alpha CIA BOps",
    img: "data/models/weapons/alpha_ak_ui.dds",
    unit: { name: "BlackOps" },
  },
  {
    name: "Type 56 CIA BOps",
    img: "data/models/weapons/type56_ui.dds",
    unit: [{ name: "Undercover" }, { name: "BlackOps" }],
  },
  {
    name: "MK17CQC CIA BOps",
    img: "data/models/weapons/mk17_cqb_ui.dds",
    unit: { name: "BlackOps" },
  },
  {
    name: "M4 CIA BOps",
    img: "data/models/weapons/m4_ui.dds",
    unit: { name: "BlackOps" },
  },
  {
    name: "MK17STD CIA BOps",
    img: "data/models/weapons/mk17_std_ui.dds",
    unit: { name: "BlackOps" },
  },
  {
    name: "M249SPW CIA BOps",
    img: "data/models/weapons/m249_spw_ui.dds",
    unit: { name: "BlackOps" },
  },
  {
    name: "MK48 CIA BOps",
    img: "data/models/weapons/mk48_lmg_ui.dds",
    unit: { name: "BlackOps" },
  },
  {
    name: "SVD CIA BOps",
    img: "data/models/weapons/dragunov_ui.dds",
    unit: [{ name: "Undercover" }, { name: "BlackOps" }],
  },
  {
    name: "VSS CIA BOps",
    img: "data/models/weapons/vss_vintorez_ui.dds",
    unit: [{ name: "Undercover" }, { name: "BlackOps" }],
  },
  {
    name: "M110A1 CIA BOps",
    img: "data/models/weapons/m110a1_ui.dds",
    unit: { name: "BlackOps" },
  },
];

const pistols = [
  {
    name: "M9 Pistol",
    img: "data/models/weapons/m9_ui.dds",
    unit: [
      { name: "Assault" },
      { name: "Support" },
      { name: "Marksman" },
      { name: "Medic" },
      { name: "Grenadier" },
    ],
  },
  {
    name: "M9Sup Pistol",
    img: "data/models/weapons/m9sup_ui.dds",
    unit: [
      { name: "Assault" },
      { name: "Support" },
      { name: "Marksman" },
      { name: "Grenadier" },
    ],
  },
  {
    name: "M17 Pistol",
    img: "data/models/weapons/m17_ui.dds",
    unit: [
      { name: "Assault" },
      { name: "Support" },
      { name: "Marksman" },
      { name: "Medic" },
      { name: "Grenadier" },
    ],
  },
  {
    name: "M18 Pistol",
    img: "data/models/weapons/m18_ui.dds",
    unit: [
      { name: "Assault" },
      { name: "Support" },
      { name: "Marksman" },
      { name: "Medic" },
      { name: "Grenadier" },
    ],
  },
  {
    name: "G19X Pistol",
    img: "data/models/weapons/g19x_ui.dds",
    unit: [
      { name: "Assault" },
      { name: "Support" },
      { name: "Marksman" },
      { name: "Medic" },
      { name: "Grenadier" },
    ],
  },
  {
    name: "G2240 Pistol",
    img: "data/models/weapons/g22_ui.dds",
    unit: [
      { name: "Assault" },
      { name: "Support" },
      { name: "Marksman" },
      { name: "Medic" },
      { name: "Grenadier" },
    ],
  },
  {
    name: "1911 Pistol",
    img: "data/models/weapons/1911_ui.dds",
    unit: [
      { name: "Assault" },
      { name: "Support" },
      { name: "Marksman" },
      { name: "Medic" },
      { name: "Grenadier" },
    ],
  },
  { name: "MPS45Sup Pistol", img: "data/models/weapons/m9sup_ui.dds" },
];

const ciaPistols = [
  {
    name: "G19 Pistol CIA BOps",
    img: "data/models/weapons/g19_ui.dds",
    unit: [{ name: "Undercover" }, { name: "BlackOps" }],
  },
  { name: "G19X Pistol CIA BOps", img: "data/models/weapons/g19x_ui.dds" },
  {
    name: "G19Custom Pistol CIA BOps",
    img: "data/models/weapons/g19_cia_ui.dds",
    unit: [{ name: "Undercover" }, { name: "BlackOps" }],
  },
  {
    name: "G17 Pistol CIA BOps",
    img: "data/models/weapons/g22_ui.dds",
    unit: [{ name: "Undercover" }, { name: "BlackOps" }],
  },
  {
    name: "G2240 Pistol CIA BOps",
    img: "data/models/weapons/g22_ui.dds",
    unit: [{ name: "Undercover" }, { name: "BlackOps" }],
  },
  {
    name: "M18 Pistol CIA BOps",
    img: "data/models/weapons/m18_ui.dds",
    unit: [{ name: "Undercover" }, { name: "BlackOps" }],
  },
  {
    name: "M17 Pistol CIA BOps",
    img: "data/models/weapons/m17_ui.dds",
    unit: [{ name: "Undercover" }, { name: "BlackOps" }],
  },
  { name: "M9 Pistol CIA BOps", img: "data/models/weapons/m9_ui.dds" },
  {
    name: "HK45CT CIA BOps",
    img: "data/models/weapons/hk45ct_ui.dds",
    unit: [{ name: "Undercover" }, { name: "BlackOps" }],
  },
  {
    name: "1911 Pistol CIA BOps",
    img: "data/models/weapons/1911_ui.dds",
    unit: [{ name: "Undercover" }, { name: "BlackOps" }],
  },
];

export const weapons = [...rifles, ...pistols, ...cia, ...ciaPistols];
