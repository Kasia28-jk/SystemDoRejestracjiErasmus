export const AUTH_401_ERROR_MESSAGE = 'Błędny login bądź hasło';
export const AUTH_404_SERVER_UNAVAILABLE = 'Serwer tymczasowo niedostępny';
export const DEFAULT_ERROR = "Wystąpił błąd serwera";

export const SIGN_UP_ERROR = "Wystąpił błąd podczas rejestracji";

export const ERROR_TO_MESSAGE_MAP = new Map<Number, string>([
  [401, AUTH_401_ERROR_MESSAGE],
  [404, AUTH_404_SERVER_UNAVAILABLE]
])
