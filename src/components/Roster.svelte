<script lang="ts">
  import SquadBlock from "./Squad.svelte";
  import type { Roster, Trooper } from "../types/Roster";

  export let roster: Roster | null = null;
  export let current: Trooper | null = null;
</script>

{#if roster}
  <section class="roster">
    <ul>
      {#each roster.Squad as squad}
        <SquadBlock {squad} bind:current />
      {/each}
    </ul>
  </section>
{/if}

<style lang="scss">
  .roster {
    flex-basis: 300px;
    @media (max-width: 768px) {
      flex: 1;
      max-height: 300px;
      overflow-y: auto;
      margin-bottom: 20px;
    }
    ul {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
</style>
