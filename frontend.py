import streamlit as st
import requests
import pandas as pd

API_URL = "http://localhost:8000"

st.set_page_config(page_title="Monitoramento de Combustíveis", layout="centered")

menu = st.sidebar.selectbox(
    "Menu",
    ("Postos", "Combustíveis", "Registro de Preços", "Usuários")
)

if menu == "Postos":
    st.header("Postos de Combustível")
    st.subheader("Cadastrar Novo Posto")
    with st.form("novo_posto"):
        nome = st.text_input("Nome do Posto")
        endereco = st.text_input("Endereço")
        latitude = st.number_input("Latitude", format="%.6f")
        longitude = st.number_input("Longitude", format="%.6f")
        cor = st.color_picker("Cor do marcador no mapa", "#FF0000")
        submitted = st.form_submit_button("Cadastrar")
        if submitted:
            novo_posto = {
                "id": 0,
                "nome": nome,
                "endereco": endereco,
                "latitude": latitude,
                "longitude": longitude,
                "cor": cor
            }
            resp = requests.post(f"{API_URL}/postos", json=novo_posto)
            if resp.status_code == 200:
                st.success("Posto cadastrado!")
                st.session_state['postos'] = requests.get(f"{API_URL}/postos").json()
            else:
                st.error("Erro ao cadastrar posto.")

    st.subheader("Lista de Postos Cadastrados")
    if st.button("Atualizar lista"):
        st.session_state['postos'] = requests.get(f"{API_URL}/postos").json()
    postos = st.session_state.get('postos', requests.get(f"{API_URL}/postos").json())
    if postos:
        print("Postos:", postos)  # Debugging line to check the content of postos
        df_postos = pd.DataFrame(postos)
        # Ajusta a ordem das colunas se necessário
        colunas = ["id", "nome", "endereco", "latitude", "longitude", "cor"]
        df_postos = df_postos[[c for c in colunas if c in df_postos.columns]]
        st.dataframe(df_postos, use_container_width=True)
    else:
        st.info("Nenhum posto cadastrado.")

elif menu == "Combustíveis":
    st.header("Combustíveis")
    if st.button("Atualizar lista"):
        st.session_state['combustiveis'] = requests.get(f"{API_URL}/combustiveis").json()
    combustiveis = st.session_state.get('combustiveis', requests.get(f"{API_URL}/combustiveis").json())
    st.subheader("Cadastrar Novo Combustível")
    with st.form("novo_combustivel"):
        nome = st.text_input("Nome do Combustível")
        submitted = st.form_submit_button("Cadastrar")
        if submitted:
            resp = requests.post(f"{API_URL}/combustiveis", json={"id": 0, "nome": nome})
            if resp.status_code == 200:
                st.success("Combustível cadastrado!")
                st.session_state['combustiveis'] = requests.get(f"{API_URL}/combustiveis").json()
            else:
                st.error("Erro ao cadastrar combustível.")

    st.subheader("Lista de Combustíveis Cadastrados")
    if combustiveis:
        df_combustiveis = pd.DataFrame(combustiveis)
        st.dataframe(df_combustiveis, use_container_width=True)
    else:
        st.info("Nenhum combustível cadastrado.")

elif menu == "Registro de Preços":
    st.header("Registro de Preços")
    postos = requests.get(f"{API_URL}/postos").json()
    combustiveis = requests.get(f"{API_URL}/combustiveis").json()
    usuarios = requests.get(f"{API_URL}/usuarios").json()
    precos = requests.get(f"{API_URL}/precos").json()
    registros = requests.get(f"{API_URL}/registros_precos").json()
    st.subheader("Registrar Novo Preço")
    with st.form("novo_registro"):
        posto_id = st.selectbox("Posto", [p['id'] for p in postos])
        combustivel_id = st.selectbox("Combustível", [c['id'] for c in combustiveis])
        preco_id = st.selectbox("Preço", [p['id'] for p in precos])
        usuario_id = st.selectbox("Usuário", [u['id'] for u in usuarios])
        data = st.date_input("Data")
        submitted = st.form_submit_button("Registrar")
        if submitted:
            resp = requests.post(f"{API_URL}/registros_precos", json={"id": 0, "posto_id": posto_id, "combustivel_id": combustivel_id, "preco_id": preco_id, "usuario_id": usuario_id, "data": str(data)})
            if resp.status_code == 200:
                st.success("Registro cadastrado!")
            else:
                st.error("Erro ao cadastrar registro.")

    st.subheader("Lista de Registros de Preços")
    if registros:
        df_registros = pd.DataFrame(registros)
        st.dataframe(df_registros, use_container_width=True)
    else:
        st.info("Nenhum registro de preço encontrado.")

elif menu == "Usuários":
    st.header("Usuários")
    if st.button("Atualizar lista"):
        st.session_state['usuarios'] = requests.get(f"{API_URL}/usuarios").json()
    usuarios = st.session_state.get('usuarios', requests.get(f"{API_URL}/usuarios").json())
    st.subheader("Cadastrar Novo Usuário")
    with st.form("novo_usuario"):
        nome = st.text_input("Nome do Usuário")
        email = st.text_input("Email")
        submitted = st.form_submit_button("Cadastrar")
        if submitted:
            resp = requests.post(f"{API_URL}/usuarios", json={"id": 0, "nome": nome, "email": email})
            if resp.status_code == 200:
                st.success("Usuário cadastrado!")
                st.session_state['usuarios'] = requests.get(f"{API_URL}/usuarios").json()
            else:
                st.error("Erro ao cadastrar usuário.")

    st.subheader("Lista de Usuários Cadastrados")
    if usuarios:
        df_usuarios = pd.DataFrame(usuarios)
        st.dataframe(df_usuarios, use_container_width=True)
    else:
        st.info("Nenhum usuário cadastrado.")
