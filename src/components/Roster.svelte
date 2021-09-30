<script lang="ts">
  import { parseXml } from "../parser";
  import type { Roster, Trooper } from "../types/Roster";

  export let roster: Roster | null = null;
  export let current: Trooper | null = null;

  export function onFileSelected(event: any) {
    const reader = new FileReader();
    reader.readAsText(event.target.files[0]);
    reader.onload = (loadEvent: ProgressEvent<FileReader>) => {
      if (typeof loadEvent.target.result !== "string")
        throw new Error("Error parsing file");
      roster = parseXml(loadEvent.target.result);
      console.log(roster);
    };
  }
</script>

<section class="roster">
  <div class="file-input">
    <input type="file" accept=".xml" on:change={(e) => onFileSelected(e)} />
    <pre>[USER]/AppData/Local/KillHouseGames/DoorKickers2/roster.xml</pre>
  </div>
  {#if roster}
    <ul>
      {#each roster.Squad as squad}
        <li class="squad">
          <div class="squads__unit">{squad.unit}</div>
          <div class="squads__name">{squad.name}</div>
          <ul>
            {#each squad.Trooper as trooper}
              <li
                class="trooper"
                class:selected={current ? current.Id === trooper.Id : false}
                on:click={() => (current = trooper)}
              >
                <div>{trooper.Id.name}</div>
                <div>{trooper.class}</div>
              </li>
            {/each}
          </ul>
        </li>
      {/each}
    </ul>
  {/if}
</section>

<style lang="scss">
  .roster {
    .file-input {
      padding: 8px;
      background-color: var(--bg-main);
    }

    .squad {
      margin-top: 20px;
      @mixin squad-title {
        padding: 5px;
        text-align: right;
        text-transform: uppercase;
      }
      .squads__unit {
        @include squad-title;
        background-color: #322117;
        color: #f2e6d6;
      }
      .squads__name {
        @include squad-title;
        background-color: #f0e4cc;
        color: #251e18;
      }

      ul {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 8px;
        padding: 8px;
        background-color: var(--bg-main);

        .trooper {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 75px;
          height: 75px;
          background-color: #261a0a;
          border: 3px solid #484232;
          border-radius: 50%;
          cursor: pointer;
          font-size: 10px;
          color: var(--accent);
          text-transform: uppercase;
          word-break: break-all;
          &:hover {
            border-color: var(--accent);
          }
          &.selected {
            border: 3px dashed var(--accent);
          }
        }
      }
    }
  }
</style>
