import React from 'react';
import { axiosInstance } from '../../../axios.utils';
import { CompanyListComponent } from '../company-list/company-list.component';
import { ICompany } from '../company-card/company-card.component';

interface ICompanyListSelfState {
  companies: ICompany[];
}

export class CompanyListSelfComponent extends React.Component<{}, ICompanyListSelfState> {
  state: ICompanyListSelfState = { companies: [] };

  fetchSelfCompanies(): void {
    axiosInstance.get<ICompany[]>('/company/self')
      .then(this.setCompanies);
  }
  
  setCompanies = ({ data: companies }) => this.setState({ companies });

  componentDidMount() {
    this.fetchSelfCompanies();
  }

  deleteCompany = (company: ICompany): void => {
    axiosInstance.delete(`/company/${company.id}`).then(() => {
      this.setState({ companies: this.state.companies.filter(c => c !== company) });
    });
  };

  render(): React.ReactNode {
    return <CompanyListComponent onDelete={this.deleteCompany} companies={this.state.companies}/>;
  }
}