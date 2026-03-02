"""
SISTEMA DE GERAÇÃO DE MONSTROS PANDORHA - VANGUARD EDITION
Protocolo: Arquitetura Decorator (Constituição Master v23)

Explicação Técnica: Evita a explosão de classes ao "embrulhar" monstros base
com camadas de poder (Adamante, Síncope, etc), seguindo o efeito cebola.
"""

from abc import ABC, abstractmethod
import math


# 1. Interface / Componente Abstrato
class IEntidade(ABC):
    @abstractmethod
    def get_nome(self) -> str:
        pass

    @abstractmethod
    def get_eixos(self) -> dict:
        pass

    @abstractmethod
    def get_hp(self) -> int:
        pass

    @abstractmethod
    def get_ca(self) -> int:
        pass


# 2. Componente Concreto (O Objeto Base)
class MonstroBase(IEntidade):
    def __init__(self, nome: str, nd: int, papel: str = "Atacante"):
        self.nome = nome
        self.nd = nd
        self.papel = papel

        # Matemática Oficial do Guia de Criação (Cap. 13)
        self.eixos = {
            "fisico": math.floor(nd / 2) + 2,
            "mental": math.floor(nd / 4) + 1,
            "social": 0,
        }

    def get_nome(self) -> str:
        return self.nome

    def get_eixos(self) -> dict:
        return self.eixos

    def get_hp(self) -> int:
        hp_base = 0
        tabela_hp = {1: 15, 2: 25, 3: 40, 4: 55, 5: 70, 6: 90}
        hp_base = tabela_hp.get(self.nd, self.nd * 15)

        # Ajuste de Papel Tático
        if self.papel == "Tanque":
            hp_base = math.floor(hp_base * 1.5)
        if self.papel == "Assassino":
            hp_base = math.floor(hp_base * 0.75)

        return hp_base

    def get_ca(self) -> int:
        ca_base = 11 + self.nd
        if self.papel == "Tanque":
            ca_base -= 2
        if self.papel == "Assassino":
            ca_base += 2
        return ca_base


# 3. Decorador Base
class EntidadeDecorator(IEntidade):
    def __init__(self, entidade: IEntidade):
        self._entidade = entidade

    def get_nome(self) -> str:
        return self._entidade.get_nome()

    def get_eixos(self) -> dict:
        return self._entidade.get_eixos()

    def get_hp(self) -> int:
        return self._entidade.get_hp()

    def get_ca(self) -> int:
        return self._entidade.get_ca()


# 4. Decoradores Concretos
class SincroniaDecorator(EntidadeDecorator):
    """Adiciona as propriedades da Síncope da Vontade."""

    def get_nome(self) -> str:
        return f"{self._entidade.get_nome()} Vinculado"

    def get_eixos(self) -> dict:
        eixos = self._entidade.get_eixos().copy()
        eixos["mental"] += 2
        return eixos

    def get_hp(self) -> int:
        return self._entidade.get_hp() + 10


class AdamanteDecorator(EntidadeDecorator):
    """Adiciona carapaça de adamante bruto."""

    def get_ca(self) -> int:
        return self._entidade.get_ca() + 3

    def get_eixos(self) -> dict:
        eixos = self._entidade.get_eixos().copy()
        eixos["fisico"] += 1
        return eixos


# 5. Exemplo de Uso
if __name__ == "__main__":
    morph = MonstroBase("Morph", nd=2, papel="Assassino")
    morph_boss = AdamanteDecorator(SincroniaDecorator(morph))

    print(f"Nome Final: {morph_boss.get_nome()}")
    print(f"Eixos: {morph_boss.get_eixos()}")
    print(f"HP: {morph_boss.get_hp()}")
    print(f"CA: {morph_boss.get_ca()}")
    print(f"EE: {math.floor(morph.nd * 2) + 2} | Vigor: {math.floor(morph.nd / 2) + 2}")
    print("-" * 20)
    print("Habilidade [A] Chicote: Dano 1d10+2")
    print("Habilidade [R] Esforço: +2 Bônus (Custo: 1 PV)")
