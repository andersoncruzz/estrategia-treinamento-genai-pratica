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
                    partes = linha.strip().split("|")
                    if len(partes) == 4:
                        cod_tarefa, cod_desc, cod_prio, concluida = partes
                    else:
                        cod_tarefa, cod_desc, cod_prio = partes
                        concluida = "False"
                    tarefas.append({
                        "codigo": cod_tarefa,
                        "descricao": descricoes.get(cod_desc, f"[desc {cod_desc}]") ,
                        "prioridade": prioridades.get(cod_prio, f"[prio {cod_prio}]") ,
                        "cod_desc": cod_desc,
                        "cod_prio": cod_prio,
                        "concluida": concluida == "True"
                    })
    return tarefas

def salvar_tarefas(tarefas):
    with open(ARQ_TAREFAS, "w", encoding="utf-8") as f:
        for t in tarefas:
            f.write(f"{t['codigo']}|{t['cod_desc']}|{t['cod_prio']}|{t['concluida']}\n")

def salvar_descricoes(descricoes):
    with open(ARQ_DESC, "w", encoding="utf-8") as f:
        for cod, texto in descricoes.items():
            f.write(f"{cod}|{texto}\n")

def salvar_prioridades(prioridades):
    with open(ARQ_PRIORIDADE, "w", encoding="utf-8") as f:
        for cod, texto in prioridades.items():
            f.write(f"{cod}|{texto}\n")

def criar_tarefa(tarefas):
    descricoes = carregar_descricoes()
    prioridades = carregar_prioridades()
    # Criar nova descrição
    nova_desc = input("Digite a descrição da nova tarefa: ")
    novo_cod_desc = str(max([int(c) for c in descricoes.keys()] + [0]) + 1)
    descricoes[novo_cod_desc] = nova_desc
    salvar_descricoes(descricoes)
    # Criar nova prioridade
    nova_prio = input("Digite o texto do novo tipo de prioridade: ")
    novo_cod_prio = str(max([int(c) for c in prioridades.keys()] + [0]) + 1)
    prioridades[novo_cod_prio] = nova_prio
    salvar_prioridades(prioridades)
    # Criar tarefa
    novo_codigo = str(max([int(t['codigo']) for t in tarefas] + [0]) + 1)
    tarefa = {
        "codigo": novo_codigo,
        "descricao": nova_desc,
        "prioridade": nova_prio,
        "cod_desc": novo_cod_desc,
        "cod_prio": novo_cod_prio,
        "concluida": False
    }
    tarefas.append(tarefa)
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
        salvar_tarefas(tarefas)
        print("Tarefa marcada como concluída!")
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
