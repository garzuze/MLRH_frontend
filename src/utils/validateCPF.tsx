import { range } from "./range";

function getExpectedDigit(cpfArray: number[], digit: number) {
    const weights = range(digit + 1, 1, -1);
    let sum = 0;
    for (let i = 0; i < cpfArray.slice(0, digit).length; i++) {
        sum += cpfArray[i] * weights[i];
    }

    return (sum * 10 % 11) % 10;
}

// Inspired by https://pt.stackoverflow.com/questions/64608/como-validar-e-calcular-o-d%C3%ADgito-de-controle-de-um-cpf
// Which was made in python
export function validateCPF(cpf: string) {
    /* 
    Efetua a validação do CPF, tanto formatação quando dígito verificadores.

    Parâmetros:
        cpf (str): CPF a ser validado

    Retorno:
        bool:
            - Falso, quando o CPF não possuir o formato 999.999.999-99;
            - Falso, quando o CPF não possuir 11 caracteres numéricos;
            - Falso, quando os dígitos verificadores forem inválidos;
            - Verdadeiro, caso contrário.

    Exemplos:

    >>> validate('529.982.247-25')
    True
    >>> validate('52998224725')
    False
    >>> validate('111.111.111-11')
    False
    */

    // Verifica a formatação do CPF
    const regex = new RegExp(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/);
    if (!regex.test(cpf)) return false;

    // Obtém apenas os números do CPF, ignorando pontuações
    const numbers: number[] = cpf.replace(/\D/g, "").split("").map(Number)

    // Verifica se o CPF possui 11 números ou se todos são iguais
    if (numbers.length != 11 || new Set(numbers).size == 1) return false;

    // Validação do primeiro dígito verificador
    if (numbers[9] != getExpectedDigit(numbers, 9)) return false;

    // Validação do segundo dígito verificador
    if (numbers[10] != getExpectedDigit(numbers, 10)) return false;

    return true;
}