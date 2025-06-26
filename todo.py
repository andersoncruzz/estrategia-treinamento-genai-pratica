import os

ARQUIVO = "tarefas.txt"
PRIORIDADES = ["alta", "media", "baixa"]

def carregar_tarefas():
    tarefas = []
    if os.path.exists(ARQUIVO):
        with open(ARQUIVO, "r", encoding="utf-8") as f:
            for linha in f:
                if linha.strip():
                    desc, prioridade, concluida = linha.strip().split("|")
                    tarefas.append({
                        "descricao": desc,
                        "prioridade": prioridade,
                        "concluida": concluida == "True"
                    })
    return tarefas

def salvar_tarefas(tarefas):
    with open(ARQUIVO, "w", encoding="utf-8") as f:
        for t in tarefas:
            f.write(f"{t['descricao']}|{t['prioridade']}|{t['concluida']}\n")

def criar_tarefa(tarefas):
    desc = input("Descrição da tarefa: ")
    prioridade = input("Prioridade (alta/media/baixa): ").lower()
    if prioridade not in PRIORIDADES:
        print("Prioridade inválida.")
        return
    tarefas.append({"descricao": desc, "prioridade": prioridade, "concluida": False})
    salvar_tarefas(tarefas)
    print("Tarefa criada!")

def listar_tarefas(tarefas, prioridade=None, ordenar_por_prioridade=False):
    lista = tarefas.copy()
    if ordenar_por_prioridade:
        prioridade_ordem = {"alta": 0, "media": 1, "baixa": 2}
        lista.sort(key=lambda t: prioridade_ordem.get(t["prioridade"], 3))
    print("\n{:<4} {:<40} {:<12} {:<12}".format("Nº", "Descrição", "Prioridade", "Status"))
    print("-" * 72)
    count = 0
    for i, t in enumerate(lista):
        if prioridade and t["prioridade"] != prioridade:
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
    if prioridade not in PRIORIDADES:
        print("Prioridade inválida.")
        return
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
