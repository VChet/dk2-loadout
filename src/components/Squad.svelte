<script lang="ts">
  import { getClassImg, getClassTitle } from "@/helpers/data-getter";
  import type { Squad } from "@/classes/Squad";
  import type { Trooper } from "@/classes/Trooper";

  export let selectedTrooper: Trooper | null = null;
  export let squad: Squad | null = null;

  function deleteSquad() {
    squad = null;
    selectedTrooper = null;
  }
</script>

{#if squad}
  <li
    class="squad"
    class:squad--ranger={squad.unit === "Rangers"}
    class:squad--cia={squad.unit === "CIA"}
    class:squad--nowheraki={squad.unit === "Nowheraki"}
  >
    <div class="squad__unit">
      <button aria-label="Delete Squad" on:click={deleteSquad}></button>
      {squad.unit}
    </div>
    <div class="squad__name">{squad.name}</div>
    <ul>
      {#each Object.keys(squad.classMap) as className}
        <li class="squad__class">
          <div class="squad__class-name">
            <img src={getClassImg(className)} alt={className} draggable="false" />
            {getClassTitle(className)}
          </div>
          <ul>
            {#each squad.classMap[className] as trooper}
              <li>
                <button
                  class="trooper"
                  class:selected={selectedTrooper?.id === trooper.id}
                  on:click={() => (selectedTrooper = trooper)}
                >
                  <img src={trooper.portraitSmall} alt={trooper.portraitFile} draggable="false" />
                </button>
              </li>
            {/each}
          </ul>
        </li>
      {/each}
    </ul>
  </li>
{/if}

<style lang="scss">
  .squad {
    @mixin squad-title {
      padding: 5px 10px;
      font-family: Bebas-Neue, sans-serif;
      line-height: 1;
      color: var(--dark-text);
      text-align: right;
      text-transform: uppercase;
    }
    &__unit {
      @include squad-title;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 24px;
      color: var(--paragraph);
      background-size: cover;
      box-shadow: inset 0 0 0 50px var(--bg-main);
      button {
        width: 30px;
        height: 30px;
        padding: 0;
        cursor: pointer;
        outline: inherit;
        background: url("/img/gui/mod_remove.webp") no-repeat center / contain;
        border: none;
        &:hover,
        &:focus {
          background-image: url("/img/gui/mod_remove_hover.webp");
        }
      }
    }
    &__name {
      @include squad-title;
      font-size: 28px;
      background-color: var(--paragraph);
    }
    &__class {
      + .squad__class {
        margin-top: 10px;
      }
      &-name {
        @include squad-title;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 28px;
        background-color: #bbb;
        &::before {
          position: absolute;
          top: 0;
          left: 0;
          width: 120px;
          height: 100%;
          content: "";
          background-image: url("/img/gui/deploy/deploy_class_diagonalbars.webp");
          background-repeat: no-repeat;
        }
        img {
          z-index: 1;
          max-width: 24px;
        }
      }
      ul {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 8px;
        padding: 8px;
        background-color: var(--bg-main);
        .trooper {
          box-sizing: content-box;
          width: 60px;
          height: 60px;
          padding: 0;
          cursor: pointer;
          background: #1a1407 url("/img/gui/deploy/deploy_trooperbackground_01.webp") center no-repeat;
          border: 3px solid #4c3f2e;
          border-radius: 50%;
          &:hover,
          &.selected {
            border-color: var(--accent);
          }
          &.selected {
            box-shadow: inset 0 0 6px 1px var(--accent), 0 0 3px 1px var(--accent);
          }
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
    &--ranger {
      .squad__unit {
        background-image: url("/img/gui/squads/rangers_bg_01.webp");
      }
      .squad__class .squad__class-name {
        background-color: #cb893e;
      }
    }
    &--cia {
      .squad__unit {
        background-image: url("/img/gui/squads/cia_bg_01.webp");
      }
      .squad__class .squad__class-name {
        background-color: #6a879d;
      }
    }
    &--nowheraki {
      .squad__unit {
        background-image: url("/img/gui/squads/nowheraki_bg_01.webp");
      }
      .squad__class .squad__class-name {
        background-color: #c55b45;
      }
    }
  }
</style>
