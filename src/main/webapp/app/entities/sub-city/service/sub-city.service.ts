import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISubCity, NewSubCity } from '../sub-city.model';

export type PartialUpdateSubCity = Partial<ISubCity> & Pick<ISubCity, 'id'>;

export type EntityResponseType = HttpResponse<ISubCity>;
export type EntityArrayResponseType = HttpResponse<ISubCity[]>;

@Injectable({ providedIn: 'root' })
export class SubCityService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/sub-cities');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(subCity: NewSubCity): Observable<EntityResponseType> {
    return this.http.post<ISubCity>(this.resourceUrl, subCity, { observe: 'response' });
  }

  update(subCity: ISubCity): Observable<EntityResponseType> {
    return this.http.put<ISubCity>(`${this.resourceUrl}/${this.getSubCityIdentifier(subCity)}`, subCity, { observe: 'response' });
  }

  partialUpdate(subCity: PartialUpdateSubCity): Observable<EntityResponseType> {
    return this.http.patch<ISubCity>(`${this.resourceUrl}/${this.getSubCityIdentifier(subCity)}`, subCity, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ISubCity>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISubCity[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSubCityIdentifier(subCity: Pick<ISubCity, 'id'>): string {
    return subCity.id;
  }

  compareSubCity(o1: Pick<ISubCity, 'id'> | null, o2: Pick<ISubCity, 'id'> | null): boolean {
    return o1 && o2 ? this.getSubCityIdentifier(o1) === this.getSubCityIdentifier(o2) : o1 === o2;
  }

  addSubCityToCollectionIfMissing<Type extends Pick<ISubCity, 'id'>>(
    subCityCollection: Type[],
    ...subCitiesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const subCities: Type[] = subCitiesToCheck.filter(isPresent);
    if (subCities.length > 0) {
      const subCityCollectionIdentifiers = subCityCollection.map(subCityItem => this.getSubCityIdentifier(subCityItem)!);
      const subCitiesToAdd = subCities.filter(subCityItem => {
        const subCityIdentifier = this.getSubCityIdentifier(subCityItem);
        if (subCityCollectionIdentifiers.includes(subCityIdentifier)) {
          return false;
        }
        subCityCollectionIdentifiers.push(subCityIdentifier);
        return true;
      });
      return [...subCitiesToAdd, ...subCityCollection];
    }
    return subCityCollection;
  }
}
