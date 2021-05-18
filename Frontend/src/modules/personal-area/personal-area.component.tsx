import React from 'react';
import './personal-area.component.scss';
import { Avatar, Button, Tab, Tabs } from '@material-ui/core';
import { Link, Route } from 'react-router-dom';
import { CompanyCreateComponent } from '../company/company-create/company-create.component';
import { CompanyListSelfComponent } from '../company/company-list-self/company-list-self.component';
import { ICompany } from '../company/company-card/company-card.component';
import { getUser } from '../../login.utils';
import { axiosInstance } from '../../axios.utils';

interface IPersonalAreaComponentState {
  companies: ICompany[];
  editable: boolean;
  email: string;
}

interface IUserResult {
  readonly email: string;
  readonly username: string;
  readonly password: string;
  readonly id: number;
}

export class PersonalAreaComponent extends React.Component<{}, IPersonalAreaComponentState> {

  state: IPersonalAreaComponentState = {
    companies: [],
    editable: true,
    email: '',
  };
  
  componentDidMount() {
    // axiosInstance.post('/company/donate/1', { amount: 1000 });
  }

  render() {
    return (
      <div className="create-personal-area">
        <div className="personal-area-info">
          <div className="create-personal-name">
            <div className="create-avatar">
              <Avatar/>
            </div>
            <h2>{getUser().name}</h2>
          </div>

          <h3>{getUser().email}</h3>
        </div>
        
        <div>
          <Tabs>
            <Tab value={0} label={<Link to="/personal-area/companies">Кампании</Link>}/>
            <Tab value={1} label={<Link to="/personal-area/create-company">Создать кампанию</Link>}/>
          </Tabs>

          <Route path="/personal-area/create-company">
            <CompanyCreateComponent/>
          </Route>
          <Route path="/personal-area/companies">
            <CompanyListSelfComponent/>
          </Route>
        </div>
      </div>
    );
  }
}