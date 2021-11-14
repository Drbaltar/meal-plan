import { Ingredient } from './Ingredient';

export interface Recipe {
    id: number,
    name: string,
    ingredients: Array<Ingredient>,
    isPlanned: boolean
}
