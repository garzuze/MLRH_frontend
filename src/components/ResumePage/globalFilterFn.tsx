import { FilterFn, Row } from "@tanstack/react-table";
import { SlimResumeType } from "../../types/SlimResumeType";

// https://tanstack.com/table/v8/docs/guide/fuzzy-filtering
const globalFilterFn: FilterFn<SlimResumeType> = (row: Row<SlimResumeType>, columnId: string, filterValue: string) => {
    // Por razões obscuras, se eu não fizer o cast do filterValue com o toString, ele retorna um erro com o toLowerCase(),
    // mesmo se filterValue já estiver definido como string
    // Também dá erro se eu tirar o columnId, provavelmente porque ele herda atributos do FilterFn
    const value: string = filterValue.toString().toLowerCase().trim();

    // Verifica campos de nível superior
    const name = row.original.name?.toLowerCase() || '';
    const phone = row.original.phone?.toLowerCase() || '';
    const neighborhood = row.original.neighborhood?.toLowerCase() || '';
    const city = row.original.city?.toLowerCase() || '';
    const positionsStr = row.original.positionsStr?.toLowerCase() || '';
  
    // Verifica dados aninhados (aka nested data 🤓) em workExperiences
    const workExperiences = row.original.workExperiences || [];
    const nestedMatch = workExperiences.some(exp =>
      exp.companyName?.toLowerCase().includes(value) ||
      exp.positionTitle?.toLowerCase().includes(value) ||
      exp.reasonForLeaving?.toLowerCase().includes(value)
    );
  
    return (
      name.includes(value) ||
      phone.includes(value) ||
      neighborhood.includes(value) ||
      city.includes(value) ||
      positionsStr.includes(value) ||
      nestedMatch
    );
  
};

export default globalFilterFn