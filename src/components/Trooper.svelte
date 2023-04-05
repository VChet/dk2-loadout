<script lang="ts">
  import Equipment from "@/components/Equipment.svelte";
  import Rank from "@/components/Rank.svelte";

  import { getClassImg } from "@/utilities/getters";
  import type { Trooper } from "@/classes/Trooper";

  export let selectedTrooper: Trooper;
</script>

{#if selectedTrooper}
  <section class="trooper">
    <div class="trooper__name">{selectedTrooper.name}</div>
    <div class="trooper__wrapper">
      <div class="trooper__profile">
        <div class="trooper__image">
          <img
            class="trooper__image-portrait"
            src={selectedTrooper.portraitBig}
            alt={selectedTrooper.portraitFile}
            draggable="false"
          />
          <img
            class="trooper__image-class"
            src={getClassImg(selectedTrooper.class)}
            alt={selectedTrooper.class}
            draggable="false"
          />
          <Rank level={selectedTrooper.level} />
        </div>
        <details class="trooper__statistics">
          <summary class="title">Soldier stats</summary>
          <ul>
            <li>Missions completed: {selectedTrooper.statistics.totalMissionsWon}</li>
            <li>Hostiles pacified: {selectedTrooper.statistics.kills}</li>
            <li>Shots fired: {selectedTrooper.statistics.bulletsFired}</li>
            <li>Doors kicked: {selectedTrooper.statistics.doorsKicked}</li>
            <li>Doors blown up: {selectedTrooper.statistics.doorsBlownUp}</li>
            <li>Walls breached: {selectedTrooper.statistics.wallsBreached}</li>
            <li>Distance walked (meters): {selectedTrooper.statistics.distanceWalkedMeters}</li>
          </ul>
        </details>
        <div class="trooper__stats trooper__stats--abilities">
          <div class="title">Abilities</div>
          <ul>
            {#each selectedTrooper.abilities as ability}
              <li class="trooper__bar">
                <div class="subtitle">{ability.name}</div>
                <div class="progress">
                  {#each Array(10) as _, i}
                    <span class:active={ability.acquired >= i + 1} />
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
                  <span class:active={selectedTrooper.mobility >= i + 1} />
                {/each}
              </div>
            </li>
            <li class="trooper__bar">
              <div class="subtitle">
                Concealment
                {#if selectedTrooper.concealment < 3}
                  <span class="subtitle-concealment" style="color: #e62121">Overt</span>
                {:else if selectedTrooper.concealment < 7}
                  <span class="subtitle-concealment" style="color: #ffc600">Suspicious</span>
                {:else}
                  <span class="subtitle-concealment" style="color: #9fd3ff">Covert</span>
                {/if}
              </div>
              <div class="progress">
                {#each Array(10) as _, i}
                  <span class:active={selectedTrooper.concealment >= i + 1}>
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
        <Equipment className="primary" equipment={selectedTrooper.equipment} slot="PrimaryWeapon" />
        <Equipment className="secondary" equipment={selectedTrooper.equipment} slot="SecondaryWeapon" />
        <Equipment className="helmet" equipment={selectedTrooper.equipment} slot="Helmet" />
        <Equipment className="armor" equipment={selectedTrooper.equipment} slot="Armor" />
        <Equipment className="utility-1" equipment={selectedTrooper.equipment} slot="UtilityPouch1" />
        <Equipment className="utility-2" equipment={selectedTrooper.equipment} slot="UtilityPouch2" />
        <Equipment className="support-1" equipment={selectedTrooper.equipment} slot="SupportGear1" />
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
