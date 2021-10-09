<script lang="ts">
  import RosterBlock from "./components/Roster.svelte";
  import TrooperBlock from "./components/Trooper.svelte";
  import type { Trooper } from "./types/Roster";

  let current: Trooper;
</script>

<main class="container">
  <TrooperBlock {current} />
  <RosterBlock bind:current />
</main>
<footer class="footer">
  <div>
    All game resources and images used with permission from
    <a href="https://inthekillhouse.com" rel="noopener">KillHouse Games</a>
  </div>
  <div>Tested on 0.20v</div>
  <a href="https://github.com/VChet/dk2-loadout/issues" target="_blank" rel="noopener">Report Bug</a>
</footer>

<style lang="scss">
  .container {
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;
    @media (max-width: 768px) {
      flex-wrap: wrap-reverse;
    }
  }
  .footer {
    display: grid;
    grid-template-columns: 2fr repeat(2, 1fr);
    gap: 8px;
    margin-top: auto;
    padding: 5px;
    background-color: var(--bg-main);
    text-align: center;
    @media (max-width: 768px) {
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
