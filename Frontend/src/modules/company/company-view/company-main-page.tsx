import React from 'react';
import './company-main-page.scss';
import YouTube from 'react-youtube';
import { Link, Route } from 'react-router-dom';
import { Box, Button, InputAdornment, LinearProgress, TextField, Typography } from '@material-ui/core';
import 'fontsource-roboto';
import { NewsComponent } from '../news/news.component';
import { INewsRecord } from '../news-create/news-create.component';
import { getTotalAmount, ICompany, IDonation } from '../company-card/company-card.component';
import { axiosInstance } from '../../../axios.utils';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { appHistory } from '../../../history.utils';
import { If } from '../../If';
import { getUser, isLogged } from '../../../login.utils';
import { AttachMoney } from '@material-ui/icons';
import { DonationsComponent } from '../donations.component';

interface ICompanyMainPageState {
  company: ICompany;
  amount: number;
}

interface ICompanyResult {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly subject: string;
  readonly amount: number;
  readonly images: string;
  readonly video: string;
  readonly currentAmount: number;
  readonly news: INewsRecord[];
  readonly donations: IDonation[];
  readonly userId: number;
}

export class CompanyMainPage extends React.Component <any, ICompanyMainPageState> {
  constructor(props: any) {
    super(props);
  }

  state: ICompanyMainPageState = {
    amount: 0,
    company: {
      id: 1,
      name: 'Boys',
      description: 'We are gays, hoe',
      subject: 'Education',
      amount: 10000,
      currentAmount: 3000,
      image: '',
      video: 'https://www.youtube.com/watch?v=ez1GvslSQNk&ab_channel=%D0%A0%D0%90%D0%99%D0%97',
      donations: [],
      news: [],
      user: null,
      createdAt: '',
      endDate: '',
      userId: null,
    },
  };

  fetchCompany(): void {
    axiosInstance.get(`/company/${this.companyId}`).then(response => this.setState({ company: response.data }));
  }

  componentDidMount() {
    this.fetchCompany();
  }

  get companyId(): string {
    return this.props.match.params.id;
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  linearProgress() {
    let amount = this.state.company.amount;
    let currentAmount = this.state.company.currentAmount;

    return (currentAmount / amount) * 100;
  }

  fetchYoutube() {
    let video = this.state.company.video;
    let videoId;

    videoId = new URLSearchParams(new URL(video).search);

    return videoId.get('v');
  }

  get companyPrefix(): string {
    return `/company/${this.companyId}`;
  }

  donate = (): void => {
    axiosInstance.post(`/company/donate/${this.companyId}`, { amount: this.state.amount })
      .then(result => this.setState({
        company: {
          ...this.state.company,
          donations: [
            ...this.state.company.donations,
            result.data,
          ],
        },
      }));
  };

  render() {
    return (
      <div className="company">
        <div>
          <div className="icon">
          </div>
          <div className="company_name">
            <Box display="flex" justifyContent="center" flexDirection="column">
              <KeyboardBackspaceIcon fontSize={'large'} onClick={() => appHistory.goBack()}/>
            </Box>
            <Typography variant="h2">
              {this.state.company.name}
            </Typography>
          </div>
        </div>
        <div
          className="video">
          <div>
            <YouTube
              videoId={this.fetchYoutube()}
              onReady={this._onReady}/>
          </div>
          <div>
            <div className="box">
              <div>
                <LinearProgress
                  className="line"
                  variant="determinate"
                  value={(getTotalAmount(this.state.company) / this.state.company.amount) * 100}/>
              </div>
              <Typography
                variant="h5">
              <span
                className="current_amount"> 
              <b> ${getTotalAmount(this.state.company)}</b>
              </span>
              </Typography>
              <Typography
                variant="subtitle2">
                <div className="amount">собрано из ${this.state.company.amount}</div>
              </Typography>
              <span className="subject_s">
                <div className="text_p">
                  <span>Тематика: {this.state.company.subject}</span>
                </div>
              </span>
              <If if={isLogged() && getUser().id === this.state.company.userId}>
                <Link to={`/news/create/${this.companyId}`}>
                  <Button variant="outlined">
                    Опубликовать новость
                  </Button>
                </Link>
              </If>

              <If if={isLogged() && getUser().id !== this.state.company.userId}>
                <TextField onChange={event => this.setState({ amount: parseInt(event.target.value) })}
                           InputProps={{
                             startAdornment: (
                               <InputAdornment position="start">
                                 <AttachMoney/>
                               </InputAdornment>
                             ),
                           }}
                           label="Сумма поддержки:"
                           type="number"
                           variant="outlined"/>

                <br/>
                <Button variant="outlined" onClick={this.donate}>
                  Поддержать
                </Button>
              </If>
            </div>
          </div>
        </div>
        <div>
          <ul
            className="create-list">
            <li>
              <Typography variant="subtitle1">
                <Link className="create-list-link"
                      to={`${this.companyPrefix}/about`}>Описание</Link>
              </Typography>
            </li>
            <li>
              <Typography
                variant="subtitle1"
                className="">
                <Link className="create-list-link"
                      to={`${this.companyPrefix}/news`}>Новости</Link>
              </Typography>
            </li>
            <li>
              <Typography
                variant="subtitle1"
                className="">
                <Link className="create-list-link"
                      to={`${this.companyPrefix}/donations`}>Список помощи</Link>
              </Typography>
            </li>
          </ul>
        </div>
        <Route path={`${this.companyPrefix}/about`}>
          <div className="column-center">
            <div className="company__about">
              {this.state.company.description}
            </div>
          </div>
        </Route>
        <Route path={`${this.companyPrefix}/news`}>
          <NewsComponent news={this.state.company.news}/>
        </Route>
        <Route path={`${this.companyPrefix}/donations`}>
          <div className="column-center">
            <div className="company__about items-margin">
              {this.state.company.donations.map(donation =>
                <DonationsComponent donation={donation}/>,
              )}
            </div>
          </div>
        </Route>
      </div>
    );
  }
}