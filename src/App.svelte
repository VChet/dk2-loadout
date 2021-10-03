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
    All game resources and images belong to their respective owner —
    <a href="https://inthekillhouse.com" rel="noopener">KillHouse Games</a>
  </div>
  <a
    href="https://github.com/VChet/dk2-loadout/issues"
    target="_blank"
    rel="noopener"
  >
    Report Bug
  </a>
</footer>

<style lang="scss">
  .container {
    display: flex;
    align-items: flex-start;
  }
  .footer {
    display: flex;
    flex-wrap: wrap;
    gap: 25%;
    justify-content: space-around;
    margin-top: 20px;
    padding: 5px;
    background-color: var(--bg-main);
    a {
      color: var(--accent);
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
