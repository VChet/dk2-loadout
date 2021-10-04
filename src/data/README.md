## Equipment Parser

Should be used only when the game data updates

1. Copy files to corresponding folders
    * `xml` folder

        ```
        /equipment/cia_disguises.xml
        /equipment/firearms_cia.xml
        /equipment/firearms_pistols.xml
        /equipment/firearms_pistols_cia.xml
        /equipment/firearms_rifles.xml
        /equipment/firearm_ammo.xml
        /equipment/firearm_scopes.xml
        /equipment/various.xml
        ```

    * `txt` folder

        ```
        /localization/game.txt
        ```
2. Run `ts-node retrieveConfigData.ts`
3. New data will be written to `equipmentData.json` and `localization.json`
