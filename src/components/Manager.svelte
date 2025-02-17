<script lang="ts">
  import { onMount } from "svelte";
  import { Roster } from "@/classes/Roster";
  import { downloadFile, readFile } from "@/helpers/file";
  import { generateXML, parseXML } from "@/helpers/parser";
  import { createShortLink, getDataFromCode } from "@/helpers/share";
  import type { IRoster } from "@/types/roster";

  export let roster: Roster | null = null;

  async function onFileSelected(event: any) {
    const content = await readFile(event.target.files[0]);
    if (content) {
      const rosterData = parseXML(content.toString()).Roster;
      if (!rosterData) return alert("Wrong XML file"); // eslint-disable-line no-alert
      roster = new Roster(rosterData);
      window.history.pushState({}, window.document.title, "/");
    }
  }
  function handleSameFile({ currentTarget }: any) {
    currentTarget.value = "";
  }

  async function share() {
    if (!roster) return;
    const code = await createShortLink(roster);
    const url = new URL(window.location.href);
    if (code) { url.searchParams.set("code", code); }
    window.history.pushState({}, window.document.title, url);
    navigator.clipboard.writeText(window.location.href);
  }

  function downloadXml() {
    if (!roster) return;
    const now = new Date();
    const date = `${now.getFullYear()}${now.getMonth()}${now.getDate()}`;
    downloadFile(generateXML({ Roster: roster.data }), `roster-${date}.xml`);
  }

  onMount(async () => {
    const response = await getDataFromCode(window.location.search) as { data: IRoster };
    if (response) { roster = new Roster(response.data); }
  });
</script>

<section class="file-input-wrap">
  <label>
    Upload Roster
    <input class="visually-hidden" type="file" accept=".xml" on:change={onFileSelected} on:click={handleSameFile} />
  </label>
  <pre>
    roster.xml at
    <b>%LocalAppData%/KillHouseGames/DoorKickers2</b>
  </pre>
  {#if roster}
    <div class="button-group">
      <button on:click={share}>Share URL</button>
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
      padding: 4px;
      font-family: Bebas-Neue, sans-serif;
      font-size: 24px;
      color: var(--paragraph);
      text-align: center;
      cursor: pointer;
      outline: inherit;
      background: var(--bg-main);
      border: none;
      &:hover,
      &:focus {
        color: var(--dark-text);
        background-color: var(--paragraph);
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
      padding: 4px;
      margin: 0;
      word-break: break-word;
      white-space: normal;
      background-color: var(--bg-main);
    }
  }
</style>
