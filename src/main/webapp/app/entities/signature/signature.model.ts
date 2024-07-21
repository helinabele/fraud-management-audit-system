export interface ISignature {
    id: string;
    signatureName?: string | null;
    signature?: string | null;
    signatureContentType?: string | null;
    description?: string | null;
}

export type NewSignature = Omit<ISignature, 'id'> & { id: null };