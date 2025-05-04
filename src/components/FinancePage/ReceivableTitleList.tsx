import { useReceivableTitle } from "../../hooks/useReceivableTitle";

export default function ReceivableTitleList() {
  const { data: titles, isLoading: loadingTitles, error: errorTitles } = useReceivableTitle();

  if (loadingTitles) return <div>Carregando Títulos...</div>;
  if (errorTitles) return <div>Erro ao carregar títulos.</div>;

  return (
    <ul className="space-y-2">
      {titles?.map((title) => (
        <li key={title.id}>
          <div className="text-sm text-stone-900 px-2 py-1 hover:bg-gray-100 rounded">
            {title.strRepresentation}
          </div>
        </li>
      ))}
    </ul>
  );
}

