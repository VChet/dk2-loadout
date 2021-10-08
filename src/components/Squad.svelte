<script lang="ts">
  import {
    getClassIcon,
    getFileName,
    getTrooperImg,
  } from "../utilities/getters";
  import type { Squad, Trooper } from "../types/Roster";

  export let current: Trooper | null = null;
  export let squad: Squad | null = null;

  $: classMap = squad.Trooper.reduce((acc, trooper) => {
    acc[trooper.class]
      ? acc[trooper.class].push(trooper)
      : (acc[trooper.class] = [trooper]);
    return acc;
  }, {}) as { [key: string]: Array<Trooper> };
</script>

{#if squad}
  <li
    class="squad"
    class:squad--ranger={squad.unit === "Rangers"}
    class:squad--cia={squad.unit === "CIA"}
  >
    <div class="squad__unit">{squad.unit}</div>
    <div class="squad__name">{squad.name}</div>
    <ul>
      {#each Object.keys(classMap) as className}
        <li class="squad__class">
          <div class="squad__class-name">
            <img
              src={getClassIcon(className)}
              alt={getFileName(className)}
              draggable="false"
            />
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
    margin-top: 10px;
    @mixin squad-title {
      padding: 5px 10px;
      text-align: right;
      font-family: "Bebas-Neue";
      text-transform: uppercase;
      line-height: 1;
    }
    &--ranger {
      .squad__unit {
        background-image: url("/images/rangers_bg.webp");
      }
      .squad__class-name {
        @include squad-title;
        background-color: #cc8a3c;
      }
    }
    &--cia {
      .squad__unit {
        background-image: url("/images/cia_bg.webp");
      }
      .squad__class-name {
        @include squad-title;
        background-color: #6a899e;
      }
    }
    .squad__unit {
      @include squad-title;
      box-shadow: inset 0 0 0 50px var(--bg-main);
      color: #f2e6d6;
      font-size: 24px;
    }
    .squad__name {
      @include squad-title;
      background-color: #f0e4cc;
      color: #251e18;
      font-size: 28px;
    }

    ul {
      .squad__class {
        + .squad__class {
          margin-top: 10px;
        }
        .squad__class-name {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #251e18;
          font-size: 28px;
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
            background-color: #261a0a;
            border: 3px solid #4c3f2e;
            border-radius: 50%;
            overflow: hidden;
            cursor: pointer;
            &:hover {
              border-color: var(--accent);
            }
            &.selected {
              border: 3px dashed var(--accent);
            }
            img {
              max-width: 60px;
              max-height: 60px;
            }
          }
        }
      }
    }
  }
</style>
