<script lang="ts">
  import { Armor, Equipment, Helmet, Support, Utility, Weapon } from "@/classes/Equipment";
  import type { TrooperEquipment } from "@/types/Roster";

  export let className: string;
  export let equipment: TrooperEquipment;
  export let slot: keyof TrooperEquipment;
  $: data = Equipment.init(slot, equipment);
</script>

<li class={className}>
  {#if data instanceof Weapon}
    <img src={data.image} alt={data.imageName} draggable="false" />
    {#if data.ammo || data.scope}
      <div class="attachments">
        {#if data.isSuppressed}
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
        {#if data.ammo}
          <img src={data.ammo.image} alt={data.ammo.imageName} title={data.ammo.name} draggable="false" />
        {/if}
        {#if data.scope}
          <img src={data.scope.image} alt={data.scope.imageName} title={data.scope.name} draggable="false" />
        {/if}
      </div>
    {/if}
    <div class="subtitle">{data.name}</div>
  {:else if data instanceof Helmet}
    {#if data.image}
      <img src={data.image} alt={data.imageName} title={data.name} draggable="false" />
    {/if}
    {#if data.isNVGAvailable && data.nvg}
      <div class="attachments">
        <img src={data.nvg.image} alt={data.nvg.imageName} title={data.nvg.name} draggable="false" />
      </div>
    {/if}
    <div class="subtitle">{data.name}</div>
  {:else if data instanceof Armor}
    <img src={data.image} alt={data.imageName} title={data.name} draggable="false" />
    <div class="subtitle">{data.name}</div>
  {:else if data instanceof Utility}
    <img src={data.image} alt={data.imageName} title={data.name} draggable="false" />
    <div class="subtitle">{data.name}</div>
  {:else if data instanceof Support}
    {#if data.image}
      <img src={data.image} alt={data.imageName} title={data.name} draggable="false" />
    {/if}
    <div class="subtitle">{data.name}</div>
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
