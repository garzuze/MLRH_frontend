import { useState } from "react";
import curitibaImage from "../assets/curitiba.jpg"
import logo from "../assets/logo.png"
import Button from "../components/ui/Button";
import { useAuth } from "../contexts/AuthContext";
import Snackbar from "../components/ui/Snackbar";

export default function LoginPage() {

  const { login } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (!password) return;

    const success = await login(email, password);

    if (success) {
      window.location.href = "/admin/";
    } else {
      setSnackbarMessage("Credenciais inválidas!")
      setIsSnackbarOpen(true);
    }
  }

  return (
    <main className="w-full mx-auto min-h-screen grid grid-cols-4">
      <div id="loginPanel" className="col-span-4 sm:col-span-3 md:col-span-2">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen font-roboto bg-gradient-to-br from-neutral-950 via-neutral-900 to-indigo-900 lg:py-0">
          <a className="flex items-center mb-6 text-2xl font-semibold text-white">
            <img src={logo} className="w-64"/>
          </a>
          <div className="w-full bg-neutral-950 border border-neutral-800 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-zinc-50 md:text-2xl">
                Entre na sua conta
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-300">Email</label>
                  <input type="email" name="email" id="email" className="bg-neutral-900 border border-neutral-800 text-zinc-300 rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5" placeholder="fulano@email.com" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} required/>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-300">Senha</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" className="bg-neutral-900 border border-neutral-800 text-zinc-300 rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} required/>
                </div>
                <div className="flex items-center justify-between">
                  <a className="text-sm font-medium hover:underline text-zinc-400">Esqueceu a senha?</a>
                </div>
                <Button text="Entrar" className="w-full mx-0"/>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div id="loginImage" style={{ backgroundImage: `url(${curitibaImage})` }} className="col-span-4 sm:col-span-1 md:col-span-2 bg-cover bg-center h-screen">
      </div>
      <Snackbar message={snackbarMessage} isOpen={isSnackbarOpen} onClose={() => setIsSnackbarOpen(false)} ></Snackbar>
    </main>
  );
}

