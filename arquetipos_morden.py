"""
ARQUÉTIPOS DE MORDEN - LEGACY EDITION
Protocolo: Arquitetura Decorator (Constituição Master v23)

Explicação Técnica: Ao utilizar o DECORATOR, o contrato da classe base é mantido,
mas adicionamos funcionalidades às habilidades existentes sem explosão de classes.
"""

from abc import ABC, abstractmethod


# 1. Interface Comum (Contrato de Classe)
class IClasse(ABC):
    @abstractmethod
    def get_nome(self) -> str:
        pass

    @abstractmethod
    def usar_ataque_especial(self) -> str:
        pass

    @abstractmethod
    def get_bonus_stats(self) -> dict:
        pass


# 2. Componente Concreto (Classe Base de Pandorha)
class Vanguarda(IClasse):
    def get_nome(self) -> str:
        return "Vanguarda"

    def usar_ataque_especial(self) -> str:
        return "Gasta 1 Atitude para realizar um Golpe Pesado (+1d8 dano)."

    def get_bonus_stats(self) -> dict:
        return {"HP": 10, "Vigor": 2}


# 3. Decorador Base
class ArquetipoMorden(IClasse):
    def __init__(self, classe_base: IClasse):
        self._classe = classe_base

    def get_nome(self) -> str:
        return self._classe.get_nome()

    def usar_ataque_especial(self) -> str:
        return self._classe.usar_ataque_especial()

    def get_bonus_stats(self) -> dict:
        return self._classe.get_bonus_stats()


# 4. Decoradores Concretos (Especializações de Morden)
class SoldadorDeAdamante(ArquetipoMorden):
    """Reforça o Vanguarda com tecnologia de Morden."""

    def get_nome(self) -> str:
        return f"{self._classe.get_nome()} [Doutrina: Soldador de Adamante]"

    def usar_ataque_especial(self) -> str:
        base = self._classe.usar_ataque_especial()
        return f"{base} + Explosão Rúnica (Alvo fica Atordoado)."

    def get_bonus_stats(self) -> dict:
        stats = self._classe.get_bonus_stats()
        stats["CA"] = stats.get("CA", 0) + 2
        return stats


class AlquimistaDeMina(ArquetipoMorden):
    """Decora qualquer classe com conhecimentos de Síncope e Purificação."""

    def usando_doutrina(self) -> str:
        return "Aplica Purificação de Soro."

    def usar_ataque_especial(self) -> str:
        base = self._classe.usar_ataque_especial()
        return f"{base} + Pulverizador de Soro (Cura aliados próximos)."


# 5. Uso (Main)
if __name__ == "__main__":
    jogador = Vanguarda()
    print(f"Base: {jogador.get_nome()}")

    # Decorando o Vanguarda com a Doutrina de Morden
    # "Efeito Cebola": Embrulhamos o treinamento básico com a especialização.
    meu_heroi = SoldadorDeAdamante(jogador)

    print(f"\nHerói: {meu_heroi.get_nome()}")
    print(f"Ataque: {meu_heroi.usar_ataque_especial()}")
    print(f"Stats: {meu_heroi.get_bonus_stats()}")
