import os

ARQ_TAREFAS = "tarefas_todolist.txt"
ARQ_DESC = "tipo_desc_tarefa.txt"
ARQ_PRIORIDADE = "tipo_prioridade.txt"

# Funções auxiliares para carregar os tipos

def carregar_descricoes():
    descricoes = {}
    if os.path.exists(ARQ_DESC):
        with open(ARQ_DESC, "r", encoding="utf-8") as f:
            for linha in f:
                if linha.strip():
                    cod, texto = linha.strip().split("|", 1)
                    descricoes[cod] = texto
    return descricoes

def carregar_prioridades():
    prioridades = {}
    if os.path.exists(ARQ_PRIORIDADE):
        with open(ARQ_PRIORIDADE, "r", encoding="utf-8") as f:
            for linha in f:
                if linha.strip():
                    cod, texto = linha.strip().split("|", 1)
                    prioridades[cod] = texto
    return prioridades

def carregar_tarefas():
    tarefas = []
    descricoes = carregar_descricoes()
    prioridades = carregar_prioridades()
    if os.path.exists(ARQ_TAREFAS):
        with open(ARQ_TAREFAS, "r", encoding="utf-8") as f:
            for linha in f:
                if linha.strip():
                    cod_tarefa, cod_desc, cod_prio = linha.strip().split("|")
                    tarefas.append({
                        "codigo": cod_tarefa,
                        "descricao": descricoes.get(cod_desc, f"[desc {cod_desc}]") ,
                        "prioridade": prioridades.get(cod_prio, f"[prio {cod_prio}]") ,
                        "cod_desc": cod_desc,
                        "cod_prio": cod_prio,
                        "concluida": False  # Não há status de conclusão nos arquivos, default False
                    })
    return tarefas

def salvar_tarefas(tarefas):
    with open(ARQ_TAREFAS, "w", encoding="utf-8") as f:
        for t in tarefas:
            f.write(f"{t['codigo']}|{t['cod_desc']}|{t['cod_prio']}\n")

def criar_tarefa(tarefas):
    descricoes = carregar_descricoes()
    prioridades = carregar_prioridades()
    print("Descrições disponíveis:")
    for cod, texto in descricoes.items():
        print(f"{cod}: {texto}")
    cod_desc = input("Código da descrição: ")
    if cod_desc not in descricoes:
        print("Código de descrição inválido.")
        return
    print("Prioridades disponíveis:")
    for cod, texto in prioridades.items():
        print(f"{cod}: {texto}")
    cod_prio = input("Código da prioridade: ")
    if cod_prio not in prioridades:
        print("Código de prioridade inválido.")
        return
    novo_codigo = str(len(tarefas) + 1)
    tarefas.append({
        "codigo": novo_codigo,
        "descricao": descricoes[cod_desc],
        "prioridade": prioridades[cod_prio],
        "cod_desc": cod_desc,
        "cod_prio": cod_prio,
        "concluida": False
    })
    salvar_tarefas(tarefas)
    print("Tarefa criada!")

def listar_tarefas(tarefas, prioridade=None, ordenar_por_prioridade=False):
    lista = tarefas.copy()
    if ordenar_por_prioridade:
        prioridade_ordem = {"alta": 0, "media": 1, "baixa": 2}
        lista.sort(key=lambda t: prioridade_ordem.get(t["prioridade"].lower(), 3))
    print("\n{:<4} {:<40} {:<12} {:<12}".format("Nº", "Descrição", "Prioridade", "Status"))
    print("-" * 72)
    count = 0
    for i, t in enumerate(lista):
        if prioridade and t["prioridade"].lower() != prioridade:
            continue
        status = "Concluída" if t["concluida"] else "Pendente"
        print("{:<4} {:<40} {:<12} {:<12}".format(i+1, t['descricao'], t['prioridade'].capitalize(), status))
        count += 1
    if count == 0:
        print("Nenhuma tarefa encontrada.")
    print()

def marcar_concluida(tarefas):
    listar_tarefas(tarefas)
    idx = int(input("Número da tarefa para marcar como concluída: ")) - 1
    if 0 <= idx < len(tarefas):
        tarefas[idx]["concluida"] = True
        print("Tarefa marcada como concluída! (Obs: status não é salvo no arquivo)")
    else:
        print("Índice inválido.")

def filtrar_por_prioridade(tarefas):
    prioridade = input("Filtrar por prioridade (alta/media/baixa): ").lower()
    listar_tarefas(tarefas, prioridade)

def ordenar_por_prioridade(tarefas):
    listar_tarefas(tarefas, ordenar_por_prioridade=True)

def menu():
    tarefas = carregar_tarefas()
    while True:
        print("\n1. Criar tarefa")
        print("2. Listar tarefas")
        print("3. Marcar tarefa como concluída")
        print("4. Filtrar por prioridade")
        print("5. Ordenar por prioridade")
        print("6. Sair")
        op = input("Escolha uma opção: ")
        if op == "1":
            criar_tarefa(tarefas)
        elif op == "2":
            listar_tarefas(tarefas)
        elif op == "3":
            marcar_concluida(tarefas)
        elif op == "4":
            filtrar_por_prioridade(tarefas)
        elif op == "5":
            ordenar_por_prioridade(tarefas)
        elif op == "6":
            break
        else:
            print("Opção inválida.")

if __name__ == "__main__":
    menu()
