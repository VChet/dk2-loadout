<script lang="ts">
  import { onMount } from "svelte";
  import { generateXml, parseXml } from "../utilities/parser";
  import { getPortraitName } from "../utilities/getters";
  import { deserialize, serialize } from "../utilities/serializer";
  import { downloadFile, readFile } from "../utilities/files";
  import type { Roster, Trooper } from "../types/Roster";

  export let roster: Roster | null = null;
  export let current: Trooper | null = null;

  export async function onFileSelected(event: any) {
    const content = await readFile(event.target.files[0]);
    if (content) {
      roster = parseXml(content.toString()).Roster;
    }
  }

  function getUrl() {
    const data = serialize(roster);
    const url = new URL(window.location.href);
    url.searchParams.set("code", data);
    window.history.pushState({}, window.document.title, url);
  }

  function downloadXml() {
    downloadFile(generateXml({ Roster: roster }), "new_roster.xml");
  }

  onMount(() => {
    const urlCode = new URLSearchParams(window.location.search).get("code");
    if (urlCode) roster = deserialize(urlCode);
  });
</script>

<section class="roster">
  <div class="file-input">
    <input type="file" accept=".xml" on:change={(e) => onFileSelected(e)} />
    <pre>[USER]/AppData/Local/KillHouseGames/DoorKickers2/roster.xml</pre>
    {#if roster}
      <button on:click={getUrl}>Get URL</button>
      <button on:click={downloadXml}>Download XML</button>
    {/if}
  </div>
  {#if roster}
    <ul>
      {#each roster.Squad as squad}
        <li class="squad">
          <div
            class="squads__unit"
            class:squads__unit--ranger={squad.unit === "Rangers"}
            class:squads__unit--cia={squad.unit === "CIA"}
          >
            {squad.unit}
          </div>
          <div class="squads__name">{squad.name}</div>
          <ul>
            {#each squad.Trooper as trooper}
              <li
                class="trooper"
                class:selected={current ? current.Id === trooper.Id : false}
                on:click={() => (current = trooper)}
              >
                <img
                  src={`images/portraits/${getPortraitName(
                    trooper.Id.portrait
                  )}.webp`}
                  alt={getPortraitName(trooper.Id.portrait)}
                  draggable="false"
                />
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
        font-family: "Bebas-Neue";
        text-transform: uppercase;
      }
      .squads__unit {
        @include squad-title;
        box-shadow: inset 0 0 0 50px var(--bg-main);
        color: #f2e6d6;
        font-size: 24px;
        line-height: 1;
        &--ranger {
          background-image: url("/images/rangers_bg.webp");
        }
        &--cia {
          background-image: url("/images/cia_bg.webp");
        }
      }
      .squads__name {
        @include squad-title;
        background-color: #f0e4cc;
        color: #251e18;
        font-size: 28px;
        line-height: 1;
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
          border: 3px solid #484232;
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
            max-width: 80px;
            max-height: 80px;
          }
        }
      }
    }
  }
</style>
