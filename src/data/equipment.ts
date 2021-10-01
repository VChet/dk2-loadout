const armor = [
  {
    name: "Rangers SFLCS Level III",
    img: "data/models/equipment/armor_basic_ui.dds",
    unit: [
      { name: "Assault" },
      { name: "Support" },
      { name: "Marksman" },
      { name: "Medic" },
      { name: "Grenadier" },
    ],
  },
  {
    name: "Rangers SFLCS Level IV",
    img: "data/models/equipment/armor_leveliv_ui.dds",
    unit: [
      { name: "Assault" },
      { name: "Support" },
      { name: "Marksman" },
      { name: "Medic" },
      { name: "Grenadier" },
    ],
  },
  {
    name: "CIA TacVest Level III",
    img: "data/models/equipment/armor_tacvestiii_ui.dds",
    unit: { name: "BlackOps" },
  },
  {
    name: "CIA TacVest Level IV",
    img: "data/models/equipment/armor_tacvestiv_ui.dds",
    unit: { name: "BlackOps" },
  },
  {
    name: "Rangers SFLCS Extended",
    img: "data/models/equipment/armor_extended_ui.dds",
    unit: [
      { name: "Assault" },
      { name: "Support" },
      { name: "Marksman" },
      { name: "Medic" },
      { name: "Grenadier" },
    ],
  },
  {
    name: "Rangers NoPlates",
    img: "data/models/equipment/armor_noplates_ui.dds",
    unit: [
      { name: "Assault" },
      { name: "Support" },
      { name: "Marksman" },
      { name: "Medic" },
      { name: "Grenadier" },
    ],
  },
  {
    name: "CIA Concealable LVL2",
    img: "data/models/equipment/armor_softlevelii_ui.dds",
    unit: [{ name: "Undercover" }, { name: "BlackOps" }],
  },
  {
    name: "CIA Concealable LVL3A Limited",
    img: "data/models/equipment/armor_softpanelsiiia_ui.dds",
    unit: { name: "Undercover" },
  },
  {
    name: "CIA Concealable LVL3A",
    img: "data/models/equipment/armor_softleveliiia_ui.dds",
    unit: [{ name: "Undercover" }, { name: "BlackOps" }],
  },
  {
    name: "Rangers Jumpable",
    img: "data/models/equipment/armor_jumpable_ui.dds",
    unit: [
      { name: "Assault" },
      { name: "Support" },
      { name: "Marksman" },
      { name: "Medic" },
      { name: "Grenadier" },
      { name: "BlackOps" },
    ],
  },
  {
    name: "Rangers Jumpable Swimmer",
    img: "data/models/equipment/armor_jump_swimmeriv_ui.dds",
    unit: [
      { name: "Assault" },
      { name: "Support" },
      { name: "Marksman" },
      { name: "Medic" },
      { name: "Grenadier" },
      { name: "BlackOps" },
    ],
  },
];

const support = [
  {
    name: "Crowbar",
    unit: [
      { name: "Assault" },
      { name: "Support" },
      { name: "Marksman" },
      { name: "Medic" },
      { name: "Grenadier" },
      { name: "BlackOps" },
    ],
  },
  {
    name: "Dynamic Hammer",
    img: "data/models/equipment/hammer_dynamic_ui.dds",
    unit: [
      { name: "Assault" },
      { name: "Support" },
      { name: "Marksman" },
      { name: "Medic" },
      { name: "Grenadier" },
      { name: "BlackOps" },
    ],
  },
  {
    name: "Slap Charge Kit",
    img: "data/models/equipment/slapcharge_kit_ui.dds",
    quantity: 3,
    unit: [
      { name: "Assault" },
      { name: "Support" },
      { name: "Marksman" },
      { name: "Medic" },
      { name: "Grenadier" },
      { name: "BlackOps" },
    ],
  },
  {
    name: "Breaching Charge",
    img: "data/models/equipment/breaching_charge_ui.dds",
    quantity: 3,
    unit: [
      { name: "Assault" },
      { name: "Support" },
      { name: "Marksman" },
      { name: "Medic" },
      { name: "Grenadier" },
    ],
  },
  {
    name: "AT4 Rocket Launcher",
    img: "data/models/weapons/at4_ui.dds",
    unit: [
      { name: "Assault" },
      { name: "Support" },
      { name: "Marksman" },
      { name: "Medic" },
      { name: "Grenadier" },
      { name: "BlackOps" },
    ],
  },
  {
    name: "RPG 26 CIA BOps",
    img: "data/models/weapons/rpg26_ui.dds",
    unit: [{ name: "BlackOps" }, { name: "Undercover" }],
  },
  { name: "MK14 GL", img: "data/models/weapons/m4_m203_ui.dds" },
  {
    name: "Smoke Grenade Kit",
    img: "data/models/equipment/smoke_grenade_kit_ui.dds",
    quantity: 3,
    unit: [
      { name: "Assault" },
      { name: "Support" },
      { name: "Marksman" },
      { name: "Medic" },
      { name: "Grenadier" },
      { name: "BlackOps" },
    ],
  },
  {
    name: "Frag Grenade Kit",
    img: "data/models/equipment/frag_grenade_kit_ui.dds",
    quantity: 3,
    unit: [
      { name: "Assault" },
      { name: "Support" },
      { name: "Marksman" },
      { name: "Medic" },
      { name: "Grenadier" },
      { name: "BlackOps" },
    ],
  },
  {
    name: "Flashbang Kit",
    img: "data/models/equipment/flashbang_kit_ui.dds",
    quantity: 3,
    unit: [
      { name: "Assault" },
      { name: "Support" },
      { name: "Marksman" },
      { name: "Medic" },
      { name: "Grenadier" },
      { name: "BlackOps" },
    ],
  },
  { name: "Lockpick", unit: { name: "BlackOps" } },
  {
    name: "Enforcer Shield (Level IIIA)",
    img: "data/models/equipment/slap_charge_ui.dds",
  },
  {
    name: "Spy Camera",
    img: "data/models/equipment/spy_camera_ui.dds",
    unit: [
      { name: "Assault" },
      { name: "Support" },
      { name: "Marksman" },
      { name: "Medic" },
      { name: "Grenadier" },
      { name: "BlackOps" },
    ],
  },
  {
    name: "Poncho",
    img: "data/models/equipment/poncho_ui.dds",
    unit: { name: "BlackOps" },
  },
];

const utility = [
  {
    name: "Slap Charge",
    img: "data/models/equipment/slap_charge_ui.dds",
    quantity: 1,
    unit: [
      { name: "Assault" },
      { name: "Support" },
      { name: "Marksman" },
      { name: "Medic" },
      { name: "Grenadier" },
      { name: "BlackOps" },
      { name: "Undercover" },
    ],
  },
  {
    name: "Smoke Grenade",
    img: "data/models/equipment/smoke_grenade_ui.dds",
    quantity: 2,
    unit: [
      { name: "Assault" },
      { name: "Support" },
      { name: "Marksman" },
      { name: "Medic" },
      { name: "Grenadier" },
      { name: "BlackOps" },
      { name: "Undercover" },
    ],
  },
  {
    name: "Frag Grenade",
    img: "data/models/equipment/frag_grenade_ui.dds",
    quantity: 2,
    unit: [
      { name: "Assault" },
      { name: "Support" },
      { name: "Marksman" },
      { name: "Medic" },
      { name: "Grenadier" },
      { name: "BlackOps" },
      { name: "Undercover" },
    ],
  },
  {
    name: "Flashbang",
    img: "data/models/equipment/flashbang_ui.dds",
    quantity: 2,
    unit: [
      { name: "Assault" },
      { name: "Support" },
      { name: "Marksman" },
      { name: "Medic" },
      { name: "Grenadier" },
      { name: "BlackOps" },
      { name: "Undercover" },
    ],
  },
  {
    name: "Stinger",
    img: "data/models/equipment/stinger_ui.dds",
    quantity: 2,
    unit: [
      { name: "Assault" },
      { name: "Support" },
      { name: "Marksman" },
      { name: "Medic" },
      { name: "Grenadier" },
      { name: "BlackOps" },
      { name: "Undercover" },
    ],
  },
  {
    name: "Lockpick Machine",
    img: "data/models/equipment/lockpick_machine_ui.dds",
    unit: [{ name: "BlackOps" }, { name: "Undercover" }],
  },
  {
    name: "TEC Torch",
    img: "data/models/equipment/tec_torch_ui.dds",
    quantity: 1,
    unit: [
      { name: "Assault" },
      { name: "Support" },
      { name: "Marksman" },
      { name: "Medic" },
      { name: "Grenadier" },
      { name: "BlackOps" },
      { name: "Undercover" },
    ],
  },
];

export const equipment: Array<{
  name: string;
  img?: string;
  quantity?: number;
  unit?: Array<{ name: string }> | { name: string };
}> = [...armor, ...support, ...utility];
