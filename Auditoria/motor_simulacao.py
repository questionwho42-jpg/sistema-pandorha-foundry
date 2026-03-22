import random

class Character:
    def __init__(self, name, hp, ca, atk_bonus, damage_dice, damage_bonus, actions=3):
        self.name = name
        self.max_hp = hp
        self.hp = hp
        self.ca = ca
        self.atk_bonus = atk_bonus
        self.damage_dice = damage_dice
        self.damage_bonus = damage_bonus
        self.actions = actions
        self.is_dead = False

    def take_damage(self, amount):
        self.hp -= amount
        if self.hp <= 0:
            self.hp = 0
            self.is_dead = True

    def reset(self):
        self.hp = self.max_hp
        self.is_dead = False

def roll_d20():
    return random.randint(1, 20)

def roll_dice(n, d):
    return sum(random.randint(1, d) for _ in range(n))

def simulate_attack(attacker, target, penalty=0):
    d20 = roll_d20()
    total = d20 + attacker.atk_bonus + penalty
    
    # Regra de Crítico (Margem de +10)
    is_crit = total >= (target.ca + 10)
    
    if total >= target.ca:
        damage = roll_dice(attacker.damage_dice[0], attacker.damage_dice[1]) + attacker.damage_bonus
        if is_crit:
            damage *= 2
        target.take_damage(damage)
        return True, damage, is_crit
    return False, 0, False

def simulate_combat(party, enemies, iterations=100):
    results = {
        "party_wins": 0,
        "enemy_wins": 0,
        "avg_rounds": 0,
        "deaths": 0
    }
    
    total_rounds = 0
    
    for _ in range(iterations):
        for p in party: p.reset()
        for e in enemies: e.reset()
        
        round_count = 0
        while any(not p.is_dead for p in party) and any(not e.is_dead for e in enemies):
            round_count += 1
            # Turno da Party
            for p in party:
                if p.is_dead: continue
                for i in range(p.actions):
                    # Simples: ataca o primeiro inimigo vivo
                    target = next((e for e in enemies if not e.is_dead), None)
                    if target:
                        penalty = 0
                        if i == 1: penalty = -5
                        if i == 2: penalty = -10
                        simulate_attack(p, target, penalty)
            
            # Turno dos Inimigos
            for e in enemies:
                if e.is_dead: continue
                # Regra especial para Enxame (Dano de área/Esquiva)
                if e.name == "Enxame de Ratos":
                    for p in party:
                        if p.is_dead: continue
                        # Opção A: Teste de Esquiva DC 14
                        esquiva = roll_d20() + 1 + 2 + 1 # Nv 1 + Fis 2 + Con 1 (Aproximado)
                        if esquiva < 14:
                            p.take_damage(random.randint(1, 6) + 1)
                else:
                    for i in range(e.actions):
                        target = next((p for p in party if not p.is_dead), None)
                        if target:
                            penalty = 0
                            if i == 1: penalty = -5
                            simulate_attack(e, target, penalty)
                            
        if any(not p.is_dead for p in party):
            results["party_wins"] += 1
        else:
            results["enemy_wins"] += 1
            
        total_rounds += round_count
        
    results["avg_rounds"] = total_rounds / iterations
    return results

# Definição do Grupo A (Nível 5)
party_a = [
    Character("Vanguarda (Nv5)", 75, 20, 10, (1, 12), 6),
    Character("Tecelão (Nv5)", 38, 16, 11, (3, 6), 3),
    Character("Emissário (Nv5)", 45, 16, 10, (2, 8), 4),
    Character("Caçador (Nv5)", 58, 17, 12, (3, 6), 4)
]

# Inimigo: Banshee (Nv 5)
class Banshee(Character):
    def __init__(self, name):
        super().__init__(name, 60, 14, 0, (0, 0), 0)
        self.wail_used = False
    
    def use_wail(self, party):
        # Lamento (1/dia) - Opção A: 8d6 Psíquico + Abalado
        self.wail_used = True
        total_damage_dealt = 0
        for p in party:
            if p.is_dead: continue
            # Teste de Resistência DC 19 (Fis + Res + Nv)
            resistencia = roll_d20() + 5 + 4 # Nv 5 + Fis 4 (Aprox)
            damage = roll_dice(8, 6)
            if resistencia >= 19:
                damage //= 2
            p.take_damage(damage)
            total_damage_dealt += damage
        return total_damage_dealt

def simulate_combat_banshee(party, enemy, iterations=1000):
    results = {"party_wins": 0, "enemy_wins": 0, "avg_rounds": 0, "total_knockouts": 0}
    total_rounds = 0
    
    for _ in range(iterations):
        for p in party: p.reset()
        enemy.reset()
        enemy.wail_used = False
        
        rd = 0
        while any(not p.is_dead for p in party) and not enemy.is_dead:
            rd += 1
            # Turno da Banshee (Iniciativa alta costuma ser o caso)
            if not enemy.wail_used:
                enemy.use_wail(party)
            
            # Turno da Party
            for p in party:
                if p.is_dead: continue
                for i in range(p.actions):
                    if not enemy.is_dead:
                        simulate_attack(p, enemy, -5 * i)
            
        if any(not p.is_dead for p in party):
            results["party_wins"] += 1
            # Contar heróis caídos (HP=0) mesmo se o grupo venceu
            for p in party:
                if p.is_dead: results["total_knockouts"] += 1
        else:
            results["enemy_wins"] += 1
            results["total_knockouts"] += 4 # TPK
            
        total_rounds += rd
        
    results["avg_rounds"] = total_rounds / iterations
    return results

print("Simulando: Grupo A (Nv5) vs Banshee (1000 combates)")
stats = simulate_combat_banshee(party_a, Banshee("Banshee"), 1000)
print(stats)
