<script lang="ts">
  import Equipment from "./Equipment.svelte";

  import {
    getAbilityName,
    getClassImg,
    getFileName,
    getTrooperConcealment,
    getTrooperImg,
    getTrooperMobility,
  } from "../utilities/getters";
  import type { Trooper } from "../types/Roster";

  export let current: Trooper;

  $: mobility = current && getTrooperMobility(current.Equipment);
  $: concealment = current && getTrooperConcealment(current.class, current.Equipment);
</script>

{#if current}
  <section class="trooper">
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
          <img class="trooper__image-class" src={getClassImg(current.class)} alt={current.class} draggable="false" />
        </div>
        <details class="trooper__statistics">
          <summary class="title">Soldier stats</summary>
          <ul>
            <li>Missions completed: {current.Statistics.totalMissionsWon || 0}</li>
            <li>Hostiles pacified: {current.Statistics.kills || 0}</li>
            <li>Shots fired: {current.Statistics.bulletsFired || 0}</li>
            <li>Doors kicked: {current.Statistics.doorsKicked || 0}</li>
            <li>Doors blown up: {current.Statistics.doorsBlownUp || 0}</li>
            <li>Walls breached: {current.Statistics.wallsBreached || 0}</li>
            <li>Distance walked (meters): {current.Statistics.distanceWalkedMeters || 0}</li>
          </ul>
        </details>
        <div class="trooper__stats trooper__stats--abilities">
          <div class="title">Abilities</div>
          <ul>
            {#each current.InnateAbilities.InnateAbility as ability}
              <li class="trooper__bar">
                <div class="subtitle">{getAbilityName(ability.name)}</div>
                <div class="progress">
                  {#each Array(10) as _, i}
                    <span class:active={Math.round(Number(ability.percent) / 10) >= i + 1} />
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
                <span class="subtitle-concealment" style="color: {concealment.color}">
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
        <Equipment className="helmet" helmet={current.Equipment.Helmet} nvg={current.Equipment.HelmetNVG} />
        <Equipment className="armor" armor={current.Equipment.Armor} />
        <Equipment className="utility-1" utility={current.Equipment.UtilityPouch1} />
        <Equipment className="utility-2" utility={current.Equipment.UtilityPouch2} />
        <Equipment className="support-1" support={current.Equipment.SupportGear1} />
      </ul>
    </div>
  </section>
{/if}

<style lang="scss">
  .trooper {
    background-color: var(--bg-main);
    margin-top: 30px;
    padding: 10px 20px;
    .trooper__name {
      margin-bottom: 8px;
      text-transform: uppercase;
      color: var(--header);
      font-family: "Bebas-Neue";
      font-size: 64px;
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
          border-bottom: 3px solid var(--header);
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
        .trooper__statistics {
          background-color: var(--bg-main);
          .title {
            margin: 5px;
            font-size: 24px;
            cursor: pointer;
          }
          ul {
            font-family: "Noto-Sans";
            li {
              padding: 2px 5px;
              &:nth-of-type(2n - 1) {
                background-color: var(--bg-main);
              }
            }
          }
        }
        .trooper__stats {
          margin-top: 30px;
          .subtitle {
            margin-bottom: 5px;
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
                  background-color: var(--paragraph);
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
              color: var(--header);
              .subtitle-concealment {
                font-size: 14px;
              }
            }
            .trooper__bar .progress span {
              &.active {
                background-color: var(--header);
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
