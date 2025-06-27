<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Listar todos os produtos
    public function index()
    {
        return response()->json(Product::all());
    }

    // Criar um novo produto
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'descricao' => 'required|string',
            'preco' => 'required|numeric',
            // 'categoria' => 'required|string|max:255',
            // 'imagem_url' => 'required|url',
            // 'disponivel' => 'required|boolean',
            // 'quantidade_estoque' => 'required|integer|min:0',
        ]);

        $product = Product::create($request->all);

        return response()->json($product, 201);
    }

    // Exibir um produto específico
    public function show($id)
    {
        $product = Product::findOrFail($id);
        return response()->json($product);
    }

    // Atualizar um produto
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'price' => 'sometimes|required|numeric',
        ]);
        $product->update($validated);
        return response()->json($product);
    }

    // Excluir um produto
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json(null, 204);
    }
}
