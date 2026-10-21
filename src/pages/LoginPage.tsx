import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, User, Lock } from "lucide-react";
import logoPoliciaCivil from '@/assets/logo-policia-civil-go.png';
import brasaoGoias from '@/assets/brasao-goias.png';
import { loginDestination } from '@/lib/login-destination';

const LoginPage = () => {
  const location = useLocation();
  const status = useAuthStore(s => s.status);
  const role = useAuthStore(s => s.user?.role);
  const login = useAuthStore((s) => s.login);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) return;
    setBusy(true);
    setError(null);
    try {
      await login(username.trim(), password, remember);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao autenticar");
    } finally {
      setBusy(false);
    }
  };

  if (status === 'authenticated') {
    const standalone = window.matchMedia('(display-mode: standalone)').matches;
    return <Navigate to={loginDestination(location.state?.returnTo, role, standalone)} replace />;
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-primary text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(214,193,122,0.14),transparent_42%)]" />
      <img src={brasaoGoias} alt="" aria-hidden="true" className="pointer-events-none absolute -right-16 top-1/2 hidden h-[620px] -translate-y-1/2 opacity-[0.035] lg:block" />
      <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-10">
        <div className="mb-7 flex flex-col items-center text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl border border-champagne/35 bg-white/[0.07] shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
            <img src={logoPoliciaCivil} alt="Brasão da Polícia Civil de Goiás" className="h-14 w-auto object-contain" />
          </div>
          <p className="label-mono !text-champagne">Governo do Estado de Goiás</p>
          <h1 className="mt-2 font-serif text-3xl font-semibold tracking-wide">POLÍCIA CIVIL DE GOIÁS</h1>
          <p className="mt-1 text-sm text-white/70">Delegacia de Jataí · Inventário Patrimonial</p>
        </div>

        <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-2xl border border-white/10 bg-black/10 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.2)] backdrop-blur-sm">
          <div className="mb-1">
            <h2 className="text-xl font-semibold">Acesso ao sistema</h2>
            <p className="mt-1 text-xs text-white/55">Entre com suas credenciais institucionais.</p>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-white/70">Usuário</Label>
            <div className="relative flex items-center">
              <User className="pointer-events-none absolute left-3 h-4 w-4 text-white/40" />
              <Input
                autoFocus autoCapitalize="none" autoCorrect="off"
                value={username} onChange={(e) => setUsername(e.target.value)}
                placeholder="Seu usuário"
                className="h-12 border-white/15 bg-white/10 pl-10 text-base text-white placeholder:text-white/40"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-white/70">Senha</Label>
            <div className="relative flex items-center">
              <Lock className="pointer-events-none absolute left-3 h-4 w-4 text-white/40" />
              <Input
                type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
                className="h-12 border-white/15 bg-white/10 pl-10 text-base text-white placeholder:text-white/40"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-white/70">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4 accent-champagne" />
            Manter conectado neste aparelho
          </label>

          {error && <p className="rounded-lg border border-danger/40 bg-danger/15 px-3 py-2 text-sm text-white">{error}</p>}

          <Button type="submit" disabled={busy || !username.trim() || !password}
            className="h-12 w-full bg-champagne text-base font-semibold text-primary hover:bg-champagne/90">
            {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : "Entrar"}
          </Button>
        </form>
      </div>
      <p className="relative pb-6 text-center text-xs text-white/40">Polícia Civil de Goiás · Uso interno e acesso restrito</p>
    </div>
  );
};

export default LoginPage;
