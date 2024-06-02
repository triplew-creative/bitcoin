export const APIURL: string = 'http://localhost:3000';
export function numberIsValid(num?: any): boolean
{
    return !isNullOrEmpty(num) && !isNaN(Number(num));
}
/**
 * @summary checks if val is null | undefined | Object.keys(val).length === 0
 * @param val: any (number/string/object)
 * @returns boolean
 */
export function isNullOrEmpty(val: any): boolean
{
    if ((val !== null && typeof val !== 'undefined') && typeof val === 'object')
    {
        if (Object.keys(val)?.length === 0)
        {
            return true;
        }
    }
    else
    {
        if (typeof val === 'undefined' || val === null || val === '')
        {
            return true;
        }
    }
    return false;
}