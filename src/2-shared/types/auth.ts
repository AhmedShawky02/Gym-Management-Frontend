import type { ICartItemDto } from "./cart";
import type { BackendError } from "./error.api";

export interface ILoginAction {
    accessToken: string,
    refreshToken: string
}

export type LoginActionResult = {
    error: BackendError,
    cart: ICartItemDto[] | null,
    redirectTo: string
}

export type SignupActionResult = {
    error: BackendError
}
