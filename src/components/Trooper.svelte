<script lang="ts">
  import Equipment from "./Equipment.svelte";

  import {
    getClassImg,
    getFileName,
    getTrooperConcealment,
    getTrooperImg,
    getTrooperMobility,
  } from "../utilities/getters";
  import type { Trooper } from "../types/Roster";

  export let current: Trooper;

  $: mobility = current && getTrooperMobility(current.Equipment);
  $: concealment =
    current && getTrooperConcealment(current.class, current.Equipment);
</script>

<section class="trooper" class:active={!!current}>
  {#if current}
    <div class="trooper__name">{current.Id.name}</div>
    <div class="trooper__wrapper">
      <div class="trooper__profile">
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
        <div class="trooper__stats trooper__stats--abilities">
          <div class="title">Abilities</div>
          <ul>
            {#each current.InnateAbilities.InnateAbility as ability}
              <li class="trooper__bar">
                <div class="subtitle">{ability.name}</div>
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
        <div class="trooper__stats trooper__stats--equipment">
          <div class="title">Equipment</div>
          <ul>
            <li class="trooper__bar">
              <div class="subtitle">Mobility</div>
              <div class="progress">
                {#each Array(10) as _, i}
                  <span class:active={mobility >= i + 1} />
                {/each}
              </div>
            </li>
            <li class="trooper__bar">
              <div class="subtitle">
                Concealment
                <span
                  class="subtitle-concealment"
                  style="color: {concealment.color}"
                >
                  {concealment.text}
                </span>
              </div>
              <div class="progress">
                {#each Array(10) as _, i}
                  <span class:active={concealment.value >= i + 1}>
                    {#if i === 1}
                      <svg class="concealment-point" height="10" width="10">
                        <polygon points="0,10 5,0 10,10" fill="#ffc600" />
                      </svg>
                    {/if}
                    {#if i === 6}
                      <svg class="concealment-point" height="10" width="10">
                        <polygon points="0,10 5,0 10,10" fill="#9fd3ff" />
                      </svg>
                    {/if}
                  </span>
                {/each}
              </div>
            </li>
          </ul>
        </div>
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
    padding: 20px;
    &.active {
      background-color: var(--bg-main);
    }
    .trooper__name {
      margin-bottom: 24px;
      text-transform: uppercase;
      color: var(--title);
      font-family: "Bebas-Neue";
      font-size: 64px;
      line-height: 48px;
    }
    .trooper__wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
      .trooper__profile {
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
        .trooper__stats {
          margin-top: 30px;
          .subtitle {
            margin-bottom: 5px;
            letter-spacing: 0.05em;
          }
          .trooper__bar {
            background-color: var(--bg-main);
            padding: 8px;
            margin-top: 8px;
            .progress {
              display: grid;
              grid-template-columns: repeat(10, 1fr);
              gap: 2px;
              span {
                position: relative;
                height: 12px;
                background-color: var(--bg-main);
                &.active {
                  background-color: var(--text);
                }
                .concealment-point {
                  position: absolute;
                  bottom: -9px;
                  right: -6px;
                }
              }
            }
          }
          &--equipment {
            .subtitle {
              display: flex;
              align-items: center;
              justify-content: space-between;
              font-size: 18px;
              text-transform: uppercase;
              color: var(--title);
              .subtitle-concealment {
                font-size: 14px;
              }
            }
            .trooper__bar .progress span {
              &.active {
                background-color: var(--title);
              }
            }
          }
        }
      }
      .trooper__equipment {
        display: grid;
        gap: 8px;
        grid-template-columns: 1fr 1fr;
        grid-auto-rows: 170px;
      }
    }
  }
</style>
