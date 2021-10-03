<script lang="ts">
  import { onMount } from "svelte";

  import SquadBlock from "./Squad.svelte";

  import { generateXml, parseXml } from "../utilities/parser";
  import { deserialize, serialize } from "../utilities/serializer";
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
        <SquadBlock {squad} bind:current />
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
  }
</style>
