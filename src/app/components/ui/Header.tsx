"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">Monte seu Sistema</Link>
        </h1>
        <nav className="space-x-4 text-sm">
          <Link href="/questionnaire" className="hover:underline">
            Questionário
          </Link>
          <Link href="/questionnaire-recommendation" className="hover:underline">
            Recomendação
          </Link>
          <Link href="/questionnaire-comparator" className="hover:underline">
            Comparador
          </Link>
        </nav>
      </div>
    </header>
  );
}
