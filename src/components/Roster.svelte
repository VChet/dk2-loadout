<script lang="ts">
  import SquadBlock from "@/components/Squad.svelte";
  import type { Roster } from "@/classes/Roster";
  import type { Trooper } from "@/classes/Trooper";

  export let roster: Roster | null = null;
  export let selectedTrooper: Trooper | null = null;
</script>

{#if roster}
  <section class="roster">
    <ul>
      {#each roster.squads as squad}
        <SquadBlock bind:squad bind:selectedTrooper />
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
