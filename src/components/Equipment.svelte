<script lang="ts">
  import { getAttachmentImg, getEquipmentImg, getFileName, getNameString, getWeaponImg } from "../utilities/getters";

  export let className: string;

  export let weapon: { name: string } | null = null;
  export let ammo: { name: string } | null = null;
  export let scope: { name: string } | null = null;

  export let armor: { name: string } | null = null;
  export let utility: { name: string } | null = null;
  export let support: { name: string } | null = null;
</script>

<li class={className}>
  {#if weapon}
    <img src={getWeaponImg(weapon.name)} alt={getFileName(weapon.name)} draggable="false" />
    {#if ammo || scope}
      <div class="attachments">
        {#if ammo}
          <img
            src={getAttachmentImg(ammo.name)}
            alt={getFileName(ammo.name)}
            title={getNameString(ammo.name)}
            draggable="false"
          />
        {/if}
        {#if scope}
          <img
            src={getAttachmentImg(scope.name)}
            alt={getFileName(scope.name)}
            title={getNameString(scope.name)}
            draggable="false"
          />
        {/if}
      </div>
    {/if}
    <div class="subtitle">{getNameString(weapon.name)}</div>
  {:else if armor}
    <img
      src={getEquipmentImg(armor.name)}
      alt={getFileName(armor.name)}
      title={getNameString(armor.name)}
      draggable="false"
    />
    <div class="subtitle">{getNameString(armor.name)}</div>
  {:else if utility}
    <img
      src={getEquipmentImg(utility.name)}
      alt={getFileName(utility.name)}
      title={getNameString(utility.name)}
      draggable="false"
    />
    <div class="subtitle">{getNameString(utility.name)}</div>
  {:else if support}
    {#if getEquipmentImg(support.name)}
      <img
        src={getEquipmentImg(support.name)}
        alt={getFileName(support.name)}
        title={getNameString(support.name)}
        draggable="false"
      />
    {/if}
    <div class="subtitle">{getNameString(support.name)}</div>
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
    &.armor,
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
      right: 40px;
      bottom: 40px;
      display: flex;
      gap: 8px;
      img {
        max-height: 32px;
        border: 2px solid #423929;
      }
    }
  }
</style>
