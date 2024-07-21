import { HttpClient, HttpResponse } from "@angular/common/http";
import { ISignature, NewSignature } from "../signature.model";
import { Injectable } from "@angular/core";
import { ApplicationConfigService } from "app/core/config/application-config.service";
import { Observable } from "rxjs";
import { createRequestOption } from "app/core/request/request-util";
import { isPresent } from "app/core/util/operators";

export type PartialUpdateSignature = Partial<ISignature> & Pick<ISignature, 'id'>;

export type EntityResponseType = HttpResponse<ISignature>;
export type EntityArrayResponseType = HttpResponse<ISignature[]>;

@Injectable({ providedIn: 'root' })
export class SignatureService {
    protected resourceUrl = this.applicationConfigService.getEndpointFor('api/signature');

    constructor(protected http: HttpClient,
        protected applicationConfigService: ApplicationConfigService) { }

    create(signature: NewSignature): Observable<EntityResponseType> {
        return this.http.post<ISignature>(this.resourceUrl, signature, { observe: 'response' });
    }

    update(signature: ISignature): Observable<EntityResponseType> {
        return this.http.put<ISignature>(`${this.resourceUrl}/${this.getSignatureIdentifier(signature)}`, signature, { observe: 'response' })
    }

    partialUpdate(signature: PartialUpdateSignature): Observable<EntityResponseType> {
        return this.http.patch<ISignature>(`${this.resourceUrl}/${this.getSignatureIdentifier(signature)}`, signature, { observe: 'response' });
    }
    find(id: string): Observable<EntityResponseType> {
        return this.http.get<ISignature>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISignature[]>(this.resourceUrl, { params: options, observe: 'response' });
    }
    delete(id: string): Observable<HttpResponse<{}>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' })
    }
    getSignatureIdentifier(signature: Pick<ISignature, 'id'>): string {
        return signature.id;
    }

    compareSignature(o1: Pick<ISignature, 'id'> | null, o2: Pick<ISignature, 'id'> | null): boolean {
        return o1 && o2 ? this.getSignatureIdentifier(o1) === this.getSignatureIdentifier(o2) : o1 === o2;
    }

    addSignatureToCollectionIfMissing<Type extends Pick<ISignature, 'id'>>(
        signatureCollection: Type[],
        ...signatureToCheck: (Type | null | undefined)[]
    ): Type[] {
        const signature: Type[] = signatureToCheck.filter(isPresent);
        if (signature.length > 0) {
            const signatureCollectionIdentifiers = signatureCollection.map(signatureItem => this.getSignatureIdentifier(signatureItem)!);
            const signatureToAdd = signature.filter(signatureItem => {
                const signatureIdentifier = this.getSignatureIdentifier(signatureItem);
                if (signatureCollectionIdentifiers.includes(signatureIdentifier)) {
                    return false;
                }
                signatureCollectionIdentifiers.push(signatureIdentifier);
                return true;
            });
            return [...signatureToAdd, ...signatureCollection];
        }
        return signatureCollection;
    }
}