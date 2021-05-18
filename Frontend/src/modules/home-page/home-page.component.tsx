import React from 'react';
import './home-page.component.scss';
import { CompanyListCommonComponent } from '../company/company-list-common/company-list-common.component';

export class HomePageComponent extends React.Component<any, any> {
  render() {
    return (
      <div>
        <CompanyListCommonComponent/>
      </div>
    )
  }
}