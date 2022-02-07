<script lang="ts">
  import { getClassImg, getFileName, getTrooperImg } from "@/utilities/getters";
  import type { Squad, Trooper } from "@/types/Roster";

  export let selectedTrooper: Trooper | null = null;
  export let squad: Squad | null = null;

  function mapClasses(): { [key: string]: Array<Trooper> } {
    if (!squad) return {};
    return squad.Trooper.reduce((acc: { [key: string]: Array<Trooper> }, trooper) => {
      acc[trooper.$class] ? acc[trooper.$class].push(trooper) : (acc[trooper.$class] = [trooper]);
      return acc;
    }, {});
  }
  $: classMap = mapClasses();

  function removeSquad() {
    squad = null;
    selectedTrooper = null;
  }
</script>

{#if squad}
  <li
    class="squad"
    class:squad--ranger={squad.$unit === "Rangers"}
    class:squad--cia={squad.$unit === "CIA"}
    class:squad--nowheraki={squad.$unit === "Nowheraki"}
  >
    <div class="squad__unit">
      <button on:click={removeSquad} />
      {squad.$unit}
    </div>
    <div class="squad__name">{squad.$name}</div>
    <ul>
      {#each Object.keys(classMap) as className}
        <li class="squad__class">
          <div class="squad__class-name">
            <img src={getClassImg(className)} alt={className} draggable="false" />
            {className}
          </div>
          <ul>
            {#each classMap[className] as trooper}
              <li
                class="trooper"
                class:selected={selectedTrooper?.Id === trooper.Id}
                on:click={() => (selectedTrooper = trooper)}
              >
                <img
                  src={getTrooperImg(trooper.Id.$portrait)}
                  alt={getFileName(trooper.Id.$portrait)}
                  draggable="false"
                />
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
      text-align: right;
      font-family: "Bebas-Neue";
      text-transform: uppercase;
      line-height: 1;
      color: var(--dark-text);
    }
    &__unit {
      display: flex;
      align-items: center;
      justify-content: space-between;
      @include squad-title;
      box-shadow: inset 0 0 0 50px var(--bg-main);
      color: var(--paragraph);
      font-size: 24px;
      button {
        width: 30px;
        height: 30px;
        background: url("/images/ui/squad_delete.webp") no-repeat center / contain;
        border: none;
        padding: 0;
        outline: inherit;
        cursor: pointer;
        &:hover,
        &:focus {
          background-image: url("/images/ui/squad_delete_hover.webp");
        }
      }
    }
    &__name {
      @include squad-title;
      background-color: var(--paragraph);
      font-size: 28px;
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
        background-color: #bbbbbb;
        &:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 120px;
          height: 100%;
          background-image: url("/images/ui/class_bars.webp");
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
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin: auto;
          background: #1a1407 url("/images/ui/trooper_background.webp") center no-repeat;
          border: 3px solid #4c3f2e;
          border-radius: 50%;
          overflow: hidden;
          cursor: pointer;
          &:hover,
          &.selected {
            border-color: var(--accent);
          }
          &.selected {
            box-shadow: inset 0 0 6px 1px var(--accent), 0 0 3px 1px var(--accent);
          }
          img {
            width: 60px;
            height: 60px;
          }
        }
      }
    }
    &--ranger {
      .squad__unit {
        background-image: url("/images/rangers_bg.webp");
      }
      .squad__class .squad__class-name {
        background-color: #cb893e;
      }
    }
    &--cia {
      .squad__unit {
        background-image: url("/images/cia_bg.webp");
      }
      .squad__class .squad__class-name {
        background-color: #6a879d;
      }
    }
    &--nowheraki {
      .squad__unit {
        background-image: url("/images/nowheraki_bg.webp");
      }
      .squad__class .squad__class-name {
        background-color: #c55b45;
      }
    }
  }
</style>
