<script lang="ts">
  import {
    getAttachmentImg,
    getFileName,
    getWeaponImg,
  } from "../utilities/getters";
  import type { Trooper } from "../types/Roster";

  export let current: Trooper;
</script>

<section class="trooper">
  {#if current}
    <div class="trooper__name">{current.Id.name}</div>
    <div class="trooper__wrapper">
      <div class="trooper__statistics">
        <div class="trooper__image">
          <img
            class="trooper__image-portrait"
            src={`images/portraits/${getFileName(
              current.Id.portrait
            )}_large.webp`}
            alt={getFileName(current.Id.portrait)}
            draggable="false"
          />
          <img
            class="trooper__image-class"
            src={`images/classes/${current.class.toLowerCase()}.webp`}
            alt={current.class}
            draggable="false"
          />
        </div>
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
            <img
              src={`images/weapons/${getWeaponImg(
                current.Equipment.PrimaryWeapon.name
              )}.webp`}
              alt={getWeaponImg(current.Equipment.PrimaryWeapon.name)}
              draggable="false"
            />
            <div class="trooper__equipment-attachments">
              {#if current.Equipment.PrimaryWeaponAmmo}
                <img
                  src={`images/weapons/attachments/${getAttachmentImg(
                    current.Equipment.PrimaryWeaponAmmo.name
                  )}_small.webp`}
                  alt={getAttachmentImg(
                    current.Equipment.PrimaryWeaponAmmo.name
                  )}
                  title={current.Equipment.PrimaryWeaponAmmo.name}
                  draggable="false"
                />
              {/if}
              {#if current.Equipment.PrimaryWeaponScope}
                <img
                  src={`images/weapons/attachments/${getAttachmentImg(
                    current.Equipment.PrimaryWeaponScope.name
                  )}_small.webp`}
                  alt={getAttachmentImg(
                    current.Equipment.PrimaryWeaponScope.name
                  )}
                  title={current.Equipment.PrimaryWeaponScope.name}
                  draggable="false"
                />
              {/if}
            </div>
            <div class="subtitle">{current.Equipment.PrimaryWeapon.name}</div>
          {:else}
            <div class="subtitle">Empty</div>
          {/if}
        </li>
        <li class="secondary">
          {#if current.Equipment.SecondaryWeapon}
            <img
              src={`images/weapons/${getWeaponImg(
                current.Equipment.SecondaryWeapon.name
              )}.webp`}
              alt={getWeaponImg(current.Equipment.SecondaryWeapon.name)}
              draggable="false"
            />
            <div class="trooper__equipment-attachments">
              {#if current.Equipment.SecondaryWeaponAmmo}
                <img
                  src={`images/weapons/attachments/${getAttachmentImg(
                    current.Equipment.SecondaryWeaponAmmo.name
                  )}_small.webp`}
                  alt={getAttachmentImg(
                    current.Equipment.SecondaryWeaponAmmo.name
                  )}
                  title={current.Equipment.SecondaryWeaponAmmo.name}
                  draggable="false"
                />
              {/if}
              {#if current.Equipment.SecondaryWeaponScope}
                <img
                  src={`images/weapons/attachments/${getAttachmentImg(
                    current.Equipment.SecondaryWeaponScope.name
                  )}_small.webp`}
                  alt={getAttachmentImg(
                    current.Equipment.SecondaryWeaponScope.name
                  )}
                  title={current.Equipment.SecondaryWeaponScope.name}
                  draggable="false"
                />
              {/if}
            </div>
            <div class="subtitle">{current.Equipment.SecondaryWeapon.name}</div>
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
</section>

<style lang="scss">
  .trooper {
    margin: 0 auto;
    flex-basis: 850px;
    background-color: var(--bg-main);
    padding: 20px;
    .trooper__name {
      margin-bottom: 32px;
      text-transform: uppercase;
      color: var(--title);
      font-family: "Bebas-Neue";
      font-size: 64px;
      line-height: 1;
    }
    .trooper__wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      .trooper__statistics {
        .title {
          font-size: 40px;
          line-height: 32px;
          border-bottom: 3px solid var(--title);
        }
        .trooper__image {
          position: relative;
          margin-bottom: 20px;
          .trooper__image-portrait {
            max-width: 100%;
          }
          .trooper__image-class {
            position: absolute;
            top: 0;
            right: 0;
            padding: 12px;
          }
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
          position: relative;
          background-color: var(--bg-main);
          display: flex;
          flex-direction: column;
          min-height: 120px;
          > img {
            align-self: center;
            box-sizing: border-box;
            height: 130px;
            padding: 20px;
          }
          .subtitle {
            margin-top: auto;
          }
          &.primary,
          &.secondary,
          &.armor,
          &[class^="support-"] {
            grid-column: 1 / -1;
          }

          .trooper__equipment-attachments {
            position: absolute;
            right: 40px;
            bottom: 40px;
            display: flex;
            gap: 8px;
            img {
              max-height: 32px;
            }
          }
        }
      }
    }
  }
</style>
