"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Leaf } from "lucide-react"

interface AuthFormProps {
  onAuth: (user: { name: string; email: string }) => void
}

export default function AuthForm({ onAuth }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isLogin) {
      onAuth({ name: "Usuário", email })
    } else {
      if (name && email && password) {
        onAuth({ name, email })
      }
    }
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Leaf className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="text-3xl">Recicla+ ♻️</CardTitle>
          <CardDescription>Juntos pela sustentabilidade</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <Input
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
              />
            )}
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              {isLogin ? "Entrar" : "Cadastrar"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">{isLogin ? "Não tem conta?" : "Já tem conta?"}</p>
            <button
              onClick={() => {
                setIsLogin(!isLogin)
                setName("")
                setEmail("")
                setPassword("")
              }}
              className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
            >
              {isLogin ? "Criar conta" : "Fazer login"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
