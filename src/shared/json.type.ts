type PrimitivePropertie = string | number | boolean | null;
type Propertie = PrimitivePropertie | JsonDocument | Collection;

interface Collection extends Array<Propertie> {}

export interface JsonDocument {
    [member: string]: Propertie;
}