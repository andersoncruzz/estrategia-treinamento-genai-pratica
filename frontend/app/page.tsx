"use client"

import { useState, useEffect } from "react"
import { Package, Plus, Edit, Trash2, Eye, EyeOff, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"

interface Product {
  id: string
  titulo: string
  descricao: string
  preco: number
  categoria: string
  imagem: string
  disponivel: boolean
  quantidade: number
  dataCriacao: string
}

const CATEGORIAS = [
  "Pizzas",
  "Hambúrgueres",
  "Bebidas",
  "Sobremesas",
  "Pratos Principais",
  "Entradas",
  "Saladas",
  "Lanches",
]

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([])
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    preco: "",
    categoria: "",
    imagem: "",
    disponivel: true,
    quantidade: "",
  })

  // Carregar produtos do localStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem("food-products")
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    }
  }, [])

  // Salvar produtos no localStorage
  useEffect(() => {
    localStorage.setItem("food-products", JSON.stringify(products))
  }, [products])

  const resetForm = () => {
    setFormData({
      titulo: "",
      descricao: "",
      preco: "",
      categoria: "",
      imagem: "",
      disponivel: true,
      quantidade: "",
    })
    setEditingProduct(null)
  }

  const handleSubmit = () => {
    // Validações
    if (!formData.titulo.trim()) {
      toast({
        title: "Erro",
        description: "Título é obrigatório",
        variant: "destructive",
      })
      return
    }

    if (!formData.preco || Number.parseFloat(formData.preco) <= 0) {
      toast({
        title: "Erro",
        description: "Preço deve ser maior que zero",
        variant: "destructive",
      })
      return
    }

    if (!formData.categoria) {
      toast({
        title: "Erro",
        description: "Categoria é obrigatória",
        variant: "destructive",
      })
      return
    }

    if (!formData.quantidade || Number.parseInt(formData.quantidade) < 0) {
      toast({
        title: "Erro",
        description: "Quantidade deve ser um número válido",
        variant: "destructive",
      })
      return
    }

    const productData: Product = {
      id: editingProduct?.id || Date.now().toString(),
      titulo: formData.titulo.trim(),
      descricao: formData.descricao.trim(),
      preco: Number.parseFloat(formData.preco),
      categoria: formData.categoria,
      imagem: formData.imagem || "/placeholder.svg?height=200&width=200",
      disponivel: formData.disponivel,
      quantidade: Number.parseInt(formData.quantidade),
      dataCriacao: editingProduct?.dataCriacao || new Date().toISOString(),
    }

    if (editingProduct) {
      // Editar produto existente
      setProducts(products.map((p) => (p.id === editingProduct.id ? productData : p)))
      toast({
        title: "Sucesso",
        description: "Produto atualizado com sucesso!",
      })
    } else {
      // Adicionar novo produto
      setProducts([productData, ...products])
      toast({
        title: "Sucesso",
        description: "Produto cadastrado com sucesso!",
      })
    }

    resetForm()
    setIsDialogOpen(false)
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      titulo: product.titulo,
      descricao: product.descricao,
      preco: product.preco.toString(),
      categoria: product.categoria,
      imagem: product.imagem,
      disponivel: product.disponivel,
      quantidade: product.quantidade.toString(),
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (productId: string) => {
    setProducts(products.filter((p) => p.id !== productId))
    toast({
      title: "Produto removido",
      description: "Produto foi removido com sucesso",
    })
  }

  const toggleAvailability = (productId: string) => {
    setProducts(products.map((p) => (p.id === productId ? { ...p, disponivel: !p.disponivel } : p)))
  }

  const getProductsByCategory = () => {
    const grouped = products.reduce(
      (acc, product) => {
        if (!acc[product.categoria]) {
          acc[product.categoria] = []
        }
        acc[product.categoria].push(product)
        return acc
      },
      {} as Record<string, Product[]>,
    )

    return grouped
  }

  const productsByCategory = getProductsByCategory()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Gerenciamento de Produtos</h1>
            <p className="text-muted-foreground">Cadastre e gerencie os produtos do seu cardápio</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Novo Produto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingProduct ? "Editar Produto" : "Cadastrar Novo Produto"}</DialogTitle>
                <DialogDescription>Preencha as informações do produto abaixo</DialogDescription>
              </DialogHeader>

              <div className="grid gap-6 py-4">
                {/* Título e Categoria */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="titulo">Título *</Label>
                    <Input
                      id="titulo"
                      placeholder="Ex: Pizza Margherita"
                      value={formData.titulo}
                      onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="categoria">Categoria *</Label>
                    <Select
                      value={formData.categoria}
                      onValueChange={(value) => setFormData({ ...formData, categoria: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIAS.map((categoria) => (
                          <SelectItem key={categoria} value={categoria}>
                            {categoria}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Descrição */}
                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    placeholder="Descreva o produto, ingredientes, etc..."
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    rows={3}
                  />
                </div>

                {/* Preço e Quantidade */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="preco">Preço (R$) *</Label>
                    <Input
                      id="preco"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={formData.preco}
                      onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantidade">Quantidade em Estoque *</Label>
                    <Input
                      id="quantidade"
                      type="number"
                      min="0"
                      placeholder="0"
                      value={formData.quantidade}
                      onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })}
                    />
                  </div>
                </div>

                {/* Imagem */}
                <div className="space-y-2">
                  <Label htmlFor="imagem">URL da Imagem</Label>
                  <Input
                    id="imagem"
                    placeholder="https://exemplo.com/imagem.jpg"
                    value={formData.imagem}
                    onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
                  />
                  {formData.imagem && (
                    <div className="mt-2">
                      <img
                        src={formData.imagem || "/placeholder.svg"}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-md border"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg?height=128&width=128"
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Disponibilidade */}
                <div className="flex items-center space-x-2">
                  <Switch
                    id="disponivel"
                    checked={formData.disponivel}
                    onCheckedChange={(checked) => setFormData({ ...formData, disponivel: checked })}
                  />
                  <Label htmlFor="disponivel">Produto disponível para venda</Label>
                </div>

                {/* Botões */}
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSubmit} className="flex-1">
                    {editingProduct ? "Atualizar Produto" : "Cadastrar Produto"}
                  </Button>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total de Produtos</p>
                  <p className="text-2xl font-bold">{products.length}</p>
                </div>
                <Package className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Disponíveis</p>
                  <p className="text-2xl font-bold text-green-600">{products.filter((p) => p.disponivel).length}</p>
                </div>
                <Eye className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Indisponíveis</p>
                  <p className="text-2xl font-bold text-red-600">{products.filter((p) => !p.disponivel).length}</p>
                </div>
                <EyeOff className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Categorias</p>
                  <p className="text-2xl font-bold">{Object.keys(productsByCategory).length}</p>
                </div>
                <Package className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Produtos */}
        {products.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum produto cadastrado</h3>
              <p className="text-muted-foreground text-center mb-4">
                Comece cadastrando seu primeiro produto clicando no botão "Novo Produto"
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {Object.entries(productsByCategory).map(([categoria, categoryProducts]) => (
              <div key={categoria}>
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-xl font-semibold">{categoria}</h2>
                  <Badge variant="secondary">{categoryProducts.length} produtos</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryProducts.map((product) => (
                    <Card key={product.id} className={`overflow-hidden ${!product.disponivel ? "opacity-60" : ""}`}>
                      <div className="aspect-square relative">
                        {product.imagem ? (
                          <img
                            src={product.imagem || "/placeholder.svg"}
                            alt={product.titulo}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg?height=200&width=200"
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <ImageIcon className="h-12 w-12 text-muted-foreground" />
                          </div>
                        )}
                        <div className="absolute top-2 right-2 flex gap-1">
                          {!product.disponivel && <Badge variant="destructive">Indisponível</Badge>}
                          {product.quantidade === 0 && <Badge variant="outline">Sem estoque</Badge>}
                        </div>
                      </div>

                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg line-clamp-1">{product.titulo}</CardTitle>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleAvailability(product.id)}
                              title={product.disponivel ? "Marcar como indisponível" : "Marcar como disponível"}
                            >
                              {product.disponivel ? (
                                <Eye className="h-4 w-4 text-green-600" />
                              ) : (
                                <EyeOff className="h-4 w-4 text-red-600" />
                              )}
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleEdit(product)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDelete(product.id)}>
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </div>
                        {product.descricao && (
                          <CardDescription className="line-clamp-2">{product.descricao}</CardDescription>
                        )}
                      </CardHeader>

                      <CardContent className="pt-0">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-2xl font-bold text-green-600">R$ {product.preco.toFixed(2)}</span>
                          <Badge variant="outline">Estoque: {product.quantidade}</Badge>
                        </div>
                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                          <span>Categoria: {product.categoria}</span>
                          <span>{new Date(product.dataCriacao).toLocaleDateString("pt-BR")}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
