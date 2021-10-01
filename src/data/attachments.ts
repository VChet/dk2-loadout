const scopes = [
  {
    name: "IronSights",
    img: "data/models/weapons/attachments/iron_sights_ui.dds",
  },
  {
    name: "IronSightsAK",
    img: "data/models/weapons/attachments/iron_sights_ui.dds",
  },
  {
    name: "IronSightsAKAlpha",
    img: "data/models/weapons/attachments/iron_sights_ui.dds",
  },
  {
    name: "IronSights_Pistol",
    img: "data/models/weapons/attachments/iron_sights_ui.dds",
  },
  {
    name: "IronSights_ConcealedSMG",
    img: "data/models/weapons/attachments/iron_sights_ui.dds",
  },
  {
    name: "IronSights_Pistol1911",
    img: "data/models/weapons/attachments/iron_sights_ui.dds",
  },
  {
    name: "IronSights_PistolM17",
    img: "data/models/weapons/attachments/iron_sights_ui.dds",
  },
  {
    name: "IronSights_PistolCustomizable",
    img: "data/models/weapons/attachments/iron_sights_ui.dds",
  },
  { name: "RedDot_Pistol", img: "data/models/weapons/attachments/rmr_ui.dds" },
  {
    name: "Holosight",
    img: "data/models/weapons/attachments/holosight_ui.dds",
  },
  { name: "M68CCO", img: "data/models/weapons/attachments/m68_cco_ui.dds" },
  { name: "M150RCO", img: "data/models/weapons/attachments/acog_4x_ui.dds" },
  {
    name: "SpecterDR",
    img: "data/models/weapons/attachments/specter_dr_ui.dds",
  },
  { name: "LPVO_6X", img: "data/models/weapons/attachments/lpvo_6x_ui.dds" },
  { name: "LPVO_8X", img: "data/models/weapons/attachments/lpvo_8x_ui.dds" },
  { name: "MGO240", img: "data/models/weapons/attachments/mgo240_ui.dds" },
  {
    name: "LROMK6_3_18X",
    img: "data/models/weapons/attachments/lro_mk6_ui.dds",
  },
  {
    name: "LROMK4_3_10X",
    img: "data/models/weapons/attachments/lro_mk4_ui.dds",
  },
  {
    name: "LROPM_5_25X",
    img: "data/models/weapons/attachments/pm_lro_5_25_ui.dds",
  },
  { name: "MGOM145", img: "data/models/weapons/attachments/m145_ui.dds" },
  { name: "PK AS", img: "data/models/weapons/attachments/pk_as_ui.dds" },
  { name: "Kobra", img: "data/models/weapons/attachments/kobra_ui.dds" },
  { name: "PK AV", img: "data/models/weapons/attachments/pk_av_ui.dds" },
  { name: "PO 35", img: "data/models/weapons/attachments/po35_ui.dds" },
  { name: "PSO1", img: "data/models/weapons/attachments/pso_1_ui.dds" },
  { name: "PSO1M2", img: "data/models/weapons/attachments/pso_1_ui.dds" },
  { name: "PSO39", img: "data/models/weapons/attachments/po_3_9_ui.dds" },
];

const ammo = [
  {
    name: "12GA00BUCK_M1014",
    img: "data/models/weapons/attachments/m257_buckshot_ammo_ui.dds",
  },
  {
    name: "12GA00BUCK_M500",
    img: "data/models/weapons/attachments/m257_buckshot_ammo_ui.dds",
  },
  {
    name: "556FMJM855_MK18",
    img: "data/models/weapons/attachments/m855_ammo_ui.dds",
  },
  {
    name: "556FMJM855_M4",
    img: "data/models/weapons/attachments/m855_ammo_ui.dds",
  },
  {
    name: "556FMJM855_M16A4",
    img: "data/models/weapons/attachments/m855_ammo_ui.dds",
  },
  {
    name: "556FMJM855_M249SPW",
    img: "data/models/weapons/attachments/m855_ammo_ui.dds",
  },
  {
    name: "556FMJM855A1_MK18",
    img: "data/models/weapons/attachments/m855a1_ammo_ui.dds",
  },
  {
    name: "556FMJM855A1_M4",
    img: "data/models/weapons/attachments/m855a1_ammo_ui.dds",
  },
  {
    name: "556FMJM855A1_M16A4",
    img: "data/models/weapons/attachments/m855a1_ammo_ui.dds",
  },
  {
    name: "556FMJMk318_MK18",
    img: "data/models/weapons/attachments/mk318_ammo_ui.dds",
  },
  {
    name: "556FMJMk318_M4",
    img: "data/models/weapons/attachments/mk318_ammo_ui.dds",
  },
  {
    name: "556FMJMk318_M16A4",
    img: "data/models/weapons/attachments/mk318_ammo_ui.dds",
  },
  {
    name: "556FMJMk262_MK18",
    img: "data/models/weapons/attachments/mk262_ammo_ui.dds",
  },
  {
    name: "556FMJMk262_M4",
    img: "data/models/weapons/attachments/mk262_ammo_ui.dds",
  },
  {
    name: "556FMJMk262_M16A4",
    img: "data/models/weapons/attachments/mk262_ammo_ui.dds",
  },
  {
    name: "762FMJM80A1_M110A1",
    img: "data/models/weapons/attachments/m80a1_ammo_ui.dds",
  },
  {
    name: "556FMJMk262_M16A4Marksman",
    img: "data/models/weapons/attachments/mk262_ammo_ui.dds",
  },
  {
    name: "762FMJM118LR_MK20SSR",
    img: "data/models/weapons/attachments/m118lr_ammo_ui.dds",
  },
  {
    name: "762FMJM118LR_M14EBR",
    img: "data/models/weapons/attachments/m118lr_ammo_ui.dds",
  },
  {
    name: "762FMJM118LR_MK17LB",
    img: "data/models/weapons/attachments/m118lr_ammo_ui.dds",
  },
  {
    name: "762FMJM80_MK48",
    img: "data/models/weapons/attachments/m80_ammo_ui.dds",
  },
  {
    name: "762FMJM80_M240L",
    img: "data/models/weapons/attachments/m80_ammo_ui.dds",
  },
  {
    name: "338FMJ_MG338",
    img: "data/models/weapons/attachments/xm338_ammo_ui.dds",
  },
  {
    name: "762FMJM80_MK17CQC",
    img: "data/models/weapons/attachments/m80_ammo_ui.dds",
  },
  {
    name: "762FMJM80_MK17STD",
    img: "data/models/weapons/attachments/m80_ammo_ui.dds",
  },
  {
    name: "12GAM1030_Breacher Shotgun",
    img: "data/models/weapons/attachments/basic_ammo_ui.dds",
  },
  {
    name: "338_SniperRifle",
    img: "data/models/weapons/attachments/basic_ammo_ui.dds",
  },
  {
    name: "46x30DM11_MP7",
    img: "data/models/weapons/attachments/m855_ammo_ui.dds",
  },
  {
    name: "46x30HP31_MP7",
    img: "data/models/weapons/attachments/m855_ammo_ui.dds",
  },
  {
    name: "46x30FMJ40_MP7",
    img: "data/models/weapons/attachments/m855_ammo_ui.dds",
  },
  {
    name: "9x18FMJ_PM63CIA",
    img: "data/models/weapons/attachments/m882_ammo_ui.dds",
  },
  {
    name: "919FMJM882_MiniUzi",
    img: "data/models/weapons/attachments/m882_ammo_ui.dds",
  },
  {
    name: "919FMJM1152_MiniUzi",
    img: "data/models/weapons/attachments/m1152_ammo_ui.dds",
  },
  {
    name: "919JHPM1153_MiniUzi",
    img: "data/models/weapons/attachments/m1153_ammo_ui.dds",
  },
  {
    name: "919FMJ108GRHP_MiniUzi",
    img: "data/models/weapons/attachments/m882_ammo_ui.dds",
  },
  {
    name: "919FMJM882_Mp5ASMG",
    img: "data/models/weapons/attachments/m882_ammo_ui.dds",
  },
  {
    name: "919FMJM1152_Mp5ASMG",
    img: "data/models/weapons/attachments/m1152_ammo_ui.dds",
  },
  {
    name: "919JHPM1153_Mp5ASMG",
    img: "data/models/weapons/attachments/m1153_ammo_ui.dds",
  },
  {
    name: "919FMJ108GRHP_Mp5ASMG",
    img: "data/models/weapons/attachments/m882_ammo_ui.dds",
  },
  {
    name: "919FMJM882_Mp5SDSMG",
    img: "data/models/weapons/attachments/m882_ammo_ui.dds",
  },
  {
    name: "919FMJM1152_Mp5SDSMG",
    img: "data/models/weapons/attachments/m1152_ammo_ui.dds",
  },
  {
    name: "919JHPM1153_Mp5SDSMG",
    img: "data/models/weapons/attachments/m1153_ammo_ui.dds",
  },
  {
    name: "919FMJ108GRHP_Mp5SDSMG",
    img: "data/models/weapons/attachments/m882_ammo_ui.dds",
  },
  {
    name: "45FMJM1911_1911 Pistol",
    img: "data/models/weapons/attachments/m1911fmj_ammo_ui.dds",
  },
  {
    name: "45JHP230GR_MPS45_SuppressedPistol",
    img: "data/models/weapons/attachments/m1911fmj_ammo_ui.dds",
  },
  {
    name: "40FMJ180GR_G2240 Pistol",
    img: "data/models/weapons/attachments/40fmj_ammo_ui.dds",
  },
  {
    name: "919FMJM882_Handgun",
    img: "data/models/weapons/attachments/m882_ammo_ui.dds",
  },
  {
    name: "919JHPM1153_Handgun",
    img: "data/models/weapons/attachments/m1153_ammo_ui.dds",
  },
  {
    name: "919FMJM1152_Handgun",
    img: "data/models/weapons/attachments/m1152_ammo_ui.dds",
  },
  {
    name: "919FMJ108GRHP_Handgun",
    img: "data/models/weapons/attachments/m882_ammo_ui.dds",
  },
  {
    name: "919FMJ108GRHP_SupHandgun",
    img: "data/models/weapons/attachments/m882_ammo_ui.dds",
  },
  {
    name: "919FMJM882_SupHandgun",
    img: "data/models/weapons/attachments/m882_ammo_ui.dds",
  },
  {
    name: "919JHPM1153_SupHandgun",
    img: "data/models/weapons/attachments/m1153_ammo_ui.dds",
  },
  {
    name: "919FMJM1152_SupHandgun",
    img: "data/models/weapons/attachments/m1152_ammo_ui.dds",
  },
  {
    name: "919FMJM882_G19X Pistol",
    img: "data/models/weapons/attachments/m882_ammo_ui.dds",
  },
  {
    name: "919FMJM882_M17 Pistol",
    img: "data/models/weapons/attachments/m882_ammo_ui.dds",
  },
  {
    name: "919FMJM882_M18 Pistol",
    img: "data/models/weapons/attachments/m882_ammo_ui.dds",
  },
  {
    name: "919FMJM882_M9 Pistol",
    img: "data/models/weapons/attachments/m882_ammo_ui.dds",
  },
  { name: "762x39FMJ_Type 56" },
  { name: "762x39FMJ_Type 56 Noob" },
  {
    name: "9x18FMJ_PM63",
    img: "data/models/weapons/attachments/basic_ammo_ui.dds",
  },
  {
    name: "9x19FMJ_MiniUzi",
    img: "data/models/weapons/attachments/basic_ammo_ui.dds",
  },
  { name: "545x39FMJ_AKS 74U" },
  { name: "762x51FMJ_FAL Rifle" },
  { name: "545x39FMJ_RPK 74 LMG" },
  { name: "762x39FMJ_RPK LMG" },
  { name: "762x54RFMJ_RP46MG" },
  { name: "762RAP7N13_SVD" },
  {
    name: "762R7N1_SVDCIA",
    img: "data/models/weapons/attachments/m855_ammo_ui.dds",
  },
  {
    name: "762RAP7N13_SVDCIA",
    img: "data/models/weapons/attachments/m855_ammo_ui.dds",
  },
  {
    name: "762R7N14_SVDCIA",
    img: "data/models/weapons/attachments/m855_ammo_ui.dds",
  },
  { name: "9x39APSP6_SR3_M" },
  { name: "9x39APSP6_VSS" },
  {
    name: "9x39SP5_VSSCIA",
    img: "data/models/weapons/attachments/m855_ammo_ui.dds",
  },
  {
    name: "9x39APSP6_VSSCIA",
    img: "data/models/weapons/attachments/m855_ammo_ui.dds",
  },
  {
    name: "762x39FMJM43_Type56CIA",
    img: "data/models/weapons/attachments/m855_ammo_ui.dds",
  },
  {
    name: "545x39FMJ7N10_AKS74UCIA",
    img: "data/models/weapons/attachments/m855_ammo_ui.dds",
  },
  {
    name: "545x39FMJ7N24_AKS74UCIA",
    img: "data/models/weapons/attachments/m855_ammo_ui.dds",
  },
  {
    name: "545x39FMJ7N39_AKS74UCIA",
    img: "data/models/weapons/attachments/m855_ammo_ui.dds",
  },
  {
    name: "545x39HP55_AKS74UCIA",
    img: "data/models/weapons/attachments/m855_ammo_ui.dds",
  },
  { name: "762x25FMJ_TT 33 Pistol" },
];

export const attachments = [...scopes, ...ammo];
