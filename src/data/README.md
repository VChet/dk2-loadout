## Equipment, Ranks, Localization Parser

Should be used only when the game data updates

1. Copy files to corresponding folders

   - `xml` folder

     - Equipment

       ```txt
       data/equipment/cia_disguises.xml
       data/equipment/firearm_ammo.xml
       data/equipment/firearm_scopes.xml
       data/equipment/firearms_cia.xml
       data/equipment/firearms_nwswat.xml
       data/equipment/firearms_pistols.xml
       data/equipment/firearms_pistols_cia.xml
       data/equipment/firearms_pistols_nws.xml
       data/equipment/firearms_rifles.xml
       data/equipment/head_attachments.xml
       data/equipment/various.xml
       data/equipment/various_nwswat.xml
       ```

     - Ranks

       ```txt
       data/units/units.xml
       ```

   - `txt` folder

     ```txt
     data/localization/game.txt
     ```

2. Run `npm run update-data`
3. New data will be written to `equipmentData.json`, `ranksData.json` and `localization.json`
