<script lang="ts">
  import { onMount } from "svelte";

  import { generateXml, parseXml } from "../utilities/parser";
  import { createShortLink, getUrlParams } from "../utilities/shortenUrl";
  import { downloadFile, readFile } from "../utilities/files";
  import type { Roster } from "../types/Roster";

  export let roster: Roster | null = null;

  async function onFileSelected(event: any) {
    const content = await readFile(event.target.files[0]);
    if (content) {
      roster = parseXml(content.toString()).Roster;
      if (!roster) return alert("Wrong XML file");
      window.history.pushState({}, window.document.title, "/");
    }
  }

  async function getUrl() {
    if (!roster) return;
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
    const now = new Date();
    const date = `${now.getFullYear()}${now.getMonth()}${now.getDate()}`;
    downloadFile(generateXml({ Roster: roster }), `roster-${date}.xml`);
  }

  onMount(async () => {
    const rosterData = await getUrlParams(window.location.search);
    if (rosterData) roster = rosterData;
  });
</script>

<section class="file-input-wrap">
  <label>
    Upload Roster
    <input class="visually-hidden" type="file" accept=".xml" on:change={(e) => onFileSelected(e)} />
  </label>
  <pre>%LocalAppData%/KillHouseGames/DoorKickers2/roster.xml</pre>
  {#if roster}
    <div class="button-group">
      <button on:click={getUrl}>Share URL</button>
      <button on:click={downloadXml}>Download</button>
    </div>
  {/if}
</section>

<style lang="scss">
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
    .button-group {
      display: flex;
      gap: 8px;
      button {
        flex: 50%;
      }
    }
    pre {
      background-color: var(--bg-main);
      margin: 0;
      padding: 4px;
      white-space: normal;
      word-break: break-word;
    }
  }
</style>
