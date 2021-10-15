<script lang="ts">
  import { getRankProgress } from "@/utilities/getters";
  import type { ComputedLevel } from "@/types/Parsed";

  export let level: ComputedLevel;
</script>

{#if level}
  <div class="rank">
    <div class="subtitle rank__name">
      {level.rank}
    </div>
    {#if level.nextLevelXp}
      <div class="subtitle rank__xp-count">
        {level.earnedXp}/{level.nextLevelXp}
      </div>
    {/if}
    <div class="rank__bar">
      <div class="rank__bar-progress" style="width: {getRankProgress(level)}%" />
      <div class="rank__bar-level">{level.nextLevel}</div>
    </div>
  </div>
{/if}

<style lang="scss">
  .rank {
    position: absolute;
    right: 3px;
    bottom: 6px;
    left: 3px;
    padding: 5px 5px 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    background-color: var(--bg-main);
    font-family: "Bebas-Neue", sans-serif;
    &__name {
      padding-left: 45px;
      font-size: 18px;
    }
    &__xp-count {
      padding-right: 5px;
      text-align: right;
      font-size: 18px;
    }
    &__bar {
      position: relative;
      flex-basis: 100%;
      height: 25px;
      margin-left: 25px;
      background-color: var(--bg-main);
      border: 2px solid #423929;
      &-progress {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background-color: var(--header);
      }
      &-level {
        position: absolute;
        top: 50%;
        left: -25px;
        transform: translateY(-50%);
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: url("/images/ui/xp_level.webp") center / cover no-repeat;
        font-size: 20px;
        color: var(--dark-text);
      }
    }
  }
</style>
