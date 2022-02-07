<script lang="ts">
  import type { TrooperEquipment } from "@/types/Roster";

  import {
    getEquipmentImg,
    getFileName,
    getHelmetData,
    getNameString,
    getNVGImg,
    getWeaponAttachmentImg,
    getWeaponData,
  } from "@/utilities/getters";

  export let className: string;

  export let weapon: TrooperEquipment["PrimaryWeapon"] | TrooperEquipment["SecondaryWeapon"] | null = null;
  $: weaponData = weapon?.$name && getWeaponData(weapon.$name);
  export let ammo: TrooperEquipment["PrimaryWeaponAmmo"] | TrooperEquipment["SecondaryWeaponAmmo"] | null = null;
  export let scope: TrooperEquipment["PrimaryWeaponScope"] | TrooperEquipment["SecondaryWeaponScope"] | null = null;

  export let helmet: TrooperEquipment["Helmet"] | null = null;
  $: helmetData = helmet?.$name && getHelmetData(helmet.$name);
  export let nvg: TrooperEquipment["HelmetNVG"] | null = null;
  export let armor: TrooperEquipment["Armor"] | null = null;
  export let utility: TrooperEquipment["UtilityPouch1"] | null = null;
  export let support: TrooperEquipment["SupportGear1"] | null = null;
</script>

<li class={className}>
  {#if weaponData}
    <img src={weaponData.img} alt={getFileName(weaponData.name)} draggable="false" />
    {#if ammo || scope}
      <div class="attachments">
        {#if weaponData.suppressorAvailable}
          {#if weaponData.suppressed}
            <img
              class="attachments__silencer"
              src="images/weapons/attachments/basic_silencer_ui_small.webp"
              alt="basic_silencer_ui_small"
              draggable="false"
            />
          {:else}
            <img
              class="attachments__silencer"
              src="images/weapons/attachments/silencer_none.webp"
              alt="silencer_none"
              draggable="false"
            />
          {/if}
        {/if}
        {#if ammo}
          <img
            src={getWeaponAttachmentImg(ammo.$name)}
            alt={getFileName(ammo.$name)}
            title={getNameString(ammo.$name)}
            draggable="false"
          />
        {/if}
        {#if scope}
          <img
            src={getWeaponAttachmentImg(scope.$name)}
            alt={getFileName(scope.$name)}
            title={getNameString(scope.$name)}
            draggable="false"
          />
        {/if}
      </div>
    {/if}
    <div class="subtitle">{getNameString(weaponData.name)}</div>
  {:else if helmetData}
    <img
      src={helmetData.img}
      alt={getFileName(helmetData.name)}
      title={getNameString(helmetData.name)}
      draggable="false"
    />
    {#if helmetData.NVGAvailable && nvg}
      <div class="attachments">
        <img
          src={getNVGImg(nvg.$name)}
          alt={getFileName(nvg.$name)}
          title={getNameString(nvg.$name)}
          draggable="false"
        />
      </div>
    {/if}
    <div class="subtitle">{getNameString(helmetData.name)}</div>
  {:else if armor}
    <img
      src={getEquipmentImg(armor.$name)}
      alt={getFileName(armor.$name)}
      title={getNameString(armor.$name)}
      draggable="false"
    />
    <div class="subtitle">{getNameString(armor.$name)}</div>
  {:else if utility}
    <img
      src={getEquipmentImg(utility.$name)}
      alt={getFileName(utility.$name)}
      title={getNameString(utility.$name)}
      draggable="false"
    />
    <div class="subtitle">{getNameString(utility.$name)}</div>
  {:else if support}
    {#if getEquipmentImg(support.$name)}
      <img
        src={getEquipmentImg(support.$name)}
        alt={getFileName(support.$name)}
        title={getNameString(support.$name)}
        draggable="false"
      />
    {/if}
    <div class="subtitle">{getNameString(support.$name)}</div>
  {:else}
    <div class="subtitle">Empty</div>
  {/if}
</li>

<style lang="scss">
  .subtitle {
    background-color: var(--bg-main);
    padding: 4px 8px;
  }
  li {
    position: relative;
    background-color: var(--bg-main);
    display: flex;
    flex-direction: column;
    &.primary,
    &.secondary,
    &[class^="support-"] {
      grid-column: 1 / -1;
    }
    > img {
      align-self: center;
      box-sizing: border-box;
      padding: 15px;
      height: 130px;
      max-width: 100%;
      object-fit: contain;
    }
    &.primary > img,
    &.secondary > img {
      padding: 20px;
    }
    &.armor > img {
      padding: 5px;
    }
    .subtitle {
      margin-top: auto;
    }
    .attachments {
      position: absolute;
      right: 5px;
      bottom: 35px;
      display: grid;
      grid-template-columns: min-content 1fr;
      gap: 8px;
      &__silencer {
        grid-column: 1 / -1;
        justify-self: flex-end;
      }
      img {
        max-height: 32px;
        border: 2px solid #423929;
        background-color: #0c0a0a;
      }
    }
  }
</style>
