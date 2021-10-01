<script lang="ts">
  import { getAttachmentImg, getWeaponImg } from "../utilities/getters";

  export let className: string;

  export let weapon: { name: string } | null;
  export let ammo: { name: string } | null;
  export let scope: { name: string } | null;

  export let armor: { name: string } | null;
  export let utility: { name: string } | null;
  export let support: { name: string } | null;
</script>

<li class={className}>
  {#if weapon}
    <img
      src={`images/weapons/${getWeaponImg(weapon.name)}.webp`}
      alt={getWeaponImg(weapon.name)}
      draggable="false"
    />
    {#if ammo || scope}
      <div class="attachments">
        {#if ammo}
          <img
            src={`images/weapons/attachments/${getAttachmentImg(
              ammo.name
            )}_small.webp`}
            alt={getAttachmentImg(ammo.name)}
            title={ammo.name}
            draggable="false"
          />
        {/if}
        {#if scope}
          <img
            src={`images/weapons/attachments/${getAttachmentImg(
              scope.name
            )}_small.webp`}
            alt={getAttachmentImg(scope.name)}
            title={scope.name}
            draggable="false"
          />
        {/if}
      </div>
    {/if}
    <div class="subtitle">{weapon.name}</div>
  {:else if armor}
    {#if false}<img alt="Armor" />{/if}
    <div class="subtitle">{armor.name}</div>
  {:else if utility}
    {#if false}<img alt="Utility" />{/if}
    <div class="subtitle">{utility.name}</div>
  {:else if support}
    {#if false}<img alt="Support" />{/if}
    <div class="subtitle">{support.name}</div>
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
    min-height: 120px;
    > img {
      align-self: center;
      box-sizing: border-box;
      height: 130px;
      padding: 20px;
    }
    .subtitle {
      margin-top: auto;
    }
    &.primary,
    &.secondary,
    &.armor,
    &[class^="support-"] {
      grid-column: 1 / -1;
    }

    .attachments {
      position: absolute;
      right: 40px;
      bottom: 40px;
      display: flex;
      gap: 8px;
      img {
        max-height: 32px;
      }
    }
  }
</style>
