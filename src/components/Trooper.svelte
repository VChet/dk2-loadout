<script lang="ts">
  import Equipment from "./Equipment.svelte";

  import {
    getClassImg,
    getFileName,
    getTrooperImg,
  } from "../utilities/getters";
  import type { Trooper } from "../types/Roster";

  export let current: Trooper;
</script>

<section class="trooper">
  {#if current}
    <div class="trooper__name">{current.Id.name}</div>
    <div class="trooper__wrapper">
      <div class="trooper__statistics">
        <div class="trooper__image">
          <img
            class="trooper__image-portrait"
            src={getTrooperImg(current.Id.portrait, true)}
            alt={getFileName(current.Id.portrait)}
            draggable="false"
          />
          <img
            class="trooper__image-class"
            src={getClassImg(current.class)}
            alt={current.class}
            draggable="false"
          />
        </div>
        <div class="title">Abilities</div>
        <ul>
          {#each current.InnateAbilities.InnateAbility as ability}
            <li class="trooper__ability">
              <div class="subtitle">{ability.name} ({ability.percent}%)</div>
              <div class="progress">
                {#each Array(10) as _, i}
                  <span
                    class:active={Math.round(Number(ability.percent) / 10) >=
                      i + 1}
                  />
                {/each}
              </div>
            </li>
          {/each}
        </ul>
      </div>
      <ul class="trooper__equipment">
        <Equipment
          className="primary"
          weapon={current.Equipment.PrimaryWeapon}
          ammo={current.Equipment.PrimaryWeaponAmmo}
          scope={current.Equipment.PrimaryWeaponScope}
        />
        <Equipment
          className="secondary"
          weapon={current.Equipment.SecondaryWeapon}
          ammo={current.Equipment.SecondaryWeaponAmmo}
          scope={current.Equipment.SecondaryWeaponScope}
        />
        <Equipment className="armor" armor={current.Equipment.Armor} />
        <Equipment
          className="utility-1"
          utility={current.Equipment.UtilityPouch1}
        />
        <Equipment
          className="utility-2"
          utility={current.Equipment.UtilityPouch2}
        />
        {#if current.Equipment.SupportGear1}
          <Equipment
            className="support-1"
            support={current.Equipment.SupportGear1}
          />
        {/if}
        {#if current.Equipment.SupportGear2}
          <Equipment
            className="support-2"
            support={current.Equipment.SupportGear2}
          />
        {/if}
        {#if current.Equipment.SupportGear3}
          <Equipment
            className="support-3"
            support={current.Equipment.SupportGear3}
          />
        {/if}
      </ul>
    </div>
  {/if}
</section>

<style lang="scss">
  .trooper {
    margin: 0 auto;
    flex-basis: 850px;
    background-color: var(--bg-main);
    padding: 20px;
    .trooper__name {
      margin-bottom: 24px;
      text-transform: uppercase;
      color: var(--title);
      font-family: "Bebas-Neue";
      font-size: 64px;
      line-height: 32px;
    }
    .trooper__wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
      .trooper__statistics {
        .title {
          font-size: 40px;
          line-height: 32px;
          border-bottom: 3px solid var(--title);
        }
        .trooper__image {
          position: relative;
          margin-bottom: 20px;
          .trooper__image-portrait {
            width: 100%;
          }
          .trooper__image-class {
            position: absolute;
            top: 0;
            right: 0;
            padding: 12px;
          }
        }
        .trooper__ability {
          background-color: var(--bg-main);
          padding: 8px;
          margin-top: 8px;
          .subtitle {
            margin-bottom: 5px;
          }
          .progress {
            display: grid;
            grid-template-columns: repeat(10, 1fr);
            gap: 2px;
            span {
              height: 12px;
              background-color: var(--bg-main);
              color: red;
              font-size: 10px;
              &.active {
                background-color: var(--text);
              }
            }
          }
        }
      }
      .trooper__equipment {
        display: grid;
        gap: 8px;
        grid-template-columns: 1fr 1fr;
      }
    }
  }
</style>
