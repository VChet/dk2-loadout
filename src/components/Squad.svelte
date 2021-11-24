<script lang="ts">
  import type { Squad, Trooper } from "../types/Roster";
  import { getClassIcon, getFileName, getTrooperImg } from "../utilities/getters";

  export let current: Trooper | null = null;
  export let squad: Squad | null = null;

  $: classMap = squad.Trooper.reduce((acc, trooper) => {
    acc[trooper.class] ? acc[trooper.class].push(trooper) : (acc[trooper.class] = [trooper]);
    return acc;
  }, {}) as { [key: string]: Array<Trooper> };
</script>

{#if squad}
  <li class="squad" class:squad--ranger={squad.unit === "Rangers"} class:squad--cia={squad.unit === "CIA"}>
    <div class="squad__unit">{squad.unit}</div>
    <div class="squad__name">{squad.name}</div>
    <ul>
      {#each Object.keys(classMap) as className}
        <li class="squad__class">
          <div class="squad__class-name">
            <img src={getClassIcon(className)} alt={getFileName(className)} draggable="false" />
            {className}
          </div>
          <ul>
            {#each classMap[className] as trooper}
              <li
                class="trooper"
                class:selected={current ? current.Id === trooper.Id : false}
                on:click={() => (current = trooper)}
              >
                <img
                  src={getTrooperImg(trooper.Id.portrait)}
                  alt={getFileName(trooper.Id.portrait)}
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
      @include squad-title;
      box-shadow: inset 0 0 0 50px var(--bg-main);
      color: var(--paragraph);
      font-size: 24px;
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
  }
</style>
