"use client";

import { useSystemStore } from "../../app/store/useSystemStore";
import { Card, CardContent } from "../components/ui/card";

export default function MonteSeuSistema() {
  const {
    systemType,
    persistence,
    realtime,
    language,
    framework,
    orm,
    setSystemType,
    setPersistence,
    setRealtime,
    setLanguage,
    setFramework,
    setOrm,
  } = useSystemStore();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setLanguage(selected as "Java" | "NodeJS" | "PHP" | "Python");
    // Exemplo de regras de stack:
    if (selected === "Node.js") {
      setFramework("NestJS");
      setOrm("Prisma");
    } else if (selected === "Java") {
      setFramework("Spring Boot");
      setOrm("Hibernate");
    } else if (selected === "Python") {
      setFramework("FastAPI");
      setOrm("SQLAlchemy");
    }
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-bold text-center">Monte Seu Sistema</h1>

      <Card>
        <CardContent className="space-y-2 p-4">
          <label className="block font-semibold">Tipo de Sistema</label>
          <select
            className="w-full border p-2 rounded"
            value={systemType ?? ""}
            onChange={(e) => setSystemType(e.target.value)}
          >
            <option value="">Selecione</option>
            <option value="Web">Web</option>
            <option value="Mobile">Mobile</option>
            <option value="Desktop">Desktop</option>
            <option value="API">API</option>
          </select>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-2 p-4">
          <label className="block font-semibold">Persistência</label>
          <select
            className="w-full border p-2 rounded"
            value={persistence ?? ""}
            onChange={(e) => setPersistence(e.target.value)}
          >
            <option value="">Selecione</option>
            <option value="SQL">SQL</option>
            <option value="NoSQL">NoSQL</option>
            <option value="Ambos">Ambos</option>
          </select>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-2 p-4">
          <label className="block font-semibold">Atualização em tempo real?</label>
          <select
            className="w-full border p-2 rounded"
            value={realtime ?? ""}
            onChange={(e) => setRealtime(e.target.value)}
          >
            <option value="">Selecione</option>
            <option value="Sim">Sim</option>
            <option value="Não">Não</option>
          </select>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-2 p-4">
          <label className="block font-semibold">Linguagem</label>
          <select
            className="w-full border p-2 rounded"
            value={language ?? ""}
            onChange={handleLanguageChange}
          >
            <option value="">Selecione</option>
            <option value="Node.js">Node.js</option>
            <option value="Java">Java</option>
            <option value="Python">Python</option>
            <option value="PHP">PHP</option>
            <option value="Rust">Rust</option>
          </select>
        </CardContent>
      </Card>

      {framework && (
        <Card>
          <CardContent className="space-y-2 p-4">
            <p className="font-semibold">Framework sugerido: {framework}</p>
            <p className="font-semibold">ORM sugerido: {orm}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
