<script lang="ts">
  import { GAME_VERSION } from "./data/version";
  import type { Roster } from "@/classes/Roster";
  import type { Trooper } from "@/classes/Trooper";
  import ManagerBlock from "@/components/Manager.svelte";
  import RosterBlock from "@/components/Roster.svelte";
  import TrooperBlock from "@/components/Trooper.svelte";

  let roster: Roster | null = $state(null);
  let selectedTrooper: Trooper | null = $state(null);
</script>

<main class="container">
  <div class="left-block">
    <ManagerBlock bind:roster />
    {#if selectedTrooper}
      <TrooperBlock {selectedTrooper} />
    {/if}
  </div>
  <RosterBlock bind:roster {selectedTrooper} selectTrooper={(trooper) => { selectedTrooper = trooper; }} />
</main>
<footer class="footer">
  <div>
    All game resources and images used with permission from
    <a href="https://inthekillhouse.com" rel="noopener">KillHouse Games</a>
  </div>
  <div>Updated for {GAME_VERSION}</div>
  <a href="https://github.com/VChet/dk2-loadout/issues" target="_blank" rel="noreferrer noopener">Report Bug</a>
</footer>

<style lang="scss">
  .container {
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;
    @media (width <= 768px) {
      flex-wrap: wrap-reverse;
    }
    .left-block {
      flex-basis: 850px;
      margin: 0 auto;
    }
  }
  .footer {
    display: grid;
    grid-template-columns: 2fr repeat(2, 1fr);
    gap: 8px;
    padding: 5px;
    margin-top: auto;
    text-align: center;
    background-color: var(--bg-main);
    @media (width <= 768px) {
      grid-template-columns: 1fr;
    }
    a {
      color: var(--accent);
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
