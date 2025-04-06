"use client";
//import MonteSeuSistema from '../app/components/AssembleYourSystem';

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Monte seu Sistema</h1>
      <p className="text-center mb-8 text-muted-foreground max-w-md">
        Responda algumas perguntas e descubra qual stack de tecnologia é mais adequada para o seu projeto, com base em critérios técnicos e de negócio.
      </p>
      <div className="flex flex-col items-center space-y-4">
        <Link
          href="/questionnaire"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
        >
          Iniciar Questionário
        </Link>
        <Link
          href="/recommendation-result"
          className="text-blue-600 underline hover:text-blue-800 transition"
        >
          Ver última recomendação
        </Link>
      </div>
    </main>
  );
}