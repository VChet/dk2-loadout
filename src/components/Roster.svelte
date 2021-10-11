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
      if (!roster) return alert("Wrong XML file");
      window.history.pushState({}, window.document.title, "/");
      current = null;
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
    <label>
      Upload Roster
      <input class="visually-hidden" type="file" accept=".xml" on:change={(e) => onFileSelected(e)} />
    </label>
    {#if !roster}
      <pre>%LocalAppData%/KillHouseGames/DoorKickers2/roster.xml</pre>
    {:else}
      <button on:click={getUrl}>Share URL</button>
      <button on:click={downloadXml}>Download</button>
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
    flex-basis: 300px;
    @media (max-width: 768px) {
      flex: 1;
      max-height: 300px;
      overflow-y: auto;
      margin-bottom: 20px;
    }
    .file-input-wrap {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 8px;
      background-color: var(--bg-main);
      label,
      button {
        background: var(--bg-main);
        color: var(--paragraph);
        border: none;
        padding: 4px;
        outline: inherit;
        cursor: pointer;
        font-family: "Bebas-Neue";
        text-align: center;
        font-size: 24px;
        &:hover,
        &:focus {
          background-color: var(--paragraph);
          color: var(--dark-text);
        }
      }
      pre {
        background-color: var(--bg-main);
        margin: 0;
        padding: 4px;
        white-space: normal;
        word-break: break-word;
        font-size: 12px;
      }
    }
  }
</style>
