<script lang="ts">
  import { onMount } from "svelte";

  import SquadBlock from "./Squad.svelte";

  import { generateXml, parseXml } from "../utilities/parser";
  import { createShortLink, getUrlParams } from "../utilities/shortenUrl";
  import { downloadFile, readFile } from "../utilities/files";
  import type { Roster, Trooper } from "../types/Roster";

  export let current: Trooper | null = null;
  let roster: Roster | null = null;

  async function onFileSelected(event: any) {
    const content = await readFile(event.target.files[0]);
    if (content) {
      roster = parseXml(content.toString()).Roster;
      if (!roster) alert("Wrong XML file");
    }
  }

  async function getUrl() {
    const { code, shortLink } = await createShortLink(roster);
    const url = new URL(window.location.href);
    if (shortLink) {
      url.searchParams.set("link", shortLink);
      url.searchParams.delete("code");
    } else {
      url.searchParams.set("code", code);
      url.searchParams.delete("link");
    }
    window.history.pushState({}, window.document.title, url);
    navigator.clipboard.writeText(window.location.href);
  }

  function downloadXml() {
    downloadFile(generateXml({ Roster: roster }), "new_roster.xml");
  }

  onMount(async () => {
    const rosterData = await getUrlParams(window.location.search);
    if (rosterData) roster = rosterData;
  });
</script>

<section class="roster">
  <div class="file-input-wrap">
    <label for="file-input" class="visually-hidden">Roster Upload</label>
    <input
      id="file-input"
      type="file"
      accept=".xml"
      on:change={(e) => onFileSelected(e)}
    />
    <pre>[USER]/AppData/Local/KillHouseGames/DoorKickers2/roster.xml</pre>
    {#if roster}
      <button on:click={getUrl}>Copy URL</button>
      <button on:click={downloadXml}>Download XML</button>
    {/if}
  </div>
  {#if roster}
    <ul>
      {#each roster.Squad as squad}
        <SquadBlock {squad} bind:current />
      {/each}
    </ul>
  {/if}
</section>

<style lang="scss">
  .roster {
    @media (max-width: 768px) {
      flex: 1;
      max-height: 300px;
      overflow-y: auto;
      margin-bottom: 20px;
    }
    .file-input-wrap {
      padding: 8px;
      background-color: var(--bg-main);
      pre {
        white-space: normal;
        word-break: break-word;
      }
    }
  }
</style>
