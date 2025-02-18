<script lang="ts">
  import { Armor, Equipment, Helmet, Support, Utility, Weapon } from "@/classes/Equipment";
  import type { TrooperEquipment } from "@/types/roster";

  interface Props {
    className: string
    equipment: TrooperEquipment
    slot: keyof TrooperEquipment
  }

  let { className, equipment, slot }: Props = $props();
  let data = $derived(Equipment.init(slot, equipment));
</script>

<li class={className}>
  {#if data instanceof Weapon}
    <img src={data.image} alt={data.imageAltText} draggable="false" />
    {#if data.ammo || data.scope}
      <div class="attachments">
        {#if data.suppressor}
          <img
            class="attachments__silencer"
            src={data.suppressor.image}
            alt={data.suppressor.imageAltText}
            draggable="false"
          />
        {/if}
        {#if data.ammo}
          <img src={data.ammo.image} alt={data.ammo.imageAltText} title={data.ammo.name} draggable="false" />
        {/if}
        {#if data.scope}
          <img src={data.scope.image} alt={data.scope.imageAltText} title={data.scope.name} draggable="false" />
        {/if}
      </div>
    {/if}
    <div class="subtitle">{data.name}</div>
  {:else if data instanceof Helmet}
    {#if data.image}
      <img src={data.image} alt={data.imageAltText} title={data.name} draggable="false" />
    {/if}
    {#if data.isNVGAvailable && data.nvg}
      <div class="attachments">
        <img src={data.nvg.image} alt={data.nvg.imageAltText} title={data.nvg.name} draggable="false" />
      </div>
    {/if}
    <div class="subtitle">{data.name}</div>
  {:else if data instanceof Armor}
    <img src={data.image} alt={data.imageAltText} title={data.name} draggable="false" />
    <div class="subtitle">{data.name}</div>
  {:else if data instanceof Utility}
    <img src={data.image} alt={data.imageAltText} title={data.name} draggable="false" />
    <div class="subtitle">{data.name}</div>
  {:else if data instanceof Support}
    {#if data.image}
      <img src={data.image} alt={data.imageAltText} title={data.name} draggable="false" />
    {/if}
    <div class="subtitle">{data.name}</div>
  {/if}
</li>

<style lang="scss">
  .subtitle {
    padding: 4px 8px;
    background-color: var(--bg-main);
  }
  li {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: var(--bg-main);
    &.primary,
    &.secondary,
    &[class^="support-"] {
      grid-column: 1 / -1;
    }
    > img {
      box-sizing: border-box;
      align-self: center;
      max-width: 100%;
      height: 130px;
      padding: 15px;
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
      grid-template-columns: auto auto;
      gap: 8px;
      &__silencer {
        grid-column: 1 / -1;
        justify-self: flex-end;
      }
      img {
        height: 32px;
        background-color: #0c0a0a;
        border: 2px solid #423929;
      }
    }
  }
</style>
