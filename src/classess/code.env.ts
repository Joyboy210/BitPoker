// Utility functions for handling game codes and translations

/**
 * Generates a random game code
 * @returns A random 6-character code
 */
export function code(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

/**
 * Translates a game code into a valid PeerJS ID
 * @param code The game code to translate
 * @returns A valid PeerJS ID string
 */
export function TranslateCode(code: string): string {
    return `itaylayzer-poker-${code.toLowerCase()}`;
}