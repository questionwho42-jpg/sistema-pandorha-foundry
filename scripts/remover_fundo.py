from pathlib import Path

try:
    from rembg import remove, new_session
except ImportError:
    print("❌ Erro: Bibliotecas necessárias não encontradas.")
    print("Execute: pip install rembg pillow")
    exit(1)


def remover_fundo(input_path, output_path, model_name="isnet-general-use"):
    """
    Remove o fundo usando o modelo ISNET (superior para detalhes)
    e parâmetros ultra-conservadores para preservar pedestais e armas.
    """
    print(f"⏳ Processando: {input_path.name} (Modo: {model_name})...")
    try:
        session = new_session(model_name)

        with open(input_path, "rb") as i:
            input_data = i.read()

            # PARÂMETROS PADRÃO (Ultra-Conservadores)
            f_thresh = 150
            b_thresh = 30
            e_size = 2

            # AJUSTE ESPECÍFICO PARA O CÃO RÚNICO (Pedestal de Terra Vermelha)
            if "cao_runico" in input_path.name.lower():
                print(f"   ℹ️ Aplicando ajustes de EMERGÊNCIA para {input_path.name}")
                # Desativamos Alpha Matting para evitar que a IA 'limpe' a base
                output_data = remove(
                    input_data,
                    session=session,
                    alpha_matting=False,  # MODO MANUAL: Não tenta ser esperto com as bordas
                )
            else:
                output_data = remove(
                    input_data,
                    session=session,
                    alpha_matting=True,
                    alpha_matting_foreground_threshold=f_thresh,
                    alpha_matting_background_threshold=b_thresh,
                    alpha_matting_erode_size=e_size,
                )

            with open(output_path, "wb") as o:
                o.write(output_data)
        print(f"✅ Concluído: {output_path.name}")
    except Exception as e:
        print(f"❌ Erro ao processar {input_path.name}: {e}")


def main():
    # Caminhos relativos ao script
    diretorio_atual = Path(__file__).parent.parent
    input_folder = diretorio_atual / "Campanhas" / "pacto_quebrado" / "assets-backup"
    output_folder = (
        diretorio_atual / "Campanhas" / "pacto_quebrado" / "assets-transparent"
    )

    # Criar pasta de saída se não existir
    if not output_folder.exists():
        output_folder.mkdir(parents=True)

    # Buscar todos os arquivos PNG
    # Filtramos para NÃO processar battlemaps ou mapas regionais (que não devem ter transparência)
    todas_imagens = list(input_folder.glob("*.png"))
    imagens = [
        img
        for img in todas_imagens
        if not img.name.startswith(("battlemap_", "colinas_"))
    ]

    if not imagens:
        print(f"⚠️ Nenhuma imagem encontrada em: {input_folder}")
        return

    print(f"🚀 Iniciando remoção de fundo de {len(imagens)} imagens...")

    for img_path in imagens:
        out_path = output_folder / img_path.name
        remover_fundo(img_path, out_path)

    print(
        f"\n✨ Processo finalizado! As imagens transparentes estão em: {output_folder}"
    )


if __name__ == "__main__":
    main()
