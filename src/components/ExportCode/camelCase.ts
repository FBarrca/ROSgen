
//convert sting to snake_case also handles spaces and special characters
export function camelCase(str: string) {
    return str.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '').replace(/([a-z])([A-Z])/g, function (m, a, b) {
        return a + '_' + b.toLowerCase();
    }).toLowerCase();
}