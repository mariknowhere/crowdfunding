import React from 'react';
import { CompanyCardComponent, ICompany } from '../company-card/company-card.component';
import './company-list.component.scss';

interface ICompanyListProps {
  companies: ICompany[];
  onDelete?: (company: ICompany) => any,
}

export class CompanyListComponent extends React.Component<ICompanyListProps, any> {
  constructor(props: ICompanyListProps) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <div className="company-list">
        {this.props.companies.map(company =>
          <CompanyCardComponent onDelete={this.props.onDelete}
                                key={company.id}
                                company={company}/>)
        }
      </div>
    );
  }
}
