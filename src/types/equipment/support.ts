interface Disguise {
  $name: string
  $inventoryBinding: "SupportGear1"
  $tooltip: string
  $description: string
  $img: string
  $movie: string
  $quantity: number
  $animationSet: string
  $discardWithEntityWhenEmpty: string
}
interface ExplosiveCharge {
  $name: string
  $inventoryBinding: "SupportGear1"
  $quantity: number
  $tooltip: string
  $description: string
  $img: string
  $movie: string
  $animationSet: string
  $soundUse: string
  $soundUseVoice: string
  $crouchOnUse: true
  MobilityModifiers: {
    $moveSpeedModifierPercent: number
    $turnSpeedModifierPercent: number
  }
}
interface DynamicHammer {
  $name: string
  $inventoryBinding: "SupportGear1"
  $unlockCost: number
  $tooltip: string
  $description: string
  $img: string
  $movie: string
  $animationSet: string
  MobilityModifiers: {
    $moveSpeedModifierPercent: number
    $turnSpeedModifierPercent: number
  }
  ConcealmentModifier: { $add: number }
}
interface SpyCamera {
  $name: string
  $inventoryBinding: "SupportGear1"
  $unlockCost: number
  $tooltip: string
  $description: string
  $img: string
  $movie: string
  $animationSet: string
  $crouchOnUse: true
  MobilityModifiers: {
    $moveSpeedModifierPercent: number
    $turnSpeedModifierPercent: number
  }
  ConcealmentModifier: { $add: number }
}
interface Lockpick {
  $name: string
  $inventoryBinding: "SupportGear2"
  $tooltip: string
  $img: string
  $animationSet: string
  $soundUse: string
  $crouchOnUse: true
  MobilityModifiers: {
    $moveSpeedModifierPercent: number
    $turnSpeedModifierPercent: number
  }
}

export type SupportGear = |
  Disguise |
  ExplosiveCharge |
  DynamicHammer |
  SpyCamera |
  Lockpick;
