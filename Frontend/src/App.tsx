import React from 'react';
import './App.scss';
import { Route, Router } from 'react-router-dom';
import { Authorize } from './modules/account/Authorize';
import { appHistory } from './history.utils';
import { PersonalAreaComponent } from './modules/personal-area/personal-area.component';
import { ToolbarComponent } from './modules/toolbar/toolbar.component';
import { HomePageComponent } from './modules/home-page/home-page.component';
import { CompanyMainPage } from './modules/company/company-view/company-main-page';
import { NewsCreateComponent } from './modules/company/news-create/news-create.component';
import { GuardedRoute } from './modules/guarded-route';
import { isLogged } from './login.utils';

function App() {
  return (
    <Router history={appHistory}>
      <ToolbarComponent/>
      <Route path="/auth" component={Authorize}/>
      <GuardedRoute auth={() => isLogged()}
                    content={() => <PersonalAreaComponent/>}
                    path="/personal-area">
      </GuardedRoute>
      <Route path="/" exact component={HomePageComponent}/>
      <Route path="/company/:id" component={CompanyMainPage}/>
      <GuardedRoute auth={() => isLogged()}
                    content={(props) => <NewsCreateComponent {...props}/>}
                    path="/news/create/:id"/>
    </Router>
  );
}

export default App;
