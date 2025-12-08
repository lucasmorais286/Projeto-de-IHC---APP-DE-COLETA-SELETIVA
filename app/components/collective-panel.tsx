"use client"

import { useState } from "react"
import { Heart, Trash2, Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface RecyclingPost {
  id: number
  user: string
  avatar: string
  bags: number
  timestamp: string
  likes: number
  liked: boolean
}

interface RecyclingRecord {
  id: number
  bags: number
  timestamp: string
  sharedToFeed: boolean
}

export default function CollectivePanel() {
  const [posts, setPosts] = useState<RecyclingPost[]>([
    {
      id: 1,
      user: "Maria Silva",
      avatar: "👩",
      bags: 3,
      timestamp: "há 2 horas",
      likes: 12,
      liked: false,
    },
    {
      id: 2,
      user: "João Santos",
      avatar: "👨",
      bags: 2,
      timestamp: "há 4 horas",
      likes: 8,
      liked: false,
    },
    {
      id: 3,
      user: "Ana Costa",
      avatar: "👩‍🦰",
      bags: 1,
      timestamp: "há 6 horas",
      likes: 5,
      liked: false,
    },
  ])

  const [showModal, setShowModal] = useState(false)
  const [bagsInput, setBagsInput] = useState("")
  const [shareToFeed, setShareToFeed] = useState(true)

  const toggleLike = (id: number) => {
    setPosts(
      posts.map((p) => (p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p)),
    )
  }

  const deletePost = (id: number) => {
    setPosts(posts.filter((p) => p.id !== id))
  }

  const handleRegisterRecycling = () => {
    const bags = Number.parseInt(bagsInput)
    if (!isNaN(bags) && bags > 0) {
      if (shareToFeed) {
        const newPost: RecyclingPost = {
          id: posts.length + 1,
          user: "Você",
          avatar: "🎉",
          bags,
          timestamp: "agora",
          likes: 0,
          liked: false,
        }
        setPosts([newPost, ...posts])
      }
      // Aqui você salvaria também no histórico de registros do usuário
      setBagsInput("")
      setShareToFeed(true)
      setShowModal(false)
    }
  }

  // Calculate team progress
  const totalBags = posts.reduce((sum, p) => sum + p.bags, 0)
  const goalBags = 100
  const progressPercentage = (totalBags / goalBags) * 100

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Trash2 className="w-8 h-8 text-primary" />
          Painel Coletivo
        </h1>
        <p className="text-muted-foreground mt-1">Acompanhe as metas do condomínio</p>
      </div>

      {/* Team Goal Card */}
      <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="text-primary">Meta do Mês</CardTitle>
          <CardDescription>Objetivo coletivo de reciclagem</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              {totalBags}/{goalBags} sacos
            </span>
            <span className="text-sm text-muted-foreground">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-accent h-full transition-all duration-500 rounded-full"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Faltam <span className="font-bold text-primary">{Math.max(0, goalBags - totalBags)}</span> sacos para
            atingir a meta!
          </p>
        </CardContent>
      </Card>

      {/* Recycling Feed */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Feed de Reciclagens</h2>
        {posts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              {/* User Header */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{post.avatar}</span>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{post.user}</p>
                  <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                </div>
                <button
                  onClick={() => deletePost(post.id)}
                  className="text-muted-foreground hover:text-red-600 transition-colors"
                  title="Deletar post"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {/* Post Content */}
              <div className="inline-block bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium mb-3">
                +{post.bags} saco{post.bags > 1 ? "s" : ""}
              </div>

              {/* Like Action */}
              <div className="flex items-center gap-4 text-muted-foreground">
                <button
                  onClick={() => toggleLike(post.id)}
                  className="flex items-center gap-1 hover:text-primary transition-colors"
                >
                  <Heart className={`w-5 h-5 ${post.liked ? "fill-primary text-primary" : ""}`} />
                  <span className="text-sm">{post.likes}</span>
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-32 right-4 bg-primary hover:bg-primary/90 text-primary-foreground w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all"
        title="Registrar reciclagem"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-background w-full rounded-t-lg p-6 space-y-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground">Registre sua Reciclagem</h2>

            {/* Input de sacos */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Quantos sacos você reciclou?</label>
              <Input
                type="number"
                placeholder="0"
                value={bagsInput}
                onChange={(e) => setBagsInput(e.target.value)}
                className="bg-muted/50 text-lg"
                min="1"
              />
            </div>

            {/* Checkbox para compartilhar */}
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <input
                type="checkbox"
                id="shareFeed"
                checked={shareToFeed}
                onChange={(e) => setShareToFeed(e.target.checked)}
                className="w-5 h-5 cursor-pointer accent-primary"
              />
              <label htmlFor="shareFeed" className="flex-1 cursor-pointer text-foreground">
                Compartilhar no feed de reciclagens
              </label>
            </div>

            <p className="text-xs text-muted-foreground">
              {shareToFeed
                ? "Seu registro será visível para todos do grupo"
                : "Seu registro será contabilizado nas métricas, mas não será visível no feed"}
            </p>

            {/* Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowModal(false)} className="flex-1">
                Cancelar
              </Button>
              <Button
                onClick={handleRegisterRecycling}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Registrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
