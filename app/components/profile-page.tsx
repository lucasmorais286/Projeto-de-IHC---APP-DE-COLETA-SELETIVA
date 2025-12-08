"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, BookOpen, LinkIcon, Leaf, Droplets, Zap, Package, Trash2, Edit2 } from "lucide-react"

interface RecyclingRecord {
  id: number
  bags: number
  date: string
  sharedToFeed: boolean
}

interface GuideItem {
  category: string
  color: string
  canRecycle: string[]
  cannotRecycle: string[]
  tips: string
  resources: { title: string; url: string }[]
}

interface ProfilePageProps {
  userName: string
  currentGroup: { name: string; code: string; role: "admin" | "member" } | null
  onLogout: () => void
}

export default function ProfilePage({ userName, currentGroup, onLogout }: ProfilePageProps) {
  const [records, setRecords] = useState<RecyclingRecord[]>([
    { id: 1, bags: 3, date: "14/12/2025", sharedToFeed: true },
    { id: 2, bags: 2, date: "12/12/2025", sharedToFeed: false },
    { id: 3, bags: 1, date: "10/12/2025", sharedToFeed: true },
  ])

  const userBagsRecycled = records.reduce((sum, r) => sum + r.bags, 0)
  const userEnergySaved = userBagsRecycled * 4
  const userCo2Avoided = userBagsRecycled * 0.4
  const userWaterSaved = userBagsRecycled * 25
  const userRawMaterialSaved = userBagsRecycled * 0.5

  const deleteRecord = (id: number) => {
    setRecords(records.filter((r) => r.id !== id))
  }

  const guides: GuideItem[] = [
    {
      category: "♻️ Plástico",
      color: "from-yellow-500/10 to-yellow-600/10",
      canRecycle: ["Garrafas PET", "Potes de alimento", "Sacos de compras", "Tupperware"],
      cannotRecycle: ["Filme plástico", "Sacolas de lixo", "Isopor", "Plástico sujo de óleo"],
      tips: "Limpe bem os recipientes antes de descartar e remova os rótulos quando possível.",
      resources: [
        { title: "Guia de Plásticos Recicláveis", url: "https://www.example.com" },
        { title: "Como limpar corretamente", url: "https://www.example.com" },
      ],
    },
    {
      category: "📰 Papel e Papelão",
      color: "from-orange-500/10 to-orange-600/10",
      canRecycle: ["Jornais", "Revistas", "Caixas de papelão", "Papel de escritório"],
      cannotRecycle: ["Papel úmido", "Papel sanitário", "Papel alumínio", "Papel com graxa"],
      tips: "Desmonte as caixas para economizar espaço e mantenha secas.",
      resources: [
        { title: "Reciclagem de Papel", url: "https://www.example.com" },
        { title: "Composição do papelão", url: "https://www.example.com" },
      ],
    },
    {
      category: "🥫 Metal e Alumínio",
      color: "from-gray-500/10 to-gray-600/10",
      canRecycle: ["Latas de alumínio", "Latas de aço", "Tampas metálicas", "Tubos de toothpaste"],
      cannotRecycle: ["Spray em aerossol", "Latas danificadas", "Fitas magnéticas"],
      tips: "Lave as latas e remova os rótulos. Amasse para economizar espaço.",
      resources: [
        { title: "Alumínio vs Aço", url: "https://www.example.com" },
        { title: "Processo de reciclagem", url: "https://www.example.com" },
      ],
    },
    {
      category: "🥃 Vidro",
      color: "from-green-500/10 to-green-600/10",
      canRecycle: ["Garrafas", "Potes de conserva", "Frascos de remédio", "Vidro transparente"],
      cannotRecycle: ["Vidro espelhado", "Vidro temperado", "Cerâmica", "Vidro fosco"],
      tips: "Lave bem para remover resíduos de alimento. Coloque em sacos separados.",
      resources: [
        { title: "Tipos de vidro", url: "https://www.example.com" },
        { title: "Segurança na reciclagem", url: "https://www.example.com" },
      ],
    },
  ]

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Leaf className="w-8 h-8 text-primary" />
          Meu Perfil
        </h1>
        <p className="text-muted-foreground mt-1">Suas ações e impacto individual</p>
      </div>

      {/* User Info Card */}
      <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-5xl mb-3">👤</div>
            <p className="text-2xl font-bold text-foreground">{userName}</p>
            {currentGroup && (
              <div className="mt-3 space-y-2">
                <p className="text-sm text-muted-foreground">Grupo: {currentGroup.name}</p>
                <p
                  className={`text-xs font-semibold px-3 py-1 rounded-full inline-block ${
                    currentGroup.role === "admin"
                      ? "bg-primary/20 text-primary"
                      : "bg-secondary/20 text-secondary-foreground"
                  }`}
                >
                  {currentGroup.role === "admin" ? "Administrador" : "Membro Ativo"}
                </p>
                {currentGroup.role === "admin" && (
                  <div className="mt-3 p-3 bg-background/50 rounded-lg border border-primary/20">
                    <p className="text-xs text-muted-foreground mb-2">Código para acessar:</p>
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono font-bold text-primary">{currentGroup.code}</code>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(currentGroup.code)
                          alert("Código copiado!")
                        }}
                        className="text-xs bg-primary/20 text-primary px-2 py-1 rounded hover:bg-primary/30 transition-colors"
                      >
                        Copiar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Personal Impact Metrics */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground">Seu Impacto</h2>
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Energia Economizada</p>
                  <p className="text-xl font-bold text-primary">{userEnergySaved} kWh</p>
                </div>
                <Zap className="w-8 h-8 text-primary/40" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">CO₂ Evitado</p>
                  <p className="text-xl font-bold text-orange-600">{userCo2Avoided.toFixed(1)} kg</p>
                </div>
                <Package className="w-8 h-8 text-orange-600/40" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Água Economizada</p>
                  <p className="text-xl font-bold text-blue-600">{userWaterSaved} L</p>
                </div>
                <Droplets className="w-8 h-8 text-blue-600/40" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/10 border-amber-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Matéria-Prima Poupada</p>
                  <p className="text-xl font-bold text-amber-600">{userRawMaterialSaved.toFixed(1)} kg</p>
                </div>
                <Leaf className="w-8 h-8 text-amber-600/40" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-3 border-t border-muted pt-4">
        <h2 className="text-xl font-semibold text-foreground">Histórico de Registros</h2>
        {records.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">Nenhum registro ainda</p>
        ) : (
          <div className="space-y-2">
            {records.map((record) => (
              <Card key={record.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-foreground">
                          +{record.bags} saco{record.bags > 1 ? "s" : ""}
                        </span>
                        {record.sharedToFeed && (
                          <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">No feed</span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{record.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-muted-foreground hover:text-primary transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteRecord(record.id)}
                        className="text-muted-foreground hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-muted pt-4" />

      {/* Collection Guide Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-primary" />
          Guia de Coleta
        </h2>

        {guides.map((guide, idx) => (
          <Card key={idx} className={`bg-gradient-to-br ${guide.color} border-primary/10`}>
            <CardHeader>
              <CardTitle className="text-lg">{guide.category}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="flex items-center gap-2 font-semibold text-green-700 mb-2">
                  <CheckCircle className="w-5 h-5" />
                  Pode reciclar
                </h4>
                <ul className="space-y-1 ml-7">
                  {guide.canRecycle.map((item, i) => (
                    <li key={i} className="text-sm text-foreground">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="flex items-center gap-2 font-semibold text-red-600 mb-2">
                  <XCircle className="w-5 h-5" />
                  Não pode reciclar
                </h4>
                <ul className="space-y-1 ml-7">
                  {guide.cannotRecycle.map((item, i) => (
                    <li key={i} className="text-sm text-muted-foreground">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-background/50 p-3 rounded-lg border border-primary/10">
                <p className="text-sm">
                  <span className="font-semibold text-primary">💡 Dica: </span>
                  {guide.tips}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2">SAIBA MAIS:</p>
                <div className="space-y-1">
                  {guide.resources.map((resource, i) => (
                    <a
                      key={i}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      <LinkIcon className="w-4 h-4" />
                      {resource.title}
                    </a>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="pt-6 pb-32 border-t border-muted mt-8">
        <button
          onClick={() => {
            onLogout()
            window.location.reload()
          }}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          Sair
        </button>
      </div>
    </div>
  )
}
