addLayer("n", {
    name: "normal", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "TT<sup>2</sup>", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    tabFormat: [
      ["display-text", () => `You have ${format(player.points)} tubas<br><br>`],
      "buyables",
      "blank",
      "upgrades",
    ],
    tooltip: "Welcome to Tuba's Tree 2!",
    color: "#CCCCCC",
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: 0, // Row the layer is in on the tree (0 is the first row)
    automate(){
      if (player.n.auto && hasMilestone("p",0)) {
        setBuyableAmount("n",11,tmp.n.buyables[11].canAfford?player.points.div(10).log(2).floor().add(1):getBuyableAmount("n",11))
      }
      if (player.n.auto2 && hasMilestone("p",1)) {
        if(getBuyableAmount("n",12).gte(15)){
          setBuyableAmount("n",12,tmp.n.buyables[12].canAfford?player.points.div(1525878906250).log(5).root(1.5).add(15).floor().add(1):getBuyableAmount("n",12))
        }else{
          setBuyableAmount("n",12,tmp.n.buyables[12].canAfford?player.points.div(50).log(5).floor().add(1).min(15):getBuyableAmount("n",12))
        }
      }
      if (player.n.auto3 && hasMilestone("p",2)) {
        if(getBuyableAmount("n",13).gte(10)){
          setBuyableAmount("n",13,tmp.n.buyables[13].canAfford?player.points.div(5e12).log(10).root(1.5).add(10).floor().add(1):getBuyableAmount("n",13))
        }else{
          setBuyableAmount("n",13,tmp.n.buyables[13].canAfford?player.points.div(500).log(10).floor().add(1).min(10):getBuyableAmount("n",13))
        }
      }
      if (player.n.auto4 && hasMilestone("p",4)) {
        if(getBuyableAmount("n",21).gte(10)){
          setBuyableAmount("n",21,tmp.n.buyables[21].canAfford?player.points.div(1e36).log(100).root(1.75).add(10).floor().add(1):getBuyableAmount("n",21))
        }else{
          setBuyableAmount("n",21,tmp.n.buyables[21].canAfford?player.points.div(1e16).log(100).floor().add(1).min(10):getBuyableAmount("n",21))
        }
      }
    },
    layerShown(){return true},
    doReset(layer) {

    if (!(layers[layer].row > this.row)) return

    let keep = []
    if(layer=="p" && hasMilestone("p",3)) keep.push("upgrades")
    if((layer=="a" || layer=="b") && hasMilestone("a",1)) keep.push("upgrades")
    if((layer=="t" || layer=="sb") && hasMilestone("t",3)) keep.push("upgrades")

    layerDataReset(this.layer, keep)

    },
    upgrades: {
      11: {
        title: "Tuba Multiplier",
        description: "Multiply tuba gain by 5.",
        cost: new Decimal(2000),
        unlocked() {return getBuyableAmount("n",13).gte(1) || hasAchievement("g",15)},
        currencyDisplayName: "tubas",
        currencyInternalName: "points",
      },
      12: {
        title: "Generator Efficiency",
        description: "Generator production is squared by turning the knob to \"Very Fine\".",
        cost: new Decimal(10000),
        unlocked() {return getBuyableAmount("n",13).gte(1) || hasAchievement("g",15)},
        currencyDisplayName: "tubas",
        currencyInternalName: "points",
      },
      13: {
        title: "Time Warping",
        description: "The Time Accelerator multiplier per purchase is better.<br>(1.2x -> 1.25x)",
        cost: new Decimal(1e6),
        unlocked() {return getBuyableAmount("n",13).gte(1) || hasAchievement("g",15)},
        currencyDisplayName: "tubas",
        currencyInternalName: "points",
      },
      14: {
        title: "No Strings Attached (probably)",
        description: "Free Accelerator Boosts now give free Time Accelerators. Tuba forgot to add the effect.",
        cost: new Decimal("1e500"),
        unlocked() {return hasAchievement("g",36)},
        currencyDisplayName: "tubas",
        currencyInternalName: "points",
      },
      15: {
        title: "Bottle O' Enchanting",
        description: "Gain 4x more EXP from all sources!",
        cost: new Decimal("1e550"),
        unlocked() {return hasAchievement("g",36)},
        currencyDisplayName: "tubas",
        currencyInternalName: "points",
      },
    },
    buyables: {
    11: {
        title: "Generator",
        cost(x) { return new Decimal(10).mul(new Decimal(2).pow(x)) },
        display() {return `Generates tubas <i>automagically!</i><br>Times Bought: ${formatWhole(getBuyableAmount(this.layer, this.id))}<br>Cost: ${format(this.cost())}<br>Effect: +${format(this.effect())} base tubas/sec`},
        canAfford() {return player.points.gte(this.cost())},
        buy() {
            player.points = player.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        effect(x) {
          prod = x.pow(Decimal.add(hasUpgrade("n",12)?2:1,effectiveLvls("inception").pow(0.85)))
          return prod
        },
    },
    12: {
        title: "<span style='color: #AA0000'><b>Time Accelerator</b></span>",
        cost(x) { let y = x.sub(15)
          return x.gte(15) ? new Decimal(1525878906250).mul(new Decimal(5).pow(y.pow(1.5))) : new Decimal(50).mul(new Decimal(5).pow(x)) },
        display() {return `Speeds up the flow of time!<br>(Does not actually speed up game time)<br>Times Bought: ${formatWhole(getBuyableAmount(this.layer, this.id))} + ${formatWhole(freeTimeAccels())}<br>Cost: ${format(this.cost())}<br>Time Speed: ${format(this.effect())}x`},
        canAfford() {return player.points.gte(this.cost())},
        buy() {
            player.points = player.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        effect(x) {
          mult = Decimal.pow(timeAccelMult(),x.add(freeTimeAccels()))
          return mult
        },
    },
    13: {
        title: "<span style='color: #0000FF'><b>Duplicator</b></span>",
        cost(x) { let y = x.sub(10)
          return x.gte(10) ? new Decimal(5e12).mul(new Decimal(10).pow(y.pow(1.5))) : new Decimal(500).mul(new Decimal(10).pow(x)) },
        display() {return `CTRL+C CTRL+V CTRL+C CTRL+V...<br>Times Bought: ${formatWhole(getBuyableAmount(this.layer, this.id))} + ${formatWhole(effectiveLvls("cloning").pow(0.8).mul(hasUpgrade("a",14)?2:1).mul(inChallenge("t",31)?0:1).floor())}<br>Cost: ${format(this.cost())}<br>Tuba Multiplier: ${format(this.effect())}x`},
        canAfford() {return player.points.gte(this.cost())},
        buy() {
            player.points = player.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        effect(x) {
          mult = Decimal.pow(new Decimal(2).add(hasAchievement("g",23)?1:0).add(hasUpgrade("p",24)?upgradeEffect("p",24):0).add(challengeEffect("t",22)),x.add(effectiveLvls("cloning").pow(0.8).mul(hasUpgrade("a",14)?2:1).mul(inChallenge("t",31)?0:1).floor()))
          return mult
        },
    },
    21: {
        title: "<span style='color: #AA33EE'><b>Accelerator Boost</b></span>",
        cost(x) { 
          let y = x.sub(10)
          return x.gte(10) ? new Decimal(1e36).mul(new Decimal(100).pow(y.pow(1.75))) : new Decimal(1e16).mul(new Decimal(100).pow(x)) },
        display() {return `Gain 3 free Time Accelerators, and add 0.02 to the multiplier per Time Accelerator.<br>Times Bought: ${formatWhole(getBuyableAmount(this.layer, this.id))} + ${formatWhole(effectiveLvls("temporal").pow(0.4).mul(hasAchievement("g",26)?2:1).mul(inChallenge("t",31)?0:1).floor())}<br>Cost: ${format(this.cost())}<br>${hasUpgrade("n",14) ? "" : "(Note: Free Accelerator Boosts do not give free Time Accelerators)"}`},
        canAfford() {return player.points.gte(this.cost())},
        buy() {
            player.points = player.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        unlocked() { return hasUpgrade("p",14) },
        effect(x) {
          mult = x.add(effectiveLvls("temporal").pow(0.4).mul(hasAchievement("g",26)?2:1).mul(inChallenge("t",31)?0:1).floor()).div(50).mul(boosterEffects(3))
          return mult
        },
    },
    },
})

function timeAccelMult() {
  let mult = new Decimal(1.2)
  if(hasUpgrade("n",13)) mult = mult.add(0.05)
  mult = mult.add(buyableEffect("n",21))
  return mult
}

function freeTimeAccels() {
  let amt = new Decimal(0)
  if(hasAchievement("g",21)) amt = amt.add(5)
  amt = amt.add(getBuyableAmount("n",21).add(hasUpgrade("n",14) && !inChallenge("t",31) ? effectiveLvls("temporal").pow(0.4).mul(hasAchievement("g",26)?2:1).floor() : 0).mul(3).mul(boosterEffects(3)))
  if(!inChallenge("t",31)) amt = amt.add(effectiveLvls("temporal").pow(0.75).mul(hasAchievement("g",26)?2:1).floor())
  return amt
}

addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    prestiges: new Decimal(0),
    }},
    passiveGeneration(){
      return hasMilestone("a", 2) ? 1 : 0
    },
    tabFormat: [
    "main-display",
    "prestige-button",
    ["display-text", () => `You have made ${format(player.p.total)} total prestige points`],
    ["display-text", () => `You have Prestiged ${format(player.p.prestiges)} times<br><br>`],
    () => hasUpgrade("p",15) ? ["display-text", `You will gain ${format(player.points.log10().div(10).mul(expMult()).floor())} EXP on prestige.<br><br>`] : "",
    "milestones",
    "buyables",
    "blank",
    "upgrades",
    ],
    color: "#0070CC",
    requires: new Decimal(1e7), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "tubas", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade("p",12)) mult = mult.mul(3)
        if(hasAchievement("g",16)) mult = mult.mul(2)
        mult = mult.mul(buyableEffect("p",11))
        if(!inChallenge("t",31)) mult = mult.mul(new Decimal(1.4).pow(effectiveLvls("cloning")))
        if(hasUpgrade("a",11)) mult = mult.mul(upgradeEffect("a",11))
        if(hasAchievement("g",34)) mult = mult.mul(70)
        mult = mult.mul(Decimal.pow(50,getBuyableAmount("a",11)))
        mult = mult.mul(shardEffect())
        if(hasUpgrade("t",11)) mult = mult.mul(1e6)
        if(hasUpgrade("a",24)) mult = mult.mul(upgradeEffect("a",24))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        if(hasUpgrade("p",25)) exp = exp.mul(1.05)
        if(inChallenge("t",31)) exp = exp.mul(0.25)
        exp = exp.mul(challengeEffect("t",31))
        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    automate(){
      if (player.p.auto && hasMilestone("a",1)) {
        setBuyableAmount("p",11,tmp.p.buyables[11].canAfford?player.p.points.div(1e8).log(100).div(inChallenge("t",22)?5:1).floor().add(1):getBuyableAmount("p",11))
      }
      if (player.p.auto2 && hasMilestone("a",3)) {
        setBuyableAmount("p",12,tmp.p.buyables[12].canAfford?player.p.points.div(1e100).log(100000).div(inChallenge("t",22)?5:1).floor().add(1):getBuyableAmount("p",12))
      }
      if (player.p.auto3 && hasMilestone("p",5)) {
        setBuyableAmount("p",13,tmp.p.buyables[13].canAfford?player.p.points.div("1e72000").log(1e100).div(inChallenge("t",22)?5:1).floor().add(1):getBuyableAmount("p",13))
      }
    },
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    branches: ["n"],
    onPrestige() {
      player.p.prestiges = player.p.prestiges.add(1)
      if(hasUpgrade("p",15)) player.sk.points = player.sk.points.add(player.points.log10().div(10).mul(expMult()).floor())
    },
    layerShown() {return hasUpgrade("n",13) || player.p.total.gte(1) || player.a.total.gte(1) || player.t.total.gte(1)},
    doReset(layer) {

    if (!(layers[layer].row > this.row)) return
      
    let hasSkills = hasUpgrade("p", 15)
    
    let keep = []
    if((layer=="a" || layer=="b") && hasMilestone("a",0)) keep.push("milestones")
    if((layer=="a" || layer=="b") && hasMilestone("a",1)) keep.push("upgrades")
    if((layer=="t" || layer=="sb") && hasMilestone("t",1)) keep.push("milestones")
    if((layer=="t" || layer=="sb") && hasMilestone("t",3)) keep.push("upgrades")

    layerDataReset(this.layer, keep)

    if (hasSkills && !hasUpgrade("p", 15)) player.p.upgrades.push(15)

    },
    upgrades: {
      11: {
        title: "Prestige Bonus",
        description: "Gain more tubas based on total prestige points.",
        cost: new Decimal(1),
        tooltip: "Caps at 1e10,000x",
        effect(){
          let x = player.p.total.pow(0.5).mul(3).add(1)
          if(hasUpgrade("a",15)) x = player.p.total.pow(0.55).mul(10).add(1)
          if(x.gt("1e10000") && !hasUpgrade("a",25)){x = new Decimal("1e10000")}
          else if(hasUpgrade("a",25)) {x = x.div("1e10000").pow(0.5).mul("1e10000")}
          return x
        },
        effectDisplay(){return `x${format(this.effect())}`}
      },
      12: {
        title: "Prestige Enhancement",
        description: "Go big or go home! Triple tuba gain and prestige point gain.",
        cost: new Decimal(2),
      },
      13: {
        title: "Synergism be like",
        description: "Gain more tubas based on total normal buyables bought.",
        cost: new Decimal(5000),
        effect(){return getBuyableAmount("n",11).add(getBuyableAmount("n",12)).add(getBuyableAmount("n",13)).add(getBuyableAmount("n",21)).add(1).pow(0.875)},
        effectDisplay(){return `x${format(this.effect())}`}
      },
      14: {
        title: "Buyable Unlock",
        description: "Unlock Accelerator Boosts.",
        cost: new Decimal(1e7),
      },
      15: {
        title: "Level Up",
        description: "Unlock Skills.",
        cost: new Decimal(3.14e15),
      },
      21: {
        title: "Short & Simple",
        description: "Multiply tuba gain by 1e10.",
        cost: new Decimal(1e50),
        unlocked() {return hasMilestone("to",0)}
      },
      22: {
        title: "Self-Synergy",
        description: "Gain more tubas based on tubas. This is getting meta.",
        cost: new Decimal(1e72),
        unlocked() {return hasMilestone("to",0)},
        effect(){return player.points.pow(0.1).add(1)},
        effectDisplay(){return `x${format(this.effect())}`}
      },
      23: {
        title: "Virgin Upgrade Bonus",
        description: "Gain more tubas based on prestige upgrades bought. bad upgrade 1/10",
        cost: new Decimal(1e150),
        unlocked() {return hasMilestone("to",0)},
        effect(){return new Decimal(hasUpgrade("a",23)?1000:15).pow(player.p.upgrades.length)},
        effectDisplay(){return `x${format(this.effect())}`}
      },
      24: {
        title: "Chad Multiplier Buff",
        description: "<span style='font-size:8px'>Add to the Duplicator multiplier per purchase based on prestige points.</span>",
        cost: new Decimal("1e325"),
        unlocked() {return hasMilestone("to",0)},
        effect(){return player.p.points.max(1).log10().pow(0.1).div(2)},
        effectDisplay(){return `+${format(this.effect())}`}
      },
      25: {
        title: "Prestige Exponential",
        description: "It's time to pull out the exponents. Prestige points ^1.05!",
        cost: new Decimal("5.55e555"),
        unlocked() {return hasMilestone("to",0)},
      },
    },
    buyables: {
      11: {
        title: "Prestige Point Doubler",
        cost(x) { return new Decimal(1e8).mul(new Decimal(100).pow(x.mul(inChallenge("t",22)?5:1))) },
        display() {return `Double prestige point gain every time you buy this!<br>Times Bought: ${format(getBuyableAmount(this.layer, this.id))}<br>Cost: ${format(this.cost())}<br>Effect: ${format(this.effect())}x prestige points`},
        canAfford() {return player.p.points.gte(this.cost())},
        buy() {
            player.p.points = player.p.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        effect(x) {
          mult = new Decimal(2).pow(x)
          return mult
        },
      },
      12: {
        title: "Super Duplicator",
        cost(x) { return new Decimal(1e100).mul(new Decimal(100000).pow(x.mul(inChallenge("t",22)?5:1))) },
        display() {return `Only the High Prestiged can afford this. Octuple tuba gain every time you buy this!<br>Times Bought: ${format(getBuyableAmount(this.layer, this.id))}<br>Cost: ${format(this.cost())}<br>Effect: ${format(this.effect())}x tubas`},
        canAfford() {return player.p.points.gte(this.cost())},
        buy() {
            player.p.points = player.p.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        unlocked() {return hasMilestone("to",1)},
        effect(x) {
          mult = new Decimal(8).pow(x)
          return mult
        },
      },
      13: {
        title: "Ascension Point Tripler",
        cost(x) { return new Decimal("1e72000").mul(new Decimal(1e100).pow(x.mul(inChallenge("t",22)?5:1))) },
        display() {return `A lower currency boosting a higher currency? Triple ascension point gain every time you buy this!<br>Times Bought: ${format(getBuyableAmount(this.layer, this.id))}<br>Cost: ${format(this.cost())}<br>Effect: ${format(this.effect())}x ascension points`},
        canAfford() {return player.p.points.gte(this.cost())},
        buy() {
            player.p.points = player.p.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        unlocked() {return challengeCompletions("t",22) >= 3},
        effect(x) {
          mult = new Decimal(3).pow(x)
          return mult
        },
      },
    },
    milestones: {
    0: {
        requirementDescription: "50 prestige points",
        effectDescription: "Autobuy Generators without subtracting from your tuba amount.",
        done() { return player.p.points.gte(50) },
        toggles: [
          ["n","auto"],
        ]
    },
    1: {
        requirementDescription: "250 prestige points",
        effectDescription: "Autobuy Time Accelerators without subtracting from your tuba amount.",
        done() { return player.p.points.gte(250) },
        toggles: [
          ["n","auto2"],
        ]
    },
    2: {
        requirementDescription: "100,000 prestige points",
        effectDescription: "Autobuy Duplicators without subtracting from your tuba amount.",
        done() { return player.p.points.gte(100000) },
        toggles: [
          ["n","auto3"],
        ]
    },
    3: {
        requirementDescription: "500,000 prestige points",
        effectDescription: "Keep Tuba Upgrades on Prestige.",
        done() { return player.p.points.gte(500000) },
    },
    4: {
        requirementDescription: "1e12 prestige points",
        effectDescription: "Autobuy Accelerator Boosts without subtracting from your tuba amount.",
        done() { return player.p.points.gte(1e12) },
        unlocked() { return hasUpgrade("p",14) || player.a.total.gte(1) },
        toggles: [
          ["n","auto4"],
        ]
    },
    5: {
        requirementDescription: "1e75,000 prestige points",
        effectDescription: "Autobuy the 3rd prestige buyable.",
        done() { return player.p.points.gte("1e75000") },
        unlocked() { return challengeCompletions("t",22) >= 3 },
        toggles: [
          ["p","auto3"],
        ]
    },
    },
})

addLayer("a", {
    name: "ascension", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    prestiges: new Decimal(0),
    }},
    passiveGeneration(){
      return hasMilestone("t", 5) ? 1 : 0
    },
    tabFormat: [
    "main-display",
    "prestige-button",
    ["display-text", () => `You have made ${format(player.a.total)} total ascension points`],
    ["display-text", () => `You have Ascended ${format(player.a.prestiges)} times<br><br>`],
    () => hasUpgrade("p",15) ? ["display-text", `You will gain ${format(player.p.points.max(1).log10().mul(3).mul(expMult()).floor())} EXP on ascension.<br><br>`] : "",
    "milestones",
    "buyables",
    "blank",
    "upgrades",
    ],
    color: "#D2D900",
    requires: new Decimal(1e36), // Can be a function that takes requirement increases into account
    resource: "ascension points", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade("a",12)) mult = mult.mul(upgradeEffect("a",12))
        if(hasAchievement("g",33)) mult = mult.mul(5)
        mult = mult.mul(shardEffect())
        if(hasUpgrade("t",12)) mult = mult.mul(upgradeEffect("t",12))
        if(hasUpgrade("a",22)) mult = mult.mul(1000)
        mult = mult.mul(challengeEffect("t",11))
        if(hasAchievement("g",54)) mult = mult.mul(player.a.points.pow(0.05).add(1))
        mult = mult.mul(buyableEffect("p",13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        return exp
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    automate(){
      if (player.a.auto && hasMilestone("t",4)) {
        setBuyableAmount("a",11,tmp.a.buyables[11].canAfford?player.a.points.div(1e18).log(1000).floor().add(1):getBuyableAmount("a",11))
      }
      if (player.a.auto2 && hasMilestone("t",7)) {
        setBuyableAmount("a",12,tmp.a.buyables[12].canAfford?player.a.points.div("1e5800").log(1e50).floor().add(1):getBuyableAmount("a",12))
      }
    },
    hotkeys: [
        {key: "a", description: "A: Reset for ascension points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    branches: ["p"],
    onPrestige() {
      player.a.prestiges = player.a.prestiges.add(1)
      if(hasUpgrade("p",15)) player.sk.points = player.sk.points.add(player.p.points.max(1).log10().mul(3).mul(expMult()).floor())
    },
    layerShown() {return hasUpgrade("p",15) || player.a.total.gte(1) || player.t.total.gte(1)},
    doReset(layer) {

    if (!(layers[layer].row > this.row)) return
      
    let hasTokens = hasUpgrade("a", 13)

    let keep = []
    if((layer=="t" || layer=="sb") && hasMilestone("t",2)) keep.push("milestones")
    if((layer=="t" || layer=="sb") && hasMilestone("t",3)) keep.push("upgrades")

    layerDataReset(this.layer, keep)
    
    if (hasTokens && !hasUpgrade("a", 13)) player.a.upgrades.push(13)

    },
    upgrades: {
      11: {
        title: "Ascension Bonus",
        description: "Gain more prestige points based on total ascension points.",
        cost: new Decimal(5),
        effect(){
          let x = player.a.total.pow(2).add(1) 
          if(x.gte(1e50)) x = x.div(1e50).pow(hasUpgrade("t",15)?0.4:0.25).mul(1e50)
          if(inChallenge("t",11)) x = new Decimal(1)
          return x
        },
        effectDisplay(){return `x${format(this.effect())}`}
      },
      12: {
        title: "Ascended Tubas",
        description: "Gain more ascension points based on tubas.",
        cost: new Decimal(10),
        effect(){return player.points.add(1).log10().div(10).add(1)},
        effectDisplay(){return `x${format(this.effect())}`}
      },
      13: {
        title: "Tokens!",
        description: "Unlock Tokens.",
        cost: new Decimal(1000),
      },
      14: {
        title: "Large-Scale Mitosis",
        description: "The Cloning Skill gives 2x more free Duplicators.",
        cost: new Decimal(4e9),
      },
      15: {
        title: "Prestige Bonus Enhancement",
        description: "<b>Prestige Bonus</b> uses a better formula.",
        tooltip: "((PP^0.5)*3)+1 -> ((PP^0.55)*10)+1",
        cost: new Decimal(1e25),
      },
      21: {
        title: "Transcended Tubas",
        description: "Gain more transcension points based on tubas.",
        cost: new Decimal(1e130),
        unlocked(){return hasMilestone("to",5)},
        effect(){return player.points.add(1).log10().div(50).add(1)},
        effectDisplay(){return `x${format(this.effect())}`},
      },
      22: {
        title: "Small Ascension Bonus",
        description: "1,000x ascension points. Thank you, very cool",
        cost: new Decimal(1e230),
        unlocked(){return hasMilestone("to",5)},
      },
      23: {
        title: "Scott the Woz",
        description: '<i>"This game blows!"</i><br><b>Virgin Upgrade Bonus</b> is more effective.',
        tooltip: "15^PUs -> 1,000^PUs",
        cost: new Decimal(1e250),
        unlocked(){return hasMilestone("to",5)},
      },
      24: {
        title: "Reverse Bonus",
        description: '<i>"no u" -Xbox player</i><br>Gain more prestige points based on tubas.',
        cost: new Decimal("1e2150"),
        unlocked(){return hasMilestone("to",5)},
        effect(){return player.points.pow(0.02).add(1)},
        effectDisplay(){return `x${format(this.effect())}`},
      },
      25: {
        title: "Hardcap Repellent",
        description: "The <b>Prestige Bonus</b> hardcap is replaced with a softcap.",
        cost: new Decimal("1e2280"),
        unlocked(){return hasMilestone("to",5)},
      },
    },
    buyables: {
      11: {
        title: "Double Duplicator",
        cost(x) { return new Decimal(1e18).mul(new Decimal(1000).pow(x)) },
        display() {return `This buyable's effect is pretty sick. 10,000x tuba gain <i>and</i> 50x prestige point gain every time you buy this!<br>Times Bought: ${format(getBuyableAmount(this.layer, this.id))}<br>Cost: ${format(this.cost())}<br>Effect: ${format(this.effect())}x tubas, ${format(Decimal.pow(50,getBuyableAmount("a",11)))}x PP`},
        canAfford() {return player.a.points.gte(this.cost())},
        buy() {
            player.a.points = player.a.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        unlocked() {return hasMilestone("to",2)},
        effect(x) {
          mult = new Decimal(10000).pow(x)
          return mult
        },
      },
      12: {
        title: "Tuba Booster",
        cost(x) { return new Decimal("1e5800").mul(new Decimal(1e50).pow(x)) },
        display() {return `It's like a Booster, but for tubas. 1e20x tuba gain every time you buy this!<br>Times Bought: ${format(getBuyableAmount(this.layer, this.id))}<br>Cost: ${format(this.cost())}<br>Effect: ${format(this.effect())}x tubas`},
        canAfford() {return player.a.points.gte(this.cost())},
        buy() {
            player.a.points = player.a.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        unlocked() {return hasMilestone("to",10)},
        effect(x) {
          mult = new Decimal(1e20).pow(x)
          return mult
        },
      },
    },
    milestones: {
    0: {
        requirementDescription: "2 ascension points",
        effectDescription: "Keep prestige milestones on Ascension. You earned those, you should keep 'em!",
        done() { return player.a.points.gte(2) },
    },
    1: {
        requirementDescription: "4 ascension points",
        effectDescription: "Keep Tuba Upgrades and Prestige Upgrades on Ascension, and autobuy the 1st Prestige Buyable.",
        done() { return player.a.points.gte(4) },
        toggles: [
          ["p","auto"],
        ]
    },
    2: {
        requirementDescription: "1,000,000 ascension points",
        effectDescription: "Generate 100% of prestige point gain every second.",
        done() { return player.a.points.gte(1e6) },
    },
    3: {
        requirementDescription: "1e13 ascension points",
        effectDescription: "Autobuy the 2nd Prestige Buyable.",
        done() { return player.a.points.gte(1e13) },
        toggles: [
          ["p","auto2"],
        ]
    },
    },
})

addLayer("b", {
    name: "boosters", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    autoPrestige() {
      return player.b.auto
    },
    canBuyMax(){
      return hasMilestone("b", 1)
    },
    resetsNothing(){
      return hasMilestone("b", 1)
    },
    tabFormat: [
    ["display-text", () => `You have <h2 style="color: #0000FF; text-shadow: 0px 0px 10px #0000FF">${formatWhole(player.b.points)}</h2> boosters`],
    "blank",
    "prestige-button",
    ["display-text", () => `You have ${format(player.points)} points<br>`],
    ["display-text", () => `You have made ${formatWhole(player.b.total)} boosters in total<br><br>`],
    "milestones",
    "upgrades",
    ["display-text", () => `Your Boosters are boosting:`],
    ["display-text", () => `EXP gain by ${format(boosterEffects(1).mul(100).sub(100))}%`],
    ["display-text", () => `Gain of all tokens by ${format(boosterEffects(2))}x`],
    ["display-text", () => `Accelerator Boost effectiveness by ${format(boosterEffects(3).mul(100).sub(100))}%`],
    () => hasUpgrade("t",22) ? ["display-text", `Shard Generator 1 effectiveness by ${format(boosterEffects(4))}`] : "",
    ],
    color: "#0000FF",
    requires: new Decimal("1e1000"), // Can be a function that takes requirement increases into account
    resource: "boosters", // Name of prestige currency
    baseResource: "tubas", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base() {
      return new Decimal(1e50)
    },
    exponent: new Decimal(1.5),
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    position: 1,
    hotkeys: [
        {key: "b", description: "B: Reset for boosters", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasMilestone("to",4)},
    doReset(layer) {

    if (!(layers[layer].row > this.row)) return

    let keep = []
    if((layer=="t" || layer=="sb") && hasMilestone("t",4)) keep.push("milestones")
    if(layer=="t" && hasAchievement("g",51)) keep.push("points")
      
    console.log(keep)

    layerDataReset(this.layer, keep)

    },
    branches: ["p"],
    milestones: {
    0: {
        requirementDescription: "5 boosters",
        effectDescription: "Autobuy boosters.",
        done() { return player.b.points.gte(5) },
        toggles: [
          ["b","auto"],
        ]
    },
    1: {
        requirementDescription: "10 boosters",
        effectDescription: "You can buy max boosters and boosters reset nothing.",
        done() { return player.b.points.gte(10) },
    },
  },
})

function boosterEffects(x) {
  switch (x) {
    case 1:
      return Decimal.add(1,player.b.points.div(2)).mul(Decimal.add(1,player.sb.points.div(5)))
    break;
    case 2:
      return Decimal.pow(Decimal.add(3,player.sb.points.div(2)),player.b.points)
    break;
    case 3:
      return Decimal.add(1,player.b.points.div(30).pow(0.75)).mul(Decimal.add(1,player.sb.points.div(50)))
    break;
    case 4:
      return hasUpgrade("t",22) ? Decimal.pow(1.15,player.b.points) : new Decimal(1) 
    break;
  }
}

addLayer("t", {
    name: "transcension", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    prestiges: new Decimal(0),
    divisor: new Decimal(1),
    }},
    tabFormat: [
    "main-display",
    "prestige-button",
    ["display-text", () => `You have made ${format(player.t.total)} total transcension points`],
    ["display-text", () => `You have Transcended ${format(player.t.prestiges)} times<br><br>`],
    () => hasMilestone("t",1) ? ["display-text", `You will gain ${format(player.p.points.max(1).log10().mul(20).mul(expMult()).floor())} EXP on transcension.<br><br>`] : "",
    "milestones",
    "buyables",
    "blank",
    "upgrades",
    () => hasMilestone("to",7) ? ["display-text", `Is the game not hard enough? Try some of the Challenges below!<br><br>`] : "",
    () => hasMilestone("to",7) ? "challenges" : "",
    ],
    color: "#C600D8",
    requires: new Decimal(1e100), // Can be a function that takes requirement increases into account
    resource: "transcension points", // Name of prestige currency
    baseResource: "ascension points", // Name of resource prestige is based on
    baseAmount() {return player.a.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.05, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasAchievement("g",45)) mult = mult.mul(2)
        if(hasUpgrade("a",21)) mult = mult.mul(upgradeEffect("a",21))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        if(hasUpgrade("t",25)) exp = exp.mul(1.02)
        return exp
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "T: Reset for transcension points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    branches: ["a"],
    onPrestige() {
      player.t.prestiges = player.t.prestiges.add(1)
      player.t.divisor = new Decimal(1)
      if(hasMilestone("t",1)) player.sk.points = player.sk.points.add(player.p.points.max(1).log10().mul(20).mul(expMult()).floor())
    },
    layerShown() {return hasMilestone("to",4) || player.t.total.gte(1)},
    update(diff) {
      player.t.divisor = player.t.divisor.mul(Decimal.pow(1e100,2**(challengeCompletions("t",12)+1)).pow(diff))
    },
    upgrades: {
      11: {
        title: "Transcendental Power",
        description: "Multiply prestige point gain by 1,000,000.",
        cost: new Decimal(10),
        unlocked(){return hasMilestone("t",5)},
      },
      12: {
        title: "Transcension Bonus",
        description: "Gain more ascension points based on total transcension points.",
        cost: new Decimal(10),
        unlocked(){return hasMilestone("t",5)},
        effect(){return player.t.total.pow(hasUpgrade("t",21)?0.875:0.8).add(1)},
        effectDisplay(){return `x${format(this.effect())}`}
      },
      13: {
        title: "Shards+",
        description: "All shard generators are 1.06x stronger per Shard Generator 1-3 purchased.",
        cost: new Decimal(20),
        unlocked(){return hasMilestone("t",5)},
        effect(){return Decimal.pow(1.06,getBuyableAmount("sh",11).add(getBuyableAmount("sh",12)).add(getBuyableAmount("sh",13)))},
        effectDisplay(){return `x${format(this.effect())}`}
      },
      14: {
        title: "Shard Refinery",
        description: "Shards are basically useless! Increase the shard effect exponent from 0.5 to 3.",
        cost: new Decimal(4000),
        unlocked(){return hasMilestone("t",5)},
      },
      15: {
        title: "Inflation I",
        description: "Weaken the softcap for <b>Ascension Bonus</b>.",
        cost: new Decimal(1e27),
        unlocked(){return hasMilestone("t",5)},
      },
      21: {
        title: "Transcension Bonus Enhancement",
        description: "<b>Transcension Bonus</b> uses a better formula.",
        tooltip: "(TP^0.8)+1 -> (TP^0.875)+1",
        cost: new Decimal("1e440"),
        unlocked(){return challengeCompletions("t",32) >= 1},
      },
      22: {
        title: "Boosted Boosters",
        description: "Unlock a new Booster boost that boosts shards. Now that's a mouthful!",
        cost: new Decimal("1e480"),
        unlocked(){return challengeCompletions("t",32) >= 2},
      },
      23: {
        title: "Best For Last",
        description: "Shard Generator 6 is 100,000x more effective.",
        cost: new Decimal("1e630"),
        unlocked(){return challengeCompletions("t",32) >= 2},
      },
      24: {
        title: "Inception^2",
        description: "The Inception Skill multiplies effective levels for itself and the Discount Skill at a reduced rate.",
        tooltip: "Note: Effective levels of the Inception Skill do not boost their own effective levels, as this would tear the fabric of reality",
        cost: new Decimal("1e760"),
        unlocked(){return challengeCompletions("t",32) >= 3},
      },
      25: {
        title: "Hyper Transcension",
        description: "Transcension points are raised ^1.02.",
        cost: new Decimal("1e809"),
        unlocked(){return challengeCompletions("t",32) >= 3},
      },
    },
    milestones: {
    0: {
        requirementDescription: "1 total transcension point",
        effectDescription: "Permanently unlock Shards.",
        done() { return player.t.total.gte(1) },
    },
    1: {
        requirementDescription: "2 total transcension points",
        effectDescription: "Keep prestige milestones, EXP, and Skills on Transcension, and you now gain EXP from transcensions.",
        done() { return player.t.total.gte(2) },
    },
    2: {
        requirementDescription: "3 total transcension points",
        effectDescription: "Keep ascension milestones on Transcension.",
        done() { return player.t.total.gte(3) },
    },
    3: {
        requirementDescription: "4 total transcension points",
        effectDescription: "Keep all previous upgrades on Transcension.",
        done() { return player.t.total.gte(4) },
    },
    4: {
        requirementDescription: "5 total transcension points",
        effectDescription: "Autobuy the 1st ascension buyable, and keep booster milestones on Transcension.",
        done() { return player.t.total.gte(5) },
        toggles: [
          ["a","auto"],
        ]
    },
    5: {
        requirementDescription: "8 total transcension points",
        effectDescription: "Generate 100% of ascension point gain every second. Unlock the 1st row of Transcension Upgrades.",
        done() { return player.t.total.gte(8) },
    },
    6: {
        requirementDescription: "1e100 transcension points",
        effectDescription: "Autobuy Shard Generators 1-3.",
        done() { return player.t.points.gte(1e100) },
        unlocked() {return hasMilestone("to",7)},
        toggles: [
          ["sh","auto"],
        ]
    },
    7: {
        requirementDescription: "1e300 transcension points",
        effectDescription: "Autobuy the 2nd ascension buyable and Shard Generators 4-6.",
        done() { return player.t.points.gte(1e300) },
        unlocked() {return hasMilestone("to",10)},
        toggles: [
          ["a","auto2"],
          ["sh","auto2"],
        ]
    },
    },
    challenges: {
      11: {
        name: "Impotence",
        challengeDescription: '<i>Who needs upgrades? They do basically nothing now.</i><br>The multiplier from <b>Ascension Bonus</b> is 1x.',
        goalDescription: function() {return `Reach ${format(tmp[this.layer].challenges[this.id].goal)} ascension points.`},
        rewardDescription: function() {return `Gain 1e50x more ascension points per completion.<br>Currently: ${format(tmp[this.layer].challenges[this.id].rewardEffect)}x<br>Completions: ${challengeCompletions(this.layer,this.id)}/3`},
        completionLimit: 3,
        canComplete: function() {return player.a.points.gte(tmp[this.layer].challenges[this.id].goal)},
        goal() {
          return [
            new Decimal("1e600"),
            new Decimal("1e2500"),
            new Decimal("1e2950"),
            new Decimal(Infinity)
          ][challengeCompletions(this.layer, this.id)]
        },
        rewardEffect() {
          return Decimal.pow(1e50,challengeCompletions(this.layer,this.id))
        },
      },
      12: {
        name: "Quick Slowdown",
        challengeDescription: '<i>Presto!...where\'d the production go?</i><br>Tuba production gets worse over time, and decays faster based on completions.',
        goalDescription: function() {return `Reach ${format(tmp[this.layer].challenges[this.id].goal)} ascension points.`},
        rewardDescription: function() {return `Power tuba gain based on completions.<br>Currently: ^${regularFormat(tmp[this.layer].challenges[this.id].rewardEffect,3)}<br>Completions: ${challengeCompletions(this.layer,this.id)}/3`},
        completionLimit: 3,
        canComplete: function() {return player.a.points.gte(tmp[this.layer].challenges[this.id].goal)},
        goal() {
          return [
            new Decimal("1e1150"),
            new Decimal("1e3300"),
            new Decimal("1e5400"),
            new Decimal(Infinity)
          ][challengeCompletions(this.layer, this.id)]
        },
        rewardEffect() {
          let x = new Decimal(0)
          if(challengeCompletions(this.layer, this.id) == 1) x = new Decimal(1)
          if(challengeCompletions(this.layer, this.id) == 2) x = new Decimal(4)
          if(challengeCompletions(this.layer, this.id) >= 3) x = new Decimal(7)
          return Decimal.add(1,(x)/200)
        },
        onEnter() {
          player.t.divisor = new Decimal(1)
        }
      },
      21: {
        name: "No Shards",
        challengeDescription: '<i>Polynomial growth is for math nerds only.</i><br>Shards are useless.',
        goalDescription: function() {return `Reach ${format(tmp[this.layer].challenges[this.id].goal)} ascension points.`},
        rewardDescription: function() {return `Shard generators are 100x stronger per completion.<br>Currently: ${format(tmp[this.layer].challenges[this.id].rewardEffect)}x<br>Completions: ${challengeCompletions(this.layer,this.id)}/3`},
        completionLimit: 3,
        canComplete: function() {return player.a.points.gte(tmp[this.layer].challenges[this.id].goal)},
        goal() {
          return [
            new Decimal("1e1100"),
            new Decimal("1e2650"),
            new Decimal("1e3920"),
            new Decimal(Infinity)
          ][challengeCompletions(this.layer, this.id)]
        },
        rewardEffect() {
          return Decimal.pow(100,challengeCompletions(this.layer,this.id))
        },
      },
      22: {
        name: "Higher Costs",
        challengeDescription: '<i>Hasn\'t been the same since those gas prices increased...</i><br>Prestige buyables scale 5x faster.',
        goalDescription: function() {return `Reach ${format(tmp[this.layer].challenges[this.id].goal)} ascension points.`},
        rewardDescription: function() {return `Add 3 to the Duplicator multiplier per purchase per completion. At 3 completions, unlock the 3rd prestige buyable.<br>Currently: +${format(tmp[this.layer].challenges[this.id].rewardEffect)}<br>Completions: ${challengeCompletions(this.layer,this.id)}/3`},
        completionLimit: 3,
        canComplete: function() {return player.a.points.gte(tmp[this.layer].challenges[this.id].goal)},
        goal() {
          return [
            new Decimal("1e825"),
            new Decimal("1e3500"),
            new Decimal("1e5000"),
            new Decimal(Infinity)
          ][challengeCompletions(this.layer, this.id)]
        },
        rewardEffect() {
          return challengeCompletions(this.layer,this.id)*3
        },
      },
      31: {
        name: "Anti-Prestigious",
        challengeDescription: '<i>No more EXP grinding? Sign me up!</i><br>Prestige points are raised ^0.25. The Temporal Skill and Cloning Skill are disabled.',
        goalDescription: function() {return `Reach ${format(tmp[this.layer].challenges[this.id].goal)} ascension points.`},
        rewardDescription: function() {return `Power prestige point gain based on completions.<br>Currently: ^${regularFormat(tmp[this.layer].challenges[this.id].rewardEffect,3)}<br>Completions: ${challengeCompletions(this.layer,this.id)}/3`},
        completionLimit: 3,
        canComplete: function() {return player.a.points.gte(tmp[this.layer].challenges[this.id].goal)},
        goal() {
          return [
            new Decimal("1e1360"),
            new Decimal("1e1910"),
            new Decimal("1e2590"),
            new Decimal(Infinity)
          ][challengeCompletions(this.layer, this.id)]
        },
        rewardEffect() {
          if(challengeCompletions(this.layer, this.id) == 0) return new Decimal(1)
          if(challengeCompletions(this.layer, this.id) == 1) return new Decimal(1.02)
          if(challengeCompletions(this.layer, this.id) == 2) return new Decimal(1.03)
          if(challengeCompletions(this.layer, this.id) >= 3) return new Decimal(1.035)
        },
      },
      32: {
        name: "Financial Recession",
        challengeDescription: '<i>You\'re not gonna like this one.</i><br>Tubas are raised ^0.01. Good luck lmao',
        goalDescription: function() {return `Reach ${format(tmp[this.layer].challenges[this.id].goal)} ascension points.`},
        rewardDescription: function() {return `Unlock new Transcension Upgrades based on completions.<br>Currently: ${formatWhole(tmp[this.layer].challenges[this.id].rewardEffect)} new Transcension Upgrades<br>Completions: ${challengeCompletions(this.layer,this.id)}/3`},
        completionLimit: 3,
        canComplete: function() {return player.a.points.gte(tmp[this.layer].challenges[this.id].goal)},
        goal() {
          return [
            new Decimal("1e2350"),
            new Decimal("1e2580"),
            new Decimal("1e3820"),
            new Decimal(Infinity)
          ][challengeCompletions(this.layer, this.id)]
        },
        rewardEffect() {
          return new Decimal((challengeCompletions(this.layer,this.id)*2)-1).max(0)
        },
      },
    },
})

addLayer("sb", {
    name: "super-boosters", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SB", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    boosts: [null,false,false,false,false],
    }},
    tabFormat: [
    ["display-text", () => `You have <h2 style="color: #0000FF; text-shadow: 0px 0px 10px #0000FF">${formatWhole(player.sb.points)}</h2> super-boosters`],
    "blank",
    "prestige-button",
    ["display-text", () => `You have ${format(player.b.points)} boosters<br>`],
    ["display-text", () => `You have made ${formatWhole(player.sb.total)} super-boosters in total<br><br>`],
    "milestones",
    "upgrades",
    ["display-text", () => `Your Super-Boosters are boosting:`],
    ["display-text", () => `EXP gain multiplier per booster - ${format(Decimal.add(1,player.sb.points.div(5)))}x`],
    ["display-text", () => `Token gain booster base - +${format(player.sb.points.div(2))}`],
    ["display-text", () => `Accelerator Boost effectiveness - ${format(Decimal.add(1,player.sb.points.div(50)))}x`],
    ],
    color: "#0000CC",
    requires: new Decimal(95), // Can be a function that takes requirement increases into account
    resource: "super-boosters", // Name of prestige currency
    baseResource: "boosters", // Name of resource prestige is based on
    baseAmount() {return player.b.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base() {
      return new Decimal(1.2)
    },
    exponent: new Decimal(1.05),
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    position: 1,
    hotkeys: [
        {key: "B", description: "Shift+B: Reset for super-boosters", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasMilestone("to",9)},
    doReset(layer) {

    if (!(layers[layer].row > this.row)) return

    let keep = []
      
    console.log(keep)

    layerDataReset(this.layer, keep)

    },
    branches: ["b"],
})