<script lang="ts">
  import type { Roster } from "@/classes/Roster";
  import type { Squad } from "@/classes/Squad";
  import type { Trooper } from "@/classes/Trooper";
  import SquadBlock from "@/components/Squad.svelte";

  interface Props {
    roster: Roster | null
    selectedTrooper: Trooper | null
    selectTrooper: (trooper: Trooper) => void
  }

  let { roster = $bindable(null), selectedTrooper = null, selectTrooper }: Props = $props();

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
        <SquadBlock {squad} {deleteSquad} {selectedTrooper} {selectTrooper} />
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
