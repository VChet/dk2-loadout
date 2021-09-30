<script lang="ts">
  import type { Trooper } from "../types/Roster";
  export let current: Trooper;
</script>

<div class="trooper">
  {#if current}
    <div class="trooper__class">{current.Id.name}</div>
    <div class="trooper__wrapper">
      <div class="trooper__statistics">
        <div class="title">Abilities</div>
        <ul>
          {#each current.InnateAbilities.InnateAbility as ability}
            <li class="trooper__ability">
              <div class="subtitle">{ability.name} ({ability.percent}%)</div>
              <div class="progress">
                {#each Array(10) as _, i}
                  <span
                    class:active={Math.round(Number(ability.percent) / 10) >=
                      i + 1}
                  />
                {/each}
              </div>
            </li>
          {/each}
        </ul>
      </div>
      <ul class="trooper__equipment">
        <li class="primary">
          {#if current.Equipment.PrimaryWeapon}
            {#if false}<img alt="PrimaryWeapon" />{/if}
            <div class="subtitle">{current.Equipment.PrimaryWeapon.name}</div>
            <div class="trooper__equipment-attachments">
              {#if current.Equipment.PrimaryWeaponAmmo}
                <div>
                  {#if false}<img alt="PrimaryWeaponAmmo" />{/if}
                  <div class="subtitle">
                    {current.Equipment.PrimaryWeaponAmmo.name}
                  </div>
                </div>
              {/if}
              {#if current.Equipment.PrimaryWeaponScope}
                <div>
                  {#if false}<img alt="PrimaryWeaponScope" />{/if}
                  <div class="subtitle">
                    {current.Equipment.PrimaryWeaponScope.name}
                  </div>
                </div>
              {/if}
            </div>
          {:else}
            <div class="subtitle">Empty</div>
          {/if}
        </li>
        <li class="secondary">
          {#if current.Equipment.SecondaryWeapon}
            {#if false}<img alt="SecondaryWeapon" />{/if}
            <div class="subtitle">{current.Equipment.SecondaryWeapon.name}</div>
            <div class="trooper__equipment-attachments">
              {#if current.Equipment.SecondaryWeaponScope}
                <div>
                  {#if false}<img alt="SecondaryWeaponScope" />{/if}
                  <div class="subtitle">
                    {current.Equipment.SecondaryWeaponScope.name}
                  </div>
                </div>
              {/if}
              {#if current.Equipment.SecondaryWeaponAmmo}
                <div>
                  {#if false}<img alt="SecondaryWeaponAmmo" />{/if}
                  <div class="subtitle">
                    {current.Equipment.SecondaryWeaponAmmo.name}
                  </div>
                </div>
              {/if}
            </div>
          {:else}
            <div class="subtitle">Empty</div>
          {/if}
        </li>
        <li class="armor">
          {#if current.Equipment.Armor}
            {#if false}<img alt="Armor" />{/if}
            <div class="subtitle">{current.Equipment.Armor.name}</div>
          {/if}
        </li>
        <li class="utility-1">
          {#if current.Equipment.UtilityPouch1}
            {#if false}<img alt="UtilityPouch1" />{/if}
            <div class="subtitle">{current.Equipment.UtilityPouch1.name}</div>
          {:else}
            <div class="subtitle">Empty</div>
          {/if}
        </li>
        <li class="utility-2">
          {#if current.Equipment.UtilityPouch2}
            {#if false}<img alt="UtilityPouch2" />{/if}
            <div class="subtitle">{current.Equipment.UtilityPouch2.name}</div>
          {:else}
            <div class="subtitle">Empty</div>
          {/if}
        </li>
        {#if current.Equipment.SupportGear1}
          <li class="support-1">
            {#if false}<img alt="SupportGear1" />{/if}
            <div class="subtitle">{current.Equipment.SupportGear1.name}</div>
          </li>
        {/if}
        {#if current.Equipment.SupportGear2}
          <li class="support-2">
            {#if false}<img alt="SupportGear2" />{/if}
            <div class="subtitle">{current.Equipment.SupportGear2.name}</div>
          </li>
        {/if}
        {#if current.Equipment.SupportGear3}
          <li class="support-3">
            {#if false}<img alt="SupportGear3" />{/if}
            <div class="subtitle">{current.Equipment.SupportGear3.name}</div>
          </li>
        {/if}
      </ul>
    </div>
  {/if}
</div>

<style lang="scss">
  .trooper {
    margin: 0 auto;
    flex-basis: 60%;
    background-color: var(--bg-main);
    padding: 20px;
    .trooper__class {
      text-transform: uppercase;
      color: var(--title);
      font-size: 40px;
      margin-bottom: 32px;
    }
    .trooper__wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      .trooper__statistics {
        .title {
          font-size: 40px;
          line-height: 40px;
          border-bottom: 3px solid var(--title);
        }
        .trooper__ability {
          background-color: var(--bg-main);
          padding: 8px;
          margin-top: 8px;
          .subtitle {
            margin-bottom: 5px;
          }
          .progress {
            display: grid;
            grid-template-columns: repeat(10, 1fr);
            gap: 2px;
            span {
              height: 12px;
              background-color: var(--bg-main);
              color: red;
              font-size: 10px;
              &.active {
                background-color: var(--text);
              }
            }
          }
        }
      }
      .trooper__equipment {
        display: grid;
        gap: 8px;
        grid-template-columns: 1fr 1fr;
        .subtitle {
          background-color: var(--bg-main);
          padding: 4px 8px;
        }
        li {
          background-color: var(--bg-main);
          &.primary,
          &.secondary,
          &.armor,
          &[class^="support-"] {
            grid-column: 1 / -1;
          }

          .trooper__equipment-attachments {
            display: grid;
            grid-template-columns: 1fr 1fr;
            background-color: #0d0b0c;
          }
        }
      }
    }
  }
</style>
