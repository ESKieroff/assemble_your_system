'use client';
import { useSystemStore } from '../store/useSystemStore';


const technologies = {
  languages: {
    Java: ['Spring Boot', 'JPA', 'Hibernate'],
    NodeJS: ['NestJS', 'Express', 'Prisma'],
    PHP: ['Laravel', 'CodeIgniter', 'Yii'],
    Python: ['Django', 'Flask', 'SQLAlchemy']
  },
  orm: {
    Java: ['JPA', 'Hibernate'],
    NodeJS: ['Prisma'],
    PHP: ['Eloquent'],
    Python: ['SQLAlchemy']
  },
  realtime: ['WebSockets', 'Redis', 'RabbitMQ', 'Kafka']
};

export default function MonteSeuSistema() {
  const { systemType, persistence, realtime, language, framework, orm, setSystemType, setPersistence, setRealtime, setLanguage } = useSystemStore();

  // Lida com a mudança de seleção de linguagem
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value as keyof typeof technologies.languages; // Garantir que 'lang' seja uma chave válida
    setLanguage(lang);
  };

  return (
    <div className="p-5 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Monte seu Sistema</h1>
      
      <label className="block mb-2">Qual o tipo do sistema?</label>
      <select className="border p-2 w-full mb-4" onChange={(e) => setSystemType(e.target.value)}>
        <option value="">Selecione</option>
        <option value="mobile">Aplicativo Mobile</option>
        <option value="web">Web</option>
        <option value="pwa">PWA</option>
        <option value="backend">Backend/API</option>
      </select>
      
      {systemType && (
        <>
          <label className="block mb-2">O sistema precisa de persistência de dados?</label>
          <select className="border p-2 w-full mb-4" onChange={(e) => setPersistence(e.target.value)}>
            <option value="">Selecione</option>
            <option value="yes">Sim</option>
            <option value="no">Não</option>
          </select>
        </>
      )}
      
      {persistence === "yes" && (
        <>
          <label className="block mb-2">Escolha uma Linguagem:</label>
          <select className="border p-2 w-full mb-4" onChange={handleLanguageChange}>
            <option value="">Selecione</option>
            {Object.keys(technologies.languages).map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </>
      )}
      
      {language && (
        <>
          <label className="block mb-2">Frameworks Disponíveis:</label>
          <ul className="mb-4">
            {framework.map((fw) => (
              <li key={fw} className="border p-2 mb-2">{fw}</li>
            ))}
          </ul>
          <label className="block mb-2">ORM Disponíveis:</label>
          <ul>
            {orm.map((o) => (
              <li key={o} className="border p-2 mb-2">{o}</li>
            ))}
          </ul>
        </>
      )}
      
      {systemType && (
        <>
          <label className="block mb-2">O sistema precisa de comunicação em tempo real?</label>
          <select className="border p-2 w-full mb-4" onChange={(e) => setRealtime(e.target.value)}>
            <option value="">Selecione</option>
            <option value="yes">Sim</option>
            <option value="no">Não</option>
          </select>
        </>
      )}
      
      {realtime === "yes" && (
        <>
          <label className="block mb-2">Tecnologias de Comunicação em Tempo Real Disponíveis:</label>
          <ul>
            {technologies.realtime.map((tech) => (
              <li key={tech} className="border p-2 mb-2">{tech}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
