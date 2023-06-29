addLayer("g", {
    name: "achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "★", // This appears on the layer's node. Default is the id with the first letter capitalized
    color: "#F5754E",
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    tooltip:"Achievements",
    resource: "achievements", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: "side", // Row the layer is in on the tree (0 is the first row)
tabFormat: [
    ["display-text", () => `You have ${player.g.achievements.length}/34 achievements (${format(new Decimal(player.g.achievements.length).div(34).mul(100))}%)<br><br>`],
    "achievements"
],
    layerShown(){return true},
  achievements: {
    11: {
        name: "Number go brr",
      done(){return getBuyableAmount("n",11).gte(1)},
      tooltip:"Buy the Generator."
    },
    12: {
        name: "I Am Speed",
      done(){return getBuyableAmount("n",12).gte(1)},
      tooltip:"Buy the Time Accelerator."
    },
    13: {
        name: "We've been duped!",
      done(){return getBuyableAmount("n",13).gte(1)},
      tooltip:"Buy the Duplicator."
    },
    14: {
        name: "Nice",
      done(){return player.points.gte(6969)},
      tooltip:"Reach 6,969 tubas."
    },
    15: {
        name: "Prestigious",
      done(){return player.p.points.gte(1)},
      tooltip:"Prestige."
    },
    16: {
        name: "Super Sonic Racing",
      done(){return getBuyableAmount("n",12).gte(15)},
      tooltip:"<span style='font-size:11px'><b>Reach a time speed of at least 25x. Reward: Gain 2x more prestige points.</b></span>"
    },
    21: {
        name: "Vacillation",
      done(){return player.points.gte(1e12) && getBuyableAmount("n",12).eq(0)},
      tooltip:"Reach 1e12 tubas without Time Accelerators. Reward: Gain 5 free Time Accelerators."
    },
    22: {
        name: "Ooh, buyable!",
      done(){return getBuyableAmount("p",11).gte(1)},
      tooltip:"Buy the Prestige Point Doubler."
    },
    23: {
        name: "No Cloning Theorem",
      done(){return player.points.gte(1e15) && getBuyableAmount("n",13).eq(0)},
      tooltip:"Reach 1e15 tubas without Duplicators. Reward: Duplicator per purchase multiplier is 3x."
    },
    24: {
        name: "It's Boostin' Time",
      done(){return getBuyableAmount("n",21).gte(5)},
      tooltip:"Buy 5 Accelerator Boosts."
    },
    25: {
        name: "Nice^10",
      done(){return player.points.gte(2.702e38)},
      tooltip:"Reach 2.70e38 tubas."
    },
    26: {
        name: "When this baby hits 80 mph",
      done(){return player.sk.temporalSkill.gte(15)},
      tooltip:"Reach Level 15 Temporal Skill. Reward: Gain 3x more EXP from all sources, and double Temporal Skill effectiveness."
    },
    31: {
        name: "Beyond",
      done(){return player.a.points.gte(1)},
      tooltip:"Ascend."
    },
    32: {
        name: "Passive Generation",
      done(){return hasMilestone("a",2)},
      tooltip:"Begin to passively generate prestige points."
    },
    33: {
        name: "Prestigeless",
      done(){return player.p.points.gte(1e100) && getBuyableAmount("p",11).eq(0)},
      tooltip:"Reach 1e100 prestige points without Prestige Point Doublers. Reward: Gain 5x more ascension points."
    },
    34: {
        name: "Super-Prestigious",
      done(){return player.p.upgrades.length >= 8},
      tooltip:"Buy 8 Prestige Upgrades. Reward: Gain 70x more prestige points."
    },
    35: {
        name: "Infinity?",
      done(){return player.points.gte(1.79e308)},
      tooltip:"Reach 1.79e308 tubas."
    },
    36: {
        name: "Hardcore",
      done(){return player.p.points.gte(1e160) && getBuyableAmount("n",12).eq(0) && getBuyableAmount("n",13).eq(0) && getBuyableAmount("n",21).eq(0) && getBuyableAmount("p",11).eq(0) && getBuyableAmount("p",12).eq(0)},
      tooltip:"Reach 1e160 prestige points without Time Accelerators, Duplicators, Accelerator Boosts, and Prestige Buyables. Reward: Unlock 2 new Point Upgrades."
    },
    41: {
        name: "Advanced Training",
      done(){return hasMilestone("to",3)},
      tooltip:"Unlock the 3rd Skill."
    },
    42: {
        name: "Tuba Galaxy",
      done(){return player.points.gte("1e900")},
      tooltip:"Reach 1e900 tubas."
    },
    43: {
        name: "Far Beyond",
      done(){return player.t.points.gte(1)},
      tooltip:"Transcend."
    },
    44: {
        name: "TRANSCENDED",
      done(){return hasMilestone("t",5)},
      tooltip:"Obtain 6 Transcension Milestones."
    },
    45: {
        name: "Shard Bonanza",
      done(){return player.sh.points.gte(1e6)},
      tooltip:"Reach 1,000,000 shards. Reward: Gain 2x more transcension points and shards."
    },
    46: {
        name: "True Divinity",
      done(){return player.a.points.gte(1e300)},
      tooltip:"Reach 1e300 ascension points."
    },
    51: {
        name: "Boosterless",
      done(){return player.a.points.gte("1e330") && player.b.points.eq(0)},
      tooltip:"Reach 1e330 ascension points with 0 boosters. Reward: Boosters no longer reset on Transcension."
    },
    52: {
        name: "Tuba Singularity",
      done(){return player.points.gte("1e10000")},
      tooltip:"Reach 1e10,000 tubas."
    },
    53: {
        name: "The Next Era",
      done(){return hasMilestone("to",7)},
      tooltip:"Unlock Challenges."
    },
    54: {
        name: "Not-so-challenging",
      done(){return player.points.gte("1e24500") && (inChallenge("t",11) || inChallenge("t",12) || inChallenge("t",21) || inChallenge("t",22))},
      tooltip:"Reach 1e24,500 points in one of the first 4 Challenges. Reward: Ascension points boost their own gain."
    },
    55: {
        name: "One of each generator",
      done(){return getBuyableAmount("sh",23).gte(1)},
      tooltip:"Buy Shard Generator 6. Reward: The first 3 Shard Generators are 1,000x stronger."
    },
    56: {
        name: "No, there's no HB",
      done(){return player.sb.points.gte(1)},
      tooltip:"Get a Super-Booster."
    },
    61: {
        name: "Welcome to the Infinite",
      done(){return player.t.points.gte(1.79e308)},
      tooltip:"Reach 1.79e308 transcension points."
    },
    62: {
        name: "Inflation 101",
      done(){return challengeCompletions("t",22) >= 3},
      tooltip:"Unlock the 3rd prestige buyable."
    },
    63: {
        name: "Extreme Gains",
      done(){return player.points.gte("1e100000")},
      tooltip:"Reach 1e100,000 tubas."
    },
    64: {
      name: "Average AD hater",
      done(){return player.a.points.gte("1e7350") && inChallenge("t",21)},
      tooltip:'Reach 1e7350 ascension points in Challenge 3. Reward: The shard effect softcap is slightly weaker.'
    },
},
})

addLayer("sk", {
    name: "skills", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "↑", // This appears on the layer's node. Default is the id with the first letter capitalized
    color: "#34EB74",
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    temporalSkill: new Decimal(0),
    cloningSkill: new Decimal(0),
    inceptionSkill: new Decimal(0),
    discountSkill: new Decimal(0),
    wisdomSkill: new Decimal(0),
    }},
    tooltip:"Skills",
    tabFormat: [
    ["infobox","lore"],
    "main-display",
    ["display-text", () => `Experience is gained every time you reset, based on what layer and the amount of resources gained.<br><br><span style="color: yellow">Temporal Skill:</span> ${player.sk.temporalSkill}/1000${hasMilestone("to",3) ? ` <span style="color:#34EB74">(Effective: ${format(effectiveLvls("temporal"))})</span>` : ``}<br><span style="color: #AA00AA">Cloning Skill:</span> ${player.sk.cloningSkill}/1000${hasMilestone("to",3) ? ` <span style="color:#34EB74">(Effective: ${format(effectiveLvls("cloning"))})</span>` : ``}<br>`],
    () => hasMilestone("to",3) ? ["display-text", `<span style="color: cyan">Inception Skill:</span> ${player.sk.inceptionSkill}/1000${hasUpgrade("t",24) ? ` <span style="color:#34EB74">(Effective: ${format(effectiveLvls("inception"))})</span>` : ``}<br>`] : "",
    () => hasMilestone("to",6) ? ["display-text", `<span style="color: green">Discount Skill:</span> ${player.sk.discountSkill}/1000${hasUpgrade("t",24) ? ` <span style="color:#34EB74">(Effective: ${format(effectiveLvls("discount"))})</span>` : ``}<br>`] : "",
    "clickables",
    ["display-text", () => `<span style="color: yellow">Temporal Skill: ${effectiveLvls("temporal").pow(0.75).mul(hasAchievement("g",26)?2:1).floor()} free Time Accelerators, ${effectiveLvls("temporal").pow(0.4).mul(hasAchievement("g",26)?2:1).floor()} free Accelerator Boosts</span><br><span style="color: #AA00AA">Cloning Skill: ${effectiveLvls("cloning").pow(0.8).mul(hasUpgrade("a",14)?2:1).floor()} free Duplicators, ${format(new Decimal(1.4).pow(effectiveLvls("cloning")))}x more prestige points</span><br>`],
    () => hasMilestone("to",3) ? ["display-text", `<span style="color: cyan">Inception Skill: +${format(effectiveLvls("inception").pow(0.85))} Generator production exponent, ${format(effectiveLvls("inception").pow(0.9).div(25).add(1))}x effective Temporal and Cloning skill levels</span><br>`] : "",
    () => hasMilestone("to",6) ? ["display-text", `<span style="color: green">Discount Skill: /${formatWhole(effectiveLvls("discount").add(1).pow(2))} all skill costs, ${format(effectiveLvls("discount").pow(0.75).add(1))}x experience gain</span><br>`] : "",
    ],
    resource: "experience", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: "side", // Row the layer is in on the tree (0 is the first row)
    position: 1,
    layerShown(){return hasUpgrade("p",15) || player.a.total.gte(1) || player.t.total.gte(1)},
    clickables: {
      11: {
        display() {return `Level up Temporal Skill<br>Cost: ${format(skillCosts("temporal"))} EXP`},
        onClick() {
          player.sk.points = player.sk.points.sub(skillCosts("temporal"))
          player.sk.temporalSkill = player.sk.temporalSkill.add(1)},
        canClick() {return player.sk.points.gte(skillCosts("temporal"))},
      },
      12: {
        display() {return `Level up Cloning Skill<br>Cost: ${format(skillCosts("cloning"))} EXP`},
        onClick() {
          player.sk.points = player.sk.points.sub(skillCosts("cloning"))
          player.sk.cloningSkill = player.sk.cloningSkill.add(1)},
        canClick() {return player.sk.points.gte(skillCosts("cloning"))},
      },
      13: {
        display() {return `Level up Inception Skill<br>Cost: ${format(skillCosts("inception"))} EXP`},
        onClick() {
          player.sk.points = player.sk.points.sub(skillCosts("inception"))
          player.sk.inceptionSkill = player.sk.inceptionSkill.add(1)},
        canClick() {return player.sk.points.gte(skillCosts("inception"))},
        unlocked() {return hasMilestone("to",3)}
      },
      14: {
        display() {return `Level up Discount Skill<br>Cost: ${format(skillCosts("discount"))} EXP`},
        onClick() {
          player.sk.points = player.sk.points.sub(skillCosts("discount"))
          player.sk.discountSkill = player.sk.discountSkill.add(1)},
        canClick() {return player.sk.points.gte(skillCosts("discount"))},
        unlocked() {return hasMilestone("to",6)}
      },
    }
})

function skillCosts(x) {
  switch (x) {
    case "temporal":
      return new Decimal(10).mul(Decimal.pow(1.2,player.sk.temporalSkill)).div(effectiveLvls("discount").add(1).pow(2)).floor()
    break;
    case "cloning":
      return new Decimal(25).mul(Decimal.pow(1.4,player.sk.cloningSkill)).div(effectiveLvls("discount").add(1).pow(2)).floor()
    break;
    case "inception":
      return new Decimal(10000).mul(Decimal.pow(1.6,player.sk.inceptionSkill)).div(effectiveLvls("discount").add(1).pow(2)).floor()
    break;
    case "discount":
      return new Decimal(1e7).mul(Decimal.pow(1.6,player.sk.discountSkill)).div(effectiveLvls("discount").add(1).pow(2)).floor()
    break;
  }
}

function expMult() {
  let mult = new Decimal(1)
  if(hasAchievement("g",26)) mult = mult.mul(3)
  if(hasUpgrade("n",15)) mult = mult.mul(4)
  mult = mult.mul(boosterEffects(1))
  mult = mult.mul(effectiveLvls("discount").pow(0.75).add(1))
  return mult
}

function effectiveLvls(x) {
  switch (x) {
    case "temporal":
      return player.sk.temporalSkill.mul(effectiveLvls("inception").pow(0.9).div(25).add(1))
    break;
    case "cloning":
      return player.sk.cloningSkill.mul(effectiveLvls("inception").pow(0.9).div(25).add(1))
    break;
    case "inception":
      let x = player.sk.inceptionSkill
      if(hasUpgrade("t",24)) x = x.mul(player.sk.inceptionSkill.pow(0.9).div(25).add(1).cbrt())
      return x
    break;
    case "discount":
      let y = player.sk.discountSkill
      if(hasUpgrade("t",24)) y = y.mul(effectiveLvls("inception").pow(0.9).div(25).add(1).cbrt())
      return y
    break;
  }
}

addLayer("to", {
    name: "tokens", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "◯", // This appears on the layer's node. Default is the id with the first letter capitalized
    color: "#948F31",
    startData() { return {
        unlocked: true,
      prestige: new Decimal(0),
      ascend: new Decimal(0),
      transcend: new Decimal(0),
      reinc: new Decimal(0),
    }},
    tooltip:"Tokens",
    tabFormat: {
      "Prestige": {
          buttonStyle: {
            "border-color": "#0070CC",
          },
          content: [
          ["display-text", () => `You have ${format(player.to.prestige)} prestige tokens`],
          ["display-text", () => `You are generating ${format(player.p.points.pow(0.25).mul(boosterEffects(2)))} prestige tokens per second (base gen: PP^0.25)`],
          "blank",
          ["milestones",[0,1,3,6]],
          ],
      },
      "Ascension": {
          buttonStyle: {
            "border-color": "#D2D900",
          },
          content: [
          ["display-text", () => `You have ${format(player.to.ascend)} ascension tokens`],
          ["display-text", () => `You are generating ${format(player.a.points.pow(0.5).mul(boosterEffects(2)))} ascension tokens per second (base gen: AP^0.5)`],
          "blank",
          ["milestones",[2,4,5]],
          ],
      },
      "Transcension": {
          buttonStyle: {
            "border-color": "#C600D8",
          },
          unlocked() {return hasAchievement("g",43)},
          content: [
          ["display-text", () => `You have ${format(player.to.transcend)} transcension tokens`],
          ["display-text", () => `You are generating ${format(player.t.points.pow(0.4).mul(boosterEffects(2)))} transcension tokens per second (base gen: TP^0.4)`],
          "blank",
          ["milestones",[7,8,9]],
          ],
      },
    },
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: "side", // Row the layer is in on the tree (0 is the first row)
    position: 2,
    layerShown(){return hasUpgrade("a",13) || player.t.total.gte(1)},
    update(diff) {
      if(hasUpgrade("a",13)) {
        player.to.prestige = player.to.prestige.add(player.p.points.pow(0.25).mul(boosterEffects(2)).mul(diff))
        player.to.ascend = player.to.ascend.add(player.a.points.pow(0.5).mul(boosterEffects(2)).mul(diff))
        player.to.transcend = player.to.transcend.add(player.t.points.pow(0.4).mul(boosterEffects(2)).mul(diff))
      }
    },
    milestones: {
      0: {
        requirementDescription: "1e14 prestige tokens",
        effectDescription: "Unlock a 2nd row of Prestige Upgrades.",
        done() { return player.to.prestige.gte(1e14) },
      },
      1: {
        requirementDescription: "1e32 prestige tokens",
        effectDescription: "Unlock the 2nd Prestige Buyable.",
        done() { return player.to.prestige.gte(1e32) },
      },
      2: {
        requirementDescription: "1.5e12 ascension tokens",
        effectDescription: "Unlock the 1st Ascension Buyable.",
        done() { return player.to.ascend.gte(1.5e12) },
      },
      3: {
        requirementDescription: "1e106 prestige tokens",
        effectDescription: "Unlock a 3rd Skill.",
        done() { return player.to.prestige.gte(1e106) },
      },
      4: {
        requirementDescription: "1e40 ascension tokens",
        effectDescription: "Unlock Boosters.",
        done() { return player.to.ascend.gte(1e40) },
      },
      5: {
        requirementDescription: "1e70 ascension tokens",
        effectDescription: "Unlock a 2nd row of Ascension Upgrades.",
        done() { return player.to.ascend.gte(1e70) },
        unlocked() {return hasAchievement("g",43)},
      },
      6: {
        requirementDescription: "4.2e690 prestige tokens",
        effectDescription: "Unlock a 4th Skill.",
        done() { return player.to.prestige.gte("4.2e690") },
        unlocked() {return hasAchievement("g",43)},
      },
      7: {
        requirementDescription: "1e40 transcension tokens",
        effectDescription: "Unlock Challenges.",
        done() { return player.to.transcend.gte(1e40) },
      },
      8: {
        requirementDescription: "1e80 transcension tokens",
        effectDescription: "Unlock Shard Generators 4-6.",
        done() { return player.to.transcend.gte(1e80) },
      },
      9: {
        requirementDescription: "1e155 transcension tokens",
        effectDescription: "Unlock Super-Boosters.",
        done() { return player.to.transcend.gte(1e155) },
      },
      10: {
        requirementDescription: "1e2960 ascension tokens",
        effectDescription: "Unlock the 2nd Ascension Buyable.",
        done() { return player.to.ascend.gte("1e2960") },
        unlocked() {return hasAchievement("g",43)},
      },
    },
})

addLayer("sh", {
    name: "shards", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Δ", // This appears on the layer's node. Default is the id with the first letter capitalized
    color: "#AA66FF",
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    produced: {11:new Decimal(0),12:new Decimal(0),13:new Decimal(0),21:new Decimal(0),22:new Decimal(0)},
    }},
    tooltip:"Shards",
    tabFormat: [
    ["infobox","lore"],
    ["display-text", () => `You have <h2 style="color: #C600D8; text-shadow: 0px 0px 10px #C600D8">${formatWhole(player.t.points)}</h2> transcension points<br><br>`],
    ["display-text", () => `You have <h2 style="color: #AA66FF; text-shadow: 0px 0px 10px #AA66FF">${formatWhole(player.sh.points)}</h2> shards, multiplying tuba, prestige point, and ascension point gain by <h2 style="color: #AA66FF; text-shadow: 0px 0px 10px #AA66FF">${format(shardEffect())}</h2>x.<br><br>`],
    () => shardEffect().gte("1e2000") ? ["display-text", `<span style="color:red">The shard effect is reduced past 1.00e2000x</span><br><br>`] : "",
    () => hasUpgrade("t",13) ? ["display-text", `<span style="color:orange">Thanks to Transcension Upgrade 3, all Shard Generators are ${format(upgradeEffect("t",13))}x more effective.</span><br><br>`] : "",
    "buyables",
    ],
    resource: "shards", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: "side", // Row the layer is in on the tree (0 is the first row)
    automate(){
      if (player.sh.auto && hasMilestone("t",6)) {
        setBuyableAmount("sh",11,tmp.sh.buyables[11].canAfford?player.t.points.log2().floor().add(1):getBuyableAmount("sh",11))
        setBuyableAmount("sh",12,tmp.sh.buyables[12].canAfford?player.t.points.div(20).log(8).floor().add(1):getBuyableAmount("sh",12))
        setBuyableAmount("sh",13,tmp.sh.buyables[13].canAfford?player.t.points.div(1000).log(50).floor().add(1):getBuyableAmount("sh",13))
      }
      if (player.sh.auto2 && hasMilestone("t",7)) {
        setBuyableAmount("sh",21,tmp.sh.buyables[21].canAfford?player.t.points.div(1e120).log(100000).floor().add(1):getBuyableAmount("sh",21))
        setBuyableAmount("sh",22,tmp.sh.buyables[22].canAfford?player.t.points.div(1e150).log(1e10).floor().add(1):getBuyableAmount("sh",22))
        setBuyableAmount("sh",23,tmp.sh.buyables[23].canAfford?player.t.points.div(1e200).log(1e20).floor().add(1):getBuyableAmount("sh",23))
      }
    },
    position: 3,
    layerShown(){return player.t.total.gte(1)},
    update(diff) {
      player.sh.points = player.sh.points.add(buyableEffect(this.layer,11).mul(diff))
      player.sh.produced[11] = player.sh.produced[11].add(buyableEffect(this.layer,12).mul(diff))
      player.sh.produced[12] = player.sh.produced[12].add(buyableEffect(this.layer,13).mul(diff))
      player.sh.produced[13] = player.sh.produced[13].add(buyableEffect(this.layer,21).mul(diff))
      player.sh.produced[21] = player.sh.produced[21].add(buyableEffect(this.layer,22).mul(diff))
      player.sh.produced[22] = player.sh.produced[22].add(buyableEffect(this.layer,23).mul(diff))
    },
    buyables: {
      11: {
        title: "Shard Generator 1",
        cost(x) { return Decimal.pow(2,x) },
        display() {return `Generates shards based on its amount.<br>Amount: ${format(getBuyableAmount(this.layer, this.id).add(player.sh.produced[this.id]))}<br>Cost: ${format(this.cost())}<br>Multiplier: ${format(this.effect().div(getBuyableAmount(this.layer, this.id).add(player.sh.produced[this.id]).max(1)).max(1))}x<br>Effect: +${format(this.effect())} shards/second`},
        canAfford() {return player.t.points.gte(this.cost())},
        buy() {
            player.t.points = player.t.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        effect(x) {
          mult = x.add(player.sh.produced[this.id])
          if(hasUpgrade("t",13)) mult = mult.mul(upgradeEffect("t",13))
          if(hasAchievement("g",45)) mult = mult.mul(2)
          mult = mult.mul(challengeEffect("t",21))
          if(hasAchievement("g",55)) mult = mult.mul(1000)
          mult = mult.mul(boosterEffects(4))
          return mult
        },
      },
      12: {
        title: "Shard Generator 2",
        cost(x) { return new Decimal(20).mul(Decimal.pow(8,x)) },
        display() {return `Generates Shard Generator 1 based on its amount.<br>Amount: ${format(getBuyableAmount(this.layer, this.id).add(player.sh.produced[this.id]))}<br>Cost: ${format(this.cost())}<br>Multiplier: ${format(this.effect().div(getBuyableAmount(this.layer, this.id).add(player.sh.produced[this.id]).max(1)).max(1))}x<br>Effect: +${format(this.effect())} SG1/second`},
        canAfford() {return player.t.points.gte(this.cost())},
        buy() {
            player.t.points = player.t.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        effect(x) {
          mult = x.add(player.sh.produced[this.id])
          if(hasUpgrade("t",13)) mult = mult.mul(upgradeEffect("t",13))
          mult = mult.mul(challengeEffect("t",21))
          if(hasAchievement("g",55)) mult = mult.mul(1000)
          return mult
        },
      },
      13: {
        title: "Shard Generator 3",
        cost(x) { return new Decimal(1000).mul(Decimal.pow(50,x)) },
        display() {return `Generates Shard Generator 2 based on its amount.<br>Amount: ${format(getBuyableAmount(this.layer, this.id).add(player.sh.produced[this.id]))}<br>Cost: ${format(this.cost())}<br>Multiplier: ${format(this.effect().div(getBuyableAmount(this.layer, this.id).add(player.sh.produced[this.id]).max(1)).max(1))}x<br>Effect: +${format(this.effect())} SG2/second`},
        canAfford() {return player.t.points.gte(this.cost())},
        buy() {
            player.t.points = player.t.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        effect(x) {
          mult = x.add(player.sh.produced[this.id])
          if(hasUpgrade("t",13)) mult = mult.mul(upgradeEffect("t",13))
          mult = mult.mul(challengeEffect("t",21))
          if(hasAchievement("g",55)) mult = mult.mul(1000)
          return mult
        },
      },
      21: {
        title: "Shard Generator 4",
        cost(x) { return new Decimal(1e120).mul(Decimal.pow(100000,x)) },
        display() {return `Generates Shard Generator 3 based on its amount.<br>Amount: ${format(getBuyableAmount(this.layer, this.id).add(player.sh.produced[this.id]))}<br>Cost: ${format(this.cost())}<br>Multiplier: ${format(this.effect().div(getBuyableAmount(this.layer, this.id).add(player.sh.produced[this.id]).max(1)).max(1))}x<br>Effect: +${format(this.effect())} SG3/second`},
        canAfford() {return player.t.points.gte(this.cost())},
        buy() {
            player.t.points = player.t.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        unlocked() {return hasMilestone("to",8)},
        effect(x) {
          mult = x.add(player.sh.produced[this.id])
          if(hasUpgrade("t",13)) mult = mult.mul(upgradeEffect("t",13))
          mult = mult.mul(challengeEffect("t",21))
          return mult
        },
      },
      22: {
        title: "Shard Generator 5",
        cost(x) { return new Decimal(1e150).mul(Decimal.pow(1e10,x)) },
        display() {return `Generates Shard Generator 4 based on its amount.<br>Amount: ${format(getBuyableAmount(this.layer, this.id).add(player.sh.produced[this.id]))}<br>Cost: ${format(this.cost())}<br>Multiplier: ${format(this.effect().div(getBuyableAmount(this.layer, this.id).add(player.sh.produced[this.id]).max(1)).max(1))}x<br>Effect: +${format(this.effect())} SG4/second`},
        canAfford() {return player.t.points.gte(this.cost())},
        buy() {
            player.t.points = player.t.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        unlocked() {return hasMilestone("to",8)},
        effect(x) {
          mult = x.add(player.sh.produced[this.id])
          if(hasUpgrade("t",13)) mult = mult.mul(upgradeEffect("t",13))
          mult = mult.mul(challengeEffect("t",21))
          return mult
        },
      },
      23: {
        title: "Shard Generator 6",
        cost(x) { return new Decimal(1e200).mul(Decimal.pow(1e20,x)) },
        display() {return `Generates Shard Generator 5 based on its amount.<br>Amount: ${format(getBuyableAmount(this.layer, this.id).add(player.sh.produced[this.id]))}<br>Cost: ${format(this.cost())}<br>Multiplier: ${format(this.effect().div(getBuyableAmount(this.layer, this.id).add(player.sh.produced[this.id]).max(1)).max(1))}x<br>Effect: +${format(this.effect())} SG5/second`},
        canAfford() {return player.t.points.gte(this.cost())},
        buy() {
            player.t.points = player.t.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        unlocked() {return hasMilestone("to",8)},
        effect(x) {
          mult = x.add(player.sh.produced[this.id])
          if(hasUpgrade("t",13)) mult = mult.mul(upgradeEffect("t",13))
          mult = mult.mul(challengeEffect("t",21))
          if(hasUpgrade("t",23)) mult = mult.mul(100000)
          return mult
        },
      },
    },
})

function shardEffect() {
  let mult = player.sh.points.pow(hasUpgrade("t",14)?3:0.5).add(1)
  if(mult.gte("1e2000")) mult = mult.div("1e2000").pow(hasAchievement("g",64)?0.3:0.25).mul("1e2000")
  if(inChallenge("t",21)) mult = new Decimal(1)
  return mult
}