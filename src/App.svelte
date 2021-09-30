<script lang="ts">
  import RosterBlock from "./components/Roster.svelte";
  import TrooperBlock from "./components/Trooper.svelte";
  import type { Trooper } from "./types/Roster";

  export let current: Trooper;
</script>

<main class="container">
  <TrooperBlock {current} />
  <RosterBlock bind:current />
</main>

<style lang="scss">
  .container {
    display: flex;
    align-items: flex-start;
    gap: 80px;
  }
</style>
