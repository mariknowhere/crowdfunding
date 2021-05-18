import React from 'react';
import { CompanyListSelfComponent } from '../company-list-self/company-list-self.component';
import { axiosInstance } from '../../../axios.utils';

export class CompanyListCommonComponent extends CompanyListSelfComponent {
  fetchSelfCompanies() {
    axiosInstance.get('/company').then(this.setCompanies);
  }
}