const API_BASE_URL = 'https://inventory-manager-api-fe-g4cjgadneahudhcb.brazilsouth-01.azurewebsites.net';

type ApiErrorBody = {
    error?: string;
    code?: string;
};

export class ApiError extends Error {
    readonly code: string;
    readonly status: number;

    constructor(message: string, code: string, status: number) {
        super(message);
        this.name = 'ApiError';
        this.code = code;
        this.status = status;
    }
}

const errorMessages: Record<string, string> = {
    ACCOUNT_NAME_REQUIRED: 'Informe o nome da loja.',
    ACCOUNT_EMAIL_REQUIRED: 'Informe o e-mail da loja.',
    ACCOUNT_EMAIL_INVALID: 'Informe um e-mail válido.',
    ACCOUNT_PASSWORD_TOO_SHORT: 'A senha deve ter pelo menos 6 caracteres.',
    ACCOUNT_PRO_INVALID: 'Não foi possível definir o tipo da conta.',
    EMAIL_ALREADY_REGISTERED: 'Já existe uma conta cadastrada com este e-mail.',
    LOGIN_EMAIL_REQUIRED: 'Informe o e-mail para entrar.',
    LOGIN_EMAIL_INVALID: 'Informe um e-mail válido para entrar.',
    LOGIN_PASSWORD_REQUIRED: 'Informe a senha para entrar.',
    INVALID_CREDENTIALS: 'E-mail ou senha incorretos.',
    AUTH_CONFIG_INVALID: 'O serviço de autenticação está indisponível. Tente novamente mais tarde.',
    AUTH_TOKEN_MISSING: 'Sua sessão não foi encontrada. Entre novamente.',
    AUTH_TOKEN_INVALID: 'Sua sessão expirou. Entre novamente.',
    PRODUCT_NAME_REQUIRED: 'Informe o nome do produto.',
    PRODUCT_CATEGORY_REQUIRED: 'Informe a categoria do produto.',
    PRODUCT_COSTPRICE_INVALID: 'Informe um custo válido, maior ou igual a zero.',
    PRODUCT_PRICETOSELL_INVALID: 'Informe um preço de venda válido, maior ou igual a zero.',
    PRODUCT_QUANTITY_INVALID: 'Informe uma quantidade inteira maior ou igual a zero.',
    PRODUCT_WARNINGPOINT_INVALID: 'Informe um ponto de aviso inteiro maior ou igual a zero.',
    PRODUCT_USERID_INVALID: 'Sua sessão é inválida. Entre novamente.',
    PRODUCT_USERID_NOT_FOUND: 'A conta desta sessão não foi encontrada. Entre novamente.',
    PRODUCT_ID_REQUIRED: 'Não foi informado qual produto deve ser alterado.',
    PRODUCT_ID_INVALID: 'O produto selecionado é inválido.',
    PRODUCT_ID_NOT_FOUND: 'O produto selecionado não foi encontrado.',
    PRODUCT_DELETE_FORBIDDEN: 'Esse produto não existe ou não pertence à sua conta.',
    PRODUCT_UPDATE_FORBIDDEN: 'Você não pode alterar esse produto.',
    PRODUCT_CREATE_FAILED: 'Não foi possível cadastrar o produto agora.',
    PRODUCT_CREATION_FAILED: 'Não foi possível cadastrar o produto agora.',
    PRODUCT_FETCH_FAILED: 'Não foi possível carregar os produtos agora.',
    PRODUCT_UPDATE_FAILED: 'Não foi possível alterar o produto agora.',
    PRODUCT_DELETE_FAILED: 'Não foi possível deletar o produto agora.',
    ACCOUNT_CREATE_FAILED: 'Não foi possível criar a conta agora.',
    LOGIN_FAILED: 'Não foi possível entrar agora.',
    USER_LIST_FAILED: 'Não foi possível carregar os usuários agora.',
    USER_ID_REQUIRED: 'Não foi informado qual usuário deve ser removido.',
    USER_ID_INVALID: 'O usuário selecionado é inválido.',
    USER_NOT_FOUND: 'O usuário não foi encontrado.',
    USER_DELETE_FORBIDDEN: 'Você não pode remover esta conta.',
    USER_DELETE_CONFLICT: 'Não é possível remover a conta porque ela possui produtos cadastrados.',
    USER_DELETE_FAILED: 'Não foi possível remover a conta agora.',
    INVALID_JSON: 'Os dados enviados estão inválidos. Revise os campos e tente novamente.',
    ROUTE_NOT_FOUND: 'A operação solicitada não está disponível.',
    SERVER_ERROR: 'O servidor não conseguiu concluir a operação agora.'
};

function messageForStatus(status: number): string {
    if (status === 400) return 'Confira os dados informados e tente novamente.';
    if (status === 401) return 'Sua sessão não é válida. Entre novamente.';
    if (status === 403) return 'Você não tem permissão para realizar esta ação.';
    if (status === 404) return 'O recurso solicitado não foi encontrado.';
    if (status === 409) return 'Esta operação entra em conflito com dados já cadastrados.';
    if (status >= 500) return 'O serviço está indisponível no momento. Tente novamente mais tarde.';
    return 'Não foi possível concluir a operação.';
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof ApiError) {
        return errorMessages[error.code] || error.message || messageForStatus(error.status);
    }

    if (error instanceof TypeError) {
        return 'Não foi possível conectar ao serviço. Verifique sua internet e tente novamente.';
    }

    return fallback;
}

export async function requestJson<T>(path: string, options?: RequestInit): Promise<T> {
    let response: Response;

    try {
        response = await fetch(`${API_BASE_URL}${path}`, options);
    } catch {
        throw new ApiError(
            'Não foi possível conectar ao serviço. Verifique sua internet e tente novamente.',
            'NETWORK_ERROR',
            0
        );
    }

    const responseText = await response.text();
    let responseData: ApiErrorBody | T | null = null;

    if (responseText) {
        try {
            responseData = JSON.parse(responseText) as ApiErrorBody | T;
        } catch {
            responseData = null;
        }
    }

    if (!response.ok) {
        const errorBody = responseData as ApiErrorBody | null;
        const code = errorBody?.code || `HTTP_${response.status}`;
        const message = errorMessages[code] || errorBody?.error || messageForStatus(response.status);
        throw new ApiError(message, code, response.status);
    }

    return responseData as T;
}