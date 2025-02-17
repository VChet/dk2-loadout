<script lang="ts">
  import type { Roster } from "@/classes/Roster";
  import type { Squad } from "@/classes/Squad";
  import type { Trooper } from "@/classes/Trooper";
  import SquadBlock from "@/components/Squad.svelte";

  export let roster: Roster | null = null;
  export let selectedTrooper: Trooper | null = null;

  function deleteSquad(squadId: Squad["id"]) {
    if (!roster) { return; }
    roster.data.Squad = roster.data.Squad.filter(({ $id }) => $id !== squadId);
    selectedTrooper = null;
  }
</script>

{#if roster}
  <section class="roster">
    <ul>
      {#each roster.squads as squad}
        <SquadBlock bind:squad bind:selectedTrooper {deleteSquad} />
      {/each}
    </ul>
  </section>
{/if}

<style lang="scss">
  .roster {
    flex-basis: 300px;
    @media (width <= 768px) {
      flex: 1;
      max-height: 300px;
      margin-bottom: 20px;
      overflow-y: auto;
    }
    ul {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
</style>
